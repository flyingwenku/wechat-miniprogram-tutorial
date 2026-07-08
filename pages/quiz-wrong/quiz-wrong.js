// pages/quiz-wrong/quiz-wrong.js
const quizData = require('../../data/quiz.js')

Page({
  data: {
    wrongQuestions: [],
    total: 0
  },

  onLoad() {
    this.loadWrongQuestions()
  },

  onShow() {
    this.loadWrongQuestions()
  },

  loadWrongQuestions() {
    const stats = wx.getStorageSync('quiz_stats') || {}
    const wrongIds = stats.wrongRecords || []

    const wrongQuestions = wrongIds.map(qid => {
      return quizData.questions.find(q => q.id === qid)
    }).filter(Boolean)

    this.setData({
      wrongQuestions,
      total: wrongQuestions.length
    })
  },

  practiceWrong() {
    if (this.data.total === 0) return
    // 用错题 ID 构建自定义练习
    const wrongIds = this.data.wrongQuestions.map(q => q.id).join(',')
    wx.navigateTo({
      url: `/pages/quiz-practice/quiz-practice?mode=wrong&ids=${wrongIds}`
    })
  },

  removeWrong(e) {
    const qid = e.currentTarget.dataset.id
    wx.showModal({
      title: '移出错题本',
      content: '确定将此题移出错题本？',
      success: (res) => {
        if (res.confirm) {
          const stats = wx.getStorageSync('quiz_stats') || {}
          if (stats.wrongRecords) {
            stats.wrongRecords = stats.wrongRecords.filter(id => id !== qid)
            wx.setStorageSync('quiz_stats', stats)
            this.loadWrongQuestions()
            wx.showToast({ title: '已移出', icon: 'success' })
          }
        }
      }
    })
  },

  clearAll() {
    wx.showModal({
      title: '清空错题本',
      content: '将清空所有错题记录，不可恢复',
      confirmColor: '#ee0a24',
      success: (res) => {
        if (res.confirm) {
          const stats = wx.getStorageSync('quiz_stats') || {}
          stats.wrongRecords = []
          wx.setStorageSync('quiz_stats', stats)
          this.loadWrongQuestions()
          wx.showToast({ title: '已清空', icon: 'success' })
        }
      }
    })
  }
})
