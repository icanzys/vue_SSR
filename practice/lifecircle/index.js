import Vue from 'vue'

new Vue({
  el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 'aaaa'
  },
  beforeCreate () {
    console.log(this,'beforeCreate')
  },
  created () {
    console.log(this,'created')
  },
  beforeMount () {
    console.log(this,'beforeMount')
  },
  mounted () {
    console.log(this,'mounted')
  },
  beforeUpdate () {
    console.log(this,'beforeUpdate')
  },
  updated () {
    console.log(this,'update')
  },
  beforeDestroy () {
    console.log(this,'beforeDestroy')
  },
  destroyed () {
    console.log(this,'destroyed')
  },
  activated () {
    console.log(this,'activated')
  },
  deactivated () {
    console.log(this,'deactivated')
  },
})
