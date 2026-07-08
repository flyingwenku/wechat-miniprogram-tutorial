// pages/case-detail/case-detail.js
const casesData = require('../../data/cases.js')

Page({
  data: {
    caseData: null,
    activeTab: 0,
    theme: 'light'
  },

  onLoad(options) {
    const id = options.id
    const caseData = casesData.cases.find(c => c.id === id)
    if (caseData) {
      this.setData({ caseData })
      wx.setNavigationBarTitle({ title: caseData.name })
    }
  },

  onShow() {
    const app = getApp()
    this.setData({ theme: app.globalData.theme })
  },

  onTabChange(e) {
    this.setData({ activeTab: Number(e.currentTarget.dataset.tab) })
  },

  onShareAppMessage() {
    return {
      title: this.data.caseData.name + ' - 实战案例',
      path: '/pages/case-detail/case-detail?id=' + this.data.caseData.id
    }
  }
})
