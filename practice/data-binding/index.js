import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>{{isActive}}</div>
  `,
  data: {
    isActive: false
  }
})
