// pages/case-list/case-list.js
const casesData = require('../../data/cases.js')

Page({
  data: {
    allCases: [],
    filtered: [],
    theme: 'light'
  },

  onLoad() {
    const allCases = casesData.cases.map(c => ({
      id: c.id,
      name: c.name,
      icon: c.icon,
      color: c.color,
      desc: c.desc,
      tags: c.tags,
      type: c.type || 'control'
    }))
    this.setData({ allCases, filtered: allCases })
  },

  onShow() {
    const app = getApp()
    this.setData({ theme: app.globalData.theme })
  },

  goToCaseDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/case-detail/case-detail?id=' + id })
  }
})
