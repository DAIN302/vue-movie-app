// 스토어 구성
import { createStore } from 'vuex'
import movie from './movie'
import about from './about'

export default createStore({
    modules : {
        // 데이터의 타입들에 모듈이 연결
        movie,
        about
    }
})