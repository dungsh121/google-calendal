<template>
   <div id="main">
    <Header/>
       <div class="content">
            <router-view></router-view>
       </div>

   </div>
</template>

<script>
    import Header from "./Header";
    import Home from "./Home";
    export default {
        name: 'main-app',
        components: {Home, Header}
    }
</script>
