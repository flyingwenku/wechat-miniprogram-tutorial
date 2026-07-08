// components/skeleton/skeleton.js
Component({
  properties: {
    loading: { type: Boolean, value: true },
    rows: { type: Number, value: 3 }
  },
  data: {
    rowList: []
  },
  observers: {
    'rows': function (val) {
      this.setData({ rowList: Array.from({ length: val }, (_, i) => i) })
    }
  },
  lifetimes: {
    attached() {
      this.setData({ rowList: Array.from({ length: this.data.rows }, (_, i) => i) })
    }
  }
})
