// pages/case-list/case-list.js
const casesData = require('../../data/cases.js')

Page({
  data: {
    allCases: [],
    filtered: [],
    activeType: 'control',
    types: [
      { key: 'control', name: '控件案例' },
      { key: 'hardware', name: '硬件案例' },
      { key: 'composite', name: '综合案例' }
    ],
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
    this.setData({ allCases })
    this.applyFilter('control')
  },

  onShow() {
    const app = getApp()
    this.setData({ theme: app.globalData.theme })
  },

  // 切换案例类型筛选
  onTypeChange(e) {
    const type = e.currentTarget.dataset.type
    if (type === this.data.activeType) return
    this.setData({ activeType: type })
    this.applyFilter(type)
  },

  applyFilter(type) {
    const filtered = this.data.allCases.filter(c => c.type === type)
    this.setData({ filtered })
  },

  goToCaseDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/case-detail/case-detail?id=' + id })
  }
})
