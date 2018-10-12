import Vue from 'vue'

const app = new Vue({
  el: '#root',
  template: '<div ref="div">{{text}}</div>',
  data: {
    text: 0
  },
  // watch: {
  //   text: (newVal,oldVal) => {
  //     console.log(`${newVal} : ${oldVal}`)
  //   }
  // }
})

setInterval(() => {
  app.text += 1
},1000)

// console.log(app.text)
// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)
// console.log(app.$root)
// console.log(app.$root === app)
// console.log(app.$children)
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs)
// console.log(app.$isServer)
// app.$watch('text', (newVal, oldVal) => {
//   console.log(`${newVal} : ${oldVal}`)
// })
app.$on('test', () => {
  console.log('test emit')
})
app.$emit('test')
