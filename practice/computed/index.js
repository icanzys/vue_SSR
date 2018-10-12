import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
  <div>
    <span>{{fullName}}</span>
    <span>{{getName()}}</span>
    <span>number:{{number}}</span>
    <span><input type="text" v-model="number"></span>
  </div>
  `,
  data: {
    firstName: '宇松',
    lastName: '张',
    number: 0
  },
  methods: {
    getName () {
      console.log('methods')
      return  `${this.lastName}${this.firstName}`
    }
  },
  computed: {
    fullName () {
      console.log('computed')
      return `${this.lastName}${this.firstName}`
    }
  },
  watch: {
    firstName (newVal, oldVal) {
      this.fullName = this.lastName + newVal

    }
  }
}) 
