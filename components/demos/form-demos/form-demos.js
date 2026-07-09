// components/demos/form-demos/form-demos.js
Component({
  properties: {
    controlId: { type: String, value: '' }
  },
  data: {
    radioValue: 'A',
    checkValues: ['apple'],
    switchVal: true,
    switchVal2: false,
    volume: 50,
    username: '',
    phone: '',
    password: '',
    content: '',
    date: '',
    time: '',
    region: ['广东省', '广州市', '海珠区'],
    rate: 0,
    rateHover: 0,
    checkboxOptions: ['apple', 'banana', 'orange', 'grape']
  },
  methods: {
    onRadioChange(e) {
      this.setData({ radioValue: e.detail.value })
      wx.vibrateShort({ type: 'light' })
    },
    onCheckTap(e) {
      const val = e.currentTarget.dataset.val
      const list = this.data.checkValues.slice()
      const idx = list.indexOf(val)
      if (idx > -1) list.splice(idx, 1)
      else list.push(val)
      this.setData({ checkValues: list })
    },
    onSwitchChange(e) {
      this.setData({ switchVal: e.detail.value })
    },
    onSwitchChange2(e) {
      this.setData({ switchVal2: e.detail.value })
    },
    onSliderChange(e) {
      this.setData({ volume: e.detail.value })
    },
    onSliderChanging(e) {
      this.setData({ volume: e.detail.value })
    },
    onUsernameInput(e) { this.setData({ username: e.detail.value }) },
    onPhoneInput(e) { this.setData({ phone: e.detail.value }) },
    onPwdInput(e) { this.setData({ password: e.detail.value }) },
    onContentInput(e) { this.setData({ content: e.detail.value }) },
    onDateChange(e) { this.setData({ date: e.detail.value }) },
    onTimeChange(e) { this.setData({ time: e.detail.value }) },
    onRegionChange(e) { this.setData({ region: e.detail.value }) },
    onRateTap(e) {
      const val = e.currentTarget.dataset.val
      this.setData({ rate: val, rateHover: val })
      wx.vibrateShort({ type: 'light' })
    },
    onRateHover(e) {
      this.setData({ rateHover: e.currentTarget.dataset.val })
    },
    onRateLeave() {
      this.setData({ rateHover: this.data.rate })
    }
  }
})
