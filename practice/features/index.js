import Vue from 'vue'

const comp = {
  // template: `
  //   <div :style="style">
  //   <slot></slot>
  //   </div>
  // `,
  //这里通过render()方法来替换template
  render(createElement){
    return createElement(
      'div',//第一个参数传名字
      //第二个参数传属性
      {
        style: this.style
      },
      this.$slots.default //这里因为slot是vue里内置的组件，因此可以用this.$slots.default代替（如果是有name属性的，name就可以用this.$slots.名字）
    )
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      }
    }
  }
}

new Vue({
  el: '#root',
  components: {
    CompOne: comp
  },
  data () {
    return {
      value: 'hah'
    }
  },
  // template: `
  //   <comp-one ref="comp">
  //     <span ref="span">{{value}}</span> 
  //   </comp-one>
  // `,
  // render () {
  //   return this.$createElement() //这种方式可以
  // }
  //这里通过render()方法来替换template
  render (createElement) {
    return createElement(
      'comp-one', //第一个参数传名字
      //第二个参数传属性
      {
        ref: "comp"
      },
      //第三个参数传节点里面的值（在这里节点里面又是一个span节点，当然喝如果内容是节点，要使用数组）
      [
        createElement('div',{ref:"span"},this.value) //这个节点的创建和上面类似
      ]
    )
  }
})