import { createApp } from 'vue'
import App from './App'
import router from './routes' // index.js 를 써주지 않아도 자동으로 찾아서 연결해줌
import store from './store' // 단 파일이름 index.js일때만 생략 가능
import loadImage from './plugins/loadImage' // 플러그인으로 등록 use(이름)으로 사용

// use -> 플러그인 연결할 때 사용하는 메서드
createApp(App).use(router).use(store).use(loadImage).mount('#app')
