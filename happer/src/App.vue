<template>
<!-- vue自带内置组件<keep-alive>，对页面进行缓存操作，避免每次切换时再次渲染页面 -->
<keep-alive>
    <!-- <router-view> 是用来渲染通过路由映射过来的组件 -->
    <router-view/>
</keep-alive>
</template>
