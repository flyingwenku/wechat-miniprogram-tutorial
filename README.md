# 交互控件教程小程序 — 使用说明

## 项目概述

一款面向微信小程序开发者的交互控件学习工具，系统展示 42+ 个控件的实际效果、属性说明、示例代码和使用提示。完整源码，可商用。

## 快速开始

### 1. 导入项目

1. 打开**微信开发者工具**
2. 选择「导入项目」
3. 项目目录选择 `miniprogram-tutorial` 文件夹
4. AppID 选择「测试号」或填入你自己的 AppID
5. 点击导入即可运行

### 2. 目录结构

```
miniprogram-tutorial/
├── app.js                    # 全局逻辑（主题、收藏、历史）
├── app.json                  # 全局配置（页面路由、TabBar）
├── app.wxss                  # 全局样式（设计系统、CSS变量）
├── project.config.json       # 项目配置
├── sitemap.json              # 搜索配置
│
├── pages/                    # 页面
│   ├── index/                # 首页 - 分类导航大厅
│   ├── category/             # 分类列表页
│   ├── detail/               # 控件详情页（核心）
│   ├── search/               # 搜索页
│   ├── favorite/             # 收藏列表
│   ├── history/              # 浏览历史
│   ├── profile/              # 个人中心
│   └── about/                # 关于页面
│
├── components/               # 自定义组件
│   ├── nav-bar/              # 自定义导航栏
│   ├── code-block/           # 代码展示 + 复制
│   ├── prop-table/           # 属性说明表格
│   ├── empty-state/          # 空状态组件
│   └── demos/                # 控件/案例演示组件
│       ├── button-demos/     # 按钮类（6个）
│       ├── form-demos/       # 表单类（9个）
│       ├── progress-demos/   # 进度类（4个）
│       ├── feedback-demos/   # 反馈类（5个）
│       ├── display-demos/    # 展示类（18个）
│       └── case-demos/       # 实战案例（8个）
│
├── data/
│   └── controls.js           # 所有控件元数据
│
├── utils/
│   └── util.js               # 工具函数
│
└── images/                   # 图片资源目录
```

### 3. 控件清单（42个）

| 分类 | 控件 | 数量 |
|------|------|------|
| 按钮 | 基础按钮、图文按钮、禁用按钮、加载按钮、自定义样式、悬浮FAB | 6 |
| 表单 | 单选框、复选框、开关、滑块、输入框、文本域、日期选择器、省市级联、评分 | 9 |
| 进度 | 线性进度条、圆形进度条、步骤条、骨架屏 | 4 |
| 反馈 | 对话框Modal、轻提示Toast、操作菜单ActionSheet、加载弹窗、消息提示条 | 5 |
| 文字 | 多层级排版、富文本、可折叠文本、代码块 | 4 |
| 图片 | 单图预览、九宫格、懒加载、轮播图、瀑布流 | 5 |
| 视频 | 视频播放器、弹幕视频、视频列表、全屏播放 | 4 |
| 其他 | 标签Tag、卡片Card、列表List、分割线、图标库 | 5 |

## 核心功能

### 详情页 Tab 切换

每个控件详情页包含 4 个 Tab：
1. **效果演示** — 可直接交互的真实控件
2. **属性说明** — 属性名、类型、默认值、说明表格
3. **示例代码** — WXML / JS / WXSS 代码，支持一键复制
4. **使用提示** — 最佳实践和注意事项

### 主题切换

- 在「我的」页面可切换深色/浅色模式
- 主题偏好保存在本地存储，下次打开自动恢复
- 全局使用 CSS 变量实现主题切换

### 收藏功能

- 在控件详情页点击收藏按钮即可收藏
- 收藏列表在 TabBar「收藏」页查看
- 收藏数据保存在本地存储

### 浏览历史

- 自动记录最近浏览的 50 个控件
- 首页显示最近 6 条浏览记录
- 历史页可查看完整记录和清空

### 搜索

- 支持按控件名称、描述、分类搜索
- 实时搜索，输入即出结果

## 技术要点

### 设计系统

全局使用 CSS 变量定义设计 Token：
- 主题色：`--color-primary` / `--color-success` / `--color-warning` / `--color-danger`
- 背景：`--bg-page` / `--bg-card` / `--bg-hover`
- 文字：`--text-primary` / `--text-secondary` / `--text-tertiary`
- 圆角：`--radius-sm` / `--radius-md` / `--radius-lg` / `--radius-full`
- 间距：`--space-xs` / `--space-sm` / `--space-md` / `--space-lg`

### 自定义导航栏

使用 `navigationStyle: custom` 自定义导航栏，适配刘海屏和不同机型。`nav-bar` 组件封装了状态栏高度计算和返回按钮逻辑。

### 数据驱动

所有控件数据集中在 `data/controls.js`，包含：
- 控件 ID、名称、描述
- 属性列表（name / type / default / desc）
- 示例代码（wxml / js / wxss）
- 使用提示

新增控件只需在数据文件中添加一条记录，并在对应的 demo 组件中实现演示逻辑。

### 演示组件架构

5 个按分类组织的演示组件：
- 每个组件接收 `controlId` 属性
- 通过 `wx:if/wx:elif` 渲染对应的演示
- 详情页根据控件的 `categoryId` 加载对应的演示组件

## 扩展指南

### 新增一个控件

1. 在 `data/controls.js` 对应分类的 `controls` 数组中添加控件数据
2. 在对应的 `components/demos/` 演示组件中添加 `wx:elif` 演示块
3. 在演示组件的 JS 中添加交互逻辑
4. 在演示组件的 WXSS 中添加样式

### 新增一个分类

1. 在 `data/controls.js` 的 `categories` 数组中添加新分类
2. 在 `components/demos/` 下创建新的演示组件
3. 在 `pages/detail/detail.json` 中注册新组件
4. 在 `pages/detail/detail.wxml` 中添加 `wx:elif` 条件

## 注意事项

1. **视频域名**：视频使用了微信示例地址，正式使用需在后台配置视频域名白名单
2. **图片资源**：使用了 picsum.photos 和 pravatar.cc 公开图床，正式环境建议替换为自己的图片 CDN
3. **AppID**：测试号无法使用分享等功能，正式发布需使用真实 AppID
4. **Canvas 2D**：圆形进度条使用了 Canvas 2D API，需要基础库 2.9.0+
5. **代码复制**：使用了 `wx.setClipboardData` API，部分低端机型可能有限制

## 许可

完整源码，可商用。
