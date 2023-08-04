<template>
    <Header />
    <!-- RouterView : 페이지가 출력(렌더링)되는 영역 컴포넌트 -->
    <!-- RouterLink : 페이지 이동을 위한 링크 컴포넌트 -->
    <RouterView />
    <Footer />
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'


export default {
    components : {
        Header,
        Footer
    }
}

// $route : Route(페이지) 정보를 가지는 객체
// $router : Route(페이지) 조작을 위한 객체
</script>

<style lang="scss">
    // @import "~/scss/main";
    body {
        line-height: 1.4;
        font-family: 'Roboto', sans-serif;
    }
</style>

