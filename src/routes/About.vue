<template>
    <div class="about">
        <div class="photo">
            <Loader v-if="imageLoading" absolute />
            <img :src="image" :alt="name">
        </div>
        <div class="name">
            {{ name }}
        </div>
        <div>{{ email }}</div>
        <div>{{ github }}</div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Loader from '~/components/Loader'
    export default {
        components : {
            Loader
        },
        data() {
            return {
                imageLoading : true
            }
        },
        computed : {
            // 전개연산자 사용해서 반환된 결과가 객체데이터 내부에서 등록
            // 첫번째 인수로 모듈, 두번째 인수로 배열 등록 배열에 스토어에 등록된 이름을 명시
            // 명시한 내용이 반환, 객체데이터로 반환이 되고 전개연산자로 전개해서 computed라는 
            // 계산된 데이터에 등록 
            ...mapState('about', [
                'image',
                'name',
                'email',
                'github'
            ]) 
        },
        mounted(){
            this.init()
        },
        methods : {
            async init(){
                await this.$loadImage(this.image)
                this.imageLoading = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~/scss/main";
    .about {
        text-align: center;
        .photo {
            position: relative;
            width: 250px;
            height: 250px;
            margin: 40px auto 20px;
            border : 10px solid $primary;
            border-radius: 50%;
            box-sizing: border-box;
            background-color: $gray-200;
            overflow: hidden;
            img {
                width: 100%;
            }
        }
        .name {
            font-size: 40px;
            font-weight: 700;
            font-family: 'Oswald', sans-serif;
            margin-bottom: 20px;
            color : $primary;
        }
    }
</style>