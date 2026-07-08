// utils/util.js

// 格式化时间
function formatTime(timestamp) {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date

  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
  if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
  if (diff < 604800000) return Math.floor(diff / 86400000) + '天前'

  const y = date.getFullYear()
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = date.getDate().toString().padStart(2, '0')
  return `${y}-${m}-${d}`
}

// 复制到剪贴板
function copyToClipboard(text) {
  return new Promise((resolve, reject) => {
    wx.setClipboardData({
      data: text,
      success: () => {
        wx.showToast({ title: '已复制', icon: 'success' })
        resolve()
      },
      fail: (err) => {
        wx.showToast({ title: '复制失败', icon: 'none' })
        reject(err)
      }
    })
  })
}

// 轻触震动
function vibrate(short = true) {
  if (short) {
    wx.vibrateShort({ type: 'light' })
  } else {
    wx.vibrateLong()
  }
}

module.exports = {
  formatTime,
  copyToClipboard,
  vibrate
}
