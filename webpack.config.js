// import
const path = require('path') // path라는 전역모듈을 가지고 와서 변수에 할당
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const Dotenv = require('dotenv-webpack')

// export
module.exports = {
    resolve : {
        extensions : ['.js', '.vue'], // 이렇게 설정해서 import 시 확장자를 따로 안붙여도 됨
        alias : {
            '~': path.resolve(__dirname, 'src'),
            'assets':path.resolve(__dirname, 'src/assets') // 경로 별칭 경로를 별칭으로 만들어서 사용
        }
    },
    // entry 파일을 읽어들이기 시작하는 진입점 설정
    entry : './src/main.js',
    // entry를 통해 읽어들인 파일에 기본적인 연결관계를 웹팩이 분석을 해서 결과를 내어주는 기본적인 구성을 작성 가능

    // 결과물(번들)을 반환하는 설정
    output : { 
        clean : true // 기존에 만들었던 내용 제거 가능
    },

    module : {
        rules : [
            {
                test : /\.vue$/,
                use : 'vue-loader'
                
            },
            {
                test : /\.s?css$/, // .css 확장자 찾는 정규식
                use : [
                    'vue-style-loader',
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                          additionalData: '@import "~/scss/main";'
                        }
                    }
                ]
            }, 
            {
                test : /\.js$/,
                use : [
                    'babel-loader'
                ]
            },
            {
                test : /\.(png|jpe?g|gif|webp)$/,
                use : 'file-loader'
            }
        ]
    },

    // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
    plugins : [
        new HtmlPlugin({
            template : "./index.html" // entry에서 설정한 js 파일과 합쳐서 dist폴더에 파일 만들어짐
        }),
        new CopyPlugin({
            patterns : [
                { from : 'static'} // 해당 폴더에 있는 내용이 복사가 되서 dist 폴더 안에 만들어짐
            ]
        }),
        new VueLoaderPlugin(),
        new Dotenv()
    ],
    devServer : {
        host : 'localhost',
        port : 8079,
        hot : true
    }
}