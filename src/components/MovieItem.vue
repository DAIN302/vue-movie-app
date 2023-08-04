<template>
    <!-- 영화 목록 클릭 시 영화 상세페이지로 이동 -->
    <RouterLink :to="`/movie/${movie.imdbID}`" class="movie" :style="{backgroundImage:`url(${movie.Poster})`}">
        <Loader v-if="imageLoading" :size="1.5" absolute />
        <div class="info">
            <div class="year">{{ movie.Year }}</div>
            <div class="title">{{ movie.Title }}</div>
        </div>   
    </RouterLink>
</template>

<script>
    import Loader from '~/components/Loader'
    export default {
        components : {
            Loader
        },
        props : {
            movie : {
                type : Object,
                default : () => ({})
            }
        },
        data (){
            return {
                // 이미지 로딩중 -> 로딩이 끝나면 false
                imageLoading : true
            }
        },
        mounted(){
            // movieItem 컴포넌트가 연결이 된 직후에(html구조와 연결된 후에) init 메서드 동작
            this.init()
        },
        methods : {
            // 초기화 메서드
            async init(){
                const poster = this.movie.Poster
                // 포스터의 값이 없거나 "N/A" 일때 로딩이미지 종료 
                if(!poster || poster==="N/A"){
                    this.imageLoading =  false    
                }
                else {
                    await this.$loadImage(poster)
                    // 이미지 로드가 완료되면 true->false
                    this.imageLoading =  false
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    // @import "~/scss/main";
    .movie{
        position: relative;
        $width : 200px;
        width : $width;
        aspect-ratio: 2/3;
        margin: 10px;
        border-radius: 4px;
        background-color: $gray-400;
        background-size: cover;
        overflow: hidden;
        &:hover::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            border : 6px solid $primary;
        }
        .info {
            position: absolute;
            width: 100%;
            padding: 14px;
            left: 0;
            bottom: 0;
            font-size: 14px;
            background-color: rgba($black, .4);
            text-align: center;
            backdrop-filter: blur(10px);
            .year {
                color : $primary;
                font-weight: 700;
            }
            .title {
                color : $white;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

        }
    }
</style>