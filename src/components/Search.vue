<template>
    <div class="container">
        <input v-model="title" type="text" placeholder="Search for Movies, Series & More" class="form-control" @keyup.enter="apply"/>
        <div class="selects">
            <!-- v-for로 filters내의 배열 데이터 수 만큼 select 태그 생성-->
            <!-- 동적으로 연결하기 위해서 v-model에 $data[] 사용 -->
            <select v-for="filter in filters" v-model="$data[filter.name]" :key="filter.name" class="form-select">
                <!-- v-if 로 조건을 걸어서 year인 경우에만 텍스트 추가  -->
                <option v-if="filter.name === 'year'" value="">All Years</option>
                <!-- v-for 를 사용하여 item 속성내에 있는 배열 데이터 수 만큼 option 태그 생성 -->
                <option v-for="item in filter.items" :key="item">
                {{ item }}
                </option>
            </select>
        </div>
        <button class="btn btn-primary" @click="apply">
            Apply
        </button>
    </div>
</template>

<script>
    
    export default {
        data() {
            return {
                // v-model로 input태그와 데이터 연결
                // 연결된 input요소에 데이터를 입력하면 데이터 갱신되는 구조
                title : '',
                type : 'movie',
                number : 10,
                year : '',
                filters : [
                    // filters 데이터를 기반으로 각각의 옵션들을 v-for를 통해서 한 번에 제어
                    // 선택 메뉴 구성
                    {
                        name : 'type',
                        items : ['movie', 'series', 'episode'] 
                    },
                    {
                        name : 'number',
                        items : [10, 20, 30] 
                    },
                    {
                        name : 'year',
                        items : (()=>{
                            const years = []
                            // 최신년도부터 지정한 년도 까지 1씩 감소
                            const thisyear = new Date().getFullYear() // 올해년도 반환
                            for(let i = thisyear; i >= 1950; i -=1){
                                years.push(i)
                            }
                            return years
                        })() // 반복문으로 구현, 즉시실행 함수 사용
                        // 즉시실행 함수로 최신년도부터 지정한 년도까지 반복문으로 구해서 push 메서드로 배열에 넣기
                    },
                ]
            }
        },
        methods : {
            // 비동기로 동작
            async apply() {
                // 영화 검색 
                // 뷰엑스 스토어를 이용해서 검색 데이터 세팅
                // dispatch로 store의 actions에 정의된 메서드 사용 가능
                this.$store.dispatch('movie/searchMovies', {
                    title : this.title,
                    type : this.type,
                    number : this.number,
                    year : this.year
                }) // 객체 데이터가 2번째 인수로 전달
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~/scss/main";
    .container {
        display: flex;
        > * {
            // 모든 자식 요소
            margin-right: 10px;
            font-size: 15px;
            &:last-child {
                margin-right: 0;
            }
        }
        .selects {
            display: flex;
            select {
                width : 120px;
                margin-right: 10px;
                &:last-child {
                margin-right: 0;
                }
            }
        }
        .btn {
            width: 120px;
            height: 50px;
            font-weight: 700;
            // 가로 너비가 지정한 너비보다 작아지지 않도록 하기 위해 설정
            flex-shrink: 0;
        }
        @include media-breakpoint-down(lg) { // 가로너비가 992px보다 작을 때
            display: block; // 정렬을 수평 -> 수직으로 변경
            input {
                margin-right: 0;
                margin-bottom: 10px;

            }
            .selects {
                margin-right: 0;
                margin-bottom: 10px;
                select {
                    width: 100%;
                }
            }
            .btn {
                width: 100%;
            }
        }
    }
</style>