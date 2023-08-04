<template>
    <div class="container">
        <!--  movies.length가 0인 경우에(movies에 값이 없을 경우) no-results라는 클래스 추가 -->
        <div class="inner" :class="{'no-results': !movies.length}"> 
            <!-- 로딩중 -->
            <Loader v-if="loading"/>
            <!-- message에 값이 있는 경우에만 메세지 출력 -->
            <div class="message" v-if="message">
                {{ message }}
            </div>
            <!-- message 값이 없으면 영화 목록 출력 -->
            <div class="movies" v-else>
                <!-- 검색된 영화의 수 만큼 컴포넌트 반복 출력 -->
                <!-- :movie라는 props로 데이터 전달 -->
                <MovieItem v-for="movie in movies" :key="movie.imdbID" :movie="movie"/>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import MovieItem from '~/components/MovieItem';
    import Loader from '~/components/Loader';

    export default {
        components : {
            MovieItem,
            Loader
        },
        computed : {
            // 계산된 데이터로 선언
            // 새로운 배열데이터로 갱신이 되면 반응성이 유지된 상태로 컴포넌트 내부에서 활용하기 위해 computed 사용
            ...mapState('movie', [
                'movies',
                'message',
                'loading'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    // @import "~/scss/main";
    .container {
        margin-top: 30px;
        .inner {
            background-color: $gray-200;
            padding: 10px 0;
            border-radius: 4px;
            text-align: center;
            &.no-results {
                padding: 70px 0;
            }
            .message {
                font-size: 20px;
                color : $gray-400;
            }
            .movies {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }
        }
    }
</style>