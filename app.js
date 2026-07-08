// app.js
App({
  globalData: {
    theme: 'light',        // 主题：light / dark
    hardwareMode: 'simulate', // 硬件演示模式：simulate 模拟 / real 真机
    favorites: [],          // 收藏的控件 id 列表
    history: [],            // 浏览历史 [{id, name, category, time}]
    statusBarHeight: 0,     // 状态栏高度
    navBarHeight: 0,        // 导航栏总高度
    menuButton: null        // 胶囊按钮信息
  },

  onLaunch() {
    try {
      // 获取系统信息（兼容新旧 API）
      const sysInfo = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
      const menuButton = wx.getMenuButtonBoundingClientRect()

      this.globalData.statusBarHeight = sysInfo.statusBarHeight || 20
      this.globalData.navBarHeight = menuButton.bottom + (menuButton.top - sysInfo.statusBarHeight) * 2
      this.globalData.menuButton = menuButton

      // 加载本地存储
      this.loadStorage()
    } catch (e) {
      console.error('onLaunch error:', e)
    }
  },

  // 从本地存储加载数据
  loadStorage() {
    try {
      const theme = wx.getStorageSync('theme')
      if (theme) this.globalData.theme = theme

      const hardwareMode = wx.getStorageSync('hardwareMode')
      if (hardwareMode) this.globalData.hardwareMode = hardwareMode

      const favorites = wx.getStorageSync('favorites')
      if (favorites) this.globalData.favorites = favorites

      const history = wx.getStorageSync('history')
      if (history) this.globalData.history = history
    } catch (e) {
      console.error('loadStorage error:', e)
    }
  },

  // 切换主题
  toggleTheme() {
    this.globalData.theme = this.globalData.theme === 'light' ? 'dark' : 'light'
    wx.setStorageSync('theme', this.globalData.theme)
    return this.globalData.theme
  },

  // 设置硬件演示模式：simulate 模拟 / real 真机
  setHardwareMode(mode) {
    this.globalData.hardwareMode = mode
    wx.setStorageSync('hardwareMode', mode)
    return mode
  },

  // 获取硬件演示模式（默认 simulate）
  getHardwareMode() {
    return this.globalData.hardwareMode || 'simulate'
  },

  // 收藏 / 取消收藏
  toggleFavorite(controlId) {
    const idx = this.globalData.favorites.indexOf(controlId)
    if (idx > -1) {
      this.globalData.favorites.splice(idx, 1)
    } else {
      this.globalData.favorites.push(controlId)
    }
    wx.setStorageSync('favorites', this.globalData.favorites)
    return idx === -1 // 返回 true 表示新增收藏
  },

  // 检查是否已收藏
  isFavorite(controlId) {
    return this.globalData.favorites.includes(controlId)
  },

  // 添加浏览历史
  addHistory(control) {
    // 去重：如果已存在先移除
    this.globalData.history = this.globalData.history.filter(h => h.id !== control.id)
    // 添加到头部
    this.globalData.history.unshift({
      id: control.id,
      name: control.name,
      category: control.category,
      time: Date.now()
    })
    // 限制最多 50 条
    if (this.globalData.history.length > 50) {
      this.globalData.history = this.globalData.history.slice(0, 50)
    }
    wx.setStorageSync('history', this.globalData.history)
  },

  // 清空浏览历史
  clearHistory() {
    this.globalData.history = []
    wx.removeStorageSync('history')
  }
})
