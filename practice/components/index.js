import Vue from 'vue'

const comp = {
  template: '<div v-if="isShow" @click="handleShow">{{text}}</div>',
  // props: {
  //   text: String,
  //   isShow: Boolean
  // },
  //完整的形式
  props: {
    text: {
      type: String,
      required: true,
      // default: 'hah' //默认值
      // default () {
      //   return {} //如果这个默认值是一个对象，要采用这种函数的形式，类似于data()
      // },
      //如果想更严格地校验传过来的值，可以定义一个validator函数，value是传过来的值
      // validator (value) {
      //   return typeof value == 'string'
      // }
    },
    isShow: {
      type: Boolean,
      required: true
    }
  },
   //简写的方式
  // props: ['text', 'isShow'],
  data () {
      return {
          text2: 'this is comp'
      }
  },
  methods: {
    handleShow () {
      this.$emit('haha') //通过事件向父组件传值
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: comp //一般声明组件的名字都采用首字母大写的驼峰，因为一个组件就类似于一个class
  },
  data () {
    return {
      text: 'dff'
    }
  },
  methods: {
    handleShow () {
      alert('我传过来啦')
    }
  },
  //这里面接收子组件传过来的事件haha,通过@haha监听
  template: '<comp-one :text="text" :is-show="true" @haha="handleShow"></comp-one>'//这里传入的is-show建议采用这种形式，当然用isShow也可以
})