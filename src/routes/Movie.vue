<template>
    <div class="container">
        <!-- 로딩중일때만(laading 값이 true일때만) 출력 -->
        <template v-if="loading">
            <!-- 스켈레톤 UI -->
            <div class="skeletons">
                <div class="skeleton poster"></div>
                <div class="specs">
                    <div class="skeleton title"></div>
                    <div class="skeleton spec"></div>
                    <div class="skeleton plot"></div>
                    <div class="skeleton etc"></div>
                    <div class="skeleton etc"></div>
                    <div class="skeleton etc"></div>
                </div>
            </div>
            <!-- boolean값으로 되어있는 props값은 속성값을 적는것만으로도 true처리 -->
            <Loader :size="3" :z-index="9" fixed />
        </template>
        <!-- 로딩중아닐때(laading 값이 false일때만) 출력 -->
        <div class="movie-details" v-else>
            <div class="poster" :style="{backgroundImage:`url(${requestDiffSizeImage(theMovie.Poster, 700)})`}">
                <Loader v-if="imageLoading" absolute />
            </div>
            <div class="specs">
                <!-- 영화 제목 -->
                <div class="title">
                    {{ theMovie.Title }}
                </div>
                <div class="labels">
                    <!-- 영화 개봉년도 -->
                    <span>{{ theMovie.Released }}</span>
                    <!-- 상영시간 -->
                    <span>{{ theMovie.Runtime }}</span>
                    <!-- 국가 -->
                    <span>{{ theMovie.Country }}</span>
                </div>
                <!-- 영화 줄거리 -->
                <div class="plot">
                    {{ theMovie.Plot }}
                </div>
                <div class="ratings">
                    <h3>Ratings</h3>
                    <div class="rating-wrap">
                        <div class="rating" v-for="{ Source:name, Value:score } in theMovie.Ratings" :key="name" :title="name">
                            <img :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`" :alt="`${name}`">
                            <span>{{ score }}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Actors</h3>
                    {{ theMovie.Actors }}
                </div>
                <div>
                    <h3>Director</h3>
                    {{ theMovie.Director }}
                </div>
                <div>
                    <h3>Production</h3>
                    {{ theMovie.Production }}
                </div>
                <div>
                    <h3>Genre</h3>
                    {{ theMovie.Genre }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import Loader from '~/components/Loader';
    export default {
        components : {
            Loader
        },
        data(){
            return {
                imageLoading : true
            }
        },
        // 계산된 메서드 가져오기
        computed : {
            ...mapState('movie', [
                'theMovie',
                'loading'
            ])
        },
        created() {
            this.$store.dispatch('movie/searchMovieWithID', {
                // movie/tt215165 -> tt 어쩌고가 파라미터값으로 전달이 됨
                id: this.$route.params.id
            })
            // this.$store.dispatch 대신 mapActions 를 등록해서 사용할 수 있음
            // 그래도 dispatch 를 더 많이 씀
            // this.searchMovieWithID({
            //     id: this.$route.params.id
            // })
        },
        methods : {
            // ...mapActions('movie', [
            //     'searchMovieWithID'
            // ]),
            // 이미지 해상도 변경 메서드
            requestDiffSizeImage(url, size){ // url 포스터 이미지 주소, size 포스트 이미지 사이즈
                if(!url || url==="N/A") {
                    // 포스터정보가 없으면 로딩이미지를 종료하고 빈문자 반환
                    this.imageLoading = false
                    return ''
                }
                const src = url.replace('SX300', `SX${size}`) 
                // 비동기 함수 실행되고 나서 처리가 완료되면 then() 메서드 실행
                // 로직의 흐름을 방해하지 않기 위해 async, await키워드 대신 then() 사용
                this.$loadImage(src).then(()=>{
                    this.imageLoading = false
                })
                // return은 비동기와 별개라서 이미지 로딩을 기다리지 않고 이미지 주소가 변경된 것을 반환해줌
                return src
            }
        }
    }
</script>

<style lang="scss" scoped>
    // @import "~/scss/main";
    .container {
        padding-top: 40px;
        .skeletons {
            display: flex;
            .poster {
                width: 500px;
                aspect-ratio: 2 / 3;
                margin-right: 70px;
                flex-shrink: 0;
            }
            .specs {
                flex-grow: 1; // 증가너비 최대한 사용
            }
            .skeleton {
                border-radius: 10px;
                background-color: $gray-200;
                &.title {
                    width: 80%;
                    height: 70px;
                }
                &.spec {
                    width: 60%;
                    height: 30px;
                    margin-top: 20px;
                }
                &.plot {
                    width: 100%;
                    height: 250px;
                    margin-top: 20px;
                }
                &.etc {
                    width: 50%;
                    height: 50px;
                    margin-top: 20px;
                }
            }
        }
        .movie-details {
            display: flex;
            color : $gray-600;
            .poster {
                position: relative;
                width: 500px;
                aspect-ratio: 2 / 3;
                margin-right: 70px;
                border-radius: 10px;
                background-color: $gray-200;
                background-size: cover;
                background-position: center;
                flex-shrink: 0;
            }
            .specs {
                flex-grow: 1;
                .title {
                    color: $black;
                    font-family: 'Oswald', sans-serif;
                    font-size: 70px;
                    line-height: 1;
                    margin-bottom: 30px;
                }
                .labels {
                    color : $primary;
                    span {
                        // 가상요소를 만들어서 가운데 점 표시
                        &::after {
                            content: '\00b7';// 가운데 점 표시 특수기호
                            margin: 0 6px;
                        }
                        &:last-child::after {
                            display: none;
                        }
                    }
                }
                .plot {
                    margin-top: 20px;
                }
                .ratings {
                    .rating-wrap {
                        display: flex;
                        .rating {
                            display: flex;
                            align-items: center;
                            margin-right: 32px;
                            img {
                                height: 30px;
                                flex-shrink: 0;
                                margin-right: 6px;
                            }
                        }
                    }
                }
                h3 {
                    margin: 24px 0 6px;
                    color: $black;
                    font-family: 'Oswald', sans-serif;
                    font-size: 20px;
                }

            }
            @include media-breakpoint-down(xl) { // 가로너비가 1200px보다 작을 때
                .poster {
                    width: 300px;
                    height: calc(300px * 3 / 2);
                    margin-right: 40px;
                }
            }
            @include media-breakpoint-down(lg) { // 가로너비가 992px보다 작을 때
                display: block;
                .poster {
                    margin-bottom: 40px;
                }
            }
            @include media-breakpoint-down(md) { // 가로너비가 768px보다 작을 때
                display: block;
                .specs {
                    .title {
                        font-size: 50px;
                    }
                    .ratings {
                        .rating-wrap {
                            display: block;
                            .rating {
                                margin-top: 10px;
                            }
                        }
                    }
                }
            }
        }

    }

</style>