import axios from 'axios'
import _uniqBy from 'lodash/unionBy' // 중복 데이터 제거

const _defaultMsg = 'Search for the movie title!'

export default {
    // namespaced 모듈화되서 사용할 수 있다는 것을 명시
    namespaced : true,
    // state - 데이터
    state : ()=>{
        return {
            movies : [],
            message : _defaultMsg,
            loading : false,
            theMovie : {}
        }
    },
    // getters 계산된 상태를 만듬(computed)
    // state의 데이터를 특정하게 계산하여 새로운 데이터 형식으로 만듬
    // getters : {
    //     movieIds(state){
    //         return state.movies.map(m=>m.imdbID) // 아이디값만 추출하여 반환
    //     }
    // },
    // mutations : state의 데이터 변경시켜줌 뮤테이션에서만 데이터를 변경할 수 있다
    mutations : {
        // 통합적으로 데이터를 갱신하는 메서드
        updateState(state, payload){
            // 받은 객체 데이터를 배열 데이터로 반환
            // ['movies','message','loading']
            Object.keys(payload).forEach(key => {
                state[key] = payload[key] // 새롭게 받은 특정 데이터를 state에 할당
                // key는 각각 ['movies','message','loading'] 의 값 
            })
        }, 
        // 데이터 초기화 메서드
        resetMovies(state) {
            state.movies = []
            state.message = _defaultMsg
            state.loading = false
        }
    },
    // actions : 비동기로 처리됨
    actions : {
        // 영화 검색 기능 
        async searchMovies({state, commit}, payload){ // context 변수를 {state, commit} 로 바꿔서 하단의 context.commit 을 commit으로 줄여쓸수 있음 state도 마찬가지
            // context - state, mutations를 활용할 수 있는 몇가지 내용들이 들어있는 변수
            // payload - 메서드가 실행될 때 인수로 들어온 특정 데이터들을 받아주는 변수 Search.vue에서 받은 데이터(payload)

            if(state.loading) return // loading 이 true면 return 에 걸려서 아래쪽 로직을 실행 X
            

            commit('updateState', {
                message : '', // 검색이 시작할때 메세지의 값을 비워줌
                loading : true
            })
            try{
                const res = await _fetchMovie({
                    ...payload,
                    page : 1
                })
    
                // 객체 구조분해
                const { Search, totalResults } = res.data
    
                // commit으로 mutations에 있는 메서드에 접근
                // 두번째 인수인 객체 데이터를 updateState의 두번째 인수인 payload에서 받음
                commit('updateState', {
                    // 갱신하고자 하는 데이터 정의
                    movies : _uniqBy(Search, 'imdbID') // imdbID로 고유화된 새로운 데이터가 반환됨
                    // imdbID의 중복된 데이터는 제거되어 새로운 배열 데이터로 반환됨
                })
    
                // totalResults의 타입이 string 이라서 parseInt 메서드 사용
                const total = parseInt(totalResults, 10)
    
                // 하나의 페이지에는 10개의 데이터가 출력
                // 10으로 나눠서 나오는 페이지 수 구함(올림처리)
                const pageLength = Math.ceil(total / 10)
    
                // 페이지가 1이 넘어가면 추가로 가져와야 하는 영화 목록이 있으므로
                // if으로 추가로 영화 목록 가져오기 -> 추가요청 전송
                if(pageLength > 1) {
                    for(let page = 2;page <= pageLength; page += 1){
                        if(page > (payload.number / 10)) break;
                        // page 변수가 number/10의 숫자보다 크게 나오면 반복문 종료
                        
                        const res = await _fetchMovie({
                            ...payload,
                            page : page
                        })
                        const { Search } = res.data
                        commit('updateState', {
                            // 갱신하고자 하는 데이터 정의
                            // 전개 연산자를 이용해서 새로 요청받은 데이터를 추가하여 할당
                            movies : [...state.movies, ..._uniqBy(Search, 'imdbID')] 
                        })
                    }
                }
            }   
            catch(message) {
                commit('updateState', {
                    movies : [],
                    message : message
                })
            }
            finally {
                commit('updateState', {
                    loading : false
                })
            }
        },
        // 단일 영화 상세 정보 가져오는 기능
        async searchMovieWithID({state, commit}, payload) {
            if(state.loading) return

            commit('updateState', {
                theMovie : {},
                loading : true
            })

            try {
                const res = await _fetchMovie(payload) // imdbID 값을 받음
                console.log(res.data)
                commit('updateState', {
                    theMovie : res.data
                    
                })  
            }
            catch(error) {
                commit('updateState', {
                    theMovie : {}
                })
            }
            finally {
                commit('updateState', {
                    loading : false
                })
            }
        }
    }
}

function _fetchMovie(payload){
    // 구조분해
    const {title, type, year, page, id } = payload
    const OMDB_API_KEY = 'b938be78'
    // 파라미터 s - 영화제목 / type - 타입 / y - 영화출시년도 / i - imdbID
    // 삼항연산자로 id 값이 있으면 앞의 url주소 없으면 뒤의 url 주소 사용
    const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    // XHR XMLHttpRequest의 약자, 웹브라우저와 웹 서버간에 데이터 전송 API

    // 비동기로 처리
    return new Promise((resolve, reject)=>{
        axios.get(url).then(res=>{
            // 추가 예외처리
            if(res.data.Error){
                reject(res.data.Error)
            }
            // 정상 처리되었을때
            resolve(res)
        }).catch(err=>{
            // 문제가 발생했을때
            reject(err.message)
        })
    })
}