export default {
    // vue에서 플러그인으로 활용
    // 이미지 로드 이벤트 플러그인으로 사용하기
    install(app){
        app.config.globalProperties.$loadImage = (src)=>{ // 이미지 소스를 인수로 받아서 내부에서 매개변수로 사용
            // 프로미스 객체로 로드 완료시 함수 실행되도록 설정
            return new Promise(resolve=>{
                const img = document.createElement('img')
                img.src = src
                // 로드완료시 콜백실행
                img.addEventListener('load',()=>{
                    // 완료되면 함수실행
                    resolve();
                })
            })
        }
    }
}