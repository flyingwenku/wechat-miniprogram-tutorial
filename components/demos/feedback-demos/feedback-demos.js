// components/demos/feedback-demos/feedback-demos.js
Component({
  properties: {
    controlId: { type: String, value: '' }
  },
  data: {
    showBanner: false,
    bannerType: 'success',
    bannerText: '',
    bannerIcon: ''
  },
  methods: {
    showModal() {
      wx.showModal({
        title: '确认操作',
        content: '确定要删除这条内容吗？此操作不可撤销。',
        confirmText: '删除',
        confirmColor: '#FF3B30',
        cancelText: '取消',
        success(res) {
          if (res.confirm) {
            wx.showToast({ title: '已删除', icon: 'success' })
          }
        }
      })
    },
    showModalNoCancel() {
      wx.showModal({
        title: '提示',
        content: '这是一个没有取消按钮的对话框。',
        showCancel: false,
        confirmText: '知道了',
        confirmColor: '#4C8BF5'
      })
    },
    showSuccess() {
      wx.showToast({ title: '操作成功', icon: 'success' })
    },
    showError() {
      wx.showToast({ title: '操作失败', icon: 'error' })
    },
    showLoadingToast() {
      wx.showToast({ title: '加载中...', icon: 'loading', duration: 2000 })
    },
    showTextToast() {
      wx.showToast({ title: '这是一条纯文字提示', icon: 'none' })
    },
    showAction() {
      wx.showActionSheet({
        itemList: ['保存到相册', '转发给好友', '设为手机壁纸', '复制链接'],
        itemColor: '#333333',
        success(res) {
          const actions = ['已保存到相册', '已转发', '已设为壁纸', '已复制链接']
          wx.showToast({ title: actions[res.tapIndex], icon: 'success' })
        },
        fail() {
          console.log('用户取消')
        }
      })
    },
    showLoading() {
      wx.showLoading({ title: '数据加载中...', mask: true })
      setTimeout(() => {
        wx.hideLoading()
        wx.showToast({ title: '加载完成', icon: 'success' })
      }, 2000)
    },
    showBanner(e) {
      const type = e.currentTarget.dataset.type
      const config = {
        success: { text: '操作成功完成！', icon: '✓' },
        error: { text: '操作失败，请重试', icon: '✕' },
        warning: { text: '请注意，此操作有风险', icon: '!' },
        info: { text: '这是一条信息提示', icon: 'i' }
      }
      const cfg = config[type]
      this.setData({
        showBanner: true,
        bannerType: type,
        bannerText: cfg.text,
        bannerIcon: cfg.icon
      })
      setTimeout(() => {
        this.setData({ showBanner: false })
      }, 2500)
    }
  }
})
