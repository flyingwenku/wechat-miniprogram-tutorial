// components/code-block/code-block.js
const util = require('../../utils/util.js')

Component({
  properties: {
    code: { type: String, value: '' },
    lang: { type: String, value: 'WXML' }
  },

  data: {
    copied: false
  },

  methods: {
    onCopy() {
      util.copyToClipboard(this.data.code)
      this.setData({ copied: true })
      setTimeout(() => {
        this.setData({ copied: false })
      }, 2000)
    }
  }
})
