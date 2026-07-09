// components/demos/case-demos/case-demos.js
Component({
  properties: {
    caseId: { type: String, value: '' }
  },

  data: {
    // 通用
    activeTab: 0,

    // ===== 案例1: 登录注册 =====
    loginMode: 'login',
    loginUsername: '',
    loginPassword: '',
    loginConfirm: '',
    showPassword: false,
    rememberMe: false,
    loginLoading: false,

    // ===== 案例2: 商品列表 =====
    plTabs: ['全部', '数码', '服饰', '美食', '家居'],
    plActiveTab: 0,
    plLeftList: [],
    plRightList: [],
    plPage: 1,
    plLoadingMore: false,
    plNoMore: false,
    plRefreshing: false,
    cartCount: 0,

    // ===== 案例3: 商品详情 =====
    pdProduct: { name: '2024新款无线降噪耳机 Pro Max', price: '299.00', originalPrice: '499.00', sales: 3280, desc: '主动降噪 | 蓝牙5.3 | 续航40小时' },
    pdBanners: [
      { type: 'image', url: 'https://picsum.photos/750/600?random=10' },
      { type: 'image', url: 'https://picsum.photos/750/600?random=11' },
      { type: 'image', url: 'https://picsum.photos/750/600?random=12' }
    ],
    pdDetailImages: [
      'https://picsum.photos/750/400?random=20',
      'https://picsum.photos/750/500?random=21',
      'https://picsum.photos/750/300?random=22'
    ],
    pdSpecOptions: ['黑色', '白色', '蓝色', '粉色'],
    pdSelectedSpec: '',
    pdSpecVisible: false,
    pdIsFav: false,

    // ===== 案例4: 订单表单 =====
    orderSteps: ['收货信息', '商品信息', '确认提交'],
    orderStep: 0,
    orderSubmitting: false,
    orderDone: false,
    orderProgress: 0,
    orderForm: {
      name: '', phone: '', region: [], address: '',
      productName: '', quantity: 1, rating: 5, remark: ''
    },

    // ===== 案例5: 个人中心 =====
    profileUser: { name: '张三', avatar: 'https://picsum.photos/200/200?random=30', tags: ['VIP会员', '已实名'] },
    profileStats: { orders: 12, coupons: 5, points: 3680 },
    profileSettings1: [
      { key: 'notify', icon: '🔔', label: '消息通知', type: 'switch', value: true },
      { key: 'sound', icon: '🔊', label: '声音提醒', type: 'switch', value: false },
      { key: 'darkMode', icon: '🌙', label: '暗色模式', type: 'switch', value: false }
    ],
    profileSettings2: [
      { key: 'privacy', icon: '🔒', label: '隐私设置', value: '' },
      { key: 'cache', icon: '🗑', label: '清除缓存', value: '1.2MB' },
      { key: 'about', icon: 'ℹ️', label: '关于我们', value: '' }
    ],
    showLogoutModal: false,

    // ===== 综合案例: 扫码点餐 =====
    soTable: 'A12（演示）',
    soGoods: [
      { id: 1, name: '招牌牛肉面', price: 38, count: 0 },
      { id: 2, name: '宫保鸡丁', price: 42, count: 0 },
      { id: 3, name: '清炒时蔬', price: 22, count: 0 },
      { id: 4, name: '酸梅汤', price: 12, count: 0 },
      { id: 5, name: '米饭', price: 3, count: 0 }
    ],
    soCartCount: 0,
    soCartTotal: 0,

    // ===== 综合案例: 附近门店 =====
    nbLocated: false,
    nbStores: [
      { id: 1, name: '海岸城旗舰店', address: '南山区文心五路33号', phone: '075586661234', lat: 22.520, lng: 113.934, distance: '1.2km' },
      { id: 2, name: '科技园店', address: '南山区高新南一道', phone: '075586665678', lat: 22.537, lng: 113.951, distance: '2.5km' },
      { id: 3, name: '万象天地店', address: '南山区深南大道9668号', phone: '075586669999', lat: 22.541, lng: 113.973, distance: '3.1km' }
    ],

    // ===== 设备能力案例: 录音笔记 =====
    vrRecording: false,
    vrStatus: '准备就绪',
    vrList: [],
    vrCounter: 1
  },

  lifetimes: {
    attached() {
      // 初始化需要异步加载的数据
      if (this.data.caseId === 'case-product-list') {
        this.loadProducts()
      }
      if (this.data.caseId === 'case-voice-recorder') {
        this.vrMgr = wx.getRecorderManager()
        this.vrMgr.onStop((res) => {
          const list = this.data.vrList.concat([{
            id: Date.now(),
            src: res.tempFilePath,
            index: this.data.vrCounter,
            duration: Math.max(1, Math.round((res.duration || 0) / 1000)),
            playing: false
          }])
          this.setData({
            vrList: list,
            vrCounter: this.data.vrCounter + 1,
            vrRecording: false,
            vrStatus: '录音完成，点击播放'
          })
        })
        this.vrMgr.onError(() => {
          this.setData({ vrRecording: false, vrStatus: '录音失败（请用真机授权）' })
        })
      }
    }
  },

  methods: {
    // ==================== 案例1: 登录注册 ====================
    onLoginInput(e) {
      const field = e.currentTarget.dataset.field
      this.setData({ [field]: e.detail.value })
    },
    togglePassword() {
      this.setData({ showPassword: !this.data.showPassword })
    },
    toggleRemember() {
      this.setData({ rememberMe: !this.data.rememberMe })
    },
    switchLoginMode() {
      this.setData({ loginMode: this.data.loginMode === 'login' ? 'register' : 'login' })
    },
    validateLogin() {
      const { loginUsername: u, loginPassword: p, loginConfirm: c, loginMode: m } = this.data
      if (!u) return '请输入用户名'
      if (u.length < 3) return '用户名至少3个字符'
      if (!p) return '请输入密码'
      if (p.length < 6) return '密码至少6位'
      if (m === 'register' && p !== c) return '两次密码不一致'
      return null
    },
    onLoginSubmit() {
      const err = this.validateLogin()
      if (err) {
        wx.showToast({ title: err, icon: 'none' })
        return
      }
      this.setData({ loginLoading: true })
      setTimeout(() => {
        this.setData({ loginLoading: false })
        wx.showToast({
          title: this.data.loginMode === 'login' ? '登录成功' : '注册成功',
          icon: 'success'
        })
      }, 1500)
    },

    // ==================== 案例2: 商品列表 ====================
    loadProducts() {
      const names = ['无线耳机', '智能手表', '帆布鞋', '咖啡豆', '香薰灯', '蓝牙音箱', '棉T恤', '坚果礼盒', '收纳盒', '充电宝', '马克杯', '抱枕']
      const images = [
        'https://picsum.photos/300/400?random=1', 'https://picsum.photos/300/350?random=2',
        'https://picsum.photos/300/420?random=3', 'https://picsum.photos/300/380?random=4',
        'https://picsum.photos/300/360?random=5', 'https://picsum.photos/300/400?random=6'
      ]
      const list = []
      for (let i = 0; i < 6; i++) {
        list.push({
          id: this.data.plPage * 100 + i,
          name: names[Math.floor(Math.random() * names.length)],
          price: (Math.random() * 200 + 29).toFixed(2),
          image: images[i % images.length]
        })
      }
      const leftList = [...this.data.plLeftList]
      const rightList = [...this.data.plRightList]
      list.forEach((item, idx) => {
        if (idx % 2 === 0) leftList.push(item)
        else rightList.push(item)
      })
      this.setData({ plLeftList: leftList, plRightList: rightList, plLoadingMore: false })
    },
    onPlTabChange(e) {
      this.setData({
        plActiveTab: Number(e.currentTarget.dataset.idx),
        plLeftList: [], plRightList: [], plPage: 1, plNoMore: false
      })
      this.loadProducts()
    },
    onLoadMore() {
      if (this.data.plLoadingMore || this.data.plNoMore) return
      this.setData({ plLoadingMore: true })
      setTimeout(() => {
        this.setData({ plPage: this.data.plPage + 1 })
        if (this.data.plPage > 3) {
          this.setData({ plNoMore: true, plLoadingMore: false })
          return
        }
        this.loadProducts()
      }, 800)
    },
    onPlRefresh() {
      this.setData({
        plRefreshing: true, plLeftList: [], plRightList: [],
        plPage: 1, plNoMore: false
      })
      setTimeout(() => {
        this.loadProducts()
        this.setData({ plRefreshing: false })
        wx.showToast({ title: '刷新成功', icon: 'success' })
      }, 1000)
    },
    onAddCart() {
      this.setData({ cartCount: this.data.cartCount + 1 })
      wx.vibrateShort({ type: 'light' })
      wx.showToast({ title: '已加入购物车', icon: 'none' })
    },
    onProductTap(e) {
      wx.showToast({ title: '商品ID: ' + e.currentTarget.dataset.id, icon: 'none' })
    },

    // ==================== 案例3: 商品详情 ====================
    showSpecPanel() {
      this.setData({ pdSpecVisible: true })
    },
    hideSpecPanel() {
      this.setData({ pdSpecVisible: false })
    },
    onSelectSpec(e) {
      this.setData({ pdSelectedSpec: e.currentTarget.dataset.spec })
    },
    onConfirmSpec() {
      if (!this.data.pdSelectedSpec) {
        wx.showToast({ title: '请选择规格', icon: 'none' })
        return
      }
      this.setData({ pdSpecVisible: false })
      wx.showToast({ title: '已选: ' + this.data.pdSelectedSpec, icon: 'none' })
    },
    onPdFav() {
      this.setData({ pdIsFav: !this.data.pdIsFav })
      wx.vibrateShort({ type: 'light' })
      wx.showToast({ title: this.data.pdIsFav ? '已收藏' : '已取消', icon: 'none' })
    },
    onPdAddCart() {
      this.showSpecPanel()
    },
    onPdBuy() {
      if (!this.data.pdSelectedSpec) {
        this.showSpecPanel()
        return
      }
      wx.showToast({ title: '正在跳转结算...', icon: 'none' })
    },
    onPdContact() {
      wx.showToast({ title: '客服功能演示', icon: 'none' })
    },

    // ==================== 案例4: 订单表单 ====================
    onOrderInput(e) {
      const field = e.currentTarget.dataset.field
      this.setData({ ['orderForm.' + field]: e.detail.value })
    },
    onRegionChange(e) {
      this.setData({ 'orderForm.region': e.detail.value })
    },
    onQtyPlus() {
      this.setData({ 'orderForm.quantity': this.data.orderForm.quantity + 1 })
    },
    onQtyMinus() {
      if (this.data.orderForm.quantity > 1) {
        this.setData({ 'orderForm.quantity': this.data.orderForm.quantity - 1 })
      }
    },
    onRating(e) {
      this.setData({ 'orderForm.rating': Number(e.currentTarget.dataset.idx) })
    },
    validateOrderStep() {
      const { orderForm: f, orderStep: s } = this.data
      if (s === 0) {
        if (!f.name) return '请输入收货人'
        if (!f.phone || f.phone.length !== 11) return '请输入正确的手机号'
        if (!f.region.length) return '请选择地区'
        if (!f.address) return '请输入详细地址'
      }
      if (s === 1) {
        if (!f.productName) return '请输入商品名称'
      }
      return null
    },
    onOrderNext() {
      const err = this.validateOrderStep()
      if (err) {
        wx.showToast({ title: err, icon: 'none' })
        return
      }
      this.setData({ orderStep: this.data.orderStep + 1 })
    },
    onOrderPrev() {
      this.setData({ orderStep: this.data.orderStep - 1 })
    },
    onOrderSubmit() {
      this.setData({ orderSubmitting: true })
      const timer = setInterval(() => {
        const p = this.data.orderProgress + 10
        if (p >= 100) {
          clearInterval(timer)
          this.setData({ orderProgress: 100, orderDone: true, orderSubmitting: false })
          wx.showToast({ title: '提交成功', icon: 'success' })
        } else {
          this.setData({ orderProgress: p })
        }
      }, 200)
    },

    // ==================== 案例5: 个人中心 ====================
    onProfileSwitch(e) {
      const key = e.currentTarget.dataset.key
      const value = e.detail.value
      const settings = this.data.profileSettings1.map(item =>
        item.key === key ? { ...item, value } : item
      )
      this.setData({ profileSettings1: settings })
      wx.showToast({ title: value ? '已开启' : '已关闭', icon: 'none' })
    },
    onProfileCellTap(e) {
      const key = e.currentTarget.dataset.key
      if (key === 'cache') {
        this.setData({ 'profileSettings2[1].value': '0KB' })
        wx.showToast({ title: '缓存已清除', icon: 'success' })
      } else {
        wx.showToast({ title: '功能演示', icon: 'none' })
      }
    },
    onLogout() {
      this.setData({ showLogoutModal: true })
    },
    closeLogoutModal() {
      this.setData({ showLogoutModal: false })
    },
    confirmLogout() {
      this.setData({ showLogoutModal: false })
      wx.showToast({ title: '已退出登录', icon: 'none' })
    },


    // ==================== 综合案例: 扫码点餐 ====================
    onSoScan() {
      wx.scanCode({
        success: (res) => {
          const table = (res.result || '').trim() || '未知桌号'
          const goods = this.data.soGoods.map(g => {
            const n = Object.assign({}, g); n.count = 0; return n
          })
          this.setData({ soTable: table, soGoods: goods, soCartCount: 0, soCartTotal: 0 })
          wx.showToast({ title: '已扫码：' + table, icon: 'success' })
        },
        fail: () => {
          wx.showToast({ title: '扫码已取消', icon: 'none' })
        }
      })
    },
    onSoPlus(e) { this._soUpdate(e.currentTarget.dataset.id, 1) },
    onSoMinus(e) { this._soUpdate(e.currentTarget.dataset.id, -1) },
    _soUpdate(id, delta) {
      let count = 0, total = 0
      const goods = this.data.soGoods.map(g => {
        if (g.id !== id) return g
        const c = Math.max(0, g.count + delta)
        return Object.assign({}, g, { count: c })
      })
      goods.forEach(g => { count += g.count; total += g.count * g.price })
      this.setData({ soGoods: goods, soCartCount: count, soCartTotal: total })
    },
    onSoSubmit() {
      if (this.data.soCartCount === 0) {
        wx.showToast({ title: '请先选择商品', icon: 'none' })
        return
      }
      wx.showModal({
        title: '下单成功',
        content: '桌号 ' + this.data.soTable + '\n共 ' + this.data.soCartCount + ' 件，合计 ¥' + this.data.soCartTotal,
        showCancel: false,
        success: () => {
          const goods = this.data.soGoods.map(g => Object.assign({}, g, { count: 0 }))
          this.setData({ soGoods: goods, soCartCount: 0, soCartTotal: 0 })
        }
      })
    },

    // ==================== 综合案例: 附近门店 ====================
    onNbLocate() {
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          const stores = this.data.nbStores.map(s => {
            const R = 6371
            const dLat = (s.lat - res.latitude) * Math.PI / 180
            const dLng = (s.lng - res.longitude) * Math.PI / 180
            const a = Math.pow(Math.sin(dLat / 2), 2) +
              Math.cos(res.latitude * Math.PI / 180) * Math.cos(s.lat * Math.PI / 180) *
              Math.pow(Math.sin(dLng / 2), 2)
            const d = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            const dist = d < 1 ? Math.round(d * 1000) + 'm' : d.toFixed(1) + 'km'
            return Object.assign({}, s, { distance: dist })
          }).sort((x, y) => parseFloat(x.distance) - parseFloat(y.distance))
          this.setData({ nbStores: stores, nbLocated: true })
          wx.showToast({ title: '已定位', icon: 'success' })
        },
        fail: () => {
          wx.showToast({ title: '定位失败，展示默认门店', icon: 'none' })
        }
      })
    },
    onNbCall(e) {
      wx.makePhoneCall({ phoneNumber: e.currentTarget.dataset.phone })
    },

    // ==================== 设备能力案例: 录音笔记 ====================
    onVrToggle() {
      if (!this.vrMgr) this.vrMgr = wx.getRecorderManager()
      if (this.data.vrRecording) {
        this.vrMgr.stop()
      } else {
        this.vrMgr.start({ duration: 60000, format: 'mp3' })
        this.setData({ vrRecording: true, vrStatus: '录音中...' })
      }
    },
    onVrPlay(e) {
      const src = e.currentTarget.dataset.src
      if (this.vrAudio) { this.vrAudio.destroy(); this.vrAudio = null }
      const list = this.data.vrList.map(i => Object.assign({}, i, { playing: i.src === src }))
      this.setData({ vrList: list })
      const audio = wx.createInnerAudioContext()
      audio.src = src
      audio.obeyMuteSwitch = false
      audio.onEnded(() => {
        this.setData({ vrList: this.data.vrList.map(i => Object.assign({}, i, { playing: false })) })
      })
      audio.play()
      this.vrAudio = audio
    },
    onVrDelete(e) {
      const id = e.currentTarget.dataset.id
      this.setData({ vrList: this.data.vrList.filter(i => i.id !== id) })
    }
  }
})
