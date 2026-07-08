// pages/quiz-practice/quiz-practice.js
const quizData = require('../../data/quiz.js')

Page({
  data: {
    questions: [],
    currentIndex: 0,
    selectedOption: -1,
    answered: false,
    isCorrect: false,
    mode: 'random',
    categoryName: '',
    total: 0,
    correctCount: 0,
    wrongList: [],
    // 当前题的选项（打乱后的）
    currentQuestion: null,
    shuffledOptions: []
  },

  onLoad(options) {
    let questions = []
    let categoryName = ''

    if (options.mode === 'category') {
      const cat = quizData.categories.find(c => c.id === options.categoryId)
      categoryName = cat ? cat.name : ''
      questions = quizData.questions.filter(q => q.category === options.categoryId)
      // 随机取最多15题
      questions = this.shuffle(questions).slice(0, 15)
    } else if (options.mode === 'wrong') {
      // 错题模式：用传入的 ids 加载错题
      categoryName = '错题重做'
      const ids = (options.ids || '').split(',').filter(Boolean)
      questions = ids.map(id => quizData.questions.find(q => q.id === id)).filter(Boolean)
    } else {
      // 随机模式：取10题
      questions = this.shuffle([...quizData.questions]).slice(0, 10)
    }

    this.setData({
      questions,
      mode: options.mode || 'random',
      categoryName,
      total: questions.length
    })

    this.loadQuestion(0)
  },

  // 打乱数组
  shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  },

  loadQuestion(index) {
    const question = this.data.questions[index]
    if (!question) return

    // 打乱选项顺序，但记录正确答案的新位置
    const optionsWithIndex = question.options.map((opt, i) => ({
      text: opt,
      isCorrect: i === question.answer
    }))
    const shuffled = this.shuffle(optionsWithIndex)

    this.setData({
      currentIndex: index,
      currentQuestion: question,
      shuffledOptions: shuffled,
      selectedOption: -1,
      answered: false,
      isCorrect: false
    })

    wx.setNavigationBarTitle({
      title: `第 ${index + 1} / ${this.data.total} 题`
    })
  },

  selectOption(e) {
    if (this.data.answered) return

    const index = e.currentTarget.dataset.index
    const isCorrect = this.data.shuffledOptions[index].isCorrect

    this.setData({
      selectedOption: index,
      answered: true,
      isCorrect
    })

    // 更新统计
    this.updateStats(isCorrect)

    // 记录错题
    if (!isCorrect) {
      const wrongList = [...this.data.wrongList]
      wrongList.push(this.data.currentQuestion.id)
      this.setData({ wrongList })
    }

    // 振动反馈
    if (isCorrect) {
      wx.vibrateShort({ type: 'light' })
    } else {
      wx.vibrateShort({ type: 'medium' })
    }
  },

  updateStats(isCorrect) {
    const stats = wx.getStorageSync('quiz_stats') || {
      totalAnswered: 0,
      correctCount: 0,
      answeredQuestions: [],
      correctQuestions: [],
      wrongRecords: []
    }

    const qid = this.data.currentQuestion.id
    stats.totalAnswered = (stats.totalAnswered || 0) + 1

    if (!stats.answeredQuestions) stats.answeredQuestions = []
    if (!stats.answeredQuestions.includes(qid)) {
      stats.answeredQuestions.push(qid)
    }

    if (isCorrect) {
      stats.correctCount = (stats.correctCount || 0) + 1
      if (!stats.correctQuestions) stats.correctQuestions = []
      if (!stats.correctQuestions.includes(qid)) {
        stats.correctQuestions.push(qid)
      }
      // 从错题本移除（如果之前错过）
      if (stats.wrongRecords) {
        stats.wrongRecords = stats.wrongRecords.filter(id => id !== qid)
      }
    } else {
      if (!stats.wrongRecords) stats.wrongRecords = []
      if (!stats.wrongRecords.includes(qid)) {
        stats.wrongRecords.push(qid)
      }
    }

    wx.setStorageSync('quiz_stats', stats)

    this.setData({
      correctCount: this.data.correctCount + (isCorrect ? 1 : 0)
    })
  },

  nextQuestion() {
    if (this.data.currentIndex < this.data.total - 1) {
      this.loadQuestion(this.data.currentIndex + 1)
    } else {
      // 完成答题，跳转结果页
      const correct = this.data.correctCount
      const total = this.data.total
      const accuracy = Math.round(correct / total * 100)
      wx.redirectTo({
        url: `/pages/quiz-result/quiz-result?correct=${correct}&total=${total}&accuracy=${accuracy}&mode=${this.data.mode}`
      })
    }
  },

  goToControl() {
    const qid = this.data.currentQuestion.relatedControlId
    if (qid) {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${qid}`
      })
    }
  },

  quitPractice() {
    wx.showModal({
      title: '确认退出',
      content: '当前答题进度不会保存',
      success: (res) => {
        if (res.confirm) {
          wx.navigateBack()
        }
      }
    })
  }
})
