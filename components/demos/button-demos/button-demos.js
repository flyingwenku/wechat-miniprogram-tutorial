// components/demos/button-demos/button-demos.js
Component({
  properties: {
    controlId: { type: String, value: '' }
  },
  data: {
    loading: false,
    fabVisible: true,
    tapCount: 0
  },
  methods: {
    onTap() {
      this.setData({ tapCount: this.data.tapCount + 1 })
      wx.vibrateShort({ type: 'light' })
    },
    onSubmit() {
      if (this.data.loading) return
      this.setData({ loading: true })
      setTimeout(() => {
        this.setData({ loading: false })
        wx.showToast({ title: '提交成功', icon: 'success' })
      }, 2000)
    },
    onFabTap() {
      wx.showToast({ title: 'FAB 点击', icon: 'none' })
    }
  }
})
