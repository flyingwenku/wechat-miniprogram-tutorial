// data/quiz.js
// 测试题库 - 120道题，6大知识域各20题

const quizData = {
  categories: [
    { id: 'control-recognition', name: '组件认知', icon: '🎯', desc: '识别组件名称、用途和效果' },
    { id: 'props-events', name: '属性与事件', icon: '⚙️', desc: '核心属性名、默认值、事件绑定' },
    { id: 'code-implementation', name: '代码实现', icon: '💻', desc: 'WXML语法、数据绑定、渲染' },
    { id: 'file-system', name: '文件体系', icon: '📁', desc: '小程序文件类型与职责' },
    { id: 'api-capability', name: 'API与能力', icon: '🔧', desc: '微信API、存储、导航等' },
    { id: 'practice-comprehensive', name: '实战综合', icon: '🚀', desc: '业务场景方案选择' },
    { id: 'hardware-device', name: '设备能力', icon: '📡', desc: '传感器、媒体、位置、外设等设备 API' }
  ],

  questions: [
    // ==================== 组件认知 (20题) ====================
    {
      id: 'q001',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '需要实现一个可拖动滑块来选择数值范围（如价格区间），应该使用哪个控件？',
      options: ['picker', 'slider', 'switch', 'input'],
      answer: 1,
      explanation: 'slider 是滑块选择器，支持 min/max/step/step 属性，适合选择连续数值。picker 是弹出式选择器，switch 是开关，input 是文本输入。',
      relatedControlId: 'form-slider'
    },
    {
      id: 'q002',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '用户需要选择出生日期（年月日），最适合用哪个控件？',
      options: ['input', 'slider', 'picker', 'switch'],
      answer: 2,
      explanation: 'picker 设置 mode="date" 可以弹出日期选择器，支持 start/end 限制范围。input 无法直接选择日期，slider 用于数值范围，switch 是开关。',
      relatedControlId: 'form-date-picker'
    },
    {
      id: 'q003',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '实现省市区三级联动选择，应该用哪个控件？',
      options: ['picker mode="region"', '三个级联的 input', 'slider', 'radio-group'],
      answer: 0,
      explanation: 'picker 设置 mode="region" 原生支持省市区三级联动，无需自己实现级联逻辑。',
      relatedControlId: 'form-cascader'
    },
    {
      id: 'q004',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '需要用户在 1-5 星之间打分评价，应该使用哪个控件？',
      options: ['slider', 'input', '自定义 rating 组件', 'picker'],
      answer: 2,
      explanation: '小程序没有原生评分控件，需要自定义组件实现。通常用图标 + data 评分值 + 点击事件实现星级评分。',
      relatedControlId: 'form-rating'
    },
    {
      id: 'q005',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '需要一个开关让用户开启/关闭消息推送，应该用哪个控件？',
      options: ['checkbox', 'switch', 'radio', 'button'],
      answer: 1,
      explanation: 'switch 是开关选择器，适合二态切换场景（开/关）。checkbox 是多选框，radio 是单选框，button 是按钮。',
      relatedControlId: 'form-switch'
    },
    {
      id: 'q006',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '需要在一组选项中让用户单选性别（男/女），应该用哪个控件？',
      options: ['checkbox-group', 'radio-group', 'switch', 'picker'],
      answer: 1,
      explanation: 'radio-group 是单选框组，适合在多个互斥选项中选一个。checkbox-group 是多选，switch 是开关，picker 是弹出选择器。',
      relatedControlId: 'form-radio'
    },
    {
      id: 'q007',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '需要让用户同时选择多个兴趣爱好，应该用哪个控件？',
      options: ['radio-group', 'checkbox-group', 'switch', 'slider'],
      answer: 1,
      explanation: 'checkbox-group 是多选框组，支持同时选择多个选项。radio-group 是单选，其余不适用。',
      relatedControlId: 'form-checkbox'
    },
    {
      id: 'q008',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '页面底部需要一个悬浮的"返回顶部"按钮，应该用哪种按钮？',
      options: ['普通 button', 'FAB（悬浮动作按钮）', 'loading 按钮', '禁用按钮'],
      answer: 1,
      explanation: 'FAB（Floating Action Button）是固定在页面某个位置的悬浮按钮，通过 position:fixed 实现，适合做返回顶部、快捷操作等。',
      relatedControlId: 'button-fab'
    },
    {
      id: 'q009',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '提交表单时按钮需要显示加载动画并禁止重复点击，应该用哪种按钮？',
      options: ['禁用按钮', '加载态按钮 (loading)', '普通按钮', 'FAB按钮'],
      answer: 1,
      explanation: 'loading 属性为 true 时，按钮会显示加载动画并且不可重复点击，适合表单提交等异步操作场景。',
      relatedControlId: 'button-loading'
    },
    {
      id: 'q010',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '需要展示一个操作进度（如文件上传 60%），应该用哪个控件？',
      options: ['步骤条 steps', '进度条 progress', '滑块 slider', '开关 switch'],
      answer: 1,
      explanation: 'progress 是进度条组件，通过 percent 属性设置百分比，适合展示单一任务的完成进度。步骤条适合多步骤流程。',
      relatedControlId: 'progress-linear'
    },
    {
      id: 'q011',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '电商下单流程需要展示"选商品→填地址→支付→完成"的步骤进度，应该用哪个控件？',
      options: ['进度条 progress', '步骤条 steps', '滑块 slider', '骨架屏 skeleton'],
      answer: 1,
      explanation: '步骤条适合展示多步骤流程的当前进度。进度条只适合单一任务的百分比，步骤条可以展示每个阶段的完成状态。',
      relatedControlId: 'progress-steps'
    },
    {
      id: 'q012',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '页面数据加载中需要显示占位骨架，应该用哪个控件？',
      options: ['空状态 empty-state', '骨架屏 skeleton', '进度条 progress', 'loading 按钮'],
      answer: 1,
      explanation: '骨架屏在数据加载期间显示灰色占位块，模拟页面布局结构，比白屏或转圈体验更好。',
      relatedControlId: 'progress-skeleton'
    },
    {
      id: 'q013',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '用户点击删除后需要弹窗确认"确定删除吗？"，应该用哪种反馈控件？',
      options: ['Toast 轻提示', 'Modal 对话框', 'ActionSheet 操作菜单', '进度条'],
      answer: 1,
      explanation: 'Modal（wx.showModal）是模态对话框，需要用户明确选择"确定"或"取消"，适合需要确认的操作。Toast 是轻提示自动消失，不适合需要确认的场景。',
      relatedControlId: 'feedback-modal'
    },
    {
      id: 'q014',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '操作成功后需要显示一个自动消失的提示"保存成功"，应该用哪种反馈控件？',
      options: ['Modal 对话框', 'Toast 轻提示', 'ActionSheet 操作菜单', '弹窗'],
      answer: 1,
      explanation: 'Toast（wx.showToast）是轻提示，默认 1.5 秒后自动消失，不打断用户操作，适合简单的成功/失败提示。',
      relatedControlId: 'feedback-toast'
    },
    {
      id: 'q015',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '点击"分享"按钮后需要弹出"发送给朋友/收藏/复制链接"选项列表，应该用哪种反馈控件？',
      options: ['Modal 对话框', 'Toast 轻提示', 'ActionSheet 操作菜单', '进度条'],
      answer: 2,
      explanation: 'ActionSheet（wx.showActionSheet）从底部弹出操作菜单列表，适合提供多个操作选项让用户选择。',
      relatedControlId: 'feedback-actionsheet'
    },
    {
      id: 'q016',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '需要展示多张商品图片并支持左右滑动浏览，应该用哪个控件？',
      options: ['swiper 轮播图', 'scroll-view 滚动视图', 'image 单图', 'picker'],
      answer: 0,
      explanation: 'swiper 是滑块视图容器，配合 swiper-item 可以实现轮播图效果，支持自动播放、指示点等。适合图片轮播场景。',
      relatedControlId: 'display-carousel'
    },
    {
      id: 'q017',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '需要展示一段可折叠的详细说明文字（默认收起，点击展开），应该用什么方式实现？',
      options: ['rich-text 富文本', '自定义可折叠文本组件', 'text 纯文本', 'picker'],
      answer: 1,
      explanation: '小程序没有原生可折叠文本控件，需要自定义实现。通常用 view + 条件渲染 wx:if + 点击事件控制展开/收起状态。',
      relatedControlId: 'display-collapsible'
    },
    {
      id: 'q018',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '需要展示一段带样式的富文本内容（含加粗、链接、图片），应该用哪个控件？',
      options: ['text 组件', 'rich-text 组件', 'view 组件', 'image 组件'],
      answer: 1,
      explanation: 'rich-text 组件可以解析 HTML 标签或 nodes 数组来渲染富文本内容，支持加粗、链接、图片等样式。text 只能显示纯文本。',
      relatedControlId: 'display-rich-text'
    },
    {
      id: 'q019',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '页面没有数据时需要显示"暂无内容"的空状态提示，应该用哪个控件？',
      options: ['骨架屏 skeleton', '空状态 empty-state', '进度条 progress', 'Toast'],
      answer: 1,
      explanation: '空状态组件用于在列表为空、搜索无结果、网络错误等场景下显示提示信息和引导操作，比白屏体验更好。',
      relatedControlId: 'display-empty-state'
    },
    {
      id: 'q020',
      category: 'control-recognition',
      type: 'feature-to-control',
      question: '需要播放一段视频并支持发送弹幕，应该用哪个控件？',
      options: ['image 组件', 'video 组件', 'audio 组件', 'swiper 组件'],
      answer: 1,
      explanation: 'video 组件原生支持弹幕功能，通过 danmu-list 属性传入弹幕数据，enable-danmu 开启弹幕功能。',
      relatedControlId: 'display-video-danmaku'
    },

    // ==================== 属性与事件 (20题) ====================
    {
      id: 'q021',
      category: 'props-events',
      type: 'property-identify',
      question: 'button 组件的 type 属性有哪几个有效值？',
      options: ['default / primary / warn', 'default / success / error', 'normal / active / disabled', 'primary / secondary / danger'],
      answer: 0,
      explanation: 'button 的 type 属性有三个值：default（白色默认）、primary（绿色主要）、warn（红色警告）。',
      relatedControlId: 'button-basic'
    },
    {
      id: 'q022',
      category: 'props-events',
      type: 'property-identify',
      question: 'button 组件的 size 属性默认值是什么？',
      options: ['default', 'mini', 'small', 'large'],
      answer: 0,
      explanation: 'button 的 size 属性默认值是 default（默认大小），可设为 mini（小尺寸按钮）。',
      relatedControlId: 'button-basic'
    },
    {
      id: 'q023',
      category: 'props-events',
      type: 'property-identify',
      question: 'input 组件中 bindinput 事件什么时候触发？',
      options: ['输入框失焦时', '输入框聚焦时', '每次输入内容变化时', '按下回车键时'],
      answer: 2,
      explanation: 'bindinput 在每次输入内容变化时触发，通过 e.detail.value 获取当前输入值。bindblur 是失焦时触发，bindfocus 是聚焦时触发。',
      relatedControlId: 'form-input'
    },
    {
      id: 'q024',
      category: 'props-events',
      type: 'property-identify',
      question: 'input 组件的 type 属性设为 "number" 时，用户能输入什么？',
      options: ['只能输入整数', '能输入数字和小数点', '只能输入字母', '可以输入任意字符'],
      answer: 0,
      explanation: 'type="number" 只允许输入数字（整数），不支持小数点。如果需要输入小数，应该用 type="digit"。',
      relatedControlId: 'form-input'
    },
    {
      id: 'q025',
      category: 'props-events',
      type: 'property-identify',
      question: 'switch 组件的 checked 属性作用是什么？',
      options: ['设置开关的颜色', '设置开关是否选中（开/关状态）', '设置开关大小', '设置开关是否禁用'],
      answer: 1,
      explanation: 'checked 属性控制开关的选中状态，true 为开启，false 为关闭。通过 bindchange 监听状态变化。',
      relatedControlId: 'form-switch'
    },
    {
      id: 'q026',
      category: 'props-events',
      type: 'property-identify',
      question: 'slider 组件的 min 和 max 属性默认值分别是多少？',
      options: ['0 和 100', '0 和 10', '1 和 100', '0 和 50'],
      answer: 0,
      explanation: 'slider 的 min 默认值为 0，max 默认值为 100。可以通过 step 属性设置步长（默认 1）。',
      relatedControlId: 'form-slider'
    },
    {
      id: 'q027',
      category: 'props-events',
      type: 'property-identify',
      question: 'radio 组件必须放在哪个父容器内才能实现单选效果？',
      options: ['view', 'radio-group', 'form', 'scroll-view'],
      answer: 1,
      explanation: 'radio 必须放在 radio-group 内，radio-group 会管理内部 radio 的互斥选中状态，通过 bindchange 获取选中值。',
      relatedControlId: 'form-radio'
    },
    {
      id: 'q028',
      category: 'props-events',
      type: 'property-identify',
      question: 'checkbox-group 的 bindchange 事件返回的 e.detail.value 是什么类型？',
      options: ['字符串', '数字', '数组', '对象'],
      answer: 2,
      explanation: 'checkbox-group 的 bindchange 返回的 e.detail.value 是数组类型，包含所有选中 checkbox 的 value 值。因为是多选，所以用数组。',
      relatedControlId: 'form-checkbox'
    },
    {
      id: 'q029',
      category: 'props-events',
      type: 'property-identify',
      question: 'picker 组件 mode="selector" 时，range 属性应该传入什么？',
      options: ['一个字符串', '一个数组（选项列表）', '一个数字', '一个对象'],
      answer: 1,
      explanation: 'range 属性传入一个数组作为选项列表，range-key 指定如果数组元素是对象时显示哪个字段。用户选择后通过 bindchange 获取索引。',
      relatedControlId: 'form-date-picker'
    },
    {
      id: 'q030',
      category: 'props-events',
      type: 'property-identify',
      question: 'progress 组件的 percent 属性取值范围是？',
      options: ['0-1', '0-100', '0-1000', '0-10'],
      answer: 1,
      explanation: 'percent 属性表示进度百分比，取值范围 0-100。大于 100 会被截断为 100，不需要手动除以 100。',
      relatedControlId: 'progress-linear'
    },
    {
      id: 'q031',
      category: 'props-events',
      type: 'property-identify',
      question: 'swiper 组件设置自动播放需要用哪个属性？',
      options: ['auto-play', 'autoplay', 'auto', 'play'],
      answer: 1,
      explanation: 'autoplay 属性设为 true 时轮播图自动切换。配合 interval（切换间隔，默认 5000ms）和 duration（动画时长，默认 500ms）使用。',
      relatedControlId: 'display-carousel'
    },
    {
      id: 'q032',
      category: 'props-events',
      type: 'property-identify',
      question: 'swiper 组件默认最多显示几个 swiper-item？',
      options: ['5个', '10个', '没有限制', '3个'],
      answer: 1,
      explanation: 'swiper 默认最多显示 10 个 swiper-item，超过会被截断。如果需要更多，需要减少每个 item 的复杂度或考虑用 scroll-view 替代。',
      relatedControlId: 'display-carousel'
    },
    {
      id: 'q033',
      category: 'props-events',
      type: 'property-identify',
      question: 'image 组件的 mode 属性设为 "aspectFill" 时是什么效果？',
      options: ['不保持纵横比缩放', '保持纵横比缩放，保证长边显示完整', '保持纵横比缩放，保证短边填满，可能裁切', '不缩放图片原尺寸'],
      answer: 2,
      explanation: 'aspectFill 保持纵横比缩放图片，只保证图片的短边能完全显示出来，长边会被裁切。适合做头像、封面等需要填满容器的场景。',
      relatedControlId: 'display-image-preview'
    },
    {
      id: 'q034',
      category: 'props-events',
      type: 'property-identify',
      question: 'image 组件的 mode 属性默认值是什么？',
      options: ['scaleToFill', 'aspectFit', 'aspectFill', 'widthFix'],
      answer: 0,
      explanation: 'mode 默认值是 scaleToFill，不保持纵横比拉伸缩放图片使图片完全填满 image 元素。这可能导致图片变形，通常建议改为 aspectFill 或 widthFix。',
      relatedControlId: 'display-image-preview'
    },
    {
      id: 'q035',
      category: 'props-events',
      type: 'property-identify',
      question: 'video 组件的 danmu-list 属性接收什么类型的数据？',
      options: ['字符串', '数组（弹幕对象数组）', '数字', '布尔值'],
      answer: 1,
      explanation: 'danmu-list 接收一个数组，每个元素是弹幕对象 {key, time, text, color}。需要配合 enable-danmu 属性开启弹幕功能。',
      relatedControlId: 'display-video-danmaku'
    },
    {
      id: 'q036',
      category: 'props-events',
      type: 'property-identify',
      question: 'scroll-view 组件实现上拉加载更多需要绑定哪个事件？',
      options: ['bindscroll', 'bindscrolltolower', 'bindscrolltoupper', 'bindtouchend'],
      answer: 1,
      explanation: 'bindscrolltolower 在滚动到底部时触发，配合 lower-threshold 设置触底距离。bindscrolltoupper 是滚动到顶部时触发（用于下拉刷新）。',
      relatedControlId: 'progress-pull-refresh'
    },
    {
      id: 'q037',
      category: 'props-events',
      type: 'property-identify',
      question: 'text 组件中 selectable 属性的作用是什么？',
      options: ['设置文字颜色', '设置文字是否可选中复制', '设置文字大小', '设置文字对齐方式'],
      answer: 1,
      explanation: 'selectable 属性设为 true 时文字可以被长按选中复制，默认为 false。在需要复制内容的场景（如订单号、链接）中很有用。',
      relatedControlId: 'display-text'
    },
    {
      id: 'q038',
      category: 'props-events',
      type: 'property-identify',
      question: 'button 组件的 open-type="share" 实现什么功能？',
      options: ['打开分享面板', '获取用户手机号', '打开客服会话', '获取用户授权'],
      answer: 0,
      explanation: 'open-type="share" 点击按钮后触发页面 onShareAppMessage 函数，实现转发分享功能。open-type="contact" 打开客服会话，open-type="getPhoneNumber" 获取手机号。',
      relatedControlId: 'button-basic'
    },
    {
      id: 'q039',
      category: 'props-events',
      type: 'property-identify',
      question: 'textarea 组件的 maxlength 属性默认值是？',
      options: ['100', '140', '无限制 (-1)', '500'],
      answer: 1,
      explanation: 'textarea 的 maxlength 默认值是 140，与朋友圈字数限制一致。设为 -1 时不限制最大输入长度。',
      relatedControlId: 'form-textarea'
    },
    {
      id: 'q040',
      category: 'props-events',
      type: 'property-identify',
      question: 'form 组件的 report-submit 属性设为 true 时，bindsubmit 事件能获取到什么？',
      options: ['表单所有字段值', 'formId（用于发送模板消息）', '用户信息', '页面路由'],
      answer: 1,
      explanation: 'report-submit=true 时，bindsubmit 事件的 e.detail.formId 可用于发送模板消息（现已被订阅消息替代）。表单字段值通过 e.detail.value 获取。',
      relatedControlId: 'form-input'
    },

    // ==================== 代码实现 (20题) ====================
    {
      id: 'q041',
      category: 'code-implementation',
      type: 'code-completion',
      question: 'WXML 中数据绑定使用什么语法？',
      options: ['{{ 变量名 }}', '${ 变量名 }', '{ 变量名 }', '<%= 变量名 %>'],
      answer: 0,
      explanation: 'WXML 使用双花括号 {{ }} 进行数据绑定，可以绑定变量、表达式、三元运算等。例如 {{name}}、{{a + b}}、{{flag ? "是" : "否"}}。',
      relatedControlId: null
    },
    {
      id: 'q042',
      category: 'code-implementation',
      type: 'code-completion',
      question: 'WXML 中列表渲染使用哪个指令？',
      options: ['wx:for', 'v-for', 'each', 'wx:loop'],
      answer: 0,
      explanation: 'wx:for 用于列表渲染，默认以 item 代表当前项，index 代表索引。可以用 wx:for-item 和 wx:for-index 自定义变量名。',
      relatedControlId: null
    },
    {
      id: 'q043',
      category: 'code-implementation',
      type: 'code-completion',
      question: 'WXML 中条件渲染使用哪个指令来判断是否显示元素？',
      options: ['wx:if', 'v-if', 'if', 'show'],
      answer: 0,
      explanation: 'wx:if 控制元素是否渲染（不存在于 DOM 中）。配合 wx:elif 和 wx:else 实现条件分支。另有 hidden 属性控制显示/隐藏（元素仍在 DOM 中）。',
      relatedControlId: null
    },
    {
      id: 'q044',
      category: 'code-implementation',
      type: 'code-completion',
      question: 'wx:for 循环中，当前项的默认变量名是什么？',
      options: ['item', 'current', 'value', 'data'],
      answer: 0,
      explanation: 'wx:for 默认用 item 表示当前项，index 表示当前索引。可通过 wx:for-item="row" 和 wx:for-index="idx" 自定义变量名。',
      relatedControlId: null
    },
    {
      id: 'q045',
      category: 'code-implementation',
      type: 'code-completion',
      question: '在 JS 中修改 data 中的数据，必须使用哪个方法？',
      options: ['this.data.x = value（直接赋值）', 'this.setData({ x: value })', 'this.set(x, value)', 'this.update({ x: value })'],
      answer: 1,
      explanation: '小程序中修改数据必须使用 this.setData() 方法，直接赋值 this.data.x = value 不会触发视图更新。setData 接收一个对象，键为数据路径，值为新数据。',
      relatedControlId: null
    },
    {
      id: 'q046',
      category: 'code-implementation',
      type: 'code-completion',
      question: '事件绑定时，catchtap 和 bindtap 的区别是什么？',
      options: ['catchtap 不触发事件，bindtap 触发', 'catchtap 阻止事件冒泡，bindtap 不阻止', 'catchtap 只触发一次，bindtap 可多次', '没有区别'],
      answer: 1,
      explanation: 'bindtap 绑定事件会冒泡到父元素，catchtap 绑定事件会阻止冒泡。如果不想点击事件传递给父元素，用 catchtap。',
      relatedControlId: null
    },
    {
      id: 'q047',
      category: 'code-implementation',
      type: 'code-completion',
      question: 'WXML 中给元素绑定点击事件，正确的写法是？',
      options: ['onclick="handleTap"', 'bindclick="handleTap"', 'bindtap="handleTap"', 'tap="handleTap"'],
      answer: 2,
      explanation: '小程序用 bindtap 或 catchtap 绑定触摸点击事件，不是 HTML 的 onclick。事件处理函数在 Page 或 Component 的 methods 中定义。',
      relatedControlId: null
    },
    {
      id: 'q048',
      category: 'code-implementation',
      type: 'code-completion',
      question: '在 wx:for 循环中，必须给每个项添加什么属性来提高渲染性能？',
      options: ['key', 'id', 'index', 'unique'],
      answer: 0,
      explanation: 'wx:key 指定列表项的唯一标识，帮助小程序识别项目变化，提高渲染效率。如果不指定，控制台会警告。key 值应为列表项中的唯一字段或 *this（item 本身唯一）。',
      relatedControlId: null
    },
    {
      id: 'q049',
      category: 'code-implementation',
      type: 'code-completion',
      question: 'WXML 中如何使用模板（template）？',
      options: ['<template name="xxx">', '<import src="xxx" />', '两者都需要', '不需要模板'],
      answer: 0,
      explanation: '使用 <template name="tplName"> 定义模板，用 <template is="tplName" data="{{...data}}" /> 使用模板。可通过 import 引入其他文件的模板。',
      relatedControlId: null
    },
    {
      id: 'q050',
      category: 'code-implementation',
      type: 'code-completion',
      question: 'setData 时如何修改数组中某个特定索引的元素？',
      options: ['直接 this.data.arr[0] = value', 'this.setData({ "arr[0]": value })', 'this.setData({ arr[0]: value })', '无法修改数组元素'],
      answer: 1,
      explanation: 'setData 支持数据路径表达式，用字符串形式的路径修改嵌套数据。如 this.setData({ "arr[0]": value }) 或 this.setData({ "obj.key": value })。',
      relatedControlId: null
    },
    {
      id: 'q051',
      category: 'code-implementation',
      type: 'code-completion',
      question: '事件对象 e 中，如何获取触发事件元素上通过 data-* 传递的自定义数据？',
      options: ['e.data', 'e.currentTarget.dataset', 'e.target.data', 'e.detail.data'],
      answer: 1,
      explanation: '通过 e.currentTarget.dataset 获取 WXML 中 data-* 属性的值。注意属性名会自动转小写：data-userName 在 dataset 中变为 userName。',
      relatedControlId: null
    },
    {
      id: 'q052',
      category: 'code-implementation',
      type: 'code-completion',
      question: 'WXSS 中 rpx 单位的作用是什么？',
      options: ['固定像素单位，1rpx=1px', '响应式像素，屏幕宽度自适应', '百分比单位', '字体大小单位'],
      answer: 1,
      explanation: 'rpx（responsive pixel）是小程序的响应式像素单位。规定屏幕宽度统一为 750rpx，无论设备实际宽度多少。iPhone6 上 1rpx = 0.5px。',
      relatedControlId: null
    },
    {
      id: 'q053',
      category: 'code-implementation',
      type: 'code-completion',
      question: 'WXSS 中如何引用其他 WXSS 文件？',
      options: ['@import "path/file.wxss";', 'import "path/file.wxss";', 'require("path/file.wxss")', '@include "path/file.wxss";'],
      answer: 0,
      explanation: '使用 @import 语句导入外部 WXSS 文件，路径为相对路径。导入的样式会和当前文件样式合并，后导入的优先级更高。',
      relatedControlId: null
    },
    {
      id: 'q054',
      category: 'code-implementation',
      type: 'code-completion',
      question: '在自定义组件中，定义组件的 JS 代码应该使用哪个构造器？',
      options: ['Page({})', 'Component({})', 'App({})', 'Module({})'],
      answer: 1,
      explanation: '自定义组件使用 Component({}) 构造器，在其中定义 properties（外部属性）、data（内部数据）、methods（方法）等。页面用 Page({})，应用用 App({})。',
      relatedControlId: null
    },
    {
      id: 'q055',
      category: 'code-implementation',
      type: 'code-completion',
      question: '自定义组件的 properties 中，如何设置属性的默认值？',
      options: ['properties: { name: "默认值" }', 'properties: { name: { type: String, value: "默认值" } }', 'properties: { name: { default: "默认值" } }', '在 data 中设置'],
      answer: 1,
      explanation: '属性定义为对象形式：{ type: String, value: "默认值", observer: function() {} }。type 指定类型，value 指定默认值，observer 是属性变化回调。',
      relatedControlId: null
    },
    {
      id: 'q056',
      category: 'code-implementation',
      type: 'code-completion',
      question: '父组件向子组件传递数据通过什么方式？',
      options: ['子组件的 data', '子组件的 properties', '全局变量', '事件传递'],
      answer: 1,
      explanation: '父组件在 WXML 中通过属性的方式传递数据给子组件的 properties。如 <child-comp title="{{title}}" />，子组件在 properties 中接收 title。',
      relatedControlId: null
    },
    {
      id: 'q057',
      category: 'code-implementation',
      type: 'code-completion',
      question: '子组件向父组件传递数据通过什么方式？',
      options: ['直接修改父组件 data', '通过 triggerEvent 触发自定义事件', '通过全局变量', '无法传递'],
      answer: 1,
      explanation: '子组件通过 this.triggerEvent("customEvent", detailData) 触发自定义事件，父组件在 WXML 中用 bind:customEvent 或 bindcustomEvent 监听并接收数据。',
      relatedControlId: null
    },
    {
      id: 'q058',
      category: 'code-implementation',
      type: 'code-completion',
      question: 'WXS（WeiXin Script）的作用是什么？',
      options: ['替代 JS 的后端语言', '在 WXML 中直接编写脚本处理数据', '编写 CSS 动画', '编写网络请求'],
      answer: 1,
      explanation: 'WXS 是小程序的脚本语言，可在 WXML 中直接编写数据处理逻辑（如格式化日期、过滤数据），减少在 JS 中 setData 的频率，提高性能。',
      relatedControlId: null
    },
    {
      id: 'q059',
      category: 'code-implementation',
      type: 'code-completion',
      question: 'hidden 属性和 wx:if 的区别是什么？',
      options: ['没有区别', 'hidden 控制显示隐藏（DOM 仍存在），wx:if 控制是否渲染（DOM 可不存在）', 'wx:if 性能更好', 'hidden 只对 view 有效'],
      answer: 1,
      explanation: 'wx:if 为 false 时元素不渲染（不在 DOM 中），切换时有渲染开销。hidden 为 true 时元素 display:none（仍在 DOM 中），切换开销小。频繁切换用 hidden，条件少变用 wx:if。',
      relatedControlId: null
    },
    {
      id: 'q060',
      category: 'code-implementation',
      type: 'code-completion',
      question: '在 WXML 中，block 标签的作用是什么？',
      options: ['显示一个块级元素', '作为包装元素接收列表/条件渲染指令，本身不渲染', '定义代码块', '替代 view 使用'],
      answer: 1,
      explanation: '<block> 是一个包装元素，不会在页面中渲染为实际 DOM 节点。主要用于在 wx:for 或 wx:if 上包装多个子元素，避免多余的 view 嵌套。',
      relatedControlId: null
    },

    // ==================== 文件体系 (20题) ====================
    {
      id: 'q061',
      category: 'file-system',
      type: 'file-type',
      question: '小程序中 .wxml 文件的作用是什么？',
      options: ['编写页面逻辑', '编写页面结构（类似 HTML）', '编写页面样式', '编写页面配置'],
      answer: 1,
      explanation: '.wxml（WeiXin Markup Language）是小程序的模板语言，用于描述页面结构，类似 HTML 但使用小程序组件和指令（wx:for、wx:if 等）。',
      relatedControlId: null
    },
    {
      id: 'q062',
      category: 'file-system',
      type: 'file-type',
      question: '小程序中 .wxss 文件的作用是什么？',
      options: ['编写页面结构', '编写页面样式（类似 CSS）', '编写页面逻辑', '编写页面路由'],
      answer: 1,
      explanation: '.wxss（WeiXin Style Sheets）是小程序的样式语言，类似 CSS，但增加了 rpx 响应式单位。支持 @import 导入其他 WXSS 文件。',
      relatedControlId: null
    },
    {
      id: 'q063',
      category: 'file-system',
      type: 'file-type',
      question: '小程序中 .json 文件在页面目录下的作用是什么？',
      options: ['存储页面数据', '配置页面属性（导航栏、组件引用等）', '存储页面路由', '存储页面样式'],
      answer: 1,
      explanation: '页面的 .json 文件用于配置当前页面的属性，如导航栏标题/颜色、是否允许下拉刷新、自定义组件引用（usingComponents）等。会覆盖 app.json 的全局配置。',
      relatedControlId: null
    },
    {
      id: 'q064',
      category: 'file-system',
      type: 'file-type',
      question: 'app.json 文件的作用是什么？',
      options: ['全局 JavaScript 逻辑', '全局配置（页面路由、窗口样式、tabBar 等）', '全局样式表', '全局数据存储'],
      answer: 1,
      explanation: 'app.json 是小程序的全局配置文件，配置页面路由列表（pages）、窗口样式（window）、底部 tabBar、网络超时时间、权限等。是小程序的"总入口"。',
      relatedControlId: null
    },
    {
      id: 'q065',
      category: 'file-system',
      type: 'file-type',
      question: 'app.js 文件中必须调用哪个函数来注册小程序实例？',
      options: ['Page({})', 'Component({})', 'App({})', 'createApp({})'],
      answer: 2,
      explanation: 'app.js 中调用 App({}) 注册小程序实例，在其中定义全局数据（globalData）、生命周期函数（onLaunch、onShow、onHide）等。整个小程序只有一个 App 实例。',
      relatedControlId: null
    },
    {
      id: 'q066',
      category: 'file-system',
      type: 'file-type',
      question: 'app.wxss 文件的作用是什么？',
      options: ['页面级样式', '全局样式，所有页面生效', '组件样式', '动态样式脚本'],
      answer: 1,
      explanation: 'app.wxss 是全局样式文件，定义的样式对所有页面生效。页面自己的 .wxss 文件样式会与 app.wxss 合并，页面级样式优先级更高。',
      relatedControlId: null
    },
    {
      id: 'q067',
      category: 'file-system',
      type: 'file-type',
      question: 'project.config.json 文件的作用是什么？',
      options: ['项目运行时配置', '开发者工具的项目配置（编译设置、AppID 等）', '项目依赖管理', '项目版本控制'],
      answer: 1,
      explanation: 'project.config.json 是微信开发者工具的项目配置文件，存储 AppID、编译模式、ES6 转换、自动补全等开发者工具相关的设置。不影响小程序运行时。',
      relatedControlId: null
    },
    {
      id: 'q068',
      category: 'file-system',
      type: 'file-type',
      question: 'sitemap.json 文件的作用是什么？',
      options: ['配置网站地图', '配置小程序页面是否允许被微信索引搜索', '配置页面路由', '配置SEO信息'],
      answer: 1,
      explanation: 'sitemap.json 配置小程序页面是否允许被微信内搜索索引。设为 {"rules":[{"action":"allow","page":"*"}]} 表示所有页面都允许被索引。',
      relatedControlId: null
    },
    {
      id: 'q069',
      category: 'file-system',
      type: 'file-type',
      question: '自定义组件需要几个文件？',
      options: ['2个（js + wxml）', '3个（js + wxml + json）', '4个（js + wxml + wxss + json）', '1个（js）'],
      answer: 2,
      explanation: '完整自定义组件需要 4 个文件：.js（组件逻辑）、.wxml（组件模板）、.wxss（组件样式）、.json（组件配置，需设置 "component": true）。',
      relatedControlId: null
    },
    {
      id: 'q070',
      category: 'file-system',
      type: 'file-type',
      question: '页面目录下 .js 文件中必须调用哪个函数注册页面？',
      options: ['App({})', 'Page({})', 'Component({})', 'createPage({})'],
      answer: 1,
      explanation: '页面 .js 文件中调用 Page({}) 注册页面实例，在其中定义 data、生命周期函数（onLoad、onShow 等）、事件处理函数。',
      relatedControlId: null
    },
    {
      id: 'q071',
      category: 'file-system',
      type: 'file-type',
      question: '页面 .json 文件中 usingComponents 字段的作用是什么？',
      options: ['声明页面使用的自定义组件', '声明页面使用的第三方库', '声明页面的系统组件', '声明页面的数据源'],
      answer: 0,
      explanation: 'usingComponents 声明当前页面要使用的自定义组件，格式为 { "组件名": "组件路径" }。声明后可在 WXML 中直接使用该组件标签。',
      relatedControlId: null
    },
    {
      id: 'q072',
      category: 'file-system',
      type: 'file-type',
      question: '小程序一个页面至少需要几个文件？',
      options: ['2个', '3个', '4个（js + wxml + wxss + json）', '1个'],
      answer: 2,
      explanation: '一个完整页面需要 4 个同名文件：.js（逻辑）、.wxml（结构）、.wxss（样式）、.json（配置）。其中 .wxss 和 .json 可以省略，但通常都保留。',
      relatedControlId: null
    },
    {
      id: 'q073',
      category: 'file-system',
      type: 'file-type',
      question: 'app.json 中 pages 数组的作用是什么？',
      options: ['声明全局组件', '注册所有页面路径，第一个为首页', '配置页面样式', '配置页面跳转规则'],
      answer: 1,
      explanation: 'pages 数组注册小程序所有页面路径，数组第一项默认为小程序的首页（启动页）。新增页面必须在此注册，否则无法访问。',
      relatedControlId: null
    },
    {
      id: 'q074',
      category: 'file-system',
      type: 'file-type',
      question: 'app.json 中 window 字段的作用是什么？',
      options: ['配置窗口大小', '配置全局默认窗口样式（导航栏、标题、背景色等）', '配置页面列表', '配置弹窗组件'],
      answer: 1,
      explanation: 'window 字段配置全局默认的窗口表现，如导航栏标题（navigationBarTitleText）、背景色、是否允许下拉刷新等。页面级 .json 可覆盖这些配置。',
      relatedControlId: null
    },
    {
      id: 'q075',
      category: 'file-system',
      type: 'file-type',
      question: 'app.json 中 tabBar 字段的作用是什么？',
      options: ['配置顶部标签栏', '配置底部导航栏（切换页面）', '配置顶部导航栏', '配置侧边栏'],
      answer: 1,
      explanation: 'tabBar 配置底部导航栏，最多 5 个标签，最少 2 个。每个标签包含 pagePath（页面路径）、text（文字）、iconPath（图标）、selectedIconPath（选中图标）。',
      relatedControlId: null
    },
    {
      id: 'q076',
      category: 'file-system',
      type: 'file-type',
      question: '小程序的 utils 目录通常用来存放什么？',
      options: ['页面文件', '工具函数和通用模块', '图片资源', '配置文件'],
      answer: 1,
      explanation: 'utils 目录用于存放公共工具函数，如日期格式化、网络请求封装、数据处理等。通过 module.exports 导出，在其他文件中 require 引入。',
      relatedControlId: null
    },
    {
      id: 'q077',
      category: 'file-system',
      type: 'file-type',
      question: '小程序中 require() 函数的作用是什么？',
      options: ['发起网络请求', '引入其他 JS 模块', '请求页面跳转', '请求数据存储'],
      answer: 1,
      explanation: 'require() 用于引入其他 JS 模块文件，如 const util = require("../../utils/util.js")。被引入的文件通过 module.exports 导出接口。',
      relatedControlId: null
    },
    {
      id: 'q078',
      category: 'file-system',
      type: 'file-type',
      question: '小程序中 images 目录通常存放什么？',
      options: ['JS 脚本', '图片资源（图标、背景图等）', '配置文件', '页面模板'],
      answer: 1,
      explanation: 'images 目录存放本地图片资源，如 tabBar 图标、页面中的图片等。注意小程序有包大小限制（2MB），大图建议用网络图片。',
      relatedControlId: null
    },
    {
      id: 'q079',
      category: 'file-system',
      type: 'file-type',
      question: '小程序中 data 目录通常存放什么？',
      options: ['页面数据', '静态数据文件（控件信息、题库等）', '数据库文件', '缓存数据'],
      answer: 1,
      explanation: 'data 目录存放项目的静态数据文件，如控件元数据、案例数据、题库等。这些文件通过 module.exports 导出数据，页面 require 引入使用。',
      relatedControlId: null
    },
    {
      id: 'q080',
      category: 'file-system',
      type: 'file-type',
      question: '组件的 .json 文件中 "component": true 表示什么？',
      options: ['这是一个系统组件', '声明该文件为自定义组件（而非页面）', '组件已启用', '组件可以被复用'],
      answer: 1,
      explanation: '"component": true 声明这是一组自定义组件文件，而不是页面。开发者工具据此区分组件和页面，组件用 Component({}) 注册，页面用 Page({}) 注册。',
      relatedControlId: null
    },

    // ==================== API与能力 (20题) ====================
    {
      id: 'q081',
      category: 'api-capability',
      type: 'api-identify',
      question: 'wx.showToast({ title: "成功", icon: "success" }) 中 icon 默认显示多长时间？',
      options: ['1秒', '1.5秒', '3秒', '5秒'],
      answer: 1,
      explanation: 'wx.showToast 默认 duration 为 1500ms（1.5秒）。可通过 duration 参数自定义。icon 可选值：success、error、loading、none。',
      relatedControlId: 'feedback-toast'
    },
    {
      id: 'q082',
      category: 'api-capability',
      type: 'api-identify',
      question: 'wx.showModal 的哪个回调可以获取用户点击了"确定"还是"取消"？',
      options: ['success 回调中 res.confirm', 'fail 回调中 res.confirm', 'complete 回调中 res.confirm', '无法获取'],
      answer: 0,
      explanation: 'success 回调的 res 对象中，res.confirm 为 true 表示用户点击了确定，res.cancel 为 true 表示点击了取消。res.content 可获取输入框内容（如果 showInput 为 true）。',
      relatedControlId: 'feedback-modal'
    },
    {
      id: 'q083',
      category: 'api-capability',
      type: 'api-identify',
      question: '页面跳转到详情页（保留当前页）应该用哪个 API？',
      options: ['wx.redirectTo', 'wx.navigateTo', 'wx.switchTab', 'wx.reLaunch'],
      answer: 1,
      explanation: 'wx.navigateTo 保留当前页面跳转到新页面，可通过返回按钮回到上一页。wx.redirectTo 关闭当前页跳转（不可返回）。wx.switchTab 跳转到 tabBar 页面。',
      relatedControlId: null
    },
    {
      id: 'q084',
      category: 'api-capability',
      type: 'api-identify',
      question: '关闭当前页面，跳转到应用内某个页面，应该用哪个 API？',
      options: ['wx.navigateTo', 'wx.redirectTo', 'wx.switchTab', 'wx.navigateBack'],
      answer: 1,
      explanation: 'wx.redirectTo 关闭当前页面跳转到目标页面，当前页面出栈，无法通过返回回到当前页。适合登录后跳转主页等不需要返回的场景。',
      relatedControlId: null
    },
    {
      id: 'q085',
      category: 'api-capability',
      type: 'api-identify',
      question: '将数据存储到本地缓存，应该用哪个 API？',
      options: ['wx.setStorage', 'wx.saveData', 'wx.storeLocal', 'wx.cacheData'],
      answer: 0,
      explanation: 'wx.setStorage({ key, data }) 是异步存储 API，wx.setStorageSync(key, data) 是同步版本。数据存储在本地缓存中，上限 10MB，除非主动清除否则一直存在。',
      relatedControlId: null
    },
    {
      id: 'q086',
      category: 'api-capability',
      type: 'api-identify',
      question: 'wx.setStorageSync 和 wx.setStorage 的区别是什么？',
      options: ['功能不同', '前者同步执行，后者异步执行（带回调）', '前者存储更大', '前者更安全'],
      answer: 1,
      explanation: '带 Sync 后缀的是同步方法，直接返回结果，会阻塞后续代码。不带的是异步方法，通过 success/fail 回调处理结果。功能完全相同，选择取决于是否需要等待存储完成。',
      relatedControlId: null
    },
    {
      id: 'q087',
      category: 'api-capability',
      type: 'api-identify',
      question: '从本地缓存中读取数据，应该用哪个 API？',
      options: ['wx.getStorage / wx.getStorageSync', 'wx.readStorage', 'wx.loadStorage', 'wx.fetchStorage'],
      answer: 0,
      explanation: 'wx.getStorageSync(key) 同步读取，返回对应 key 的数据。wx.getStorage({ key, success }) 异步读取。如果 key 不存在返回空字符串。',
      relatedControlId: null
    },
    {
      id: 'q088',
      category: 'api-capability',
      type: 'api-identify',
      question: '实现页面下拉刷新，需要在 .json 中配置什么？',
      options: ['"enablePullDownRefresh": true', '"pullDownRefresh": true', '"refresh": true', '"enableRefresh": true'],
      answer: 0,
      explanation: '页面 .json 中设置 enablePullDownRefresh: true 开启下拉刷新。然后在页面 .js 的 onPullDownRefresh 生命周期中处理刷新逻辑，完成后调用 wx.stopPullDownRefresh() 停止动画。',
      relatedControlId: 'progress-pull-refresh'
    },
    {
      id: 'q089',
      category: 'api-capability',
      type: 'api-identify',
      question: 'wx.request 网络请求中，method 属性默认值是什么？',
      options: ['POST', 'GET', 'PUT', 'DELETE'],
      answer: 1,
      explanation: 'wx.request 的 method 默认是 GET。如果需要 POST 请求需显式设置 method: "POST"，数据通过 data 属性传递。请求域名必须在后台配置合法域名。',
      relatedControlId: null
    },
    {
      id: 'q090',
      category: 'api-capability',
      type: 'api-identify',
      question: 'wx.previewImage 的作用是什么？',
      options: ['上传图片', '预览图片（全屏可缩放滑动）', '压缩图片', '保存图片到相册'],
      answer: 1,
      explanation: 'wx.previewImage 在新页面全屏预览图片，支持双指缩放、左右滑动。接收 urls（图片地址数组）和 current（当前显示图片地址）参数。',
      relatedControlId: 'display-image-preview'
    },
    {
      id: 'q091',
      category: 'api-capability',
      type: 'api-identify',
      question: 'wx.chooseImage 的作用是什么？',
      options: ['预览图片', '从相册或拍照选择图片', '裁剪图片', '压缩图片'],
      answer: 1,
      explanation: 'wx.chooseImage 让用户从相册选择或拍照获取图片，返回临时文件路径。count 参数设置最多可选数量。注意：新版本建议用 wx.chooseMedia 替代。',
      relatedControlId: null
    },
    {
      id: 'q092',
      category: 'api-capability',
      type: 'api-identify',
      question: '复制文本到剪贴板，应该用哪个 API？',
      options: ['wx.copyText', 'wx.setClipboardData', 'wx.clipboard', 'wx.copy'],
      answer: 1,
      explanation: 'wx.setClipboardData({ data: "要复制的文本" }) 复制内容到剪贴板。用 wx.getClipboardData 读取剪贴板内容。复制成功后小程序会自动弹出"内容已复制"提示。',
      relatedControlId: null
    },
    {
      id: 'q093',
      category: 'api-capability',
      type: 'api-identify',
      question: '获取系统信息（屏幕宽度、状态栏高度等），应该用哪个 API？',
      options: ['wx.getSystemInfo', 'wx.getDeviceInfo', 'wx.getScreenInfo', 'wx.getPlatform'],
      answer: 0,
      explanation: 'wx.getSystemInfo / wx.getSystemInfoSync 获取系统信息，包括屏幕宽高、状态栏高度、平台、系统版本等。常用于自定义导航栏适配刘海屏。',
      relatedControlId: null
    },
    {
      id: 'q094',
      category: 'api-capability',
      type: 'api-identify',
      question: 'wx.showActionSheet 中 itemList 最多支持多少个选项？',
      options: ['5个', '6个', '10个', '无限制'],
      answer: 1,
      explanation: 'wx.showActionSheet 的 itemList 最多 6 个选项。用户选择后通过 success 回调的 res.tapIndex 获取选中项的索引。',
      relatedControlId: 'feedback-actionsheet'
    },
    {
      id: 'q095',
      category: 'api-capability',
      type: 'api-identify',
      question: 'wx.showLoading 和 wx.showToast 能同时显示吗？',
      options: ['可以', '不能，它们互斥', '只在小程序前台时可以', '取决于icon参数'],
      answer: 1,
      explanation: 'wx.showLoading 和 wx.showToast 互斥，同时调用会覆盖。showLoading 需要 wx.hideLoading() 手动关闭。如果需要 loading + 文字提示，用 wx.showToast({ icon: "loading" })。',
      relatedControlId: 'feedback-loading'
    },
    {
      id: 'q096',
      category: 'api-capability',
      type: 'api-identify',
      question: '小程序页面生命周期的 onLoad 函数接收什么参数？',
      options: ['全局数据', '页面路由参数（query 参数）', '系统信息', '上一个页面的数据'],
      answer: 1,
      explanation: 'onLoad(options) 接收页面路由参数。如页面路径 detail?id=123，则 options = { id: "123" }。onLoad 只在页面加载时执行一次，适合做初始化。',
      relatedControlId: null
    },
    {
      id: 'q097',
      category: 'api-capability',
      type: 'api-identify',
      question: '页面 onShow 和 onLoad 的区别是什么？',
      options: ['没有区别', 'onLoad 只执行一次，onShow 每次显示页面都执行', 'onShow 只执行一次，onLoad 每次都执行', 'onShow 在 onLoad 之前执行'],
      answer: 1,
      explanation: 'onLoad 在页面加载时只执行一次。onShow 在每次页面显示时执行（包括从其他页面返回）。适合在 onShow 中刷新数据，在 onLoad 中做一次性初始化。',
      relatedControlId: null
    },
    {
      id: 'q098',
      category: 'api-capability',
      type: 'api-identify',
      question: 'wx.navigateTo 最多能保留多少层页面栈？',
      options: ['5层', '10层', '20层', '无限制'],
      answer: 1,
      explanation: '小程序页面栈最多 10 层。超过 10 层后 wx.navigateTo 会失效，需用 wx.redirectTo 替代（替换当前页而非入栈）。可通过 getCurrentPages() 获取当前页面栈。',
      relatedControlId: null
    },
    {
      id: 'q099',
      category: 'api-capability',
      type: 'api-identify',
      question: '触发手机短振动反馈，应该用哪个 API？',
      options: ['wx.vibrate', 'wx.vibrateShort', 'wx.shake', 'wx.haptic'],
      answer: 1,
      explanation: 'wx.vibrateShort() 触发 15ms 短振动，wx.vibrateLong() 触发 400ms 长振动。适合在关键操作（如支付成功、删除确认）时提供触觉反馈，增强体验。',
      relatedControlId: null
    },
    {
      id: 'q100',
      category: 'api-capability',
      type: 'api-identify',
      question: '在页面中获取其他页面的数据，应该用哪个 API？',
      options: ['wx.getPages', 'getCurrentPages()', 'wx.getPageData', 'this.$parent'],
      answer: 1,
      explanation: 'getCurrentPages() 返回当前页面栈数组，最后一个元素是当前页。可通过 pages[pages.length - 2].data 获取上一页数据，或调用上一页方法实现页面间通信。',
      relatedControlId: null
    },

    // ==================== 实战综合 (20题) ====================
    {
      id: 'q101',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '实现登录功能时，点击登录按钮后需要先校验表单再请求接口，以下哪种做法最合理？',
      options: ['直接请求接口，失败再提示', '先校验表单，通过后设 loading=true 再请求', '先请求再校验', '不需要校验，后端会处理'],
      answer: 1,
      explanation: '最佳实践：前端先校验（非空、格式），通过后设置 loading 状态防止重复点击，再发起请求。请求完成后关闭 loading 并处理结果。这样体验最好且避免无效请求。',
      relatedControlId: 'case-login'
    },
    {
      id: 'q102',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '商品列表实现无限滚动加载，核心逻辑是什么？',
      options: ['用 setInterval 定时加载', 'scroll-view 的 bindscrolltolower 触发加载下一页', '页面 onShow 时加载', '用 swiper 实现滚动'],
      answer: 1,
      explanation: '核心是 scroll-view 的 bindscrolltolower 事件，滚动到底部时触发加载下一页数据。需要维护分页参数（page/pageSize），追加数据到列表，并在没有更多数据时停止加载。',
      relatedControlId: 'case-product-list'
    },
    {
      id: 'q103',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '商品详情页选择规格（颜色、尺寸）的弹窗，最适合用哪种方式实现？',
      options: ['wx.showModal', 'wx.showActionSheet', '自定义底部弹出层组件', 'navigateTo 新页面'],
      answer: 2,
      explanation: '规格选择通常涉及多个选项（颜色、尺码、数量），结构复杂，wx.showModal 和 ActionSheet 无法满足。最佳方案是自定义底部弹出层（position:fixed + 动画），灵活控制内容和交互。',
      relatedControlId: 'case-product-detail'
    },
    {
      id: 'q104',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '多步表单（如订单填写：基本信息→地址→确认）中，切换步骤时数据应该如何处理？',
      options: ['每步独立存储，最后合并', '统一放在 data 中，步骤切换不丢失', '每步提交后端', '存在 localStorage 中'],
      answer: 1,
      explanation: '表单数据统一放在 Page data 中，步骤切换只改变 currentStep 变量控制显示内容，数据不丢失。全部填写完成后一次性提交。也可用 globalData 跨页面传递。',
      relatedControlId: 'case-order-form'
    },
    {
      id: 'q105',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '搜索框实现防抖（避免频繁请求）的核心思路是什么？',
      options: ['每次输入都立即请求', '用 setTimeout 延迟请求，每次输入清除上一个定时器', '用 setInterval 定时检查', '只在回车时请求'],
      answer: 1,
      explanation: '防抖核心：每次输入时清除上一个 setTimeout，重新设置新的延时。只有用户停止输入一段时间（如 300ms）后才真正发起请求，减少无效请求。',
      relatedControlId: 'case-search'
    },
    {
      id: 'q106',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '聊天页面发送消息后如何让列表自动滚动到底部？',
      options: ['用 scroll-view 的 scroll-into-view 指向最后一条消息', '无法自动滚动', '用 swiper 切换', '设置 scroll-top 为最大值'],
      answer: 0,
      explanation: '两种方式：1. scroll-view 的 scroll-into-view 属性设为最后一条消息的 id；2. scroll-top 设为一个大数值。推荐方式 1，更精确。发送后 setData 更新列表再触发滚动。',
      relatedControlId: 'case-chat'
    },
    {
      id: 'q107',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '数据看板中 KPI 数字滚动动画效果，最佳实现方式是什么？',
      options: ['用 CSS animation', '用 JS 定时器逐步增加数值并 setData', '用 Canvas 绘制', '用 swiper 切换'],
      answer: 1,
      explanation: '数字滚动动画：用 setInterval 或 requestAnimationFrame 在定时器中逐步增加数值并 setData 更新显示。动画结束后清除定时器。注意 setData 频率不要太高（建议 16ms 间隔）。',
      relatedControlId: 'case-dashboard'
    },
    {
      id: 'q108',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '个人中心"退出登录"功能，最佳交互方式是什么？',
      options: ['直接退出并跳转', 'wx.showModal 确认后再退出', 'wx.showToast 提示后退出', '不需要确认'],
      answer: 1,
      explanation: '退出登录是重要操作，应该用 wx.showModal 弹窗确认，避免误触。确认后清除登录状态（localStorage + globalData），跳转到登录页（用 wx.reLaunch 清空页面栈）。',
      relatedControlId: 'case-profile'
    },
    {
      id: 'q109',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '商品列表的 Tab 筛选（全部/新品/促销），切换 Tab 时应该怎么处理数据？',
      options: ['每次切换都重新请求全部数据再过滤', '切换时只请求对应分类的数据', '本地过滤已加载的数据', '刷新整个页面'],
      answer: 1,
      explanation: '最佳实践：切换 Tab 时重置分页参数，请求对应分类的第一页数据。如果数据量小也可以一次性请求全部再本地过滤，但大数据量时推荐按分类请求。',
      relatedControlId: 'case-product-list'
    },
    {
      id: 'q110',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '实现收藏功能，数据应该存储在哪里？',
      options: ['只存在 data 中（页面级）', '存在 localStorage 中（持久化）', '存在 globalData 中（应用级）', '存在后端数据库'],
      answer: 1,
      explanation: '收藏数据应存在 localStorage（wx.setStorage）中持久化，用户关闭再打开小程序仍在。同时可在 globalData 中缓存一份避免频繁读取。正式产品应同时存后端同步。',
      relatedControlId: null
    },
    {
      id: 'q111',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '图片九宫格展示中，点击某张图片预览全图，需要用到什么 API？',
      options: ['wx.previewImage', 'wx.navigateTo 新页面', 'swiper 组件', 'image 组件的 mode'],
      answer: 0,
      explanation: 'wx.previewImage({ urls: 图片数组, current: 当前图片 }) 打开全屏图片预览，支持双指缩放和左右滑动。将九宫格所有图片地址传入 urls，current 设为点击的那张。',
      relatedControlId: 'display-image-grid'
    },
    {
      id: 'q112',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '实现暗色/浅色主题切换，最核心的技术方案是什么？',
      options: ['切换不同的 WXSS 文件', '用 CSS 变量（自定义属性）切换颜色值', '用 JS 动态修改每个元素样式', '用不同的页面模板'],
      answer: 1,
      explanation: '最佳方案：在 app.wxss 中用 CSS 变量定义颜色（如 --bg-primary、--text-color），切换主题时修改根元素 class（如 page 上加 .dark），在 .dark 下重新定义变量值。所有组件引用变量自动适配。',
      relatedControlId: null
    },
    {
      id: 'q113',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '聊天消息长按弹出操作菜单（复制/删除/撤回），应该用什么实现？',
      options: ['wx.showModal', 'wx.showActionSheet', '自定义弹窗组件', 'bindlongpress + 自定义菜单'],
      answer: 1,
      explanation: '如果操作固定且简单，wx.showActionSheet 最方便。如果需要更复杂的 UI（带图标、自定义样式），则用 bindlongpress 事件 + 自定义弹出层。实际项目中两者都常见。',
      relatedControlId: 'case-chat'
    },
    {
      id: 'q114',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '订单表单中省市级联选择器的数据，应该如何组织？',
      options: ['每次选择时请求后端', '本地存储完整省市区数据', '用 picker mode="region" 原生组件', '用户手动输入'],
      answer: 2,
      explanation: '最佳方案是用 picker mode="region"，小程序原生支持省市区三级联动，不需要自己准备数据和维护级联逻辑。如果需要更灵活的自定义，才考虑本地数据或后端接口。',
      relatedControlId: 'form-cascader'
    },
    {
      id: 'q115',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '商品列表瀑布流布局，最佳实现方式是什么？',
      options: ['用 float 浮动布局', '用 flex 布局', '用双列 JS 计算高度分配', '用 CSS columns 布局'],
      answer: 2,
      explanation: '小程序不支持 CSS columns。瀑布流通常用 JS 分两列，维护每列累计高度，新图片分配到较短的列。也可用第三方瀑布流组件。CSS flex 配合 column-count 在部分场景可行但兼容性差。',
      relatedControlId: 'case-product-list'
    },
    {
      id: 'q116',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '表单提交时，如何防止用户快速点击导致重复提交？',
      options: ['用 loading 属性禁用按钮', '设置一个 submitting 标志位', '两者都可以', '无法防止'],
      answer: 2,
      explanation: '两种方式都有效：1. button 的 loading 属性会显示加载动画并禁用按钮；2. 在 JS 中设 submitting = true，请求完成后设回 false，期间忽略点击事件。实际项目中常两者结合使用。',
      relatedControlId: 'button-loading'
    },
    {
      id: 'q117',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '浏览历史功能中，历史记录应该存在哪里？',
      options: ['globalData（应用级，关闭后丢失）', 'localStorage（持久化存储）', 'data 中（页面级）', '后端数据库'],
      answer: 1,
      explanation: '浏览历史用 localStorage 持久化存储（wx.setStorage），用户关闭小程序后仍保留。每次浏览控件时更新历史数组（去重、限制数量），页面 onShow 时从 storage 读取。',
      relatedControlId: null
    },
    {
      id: 'q118',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '搜索页搜索历史记录，应该怎么管理？',
      options: ['永久保存所有搜索记录', '限制数量（如最多 20 条）+ 可单条删除 + 可清空', '每次打开页面自动清空', '存在后端'],
      answer: 1,
      explanation: '最佳实践：搜索记录存 localStorage，限制最多保存 N 条（如 20），新搜索去重并插入头部。支持单条删除（左滑或长按）和一键清空。提供热搜榜引导用户。',
      relatedControlId: 'case-search'
    },
    {
      id: 'q119',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '详情页 4 个 Tab 切换时，如何避免之前踩过的 "data-tab 字符串 vs 数字" 的坑？',
      options: ['用 === 严格比较', '在事件处理中用 Number() 转换 dataset 值', '在 WXML 中用 data-tab="{{0}}" 数字表达式', '选项 2 和 3 都可以'],
      answer: 3,
      explanation: '两种方式都正确：1. JS 中用 Number(e.currentTarget.dataset.tab) 转换；2. WXML 中 data-tab="{{0}}" 直接写数字表达式（不会被当作字符串）。推荐方式 2 更简洁。',
      relatedControlId: null
    },
    {
      id: 'q120',
      category: 'practice-comprehensive',
      type: 'scenario',
      question: '小程序代码中嵌入包含单引号的代码字符串（如 {{date || "请选择"}}），如何避免语法错误？',
      options: ['用转义符 \\\\ 转义内部引号', '外层用双引号包裹，内部用单引号', '外层用反引号模板字符串', '以上方式都可以'],
      answer: 3,
      explanation: '三种方式都可避免引号冲突：1. 转义内部引号 \\\'; 2. 外层用双引号，内部用单引号；3. 用反引号模板字符串。推荐方式 2 最简洁，方式 3 可读性最好但小程序对模板字符串支持在某些版本有差异。',
      relatedControlId: null
    },

    // ==================== 设备能力 (18题) ====================
    {
      id: 'q121',
      category: 'hardware-device',
      type: 'knowledge',
      question: 'wx.onGyroscopeChange 回调返回的 x/y/z 表示什么物理量？',
      options: ['角速度(rad/s)', '重力加速度(m/s²)', '设备方向角(°)', '经纬度坐标'],
      answer: 0,
      explanation: '陀螺仪测量角速度，单位为 rad/s，包含重力影响，需积分才能得到角度。',
      relatedControlId: 'gyroscope'
    },
    {
      id: 'q122',
      category: 'hardware-device',
      type: 'knowledge',
      question: '在页面 onUnload 时应调用哪个方法释放陀螺仪监听，避免内存泄漏？',
      options: ['wx.stopGyroscope()', 'wx.offGyroscopeChange()', '无需处理', 'wx.pauseGyroscope()'],
      answer: 0,
      explanation: 'wx.stopGyroscope() 停止监听并释放资源；离开页面务必调用，否则监听持续占用。',
      relatedControlId: 'gyroscope'
    },
    {
      id: 'q123',
      category: 'hardware-device',
      type: 'knowledge',
      question: '设备静止平放在桌面上时，加速度计返回的 z 值约为？',
      options: ['0', '9.8', '1', '不确定，随系统变化'],
      answer: 1,
      explanation: '加速度计返回含重力的合加速度，静止平放时 z≈9.8m/s²，x/y≈0。',
      relatedControlId: 'accelerometer'
    },
    {
      id: 'q124',
      category: 'hardware-device',
      type: 'knowledge',
      question: '关于 camera 原生组件，以下说法正确的是？',
      options: ['层级最低，可被普通组件覆盖', '层级最高，默认覆盖其他组件', '与 view 同级', '无法在真机预览'],
      answer: 1,
      explanation: 'camera 等原生组件层级最高，需用 cover-view 覆盖其上的内容；模拟器无法预览画面。',
      relatedControlId: 'camera'
    },
    {
      id: 'q125',
      category: 'hardware-device',
      type: 'knowledge',
      question: '用于从相册或拍摄选择图片/视频的新接口是？',
      options: ['wx.chooseImage', 'wx.chooseMedia', 'wx.chooseVideo', 'wx.saveImageToPhotosAlbum'],
      answer: 1,
      explanation: 'wx.chooseMedia 是新接口，统一替代已废弃的 chooseImage/chooseVideo，返回 tempFiles 数组。',
      relatedControlId: 'chooseMedia'
    },
    {
      id: 'q126',
      category: 'hardware-device',
      type: 'knowledge',
      question: '要在真机调用 wx.scanCode，必须在 app.json 的哪个字段声明？',
      options: ['requiredPrivateInfos', 'permission', 'usingComponents', 'tabBar'],
      answer: 0,
      explanation: 'scanCode 需在 app.json 的 requiredPrivateInfos 中声明才能在真机正常调用。',
      relatedControlId: 'scanCode'
    },
    {
      id: 'q127',
      category: 'hardware-device',
      type: 'knowledge',
      question: '调用 wx.getLocation 获取位置，requiredPrivateInfos 必须包含？',
      options: ['getLocation', 'chooseLocation', 'getLocation 和 chooseLocation', '无需声明'],
      answer: 0,
      explanation: '仅使用 getLocation 时，requiredPrivateInfos 声明 getLocation 即可；chooseLocation 用于地图选点场景。',
      relatedControlId: 'getLocation'
    },
    {
      id: 'q128',
      category: 'hardware-device',
      type: 'knowledge',
      question: 'app.json 中 permission 的 scope.userLocation 主要用于？',
      options: ['说明获取位置的用途（授权弹窗文案）', '声明 WiFi 权限', '声明录音权限', '配置 tabBar'],
      answer: 0,
      explanation: 'permission.scope.userLocation.desc 是授权弹窗向用户说明的用途文案，提升授权通过率。',
      relatedControlId: 'getLocation'
    },
    {
      id: 'q129',
      category: 'hardware-device',
      type: 'knowledge',
      question: '录制音频应调用哪个方法获取录音管理器？',
      options: ['wx.getRecorderManager()', 'new RecorderManager()', 'wx.createRecorder()', 'wx.startRecord()'],
      answer: 0,
      explanation: 'wx.getRecorderManager() 返回全局录音管理器，通过 start/stop 控制，onStop 拿到 tempFilePath。',
      relatedControlId: 'recorder'
    },
    {
      id: 'q130',
      category: 'hardware-device',
      type: 'knowledge',
      question: '播放音频文件应使用哪个 API？',
      options: ['wx.createInnerAudioContext()', 'wx.getAudioContext()', 'wx.createAudioContext()', 'wx.playAudio()'],
      answer: 0,
      explanation: 'wx.createInnerAudioContext() 创建实例，设置 src 后 play() 播放；注意 obeyMuteSwitch 的静音行为。',
      relatedControlId: 'audio'
    },
    {
      id: 'q131',
      category: 'hardware-device',
      type: 'knowledge',
      question: 'wx.setScreenBrightness 的 value 参数取值范围是？',
      options: ['0-1', '0-100', '1-10', '无限制'],
      answer: 0,
      explanation: '屏幕亮度 value 范围 0-1（0 最暗，1 最亮），超出会被截断。',
      relatedControlId: 'screenBrightness'
    },
    {
      id: 'q132',
      category: 'hardware-device',
      type: 'knowledge',
      question: '调用 wx.setClipboardData 写入剪贴板后，默认会？',
      options: ['自动弹出"内容已复制"提示', '需要开发者手动 wx.showToast', '无任何提示', '直接报错'],
      answer: 0,
      explanation: 'setClipboardData 成功后系统自动 toast"内容已复制"，无需自行提示，避免重复。',
      relatedControlId: 'clipboard'
    },
    {
      id: 'q133',
      category: 'hardware-device',
      type: 'knowledge',
      question: '在 iOS 上，wx.vibrateShort 的 type 支持以下哪些值？',
      options: ['heavy / medium / light 全部', '仅 medium / light', '仅 heavy', '不支持振动'],
      answer: 1,
      explanation: 'iOS 仅支持 medium 和 light，heavy 不被识别；且需系统开启振动。',
      relatedControlId: 'vibrate'
    },
    {
      id: 'q134',
      category: 'hardware-device',
      type: 'knowledge',
      question: '使用低功耗蓝牙前，必须首先调用哪个方法初始化模块？',
      options: ['wx.openBluetoothAdapter()', 'wx.startBluetoothDevicesDiscovery()', 'wx.getBluetoothDevices()', '无需初始化'],
      answer: 0,
      explanation: 'wx.openBluetoothAdapter() 初始化蓝牙适配器，之后才能搜索/连接设备。',
      relatedControlId: 'bluetooth'
    },
    {
      id: 'q135',
      category: 'hardware-device',
      type: 'knowledge',
      question: '在 Android 上搜索蓝牙设备，除蓝牙权限外还需？',
      options: ['定位权限', '存储权限', '相机权限', '无需额外权限'],
      answer: 0,
      explanation: 'Android 系统限制：搜索蓝牙需授予定位权限，否则搜不到设备。',
      relatedControlId: 'bluetooth'
    },
    {
      id: 'q136',
      category: 'hardware-device',
      type: 'knowledge',
      question: '小程序中可用于持久化存储用户文件的目录是？',
      options: ['wx.env.USER_DATA_PATH', 'wx.env.TEMP_FILE', '/tmp', 'wx.env.CACHE_PATH'],
      answer: 0,
      explanation: 'wx.env.USER_DATA_PATH 是用户目录，持久保存（卸载时清空）；适合存用户生成文件。',
      relatedControlId: 'fileSystem'
    },
    {
      id: 'q137',
      category: 'hardware-device',
      type: 'knowledge',
      question: '关于 NFC（HCE）能力的支持情况，正确的是？',
      options: ['仅部分 Android 机型支持', '所有平台均支持', '仅 iOS 支持', '开发者工具模拟器支持'],
      answer: 0,
      explanation: 'HCE 基于主机的卡模拟仅部分 Android 支持，iOS 不支持，模拟器也无法模拟。',
      relatedControlId: 'nfc'
    },
    {
      id: 'q138',
      category: 'hardware-device',
      type: 'knowledge',
      question: '本教程"我的"页面中的"模拟/真机"开关，控制哪个全局变量？',
      options: ['hardwareMode', 'theme', 'debug', 'simulateMode'],
      answer: 0,
      explanation: '开关写入并读取 app.globalData.hardwareMode，决定硬件详情页"效果演示"走模拟数据还是真机 API。',
      relatedControlId: null
    }
  ]
}

module.exports = quizData
