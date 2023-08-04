const axios = require('axios');
const { OMDB_API_KEY } = process.env; // .env 에서 환경변수로 지정

exports.handler = async function (event) {
    const payload = JSON.parse(event.body)
    // 구조분해
    const {title, type, year, page, id } = payload
    // 파라미터 s - 영화제목 / type - 타입 / y - 영화출시년도 / i - imdbID
    // 삼항연산자로 id 값이 있으면 앞의 url주소 없으면 뒤의 url 주소 사용
    const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
    // XHR XMLHttpRequest의 약자, 웹브라우저와 웹 서버간에 데이터 전송 API

    // 비동기로 처리
    try {
        const { data } = await axios.get(url);
        if (data.Error) {
          return {
            statusCode: 400,
            body: data.Error
          };
        }
        return {
          statusCode: 200,
          body: JSON.stringify(data)
        };
    } catch (error) {
        return {
          statusCode: error.response.status,
          body: error.message
        };
    }    
}