<template>
    <RouterLink to="/" class="logo">
        <span>OMDbAPI</span>.COM
    </RouterLink>
</template>

<style lang="scss" scoped>
// scoped 를 써주면 작성된 css 설정이 현재 컴포넌트에만 적용됨
// @import "~/scss/main";
   .logo {
        font-family: "Oswald", sans-serif;
        font-size: 20px;
        color: $black;
        text-decoration: none;
        &:hover {
            color: $black;
        }
        span {
            color: $primary;
        }
}
</style>