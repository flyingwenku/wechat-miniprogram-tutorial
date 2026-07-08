// components/demos/progress-demos/progress-demos.js
Component({
  properties: {
    controlId: { type: String, value: '' }
  },
  data: {
    percent: 30,
    steps: ['填写信息', '验证身份', '设置密码', '完成'],
    currentStep: 2,
    vSteps: ['提交申请', '审核中', '审核通过', '发放贷款'],
    vCurrent: 1,
    loading: true,
    skeletonLoading: true
  },

  lifetimes: {
    attached() {
      if (this.data.controlId === 'progress-circle') {
        this.drawCircle()
      }
      if (this.data.controlId === 'progress-skeleton') {
        setTimeout(() => {
          this.setData({ skeletonLoading: false })
        }, 2500)
      }
    }
  },

  observers: {
    'controlId': function(val) {
      if (val === 'progress-circle') {
        setTimeout(() => this.drawCircle(), 100)
      }
      if (val === 'progress-skeleton') {
        this.setData({ skeletonLoading: true })
        setTimeout(() => {
          this.setData({ skeletonLoading: false })
        }, 2500)
      }
    }
  },

  methods: {
    increase() {
      this.setData({ percent: Math.min(100, this.data.percent + 10) })
      if (this.data.controlId === 'progress-circle') {
        this.drawCircle()
      }
    },
    decrease() {
      this.setData({ percent: Math.max(0, this.data.percent - 10) })
      if (this.data.controlId === 'progress-circle') {
        this.drawCircle()
      }
    },
    nextStep() {
      this.setData({ currentStep: Math.min(this.data.steps.length - 1, this.data.currentStep + 1) })
    },
    prevStep() {
      this.setData({ currentStep: Math.max(0, this.data.currentStep - 1) })
    },
    reload() {
      this.setData({ skeletonLoading: true })
      setTimeout(() => {
        this.setData({ skeletonLoading: false })
      }, 2500)
    },
    drawCircle() {
      const query = this.createSelectorQuery()
      query.select('#circleCanvas')
        .fields({ node: true, size: true })
        .exec(res => {
          if (!res[0]) return
          const canvas = res[0].node
          if (!canvas) return
          const ctx = canvas.getContext('2d')
          const dpr = wx.getWindowInfo().pixelRatio
          canvas.width = res[0].width * dpr
          canvas.height = res[0].height * dpr
          ctx.scale(dpr, dpr)

          const cx = res[0].width / 2
          const cy = res[0].height / 2
          const radius = Math.min(cx, cy) - 12

          ctx.clearRect(0, 0, res[0].width, res[0].height)

          // 背景圆
          ctx.beginPath()
          ctx.arc(cx, cy, radius, 0, 2 * Math.PI)
          ctx.strokeStyle = '#E8E8E8'
          ctx.lineWidth = 10
          ctx.stroke()

          // 进度圆
          const percent = this.data.percent
          if (percent > 0) {
            ctx.beginPath()
            ctx.arc(cx, cy, radius, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * percent / 100)
            ctx.strokeStyle = '#4C8BF5'
            ctx.lineWidth = 10
            ctx.lineCap = 'round'
            ctx.stroke()
          }
        })
    }
  }
})
