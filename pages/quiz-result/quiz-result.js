// pages/quiz-result/quiz-result.js
const quizData = require('../../data/quiz.js')

Page({
  data: {
    correct: 0,
    total: 0,
    accuracy: 0,
    mode: 'random',
    level: '',
    levelDesc: '',
    levelColor: '',
    weakCategories: []
  },

  onLoad(options) {
    const correct = parseInt(options.correct) || 0
    const total = parseInt(options.total) || 0
    const accuracy = parseInt(options.accuracy) || 0
    const mode = options.mode || 'random'

    // 评级
    let level = ''
    let levelDesc = ''
    let levelColor = ''
    if (accuracy >= 90) {
      level = '优秀'
      levelDesc = '你对小程序组件掌握得非常扎实！'
      levelColor = '#07c160'
    } else if (accuracy >= 70) {
      level = '良好'
      levelDesc = '基础不错，继续巩固薄弱项。'
      levelColor = '#4facfe'
    } else if (accuracy >= 50) {
      level = '及格'
      levelDesc = '还需要多练习，看看错题解析。'
      levelColor = '#ff9800'
    } else {
      level = '需加油'
      levelDesc = '建议回到组件详情页重新学习。'
      levelColor = '#ee0a24'
    }

    // 分析薄弱知识域
    const stats = wx.getStorageSync('quiz_stats') || {}
    const weakCategories = quizData.categories.map(cat => {
      const catQuestions = quizData.questions.filter(q => q.category === cat.id)
      const answered = catQuestions.filter(q =>
        stats.answeredQuestions && stats.answeredQuestions.includes(q.id)
      ).length
      const correctNum = catQuestions.filter(q =>
        stats.correctQuestions && stats.correctQuestions.includes(q.id)
      ).length
      const rate = answered > 0 ? Math.round(correctNum / answered * 100) : -1
      return { ...cat, answered, correct: correctNum, rate }
    }).filter(c => c.rate >= 0 && c.rate < 60)
      .sort((a, b) => a.rate - b.rate)
      .slice(0, 3)

    this.setData({
      correct,
      total,
      accuracy,
      mode,
      level,
      levelDesc,
      levelColor,
      weakCategories
    })
  },

  retry() {
    wx.redirectTo({
      url: `/pages/quiz-practice/quiz-practice?mode=${this.data.mode}`
    })
  },

  goWrongBook() {
    wx.navigateTo({ url: '/pages/quiz-wrong/quiz-wrong' })
  },

  backToHome() {
    wx.navigateBack({
      delta: 2
    })
  }
})
