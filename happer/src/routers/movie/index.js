// 向外暴露Cinema路由
export default {
    // 访问路径
    path:"/movie",
    // 按需加载，映射到Cinema组件
    component:()=>import('@/views/Movie'),
    // City,NowPlaying,Coming,Search组件均在Movie页面中
    //因此在Movie路由中，为设置二级路由
    children:[
        {
            // 不需要加斜杠，不需要写为-/movie/city
            // 在访问时，会自动和一级路由拼接  
            path:'city',
            component:()=>import('@/components/City')
        },
        {
            path:'nowPlaying',
            component:()=>import('@/components/NowPlaying')
        },
        {
            path:'coming',
            component:()=>import('@/components/Coming')
        },
        {
            path:'search',
            component:()=>import('@/components/Search')
        },
        {
            // nowPlaying
            // 详情页————设置动态路由
            path:'detail/1/:movieId',
            components:{
                // default设置默认，解决详情页跳转时的空白
                default:()=>import('@/components/NowPlaying'),
                detail:()=>import('@/views/Movie/detail')
            },
            // 
            // 拿到Id值，如何跳转到对应的详情页
            // 路由组件传参（使用 props 将组件和路由解耦）
            //对于包含命名视图的路由，须为每个命名视图添加 `props` 选项
            //非多视图情况下，可写 prop:true
            props:{
                detail : true
            }
        },
        {
            // coming
            // 详情页————设置动态路由
            path:'detail/2/:movieId',
            components:{
                // default设置默认，解决详情页跳转时的空白
                default:()=>import('@/components/Coming'),
                detail:()=>import('@/views/Movie/detail')
            },
            // 
            // 拿到Id值，如何跳转到对应的详情页
            // 路由组件传参（使用 props 将组件和路由解耦）
            //对于包含命名视图的路由，须为每个命名视图添加 `props` 选项
            //非多视图情况下，可写 prop:true
            props:{
                detail : true
            }
        },
        {
           //重新定向
           path:'/movie',
           redirect:'/movie/nowPlaying'
        }

    ]
        
    }