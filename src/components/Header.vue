<template>
    <header>
        <Logo />
        <div class="nav nav-pills">
            <div v-for="nav in navigations" :key="nav.name" class="nav-item">
                <RouterLink :to="nav.href" active-class="active" :class="{active:isMatch(nav.path)}" class="nav-link">
                    {{ nav.name }}
                </RouterLink>
            </div>
        </div>
        <div class="user" @click="toAbout">
            <img :src="image" :alt="name">
        </div>
    </header>
</template>

<script>
import { mapState } from 'vuex'
import Logo from '~/components/Logo'
export default {
    components : {
        Logo
    },
    computed : {
        ...mapState('about', [
                'image',
                'name',
        ]) 
    },
    data(){
        return {
            navigations :[
                {
                    name : 'Search',
                    href : '/'
                },
                {
                    name : 'Movie',
                    href : '/movie/tt4520988',
                    // 정규표현식으로 링크가 /movie로 시작하면 nav버튼에 active클래스 추가(버튼 활성화)
                    path : /^\/movie/
                },
                {
                    name : 'About',
                    href : '/about'
                }
            ]
        }
    },
    methods : {
        // boolean 데이터를 반환해서 true면 active라는 클래스가 RouterLink에 붙음
        isMatch(path){ // path 정규표현식을 받아서 내부에서 활용
            // path라는 속성이 없으면 false 반환
            if(!path) return false
            return path.test(this.$route.fullPath) // 정규표현식과 일치하는지 확인 일치하면 true반환
        },
        toAbout(){
            // 클릭이벤트 -> 클릭하면 about으로 이동
            // $router.push(이동할라우트경로) 로도 페이지 이동 가능(RouterLink와 비슷한 역할)
            this.$router.push('/about')
        }
    }
}

</script>

<style lang="scss" scoped>
    // @import "~/scss/main";
    header {
        height: 70px;
        display: flex;
        align-items: center;
        padding: 0 40px;
        position: relative;
        .logo {
            margin-right: 40px;
        }
        .user {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 40px;
            margin: auto;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-sizing: border-box;
            background-color: $gray-200;
            overflow: hidden;
            cursor: pointer;
            border : 3px solid $primary;
            transition: box-shadow .4s;
            &:hover {
                box-shadow: 3px 3px 10px $primary;
            }
            img {
                width: 100%;
            }
        }
        // 반응형으로 만들기 위한 부트스트랩 breakpoint
        // sm 576 ~ 768 
        // md 768 ~ 992
        // lg 992 ~ 1200
        // xl 1200 ~ 1400
        // xxl 1400 ~
        @include media-breakpoint-down(sm){ // 가로너비가 576px 보다 작을 때
            .nav {
                display: none;
            }
        }
    }

</style>