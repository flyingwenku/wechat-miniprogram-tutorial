// components/demos/display-demos/display-demos.js
Component({
  properties: {
    controlId: { type: String, value: '' }
  },
  data: {
    longText: '微信小程序（Mini Program）是一种不需要下载安装即可使用的应用，它实现了应用"触手可及"的梦想，用户扫一扫或搜一下即可打开应用。小程序可以在微信内被便捷地获取和传播，同时具有出色的使用体验。小程序不仅提供了丰富的 API 接口，还支持自定义组件、插件等高级功能，让开发者可以快速构建出功能完善的应用。小程序的开发使用了类似 Web 的技术栈，包括 WXML（类似 HTML）、WXSS（类似 CSS）和 JavaScript，开发者可以快速上手。',
    expanded: false,
    htmlContent: '<div style="padding:20rpx;"><h1 style="color:#4C8BF5;font-size:36rpx;">富文本标题</h1><p style="color:#666;font-size:28rpx;line-height:1.6;">这是一段<strong style="color:#FF3B30;">富文本</strong>内容，支持<em style="color:#FF9500;">斜体</em>、<span style="text-decoration:underline;">下划线</span>等样式。</p><p style="color:#999;font-size:24rpx;margin-top:16rpx;">富文本组件可以渲染 HTML 字符串，适合展示文章详情。</p></div>',
    codeLines: [
      'function greet(name) {',
      '  return `Hello, ${name}!`;',
      '}',
      '',
      'const message = greet("World");',
      'console.log(message);',
      '// Output: Hello, World!'
    ],
    copied: false,
    singleImg: 'https://picsum.photos/400/300',
    gridImages: [
      'https://picsum.photos/200/201',
      'https://picsum.photos/200/202',
      'https://picsum.photos/200/203',
      'https://picsum.photos/200/204',
      'https://picsum.photos/200/205',
      'https://picsum.photos/200/206'
    ],
    lazyImages: [],
    banners: [
      'https://picsum.photos/750/400?banner1',
      'https://picsum.photos/750/400?banner2',
      'https://picsum.photos/750/400?banner3'
    ],
    swiperCurrent: 0,
    leftCol: [],
    rightCol: [],
    videoSrc: 'https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a3208034&ocid=2279',
    danmuList: [
      { text: '这条视频真不错', color: '#FF3B30', time: 1 },
      { text: '学到了很多', color: '#4C8BF5', time: 3 },
      { text: '感谢分享', color: '#34C759', time: 5 },
      { text: '收藏了', color: '#FF9500', time: 7 }
    ],
    danmuText: '',
    videoList: [
      { id: 1, title: '小程序入门教程', views: '1.2万', poster: 'https://picsum.photos/300/200?v1' },
      { id: 2, title: '组件详解', views: '8563', poster: 'https://picsum.photos/300/200?v2' },
      { id: 3, title: '实战项目', views: '2.3万', poster: 'https://picsum.photos/300/200?v3' }
    ],
    icons: [
      { name: '首页', glyph: '🏠' }, { name: '搜索', glyph: '🔍' },
      { name: '收藏', glyph: '⭐' }, { name: '消息', glyph: '💬' },
      { name: '设置', glyph: '⚙️' }, { name: '用户', glyph: '👤' },
      { name: '相机', glyph: '📷' }, { name: '音乐', glyph: '🎵' },
      { name: '视频', glyph: '🎬' }, { name: '位置', glyph: '📍' },
      { name: '电话', glyph: '📞' }, { name: '邮件', glyph: '✉️' }
    ],
    cardImg: 'https://picsum.photos/400/200?card',
    userList: [
      { id: 1, name: '张三', desc: '前端开发工程师', avatar: 'https://i.pravatar.cc/100?1', followed: false },
      { id: 2, name: '李四', desc: 'UI/UX 设计师', avatar: 'https://i.pravatar.cc/100?2', followed: true },
      { id: 3, name: '王五', desc: '产品经理', avatar: 'https://i.pravatar.cc/100?3', followed: false }
    ]
  },

  lifetimes: {
    attached() {
      // 初始化懒加载图片
      const lazyImages = Array.from({ length: 10 }, (_, i) =>
        `https://picsum.photos/300/200?lazy${i}`
      )
      this.setData({ lazyImages })

      // 初始化瀑布流
      const items = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        title: '内容 ' + (i + 1),
        img: `https://picsum.photos/300/${280 + (i % 3) * 80}?wf${i}`
      }))
      const left = [], right = []
      items.forEach((item, i) => {
        if (i % 2 === 0) left.push(item)
        else right.push(item)
      })
      this.setData({ leftCol: left, rightCol: right })
    }
  },

  methods: {
    toggle() {
      this.setData({ expanded: !this.data.expanded })
    },
    copyCode() {
      wx.setClipboardData({
        data: this.data.codeLines.join('\n'),
        success: () => {
          this.setData({ copied: true })
          setTimeout(() => this.setData({ copied: false }), 2000)
        }
      })
    },
    previewSingle() {
      wx.previewImage({
        current: this.data.singleImg,
        urls: [this.data.singleImg]
      })
    },
    previewGrid(e) {
      const index = e.currentTarget.dataset.index
      wx.previewImage({
        current: this.data.gridImages[index],
        urls: this.data.gridImages
      })
    },
    onSwiperChange(e) {
      this.setData({ swiperCurrent: e.detail.current })
    },
    onDanmuInput(e) {
      this.setData({ danmuText: e.detail.value })
    },
    sendDanmu() {
      if (!this.data.danmuText.trim()) return
      this.videoCtx.sendDanmu({
        text: this.data.danmuText,
        color: '#4C8BF5'
      })
      this.setData({ danmuText: '' })
    },
    enterFullScreen() {
      this.videoCtx.requestFullScreen({ direction: 90 })
    },
    exitFullScreen() {
      this.videoCtx.exitFullScreen()
    },
    onActionTap(e) {
      const id = e.currentTarget.dataset.id
      const list = this.data.userList.map(u => {
        if (u.id === id) u.followed = !u.followed
        return u
      })
      this.setData({ userList: list })
      wx.vibrateShort({ type: 'light' })
    }
  },

  observers: {
    'controlId': function(val) {
      if (val === 'display-video-danmaku' || val === 'display-video-fullscreen') {
        setTimeout(() => {
          this.videoCtx = wx.createVideoContext(this.data.controlId === 'display-video-danmaku' ? 'danmuVideo' : 'fullVideo', this)
        }, 200)
      }
    }
  }
})
