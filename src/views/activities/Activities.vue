
<template>
    <router-view></router-view>
</template>

<script>
export default {
    beforeEnter(to, from, next) {
        console.log("asf");
        next();
    }
}
</script>
