import Router from 'vue-router'

import routes from './routes'

// const router = new Router({
//   routes
// })

// export default router //这种方式到导出去的话，全局import的都是同一个router

//因为上面的缺点，所以这里用函数的方式导出
export default () => {
  return new Router({
    routes,
    //如果不加这个，是通过hash去控制路由的跳转，加上了这个就不会有#
    mode: 'history',//localhost:8080/app(这里没有#了)
    base: '/base/', //加上这个，效果:localhost:8080/base/app
    linkActiveClass: 'active-class', //将这两个点击跳转的时候的class重新命名，方便我们后来去加样式上去
    linkExactActiveClass: 'exact-active-class', //这个和linkActiveClass的区别在于这个是确确实实的点击，现在也正在这里，而上面的是父级
    //页面跳转的时候，页面的滚动行为
    scrollBehavior(to, from ,savedPosition) {
      //如果有滚动行为，直接返回
      if (savedPosition) {
        return savedPosition
      //如果没有直接回来左上角
      } else {
        return {x:0, y:0}
      }
    },
    //不是所有的浏览器都支持这种history形式的前端路由，在不支持的情况下vue会自动fallback hash的形式
    fallback: true //控制vue自不自动处理成hash（在不支持history的情况下）
    // parseQuery (query) {},
    // stringifyQuery (obj) {},
  })
}