// pages/quiz/quiz.js
const quizData = require('../../data/quiz.js')

Page({
  data: {
    categories: quizData.categories,
    totalCount: quizData.questions.length,
    stats: {
      totalAnswered: 0,
      correctCount: 0,
      accuracy: 0,
      wrongCount: 0
    },
    categoryStats: [],
    wrongCount: 0
  },

  onLoad() {
    this.loadStats()
  },

  onShow() {
    this.loadStats()
  },

  loadStats() {
    const stats = wx.getStorageSync('quiz_stats') || {
      totalAnswered: 0,
      correctCount: 0,
      wrongRecords: []
    }
    const accuracy = stats.totalAnswered > 0
      ? Math.round(stats.correctCount / stats.totalAnswered * 100)
      : 0

    // 各知识域统计
    const categoryStats = quizData.categories.map(cat => {
      const catQuestions = quizData.questions.filter(q => q.category === cat.id)
      const answered = catQuestions.filter(q =>
        stats.answeredQuestions && stats.answeredQuestions.includes(q.id)
      ).length
      const correct = catQuestions.filter(q =>
        stats.correctQuestions && stats.correctQuestions.includes(q.id)
      ).length
      return {
        ...cat,
        total: catQuestions.length,
        answered,
        correct,
        rate: answered > 0 ? Math.round(correct / answered * 100) : 0
      }
    })

    this.setData({
      stats: {
        totalAnswered: stats.totalAnswered || 0,
        correctCount: stats.correctCount || 0,
        accuracy,
        wrongCount: (stats.wrongRecords || []).length
      },
      categoryStats,
      wrongCount: (stats.wrongRecords || []).length
    })
  },

  startRandom() {
    wx.navigateTo({ url: '/pages/quiz-practice/quiz-practice?mode=random' })
  },

  startCategory(e) {
    const categoryId = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/quiz-practice/quiz-practice?mode=category&categoryId=' + categoryId })
  },

  goWrongBook() {
    if (this.data.wrongCount === 0) {
      wx.showToast({ title: '暂无错题', icon: 'none' })
      return
    }
    wx.navigateTo({ url: '/pages/quiz-wrong/quiz-wrong' })
  },

  clearStats() {
    wx.showModal({
      title: '确认清除',
      content: '将清除所有答题记录和错题本，不可恢复',
      confirmColor: '#ee0a24',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('quiz_stats')
          wx.showToast({ title: '已清除', icon: 'success' })
          this.loadStats()
        }
      }
    })
  }
})
