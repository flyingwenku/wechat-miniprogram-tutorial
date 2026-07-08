// data/controls.js
// 所有控件元数据 — 每个控件包含：id, name, category, desc, props, code{wxml,js}, tips

module.exports = {
  categories: [
    {
      id: 'button',
      name: '按钮',
      icon: '🔘',
      color: '#4C8BF5',
      description: '各类按钮控件：基础、图文、禁用、加载态、自定义样式、悬浮按钮',
      controls: [
        {
          id: 'button-basic',
          name: '基础按钮',
          desc: '微信小程序原生 button 的三种类型与尺寸',
          props: [
            { name: 'type', type: 'string', default: "'default'", desc: '按钮样式：default / primary / warn' },
            { name: 'size', type: 'string', default: "'default'", desc: '按钮大小：default / mini' },
            { name: 'plain', type: 'boolean', default: 'false', desc: '是否镂空，背景透明' },
            { name: 'disabled', type: 'boolean', default: 'false', desc: '是否禁用' },
            { name: 'loading', type: 'boolean', default: 'false', desc: '名称前是否带 loading 图标' },
            { name: 'bindtap', type: 'event', default: '—', desc: '点击事件' }
          ],
          code: {
            wxml: '<button type="default">默认按钮</button>\n<button type="primary">主要按钮</button>\n<button type="warn">警告按钮</button>\n<button type="primary" size="mini">迷你按钮</button>\n<button type="primary" plain>镂空按钮</button>',
            js: "Page({\n  onTap(e) {\n    console.log('按钮点击', e)\n  }\n})"
          },
          tips: '1. primary 类型默认绿色背景，warn 为红色\n2. plain=true 时背景透明，只显示边框\n3. button 组件自带 1px 边框，可用 ::after 伪元素覆盖去除'
        },
        {
          id: 'button-image',
          name: '图文按钮',
          desc: '图标 + 文字组合的自定义按钮',
          props: [
            { name: '自定义', type: '—', default: '—', desc: '通过 view + image + text 自行组合实现' }
          ],
          code: {
            wxml: '<view class="img-btn" bindtap="onTap">\n  <image src="/images/icon-edit.png" class="btn-icon"/>\n  <text class="btn-text">编辑</text>\n</view>\n\n<view class="img-btn primary">\n  <image src="/images/icon-add.png" class="btn-icon"/>\n  <text class="btn-text">添加</text>\n</view>',
            js: "Page({\n  onTap() {\n    wx.vibrateShort({ type: 'light' })\n  }\n})"
          },
          tips: '1. 图文按钮需自定义实现，原生 button 不支持图标\n2. 图标建议使用 PNG 或 SVG base64\n3. 可用 hover-class 实现点击反馈效果'
        },
        {
          id: 'button-disabled',
          name: '禁用按钮',
          desc: '禁用状态按钮，不可点击',
          props: [
            { name: 'disabled', type: 'boolean', default: 'false', desc: '设置为 true 即禁用' },
            { name: 'disabled-class', type: 'string', default: '—', desc: '自定义禁用样式（通过 class 控制）' }
          ],
          code: {
            wxml: '<button type="primary" disabled>禁用按钮</button>\n\n<view class="custom-btn {{disabled ? \'disabled\' : \'\'}}"\n  bindtap="{{disabled ? \'\' : \'onTap\'}}">\n  自定义禁用\n</view>',
            js: "Page({\n  data: { disabled: true },\n  onTap() {\n    if (this.data.disabled) return\n    console.log('clicked')\n  }\n})"
          },
          tips: '1. 原生 button 设置 disabled 即可\n2. 自定义按钮通过条件 class 和条件事件实现\n3. 禁用状态建议降低透明度至 0.4-0.5'
        },
        {
          id: 'button-loading',
          name: '加载按钮',
          desc: '带加载动画的按钮，防止重复提交',
          props: [
            { name: 'loading', type: 'boolean', default: 'false', desc: '是否显示 loading 图标' },
            { name: 'loadingText', type: 'string', default: "''", desc: '加载时显示的文字' }
          ],
          code: {
            wxml: '<button type="primary" loading="{{loading}}"\n  disabled="{{loading}}"\n  bindtap="onSubmit">\n  {{loading ? \'提交中...\' : \'提交\'}}\n</button>',
            js: "Page({\n  data: { loading: false },\n  onSubmit() {\n    if (this.data.loading) return\n    this.setData({ loading: true })\n    // 模拟异步请求\n    setTimeout(() => {\n      this.setData({ loading: false })\n      wx.showToast({ title: '提交成功' })\n    }, 2000)\n  }\n})"
          },
          tips: '1. loading=true 时按钮前会出现旋转图标\n2. 同时设置 disabled 防止重复点击\n3. 建议加载时替换按钮文字为"提交中..."'
        },
        {
          id: 'button-custom',
          name: '自定义样式按钮',
          desc: '渐变背景、圆角、阴影等自定义样式',
          props: [
            { name: '自定义', type: '—', default: '—', desc: '通过 WXSS 完全自定义按钮外观' }
          ],
          code: {
            wxml: '<view class="gradient-btn" bindtap="onTap">渐变按钮</view>\n<view class="shadow-btn" bindtap="onTap">阴影按钮</view>\n<view class="outline-btn" bindtap="onTap">描边按钮</view>',
            js: 'Page({\n  onTap() {\n    wx.vibrateShort({ type: "light" })\n  }\n})',
            wxss: '.gradient-btn {\n  background: linear-gradient(135deg, #667eea, #764ba2);\n  color: #fff;\n  border-radius: 48rpx;\n  padding: 24rpx 0;\n  text-align: center;\n}\n.shadow-btn {\n  background: #4C8BF5;\n  color: #fff;\n  border-radius: 16rpx;\n  padding: 24rpx 0;\n  text-align: center;\n  box-shadow: 0 8rpx 24rpx rgba(76,139,245,0.4);\n}'
          },
          tips: '1. 渐变用 linear-gradient 实现\n2. 阴影用 box-shadow，注意 rgba 透明度\n3. 去除原生 button 边框：button::after { border: none }'
        },
        {
          id: 'button-fab',
          name: '悬浮按钮 FAB',
          desc: '固定在页面边缘的悬浮操作按钮',
          props: [
            { name: 'position', type: 'string', default: "'fixed'", desc: '定位方式' },
            { name: '自定义', type: '—', default: '—', desc: '通过 fixed 定位 + 圆形样式实现' }
          ],
          code: {
            wxml: '<view class="fab" bindtap="onFabTap">\n  <text class="fab-icon">+</text>\n</view>',
            js: 'Page({\n  onFabTap() {\n    wx.showToast({ title: "FAB点击" })\n  }\n})',
            wxss: '.fab {\n  position: fixed;\n  right: 40rpx;\n  bottom: 120rpx;\n  width: 100rpx;\n  height: 100rpx;\n  border-radius: 50%;\n  background: #4C8BF5;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 8rpx 24rpx rgba(76,139,245,0.5);\n  z-index: 999;\n}'
          },
          tips: '1. 使用 position: fixed 固定在屏幕边缘\n2. bottom 需要留出 tabBar 高度\n3. 可加动画实现点击缩放效果'
        }
      ]
    },
    {
      id: 'form',
      name: '表单',
      icon: '📝',
      color: '#FF9500',
      description: '单选、复选、开关、滑块、输入框、文本域、选择器、评分',
      controls: [
        {
          id: 'form-radio',
          name: '单选框',
          desc: 'radio-group 实现单选',
          props: [
            { name: 'value', type: 'string', default: "''", desc: 'radio 的值' },
            { name: 'checked', type: 'boolean', default: 'false', desc: '当前是否选中' },
            { name: 'color', type: 'string', default: "'#1AAD19'", desc: '选中时的颜色' },
            { name: 'bindchange', type: 'event', default: '—', desc: '选中项变化事件' }
          ],
          code: {
            wxml: '<radio-group bindchange="onRadioChange">\n  <label class="radio-item">\n    <radio value="A" checked="{{true}}"/>\n    <text>选项A</text>\n  </label>\n  <label class="radio-item">\n    <radio value="B"/>\n    <text>选项B</text>\n  </label>\n  <label class="radio-item">\n    <radio value="C"/>\n    <text>选项C</text>\n  </label>\n</radio-group>',
            js: "Page({\n  data: { radioValue: 'A' },\n  onRadioChange(e) {\n    this.setData({ radioValue: e.detail.value })\n  }\n})"
          },
          tips: '1. radio 必须放在 radio-group 内使用\n2. 通过 label 包裹实现点击文字也可选中\n3. bindchange 返回 e.detail.value 为选中项的 value'
        },
        {
          id: 'form-checkbox',
          name: '复选框',
          desc: 'checkbox-group 实现多选',
          props: [
            { name: 'value', type: 'string', default: "''", desc: 'checkbox 的值' },
            { name: 'checked', type: 'boolean', default: 'false', desc: '是否选中' },
            { name: 'color', type: 'string', default: "'#1AAD19'", desc: '选中颜色' },
            { name: 'bindchange', type: 'event', default: '—', desc: '选中项变化事件' }
          ],
          code: {
            wxml: '<checkbox-group bindchange="onCheckboxChange">\n  <label class="check-item">\n    <checkbox value="apple" checked="{{true}}"/>\n    <text>苹果</text>\n  </label>\n  <label class="check-item">\n    <checkbox value="banana"/>\n    <text>香蕉</text>\n  </label>\n  <label class="check-item">\n    <checkbox value="orange"/>\n    <text>橙子</text>\n  </label>\n</checkbox-group>',
            js: "Page({\n  data: { checkedValues: ['apple'] },\n  onCheckboxChange(e) {\n    this.setData({ checkedValues: e.detail.value })\n  }\n})"
          },
          tips: '1. checkbox 必须放在 checkbox-group 内使用\n2. e.detail.value 返回选中项 value 数组\n3. 可配合 label 实现更好的点击体验'
        },
        {
          id: 'form-switch',
          name: '开关',
          desc: 'switch 开关组件',
          props: [
            { name: 'checked', type: 'boolean', default: 'false', desc: '是否选中' },
            { name: 'color', type: 'string', default: "'#1AAD19'", desc: '选中时的背景色' },
            { name: 'type', type: 'string', default: "'switch'", desc: '样式：switch / checkbox' },
            { name: 'bindchange', type: 'event', default: '—', desc: '开关变化事件' }
          ],
          code: {
            wxml: '<view class="switch-row">\n  <text>通知推送</text>\n  <switch checked="{{notify}}" color="#4C8BF5"\n    bindchange="onSwitchChange"/>\n</view>',
            js: "Page({\n  data: { notify: true },\n  onSwitchChange(e) {\n    this.setData({ notify: e.detail.value })\n  }\n})"
          },
          tips: '1. color 属性控制选中时的背景色\n2. type="checkbox" 时显示为复选框样式\n3. e.detail.value 返回布尔值'
        },
        {
          id: 'form-slider',
          name: '滑块',
          desc: 'slider 滑动选择器，带实时数值显示',
          props: [
            { name: 'min', type: 'number', default: '0', desc: '最小值' },
            { name: 'max', type: 'number', default: '100', desc: '最大值' },
            { name: 'step', type: 'number', default: '1', desc: '步长' },
            { name: 'value', type: 'number', default: '0', desc: '当前值' },
            { name: 'show-value', type: 'boolean', default: 'false', desc: '是否显示当前值' },
            { name: 'activeColor', type: 'string', default: "'#1AAD19'", desc: '已选择颜色' },
            { name: 'bindchange', type: 'event', default: '—', desc: '完成拖动后触发' },
            { name: 'bindchanging', type: 'event', default: '—', desc: '拖动过程中触发' }
          ],
          code: {
            wxml: '<view class="slider-demo">\n  <text>音量：{{volume}}</text>\n  <slider min="0" max="100" step="1" value="{{volume}}"\n    activeColor="#4C8BF5"\n    bindchange="onSliderChange"\n    bindchanging="onSliderChanging"/>\n</view>',
            js: "Page({\n  data: { volume: 50 },\n  onSliderChange(e) {\n    this.setData({ volume: e.detail.value })\n  },\n  onSliderChanging(e) {\n    this.setData({ volume: e.detail.value })\n  }\n})"
          },
          tips: '1. bindchanging 实时触发，bindchange 松手后触发\n2. 实时显示数值用 bindchanging\n3. step 设置步长，如 step="10" 只能选 0,10,20...'
        },
        {
          id: 'form-input',
          name: '输入框',
          desc: 'input 文本输入，支持多种类型',
          props: [
            { name: 'type', type: 'string', default: "'text'", desc: '类型：text/number/idcard/digit/safe-password/nickname' },
            { name: 'placeholder', type: 'string', default: "''", desc: '占位提示文字' },
            { name: 'maxlength', type: 'number', default: '140', desc: '最大输入长度，-1 不限' },
            { name: 'password', type: 'boolean', default: 'false', desc: '是否密码类型' },
            { name: 'focus', type: 'boolean', default: 'false', desc: '是否自动聚焦' },
            { name: 'bindinput', type: 'event', default: '—', desc: '输入时触发' },
            { name: 'bindconfirm', type: 'event', default: '—', desc: '点击完成按钮时触发' }
          ],
          code: {
            wxml: '<input class="input-field"\n  type="text"\n  placeholder="请输入用户名"\n  value="{{username}}"\n  bindinput="onInput"/>\n\n<input class="input-field"\n  type="number"\n  placeholder="请输入手机号"\n  maxlength="11"\n  bindinput="onPhoneInput"/>\n\n<input class="input-field"\n  password\n  placeholder="请输入密码"\n  bindinput="onPwdInput"/>',
            js: "Page({\n  data: { username: '', phone: '', password: '' },\n  onInput(e) { this.setData({ username: e.detail.value }) },\n  onPhoneInput(e) { this.setData({ phone: e.detail.value }) },\n  onPwdInput(e) { this.setData({ password: e.detail.value }) }\n})"
          },
          tips: '1. type="number" 只能输入数字\n2. type="idcard" 支持输入身份证（含 X）\n3. password=true 时输入内容显示为圆点\n4. bindinput 的 e.detail.value 是实时输入值'
        },
        {
          id: 'form-textarea',
          name: '文本域',
          desc: 'textarea 多行文本输入',
          props: [
            { name: 'value', type: 'string', default: "''", desc: '输入框的内容' },
            { name: 'placeholder', type: 'string', default: "''", desc: '占位文字' },
            { name: 'maxlength', type: 'number', default: '140', desc: '最大字符数' },
            { name: 'auto-height', type: 'boolean', default: 'false', desc: '是否自动增高' },
            { name: 'show-confirm-bar', type: 'boolean', default: 'true', desc: '是否显示完成栏' },
            { name: 'bindinput', type: 'event', default: '—', desc: '输入时触发' }
          ],
          code: {
            wxml: '<textarea class="textarea-field"\n  placeholder="请输入内容..."\n  maxlength="200"\n  auto-height\n  value="{{content}}"\n  bindinput="onInput"/>\n<text class="char-count">{{content.length}}/200</text>',
            js: "Page({\n  data: { content: '' },\n  onInput(e) {\n    this.setData({ content: e.detail.value })\n  }\n})"
          },
          tips: '1. auto-height=true 时输入框随内容自动增高\n2. 建议配合字数统计显示\n3. textarea 在某些机型有层级问题，注意 z-index'
        },
        {
          id: 'form-picker-date',
          name: '日期选择器',
          desc: 'picker 日期模式',
          props: [
            { name: 'mode', type: 'string', default: "'selector'", desc: '选择器类型：selector/date/time/region' },
            { name: 'value', type: 'string', default: "''", desc: '当前选中值' },
            { name: 'start', type: 'string', default: '—', desc: '开始日期/时间' },
            { name: 'end', type: 'string', default: '—', desc: '结束日期/时间' },
            { name: 'bindchange', type: 'event', default: '—', desc: '选择变化事件' }
          ],
          code: {
            wxml: '<picker mode="date" value="{{date}}" start="2020-01-01"\n  end="2030-12-31" bindchange="onDateChange">\n  <view class="picker-row">\n    <text>选择日期</text>\n    <text class="picker-value">{{date || \'请选择\'}}</text>\n  </view>\n</picker>',
            js: "Page({\n  data: {\n    date: ''\n  },\n  onDateChange(e) {\n    this.setData({ date: e.detail.value })\n  }\n})"
          },
          tips: '1. mode="date" 选择日期，mode="time" 选择时间\n2. start/end 限制可选范围\n3. picker 内部需放一个可点击的 view 作为触发器'
        },
        {
          id: 'form-picker-region',
          name: '省市级联选择',
          desc: 'picker 省市区三级联动',
          props: [
            { name: 'mode', type: 'string', default: "'region'", desc: '设置为 region 即省市区选择' },
            { name: 'value', type: 'array', default: '[]', desc: '当前选中的省市区' },
            { name: 'bindchange', type: 'event', default: '—', desc: '选择变化事件' }
          ],
          code: {
            wxml: '<picker mode="region" value="{{region}}"\n  bindchange="onRegionChange">\n  <view class="picker-row">\n    <text>所在地区</text>\n    <text class="picker-value">{{region[0]}} {{region[1]}} {{region[2]}}</text>\n  </view>\n</picker>',
            js: "Page({\n  data: {\n    region: ['广东省', '广州市', '海珠区']\n  },\n  onRegionChange(e) {\n    this.setData({ region: e.detail.value })\n  }\n})"
          },
          tips: '1. mode="region" 自动实现三级联动\n2. e.detail.value 返回 [省, 市, 区] 数组\n3. 初始 value 可设置默认选中项'
        },
        {
          id: 'form-rate',
          name: '评分控件',
          desc: '自定义星星评分组件',
          props: [
            { name: '自定义', type: '—', default: '—', desc: '通过 view + 图标自行实现' },
            { name: 'max', type: 'number', default: '5', desc: '最大评分值' },
            { name: 'value', type: 'number', default: '0', desc: '当前评分' }
          ],
          code: {
            wxml: '<view class="rate-container">\n  <view class="rate-stars">\n    <text wx:for="{{[1,2,3,4,5]}}" wx:key="*this"\n      class="star {{item <= rate ? \'active\' : \'\'}}"\n      data-val="{{item}}"\n      bindtap="onRateTap">★</text>\n  </view>\n  <text class="rate-text">{{rate}}分</text>\n</view>',
            js: "Page({\n  data: { rate: 0 },\n  onRateTap(e) {\n    const val = e.currentTarget.dataset.val\n    this.setData({ rate: val })\n  }\n})",
            wxss: '.star { font-size: 48rpx; color: #ddd; margin-right: 8rpx; }\n.star.active { color: #FF9500; }'
          },
          tips: '1. 星星用 Unicode 字符 ★ 实现，也可用图标\n2. 支持 tap 切换评分\n3. 可扩展支持半星（需自定义绘制）'
        }
      ]
    },
    {
      id: 'progress',
      name: '进度',
      icon: '📊',
      color: '#34C759',
      description: '进度条、步骤条、骨架屏、下拉刷新',
      controls: [
        {
          id: 'progress-linear',
          name: '线性进度条',
          desc: 'progress 线性进度条组件',
          props: [
            { name: 'percent', type: 'number', default: '0', desc: '百分比 0-100' },
            { name: 'show-info', type: 'boolean', default: 'false', desc: '是否显示百分比' },
            { name: 'activeColor', type: 'string', default: "'#09BB07'", desc: '已选择进度颜色' },
            { name: 'backgroundColor', type: 'string', default: "'#EBEBEB'", desc: '未选择进度颜色' },
            { name: 'stroke-width', type: 'number', default: '6', desc: '进度条宽度（px）' },
            { name: 'active', type: 'boolean', default: 'false', desc: '进度条动画' }
          ],
          code: {
            wxml: '<progress percent="{{percent}}" show-info\n  activeColor="#4C8BF5"\n  stroke-width="8"\n  active/>\n\n<button bindtap="increase">+10%</button>\n<button bindtap="decrease">-10%</button>',
            js: "Page({\n  data: { percent: 30 },\n  increase() {\n    this.setData({\n      percent: Math.min(100, this.data.percent + 10)\n    })\n  },\n  decrease() {\n    this.setData({\n      percent: Math.max(0, this.data.percent - 10)\n    })\n  }\n})"
          },
          tips: '1. percent 范围 0-100\n2. active=true 时进度条从 0 动画到目标值\n3. show-info 在右侧显示百分比文字'
        },
        {
          id: 'progress-circle',
          name: '圆形进度条',
          desc: '自定义 Canvas 圆形进度条',
          props: [
            { name: '自定义', type: '—', default: '—', desc: '通过 Canvas 2d 绘制' },
            { name: 'percent', type: 'number', default: '0', desc: '进度百分比' }
          ],
          code: {
            wxml: '<canvas type="2d" id="circleCanvas" class="circle-canvas"\n  style="width:200rpx;height:200rpx"/>',
            js: "Page({\n  data: { percent: 75 },\n  onReady() {\n    const query = wx.createSelectorQuery()\n    query.select('#circleCanvas')\n      .fields({ node: true, size: true })\n      .exec(res => {\n        const canvas = res[0].node\n        const ctx = canvas.getContext('2d')\n        const dpr = wx.getWindowInfo().pixelRatio\n        canvas.width = res[0].width * dpr\n        canvas.height = res[0].height * dpr\n        ctx.scale(dpr, dpr)\n        // 绘制背景圆\n        ctx.beginPath()\n        ctx.arc(50, 50, 40, 0, 2 * Math.PI)\n        ctx.strokeStyle = '#eee'\n        ctx.lineWidth = 8\n        ctx.stroke()\n        // 绘制进度圆\n        ctx.beginPath()\n        ctx.arc(50, 50, 40, -Math.PI/2,\n          -Math.PI/2 + 2*Math.PI*this.data.percent/100)\n        ctx.strokeStyle = '#4C8BF5'\n        ctx.lineWidth = 8\n        ctx.lineCap = 'round'\n        ctx.stroke()\n      })\n  }\n})"
          },
          tips: '1. 使用 Canvas 2d API 绘制圆形进度\n2. arc 的起始角度为 -PI/2（12点方向）\n3. lineCap="round" 使端点圆滑'
        },
        {
          id: 'progress-steps',
          name: '步骤条',
          desc: '横向 / 竖向步骤条',
          props: [
            { name: '自定义', type: '—', default: '—', desc: '通过 flex 布局 + 图标实现' },
            { name: 'current', type: 'number', default: '0', desc: '当前步骤' }
          ],
          code: {
            wxml: '<view class="steps">\n  <view class="step {{index <= current ? \'done\' : \'\'}}"\n    wx:for="{{steps}}" wx:key="index">\n    <view class="step-dot">{{index + 1}}</view>\n    <text class="step-label">{{item}}</text>\n    <view class="step-line" wx:if="{{index < steps.length - 1}}"/>\n  </view>\n</view>',
            js: "Page({\n  data: {\n    steps: ['填写信息', '验证身份', '设置密码', '完成'],\n    current: 2\n  }\n})",
            wxss: '.step { display:flex; flex-direction:column; align-items:center; flex:1; position:relative; }\n.step-dot { width:48rpx; height:48rpx; border-radius:50%; background:#ddd; color:#fff; display:flex; align-items:center; justify-content:center; }\n.step.done .step-dot { background:#4C8BF5; }'
          },
          tips: '1. 用 flex 等分布局每个步骤\n2. 步骤间用线条连接\n3. 已完成步骤用不同颜色区分\n4. 竖向步骤条改为 flex-direction: column'
        },
        {
          id: 'progress-skeleton',
          name: '骨架屏',
          desc: '数据加载中的占位动画',
          props: [
            { name: '自定义', type: '—', default: '—', desc: '通过灰色块 + 闪光动画实现' }
          ],
          code: {
            wxml: '<view class="skeleton" wx:if="{{loading}}">\n  <view class="sk-block sk-title"/>\n  <view class="sk-block sk-line"/>\n  <view class="sk-block sk-line short"/>\n</view>\n<view wx:else>实际内容</view>',
            js: "Page({\n  data: { loading: true },\n  onLoad() {\n    setTimeout(() => {\n      this.setData({ loading: false })\n    }, 2000)\n  }\n})",
            wxss: '.sk-block { background:#eee; border-radius:8rpx; animation:shimmer 1.5s infinite; }\n.sk-title { width:40%; height:32rpx; margin-bottom:16rpx; }\n.sk-line { width:100%; height:24rpx; margin-bottom:12rpx; }\n.sk-line.short { width:60%; }\n@keyframes shimmer {\n  0% { opacity:1; }\n  50% { opacity:0.5; }\n  100% { opacity:1; }\n}'
          },
          tips: '1. 骨架屏用灰色块模拟内容布局\n2. shimmer 动画产生闪烁效果\n3. 数据加载完成后切换到真实内容\n4. 建议骨架布局与真实内容布局一致'
        }
      ]
    },
    {
      id: 'feedback',
      name: '反馈',
      icon: '💬',
      color: '#FF3B30',
      description: '弹窗、Toast、ActionSheet、Loading、消息提示条',
      controls: [
        {
          id: 'feedback-modal',
          name: '对话框 Modal',
          desc: 'wx.showModal 模态弹窗',
          props: [
            { name: 'title', type: 'string', default: "''", desc: '标题' },
            { name: 'content', type: 'string', default: "''", desc: '内容' },
            { name: 'showCancel', type: 'boolean', default: 'true', desc: '是否显示取消按钮' },
            { name: 'confirmText', type: 'string', default: "'确定'", desc: '确认按钮文字' },
            { name: 'cancelText', type: 'string', default: "'取消'", desc: '取消按钮文字' }
          ],
          code: {
            wxml: '<button bindtap="showModal">显示对话框</button>',
            js: "Page({\n  showModal() {\n    wx.showModal({\n      title: '提示',\n      content: '确定要删除这条内容吗？',\n      confirmText: '删除',\n      confirmColor: '#FF3B30',\n      success(res) {\n        if (res.confirm) {\n          wx.showToast({ title: '已删除' })\n        }\n      }\n    })\n  }\n})"
          },
          tips: '1. confirmColor 可自定义确认按钮颜色\n2. showCancel=false 时只显示确认按钮\n3. success 回调中 res.confirm 和 res.cancel 判断点击'
        },
        {
          id: 'feedback-toast',
          name: '轻提示 Toast',
          desc: 'wx.showToast 消息提示',
          props: [
            { name: 'title', type: 'string', default: "''", desc: '提示内容' },
            { name: 'icon', type: 'string', default: "'success'", desc: '图标：success/error/loading/none' },
            { name: 'duration', type: 'number', default: '1500', desc: '显示时长（ms）' },
            { name: 'mask', type: 'boolean', default: 'false', desc: '是否显示透明蒙层' }
          ],
          code: {
            wxml: '<button bindtap="showSuccess">成功提示</button>\n<button bindtap="showError">错误提示</button>\n<button bindtap="showLoading">加载提示</button>',
            js: "Page({\n  showSuccess() {\n    wx.showToast({ title: '操作成功', icon: 'success' })\n  },\n  showError() {\n    wx.showToast({ title: '操作失败', icon: 'error' })\n  },\n  showLoading() {\n    wx.showToast({ title: '加载中...', icon: 'loading', duration: 3000 })\n  }\n})"
          },
          tips: '1. icon="none" 时只显示文字\n2. duration 默认 1500ms\n3. mask=true 防止触摸穿透\n4. showToast 和 hideToast 需配对使用'
        },
        {
          id: 'feedback-action-sheet',
          name: '操作菜单',
          desc: 'wx.showActionSheet 底部操作菜单',
          props: [
            { name: 'itemList', type: 'array', default: '[]', desc: '按钮文字数组' },
            { name: 'itemColor', type: 'string', default: "'#000000'", desc: '按钮文字颜色' }
          ],
          code: {
            wxml: '<button bindtap="showAction">显示菜单</button>',
            js: "Page({\n  showAction() {\n    wx.showActionSheet({\n      itemList: ['保存到相册', '转发分享', '设为壁纸'],\n      itemColor: '#333333',\n      success(res) {\n        console.log('选择了第', res.tapIndex, '项')\n      },\n      fail(res) {\n        console.log('用户取消')\n      }\n    })\n  }\n})"
          },
          tips: '1. itemList 最多 6 个按钮\n2. 系统自动添加"取消"按钮\n3. res.tapIndex 返回选中项索引\n4. 用户点取消时走 fail 回调'
        },
        {
          id: 'feedback-loading',
          name: '加载弹窗',
          desc: 'wx.showLoading 加载提示框',
          props: [
            { name: 'title', type: 'string', default: "''", desc: '提示文字' },
            { name: 'mask', type: 'boolean', default: 'true', desc: '是否显示蒙层' }
          ],
          code: {
            wxml: '<button bindtap="showLoading">显示加载</button>',
            js: "Page({\n  showLoading() {\n    wx.showLoading({\n      title: '数据加载中...',\n      mask: true\n    })\n    setTimeout(() => {\n      wx.hideLoading()\n      wx.showToast({ title: '加载完成' })\n    }, 2000)\n  }\n})"
          },
          tips: '1. showLoading 需手动调用 hideLoading 关闭\n2. mask=true 时不可点击页面\n3. showLoading 和 showToast 不可同时使用'
        },
        {
          id: 'feedback-banner',
          name: '消息提示条',
          desc: '自定义顶部 / 底部消息提示条',
          props: [
            { name: '自定义', type: '—', default: '—', desc: '通过自定义 view + 动画实现' }
          ],
          code: {
            wxml: '<view class="banner {{bannerType}}" wx:if="{{showBanner}}">\n  <text class="banner-icon">{{bannerIcon}}</text>\n  <text class="banner-text">{{bannerText}}</text>\n</view>',
            js: "Page({\n  data: {\n    showBanner: false,\n    bannerType: 'success',\n    bannerText: '',\n    bannerIcon: ''\n  },\n  showBanner(type, text) {\n    const icons = {\n      success: '✓', error: '✕', warning: '!', info: 'i'\n    }\n    this.setData({\n      showBanner: true,\n      bannerType: type,\n      bannerText: text,\n      bannerIcon: icons[type]\n    })\n    setTimeout(() => {\n      this.setData({ showBanner: false })\n    }, 2500)\n  }\n})",
            wxss: '.banner { position:fixed; top:0; left:0; right:0; padding:20rpx 32rpx; display:flex; align-items:center; animation:slideDown 0.3s; }\n.banner.success { background:#34C759; }\n.banner.error { background:#FF3B30; }\n.banner-text { color:#fff; margin-left:12rpx; }\n@keyframes slideDown { from{transform:translateY(-100%);} to{transform:translateY(0);} }'
          },
          tips: '1. 自定义 banner 比 showToast 更灵活\n2. 支持 HTML 富文本和图标\n3. 用 animation 实现滑入/滑出效果\n4. 可放在顶部或底部'
        }
      ]
    },
    {
      id: 'display-text',
      name: '文字展示',
      icon: '📄',
      color: '#5856D6',
      description: '多层级排版、富文本、可折叠文本、代码块',
      controls: [
        {
          id: 'display-typography',
          name: '多层级排版',
          desc: '标题、正文、辅助文字等多层级文字展示',
          props: [
            { name: '自定义', type: '—', default: '—', desc: '通过不同 class 控制字号、字重、颜色' }
          ],
          code: {
            wxml: '<view class="text-page">\n  <view class="t-title">大标题 H1</view>\n  <view class="t-subtitle">副标题 H2</view>\n  <view class="t-h3">章节标题 H3</view>\n  <view class="t-body">正文内容，默认字号30rpx，行高1.6，适合阅读。</view>\n  <view class="t-caption">辅助说明文字，颜色更浅</view>\n  <view class="t-link" bindtap="onLinkTap">链接文字 →</view>\n</view>',
            js: 'Page({\n  onLinkTap() {\n    wx.showToast({ title: "链接点击" })\n  }\n})',
            wxss: '.t-title{font-size:48rpx;font-weight:700;}\n.t-subtitle{font-size:40rpx;font-weight:600;}\n.t-h3{font-size:34rpx;font-weight:500;}\n.t-body{font-size:30rpx;line-height:1.6;}\n.t-caption{font-size:26rpx;color:#999;}\n.t-link{font-size:30rpx;color:#4C8BF5;}'
          },
          tips: '1. 字号建议使用 rpx 单位自适应\n2. 正文行高建议 1.5-1.8\n3. 颜色层级：标题深、正文中、辅助浅'
        },
        {
          id: 'display-rich-text',
          name: '富文本',
          desc: 'rich-text 组件渲染 HTML 富文本',
          props: [
            { name: 'nodes', type: 'array/string', default: '[]', desc: '节点列表 / HTML 字符串' },
            { name: 'space', type: 'string', default: '—', desc: '空白处理方式' }
          ],
          code: {
            wxml: '<rich-text nodes="{{htmlContent}}"></rich-text>',
            js: "Page({\n  data: {\n    htmlContent: '<div style=\"text-align:center;\">' +\n      '<h1 style=\"color:#4C8BF5;\">富文本标题</h1>' +\n      '<p style=\"color:#666;\">这是一段<strong>富文本</strong>内容</p>' +\n      '<img src=\"https://picsum.photos/300/200\" style=\"width:100%;\"/>' +\n      '</div>'\n  }\n})"
          },
          tips: '1. nodes 可传 HTML 字符串或节点数组\n2. 支持的标签有限：div/p/h1-6/span/strong/em/img/a 等\n3. 样式需写在 style 属性中\n4. 图片需用 https 域名'
        },
        {
          id: 'display-collapse',
          name: '可折叠文本',
          desc: '展开 / 收起的长文本',
          props: [
            { name: '自定义', type: '—', default: '—', desc: '通过展开状态控制显示行数' }
          ],
          code: {
            wxml: '<view class="collapse-text">\n  <text class="content {{expanded ? \'\' : \'collapsed\'}}">{{longText}}</text>\n  <text class="toggle-btn" bindtap="toggle">\n    {{expanded ? \'收起\' : \'展开\'}}\n  </text>\n</view>',
            js: "Page({\n  data: {\n    expanded: false,\n    longText: '这是一段很长的文本内容...' // 实际内容更长\n  },\n  toggle() {\n    this.setData({ expanded: !this.data.expanded })\n  }\n})",
            wxss: '.content{display:block;}\n.content.collapsed{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}\n.toggle-btn{color:#4C8BF5;margin-top:8rpx;}'
          },
          tips: '1. 收起状态用 -webkit-line-clamp 限制行数\n2. 展开时移除 line-clamp 显示全部\n3. 按钮文字根据状态切换'
        },
        {
          id: 'display-code',
          name: '代码块',
          desc: '带语法高亮效果的代码展示',
          props: [
            { name: '自定义', type: '—', default: '—', desc: '通过解析代码字符串着色' }
          ],
          code: {
            wxml: '<view class="code-block">\n  <view class="code-header">\n    <text class="code-lang">JavaScript</text>\n    <text class="copy-btn" bindtap="copyCode">复制</text>\n  </view>\n  <view class="code-content">\n    <text class="code-line" wx:for="{{codeLines}}" wx:key="index">\n      <text class="ln-num">{{index + 1}}</text>\n      <text class="ln-content">{{item}}</text>\n    </text>\n  </view>\n</view>',
            js: "Page({\n  data: {\n    codeLines: [\n      'function hello() {',\n      '  console.log(\"Hello!\");',\n      '}'\n    ]\n  },\n  copyCode() {\n    wx.setClipboardData({\n      data: this.data.codeLines.join('\\n')\n    })\n  }\n})",
            wxss: '.code-block{background:#1e1e1e;border-radius:12rpx;overflow:hidden;}\n.code-header{display:flex;justify-content:space-between;padding:16rpx 24rpx;background:#2a2a2a;}\n.code-lang{color:#aaa;font-size:24rpx;}\n.copy-btn{color:#4C8BF5;font-size:24rpx;}\n.code-content{padding:24rpx;overflow-x:auto;}\n.code-line{display:flex;}\n.ln-num{color:#555;width:40rpx;text-align:right;margin-right:20rpx;}\n.ln-content{color:#d4d4d4;}'
          },
          tips: '1. 深色背景 + 浅色文字模拟代码编辑器\n2. 行号提升可读性\n3. 复制功能用 setClipboardData\n4. 完整语法高亮需自行解析关键字着色'
        }
      ]
    },
    {
      id: 'display-image',
      name: '图片展示',
      icon: '🖼️',
      color: '#AF52DE',
      description: '单图预览、九宫格、懒加载、轮播图、瀑布流',
      controls: [
        {
          id: 'display-image-preview',
          name: '单图预览',
          desc: '点击图片放大全屏预览',
          props: [
            { name: 'src', type: 'string', default: "''", desc: '图片地址' },
            { name: 'mode', type: 'string', default: "'scaleToFill'", desc: '裁剪/缩放模式' },
            { name: 'lazy-load', type: 'boolean', default: 'false', desc: '是否懒加载' }
          ],
          code: {
            wxml: '<image src="{{imgUrl}}" mode="aspectFill"\n  class="preview-img" bindtap="previewImage"/>',
            js: "Page({\n  data: {\n    imgUrl: 'https://picsum.photos/400/300'\n  },\n  previewImage() {\n    wx.previewImage({\n      current: this.data.imgUrl,\n      urls: [this.data.imgUrl]\n    })\n  }\n})"
          },
          tips: '1. wx.previewImage 可全屏预览图片\n2. current 为当前图片 URL，urls 为图片数组\n3. mode="aspectFill" 保持比例填充'
        },
        {
          id: 'display-image-grid',
          name: '九宫格图片',
          desc: '多图九宫格展示 + 点击预览',
          props: [
            { name: '自定义', type: '—', default: '—', desc: 'flex 布局 + 循环渲染' }
          ],
          code: {
            wxml: '<view class="img-grid">\n  <image wx:for="{{images}}" wx:key="index"\n    src="{{item}}" mode="aspectFill"\n    class="grid-item"\n    data-index="{{index}}"\n    bindtap="previewImage"/>\n</view>',
            js: "Page({\n  data: {\n    images: [\n      'https://picsum.photos/200/201',\n      'https://picsum.photos/200/202',\n      'https://picsum.photos/200/203',\n      'https://picsum.photos/200/204',\n      'https://picsum.photos/200/205',\n      'https://picsum.photos/200/206'\n    ]\n  },\n  previewImage(e) {\n    const index = e.currentTarget.dataset.index\n    wx.previewImage({\n      current: this.data.images[index],\n      urls: this.data.images\n    })\n  }\n})",
            wxss: '.img-grid{display:flex;flex-wrap:wrap;}\n.grid-item{width:31%;margin:1%;aspect-ratio:1;border-radius:8rpx;}'
          },
          tips: '1. 使用 flex-wrap 实现自动换行\n2. 宽度 31% + margin 1% 实现三列\n3. 点击传入 index 实现 prevImage 定位'
        },
        {
          id: 'display-image-lazy',
          name: '图片懒加载',
          desc: '长列表图片懒加载优化',
          props: [
            { name: 'lazy-load', type: 'boolean', default: 'false', desc: 'image 组件原生属性' },
            { name: '自定义', type: '—', default: '—', desc: '配合 IntersectionObserver 精确控制' }
          ],
          code: {
            wxml: '<scroll-view scroll-y class="scroll-list">\n  <view class="list-item" wx:for="{{imgList}}" wx:key="index">\n    <image src="{{item}}" mode="aspectFill"\n      lazy-load class="lazy-img"/>\n    <text class="item-label">图片 {{index + 1}}</text>\n  </view>\n</scroll-view>',
            js: "Page({\n  data: {\n    imgList: Array.from({length: 20},\n      (_, i) => `https://picsum.photos/300/200?${i}`)\n  }\n})",
            wxss: '.scroll-list{height:800rpx;}\n.list-item{margin-bottom:16rpx;}\n.lazy-img{width:100%;height:300rpx;border-radius:12rpx;}'
          },
          tips: '1. lazy-load=true 图片进入可视区域才加载\n2. 适合长列表图片场景\n3. 配合 scroll-view 使用效果更好'
        },
        {
          id: 'display-swiper',
          name: '轮播图',
          desc: 'swiper 轮播组件',
          props: [
            { name: 'indicator-dots', type: 'boolean', default: 'false', desc: '是否显示面板指示点' },
            { name: 'autoplay', type: 'boolean', default: 'false', desc: '是否自动切换' },
            { name: 'interval', type: 'number', default: '5000', desc: '自动切换间隔（ms）' },
            { name: 'circular', type: 'boolean', default: 'false', desc: '是否衔接滑动' },
            { name: 'bindchange', type: 'event', default: '—', desc: '当前页面变化事件' }
          ],
          code: {
            wxml: '<swiper class="banner-swiper"\n  indicator-dots\n  autoplay\n  interval="3000"\n  circular\n  bindchange="onSwiperChange">\n  <swiper-item wx:for="{{banners}}" wx:key="index">\n    <image src="{{item}}" mode="aspectFill" class="banner-img"/>\n  </swiper-item>\n</swiper>',
            js: "Page({\n  data: {\n    banners: [\n      'https://picsum.photos/750/400?banner1',\n      'https://picsum.photos/750/400?banner2',\n      'https://picsum.photos/750/400?banner3'\n    ],\n    current: 0\n  },\n  onSwiperChange(e) {\n    this.setData({ current: e.detail.current })\n  }\n})",
            wxss: '.banner-swiper{width:100%;height:400rpx;border-radius:16rpx;}\n.banner-img{width:100%;height:100%;}'
          },
          tips: '1. swiper-item 必须放在 swiper 内\n2. circular=true 无限循环\n3. indicator-active-color 自定义选中点颜色\n4. e.detail.current 返回当前页索引'
        },
        {
          id: 'display-waterfall',
          name: '瀑布流',
          desc: '双列不等高瀑布流布局',
          props: [
            { name: '自定义', type: '—', default: '—', desc: '通过双列 view 分别追加实现' }
          ],
          code: {
            wxml: '<view class="waterfall">\n  <view class="wf-col">\n    <view class="wf-item" wx:for="{{leftCol}}" wx:key="id">\n      <image src="{{item.img}}" mode="widthFix"/>\n      <text>{{item.title}}</text>\n    </view>\n  </view>\n  <view class="wf-col">\n    <view class="wf-item" wx:for="{{rightCol}}" wx:key="id">\n      <image src="{{item.img}}" mode="widthFix"/>\n      <text>{{item.title}}</text>\n    </view>\n  </view>\n</view>',
            js: "Page({\n  data: { leftCol: [], rightCol: [] },\n  onLoad() {\n    const items = Array.from({length: 10}, (_, i) => ({\n      id: i,\n      title: '内容 ' + (i+1),\n      img: `https://picsum.photos/300/${300 + (i%3)*100}?${i}`\n    }))\n    // 交替分配到左右两列\n    const left = [], right = []\n    items.forEach((item, i) => {\n      if (i % 2 === 0) left.push(item)\n      else right.push(item)\n    })\n    this.setData({ leftCol: left, rightCol: right })\n  }\n})",
            wxss: '.waterfall{display:flex;gap:12rpx;}\n.wf-col{flex:1;}\n.wf-item{margin-bottom:12rpx;break-inside:avoid;}\n.wf-item image{width:100%;border-radius:8rpx;}'
          },
          tips: '1. 瀑布流核心是双列分别渲染\n2. mode="widthFix" 图片按宽度等比缩放\n3. 交替分配简化实现，精确方案需计算高度\n4. 可扩展为 scroll-view 无限滚动加载'
        }
      ]
    },
    {
      id: 'display-video',
      name: '视频展示',
      icon: '🎬',
      color: '#FF2D55',
      description: '视频播放、弹幕、视频列表、全屏播放',
      controls: [
        {
          id: 'display-video-basic',
          name: '视频播放器',
          desc: 'video 组件基础播放',
          props: [
            { name: 'src', type: 'string', default: "''", desc: '视频地址' },
            { name: 'controls', type: 'boolean', default: 'true', desc: '是否显示默认控件' },
            { name: 'autoplay', type: 'boolean', default: 'false', desc: '是否自动播放' },
            { name: 'loop', type: 'boolean', default: 'false', desc: '是否循环播放' },
            { name: 'muted', type: 'boolean', default: 'false', desc: '是否静音' },
            { name: 'poster', type: 'string', default: "''", desc: '封面图' }
          ],
          code: {
            wxml: '<video\n  src="https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400"\n  controls\n  poster="https://picsum.photos/750/400?poster"\n  class="video-player"\n  bindplay="onPlay"\n  bindpause="onPause"\n  bindended="onEnded"/>',
            js: 'Page({\n  onPlay() { console.log("播放开始") },\n  onPause() { console.log("播放暂停") },\n  onEnded() { console.log("播放结束") }\n})',
            wxss: '.video-player{width:100%;height:400rpx;}'
          },
          tips: '1. video 组件原生支持播放/暂停/进度条\n2. 需要在后台配置视频域名白名单\n3. poster 设置封面图，未播放时显示\n4. 支持弹幕、倍速等高级功能'
        },
        {
          id: 'display-video-danmaku',
          name: '弹幕视频',
          desc: 'video 组件弹幕功能',
          props: [
            { name: 'danmu-list', type: 'array', default: '[]', desc: '弹幕列表' },
            { name: 'enable-danmu', type: 'boolean', default: 'false', desc: '是否展示弹幕' },
            { name: 'danmu-btn', type: 'boolean', default: 'false', desc: '是否显示弹幕按钮' }
          ],
          code: {
            wxml: '<video id="myVideo"\n  src="https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload"\n  danmu-list="{{danmuList}}"\n  enable-danmu\n  danmu-btn\n  controls\n  class="video-player"/>\n<input placeholder="发个弹幕" bindinput="onDanmuInput"/>\n<button bindtap="sendDanmu">发送弹幕</button>',
            js: "Page({\n  data: {\n    danmuList: [\n      { text: '第一条弹幕', color: '#FF0000', time: 2 },\n      { text: '哈哈哈哈', color: '#FF9500', time: 5 },\n      { text: '好视频', color: '#4C8BF5', time: 8 }\n    ],\n    danmuText: ''\n  },\n  onDanmuInput(e) {\n    this.setData({ danmuText: e.detail.value })\n  },\n  sendDanmu() {\n    this.videoCtx.sendDanmu({\n      text: this.data.danmuText,\n      color: '#4C8BF5'\n    })\n    this.setData({ danmuText: '' })\n  },\n  onReady() {\n    this.videoCtx = wx.createVideoContext('myVideo')\n  }\n})"
          },
          tips: '1. danmu-list 预设弹幕，time 为秒\n2. sendDanmu 实时发送弹幕\n3. 需通过 createVideoContext 获取上下文\n4. 弹幕颜色支持十六进制'
        },
        {
          id: 'display-video-list',
          name: '视频列表',
          desc: '多个视频列表展示',
          props: [
            { name: '自定义', type: '—', default: '—', desc: 'scroll-view + video 组合' }
          ],
          code: {
            wxml: '<scroll-view scroll-y class="video-list">\n  <view class="video-item" wx:for="{{videoList}}" wx:key="id">\n    <video src="{{item.src}}" controls\n      poster="{{item.poster}}"\n      class="list-video"/>\n    <view class="video-info">\n      <text class="video-title">{{item.title}}</text>\n      <text class="video-desc">{{item.views}}次播放</text>\n    </view>\n  </view>\n</scroll-view>',
            js: "Page({\n  data: {\n    videoList: [\n      { id: 1, title: '视频一', views: '1.2万',\n        src: 'https://...mp4',\n        poster: 'https://picsum.photos/300/200?v1' },\n      { id: 2, title: '视频二', views: '8563',\n        src: 'https://...mp4',\n        poster: 'https://picsum.photos/300/200?v2' }\n    ]\n  }\n})",
            wxss: '.video-list{height:100vh;}\n.video-item{margin-bottom:24rpx;}\n.list-video{width:100%;height:360rpx;}\n.video-info{padding:16rpx;}\n.video-title{font-size:32rpx;font-weight:500;}\n.video-desc{font-size:24rpx;color:#999;margin-top:8rpx;}'
          },
          tips: '1. 视频列表建议用 poster 封面图\n2. 不自动播放，用户点击时才加载\n3. 同一时间只播放一个视频可节省性能\n4. scroll-view 设置高度才能滚动'
        },
        {
          id: 'display-video-fullscreen',
          name: '全屏播放',
          desc: '视频全屏播放控制',
          props: [
            { name: '自定义', type: '—', default: '—', desc: '通过 VideoContext 控制' },
            { name: 'direction', type: 'number', default: '0', desc: '全屏方向：0正常/90横屏/-90反向' }
          ],
          code: {
            wxml: '<video id="fullVideo"\n  src="https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload"\n  controls\n  class="video-player"/>\n<button bindtap="enterFullScreen">进入全屏</button>\n<button bindtap="exitFullScreen">退出全屏</button>',
            js: "Page({\n  onReady() {\n    this.videoCtx = wx.createVideoContext('fullVideo')\n  },\n  enterFullScreen() {\n    this.videoCtx.requestFullScreen({\n      direction: 90 // 90度横屏\n    })\n  },\n  exitFullScreen() {\n    this.videoCtx.exitFullScreen()\n  }\n})"
          },
          tips: '1. requestFullScreen 进入全屏\n2. direction: 90 横屏，0 跟随设备\n3. exitFullScreen 退出全屏\n4. 需在 onReady 中获取 videoContext'
        }
      ]
    },
    {
      id: 'display-other',
      name: '其他展示',
      icon: '🎨',
      color: '#5AC8FA',
      description: '标签、卡片、列表、分割线、空状态',
      controls: [
        {
          id: 'display-tag',
          name: '标签 Tag',
          desc: '标签 / 徽标组件',
          props: [
            { name: '自定义', type: '—', default: '—', desc: '通过 view + 文字 + 样式实现' }
          ],
          code: {
            wxml: '<view class="tag-row">\n  <view class="tag default">默认</view>\n  <view class="tag primary">主要</view>\n  <view class="tag success">成功</view>\n  <view class="tag warning">警告</view>\n  <view class="tag danger">危险</view>\n</view>\n<view class="badge-demo">\n  <view class="badge-wrap">\n    <text class="badge-text">消息</text>\n    <view class="badge-dot">9</view>\n  </view>\n</view>',
            js: 'Page({})',
            wxss: '.tag{display:inline-flex;padding:4rpx 16rpx;border-radius:8rpx;font-size:24rpx;margin-right:12rpx;}\n.tag.default{background:#f0f0f0;color:#666;}\n.tag.primary{background:#eef2ff;color:#4C8BF5;}\n.tag.success{background:#e8f8ec;color:#34C759;}\n.tag.warning{background:#fff5e6;color:#FF9500;}\n.tag.danger{background:#ffeaea;color:#FF3B30;}\n.badge-dot{position:absolute;top:-8rpx;right:-16rpx;background:#FF3B30;color:#fff;font-size:20rpx;min-width:28rpx;height:28rpx;border-radius:14rpx;text-align:center;line-height:28rpx;}'
          },
          tips: '1. tag 用 inline-flex 实现行内标签\n2. badge 用 absolute 定位红点\n3. 颜色搭配建议浅色背景 + 深色文字'
        },
        {
          id: 'display-card',
          name: '卡片 Card',
          desc: '信息卡片组件',
          props: [
            { name: '自定义', type: '—', default: '—', desc: '通过 view 组合 + 阴影圆角' }
          ],
          code: {
            wxml: '<view class="card">\n  <image src="{{cardImg}}" mode="aspectFill" class="card-img"/>\n  <view class="card-body">\n    <view class="card-title">卡片标题</view>\n    <view class="card-desc">这是卡片的描述文字，可以放两行。</view>\n    <view class="card-footer">\n      <view class="card-tag">标签</view>\n      <text class="card-price">¥99</text>\n    </view>\n  </view>\n</view>',
            js: "Page({\n  data: {\n    cardImg: 'https://picsum.photos/400/200?card'\n  }\n})",
            wxss: '.card{background:#fff;border-radius:16rpx;overflow:hidden;box-shadow:0 2rpx 12rpx rgba(0,0,0,0.06);}\n.card-img{width:100%;height:200rpx;}\n.card-body{padding:24rpx;}\n.card-title{font-size:34rpx;font-weight:600;}\n.card-desc{font-size:26rpx;color:#999;margin-top:8rpx;}\n.card-footer{display:flex;justify-content:space-between;align-items:center;margin-top:16rpx;}\n.card-tag{background:#eef2ff;color:#4C8BF5;font-size:22rpx;padding:4rpx 12rpx;border-radius:6rpx;}\n.card-price{color:#FF3B30;font-size:36rpx;font-weight:600;}'
          },
          tips: '1. 卡片核心：圆角 + 阴影 + 留白\n2. overflow:hidden 让图片跟随圆角\n3. 内容区分 title / desc / footer 层次分明'
        },
        {
          id: 'display-list',
          name: '列表 List',
          desc: '带头像和操作按钮的列表',
          props: [
            { name: '自定义', type: '—', default: '—', desc: 'flex 布局组合' }
          ],
          code: {
            wxml: '<view class="list">\n  <view class="list-item" wx:for="{{userList}}" wx:key="id">\n    <image src="{{item.avatar}}" class="list-avatar"/>\n    <view class="list-content">\n      <text class="list-name">{{item.name}}</text>\n      <text class="list-desc">{{item.desc}}</text>\n    </view>\n    <view class="list-action" data-id="{{item.id}}"\n      bindtap="onActionTap">\n      {{item.followed ? \'已关注\' : \'关注\'}}\n    </view>\n  </view>\n</view>',
            js: "Page({\n  data: {\n    userList: [\n      { id: 1, name: '用户A', desc: '前端开发工程师',\n        avatar: 'https://i.pravatar.cc/100?1', followed: false },\n      { id: 2, name: '用户B', desc: 'UI设计师',\n        avatar: 'https://i.pravatar.cc/100?2', followed: true }\n    ]\n  },\n  onActionTap(e) {\n    const id = e.currentTarget.dataset.id\n    const list = this.data.userList.map(u => {\n      if (u.id === id) u.followed = !u.followed\n      return u\n    })\n    this.setData({ userList: list })\n  }\n})",
            wxss: '.list-item{display:flex;align-items:center;padding:24rpx;border-bottom:1rpx solid #f0f0f0;}\n.list-avatar{width:80rpx;height:80rpx;border-radius:50%;}\n.list-content{flex:1;margin-left:20rpx;}\n.list-name{font-size:30rpx;font-weight:500;}\n.list-desc{font-size:24rpx;color:#999;}\n.list-action{padding:8rpx 24rpx;border-radius:24rpx;background:#4C8BF5;color:#fff;font-size:24rpx;}'
          },
          tips: '1. 列表项 flex 三段式：左图标 + 中内容 + 右操作\n2. border-bottom 分隔每项\n3. 可配合 scroll-view 实现无限滚动'
        },
        {
          id: 'display-divider',
          name: '分割线',
          desc: '内容分割线与空状态',
          props: [
            { name: '自定义', type: '—', default: '—', desc: '通过 border 或 view 实现' }
          ],
          code: {
            wxml: '<!-- 纯分割线 -->\n<view class="divider"/>\n\n<!-- 带文字分割线 -->\n<view class="divider-text">\n  <view class="divider-line"/>\n  <text class="divider-label">分割文字</text>\n  <view class="divider-line"/>\n</view>\n\n<!-- 空状态 -->\n<view class="empty-state">\n  <text class="empty-icon">📭</text>\n  <text class="empty-text">暂无数据</text>\n  <view class="empty-btn" bindtap="onRetry">重新加载</view>\n</view>',
            js: 'Page({\n  onRetry() {\n    wx.showToast({ title: "重新加载中..." })\n  }\n})',
            wxss: '.divider{height:1rpx;background:#e8e8e8;margin:32rpx 0;}\n.divider-text{display:flex;align-items:center;margin:32rpx 0;}\n.divider-line{flex:1;height:1rpx;background:#e8e8e8;}\n.divider-label{padding:0 24rpx;color:#999;font-size:24rpx;}\n.empty-state{display:flex;flex-direction:column;align-items:center;padding:80rpx 0;}\n.empty-icon{font-size:80rpx;}\n.empty-text{color:#999;font-size:28rpx;margin-top:16rpx;}\n.empty-btn{margin-top:24rpx;padding:12rpx 40rpx;border:1rpx solid #4C8BF5;color:#4C8BF5;border-radius:24rpx;font-size:26rpx;}'
          },
          tips: '1. 简单分割线用 1rpx 高度 view\n2. 带文字分割线用 flex 三段\n3. 空状态提升用户体验，建议配合图标和操作按钮'
        },
        {
          id: 'display-icon',
          name: '图标展示',
          desc: '常用图标库展示',
          props: [
            { name: '自定义', type: '—', default: '—', desc: 'Unicode 字符 / base64 图片 / iconfont' }
          ],
          code: {
            wxml: '<view class="icon-grid">\n  <view class="icon-item" wx:for="{{icons}}" wx:key="name">\n    <text class="icon-glyph">{{item.glyph}}</text>\n    <text class="icon-name">{{item.name}}</text>\n  </view>\n</view>',
            js: "Page({\n  data: {\n    icons: [\n      { name: '首页', glyph: '🏠' },\n      { name: '搜索', glyph: '🔍' },\n      { name: '收藏', glyph: '⭐' },\n      { name: '消息', glyph: '💬' },\n      { name: '设置', glyph: '⚙️' },\n      { name: '用户', glyph: '👤' },\n      { name: '相机', glyph: '📷' },\n      { name: '音乐', glyph: '🎵' },\n      { name: '视频', glyph: '🎬' },\n      { name: '位置', glyph: '📍' },\n      { name: '电话', glyph: '📞' },\n      { name: '邮件', glyph: '✉️' }\n    ]\n  }\n})",
            wxss: '.icon-grid{display:flex;flex-wrap:wrap;}\n.icon-item{width:25%;display:flex;flex-direction:column;align-items:center;padding:24rpx 0;}\n.icon-glyph{font-size:56rpx;}\n.icon-name{font-size:22rpx;color:#666;margin-top:8rpx;}'
          },
          tips: '1. Emoji 图标最简单，跨平台兼容性好\n2. 精确控制建议用 iconfont 字体或 SVG\n3. 可封装为自定义组件复用\n4. 每行 4 个图标（width:25%）'
        }
      ]
    }
  ]
}
