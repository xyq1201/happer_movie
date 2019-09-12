//用vue功能
import Vue from 'vue'
import MessageBox from './MessageBox'
//做一个对外接口（因为可能会有多个接口） 
//定义一个变量messageBox ，做一个闭包
export var messageBox = (function(){
    //做一个默认值（当不去指定时，显示默认值）
    var defaults  = {
        title:'',
        content:'',
        cancel:'',
        ok:'',
        //为确定和取消按钮写方法，让其有一定的事件
        //初始为null或空函数function(){}
        handleToCancel:null,
        handleToOk:null 
    }
    
    //使js与vue文件结合
    //使用基础 Vue 构造器extend，创建一个“子类”。参数是一个包含组件选项的对象。
    //在 Vue.extend() 中它必须是函数
    //extend将MessageBox结合，找到其内的东西，并返回一个新类，新类就可和组件结合
    var MyComponent = Vue.extend(MessageBox)
    //return 返回具体调用弹窗时的function(){}
    //opts：配置参数
    return function(opts){
        //使用for..in对默认进行覆盖
        for(var attr in opts){
            defaults[attr]  = opts[attr]
        }

        //引入新类，创建对象
        var vm = new MyComponent({
            //创建弹窗容器
            el:document.createElement('div'),
            //数据
            data:{
                title : defaults.title,
                content : defaults.content,
                cancel : defaults.cancel,
                ok : defaults.ok
            },
            //确定和取消按钮的方法
            methods:{
                handleToCancel(){
                    //判断defaults.handleCancel是否存在
                    //要让handleCancel拿到vm组件对象，用call将this传入，改变this指向问题
                    defaults.handleToCancel && defaults.handleToCancel.call(this)
                    //点击后移除弹窗
                    document.body.removeChild(vm.$el)
                },
                handleToOk(){
                    defaults.handleToOk && defaults.handleToOk.call(this)
                    document.body.removeChild(vm.$el)
                }
            }
        })
        //将弹窗添加到body下
        document.body.appendChild(vm.$el)
    }
    

})()