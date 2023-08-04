// 페이지를 관리해주는 구성 파일
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import About from './About'
import Movie from './Movie'
import NotFound from './NotFound'

export default createRouter({ // main.js에서  router라는 이름으로 받아서 사용
    // 2가지로 구분 1. 해쉬모드 , 2. 히스토리 모드
    // 여기서는 해쉬모드 사용
    // 도메인 뒤쪽에 #붙여서 해당하는 페이지에 접근 -> 새로고침 시 페이지 찾을 수 없음 방지
    history : createWebHashHistory(),
    scrollBehavior(){
        // 페이지 이동 시 top값이 0인 상태로 변경
        return { top : 0 }
    },
    // 페이지를 구분
    routes : [
        {
            path : '/', // path 페이지를 구분해주는 경로 
            component : Home // 연결되어 있는 컴포넌트가 실행됨
        },
        {
            path : '/movie/:id', 
            // 받는 id 값에 따라 동적으로 movie뒤의 주소가 바뀌어야함 :(콜론)뒤에 파라미터 적기
            component : Movie
        },
        {
            path : '/about', 
            component : About
        },
        {
            path : '/:notFound(.*)', // .* -> 일치시킬 수 있는 모든 경로와 일치시킴
            component : NotFound 
        }
    ]
})