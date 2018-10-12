import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  //默认，重定向到app，记得要加<router-view>这个占位符
  {
    path: '/',
    redirect: '/app',
  },
  {
    path:'/app',
    component: Todo,
    name: 'app', //这里命名，在router-link里可以用name去做跳转，方便维护
    meta: {//处理页面源信息，有利于seo
      title: 'this is app',
      description: 'sfsdfsfs'
    },
    //子路由,也要在父级加<router-view>来占位
    children: [
      {
        path: 'test',
        component: Test
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]