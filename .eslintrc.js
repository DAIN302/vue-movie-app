module.exports = {
    env : {
        // 돌아가는 환경에 대한 설정
        browser : true,
        node : true
    },
    extends : [
        // vue 코드규칙
        //'plugin:vue/vue3-essential', // lv1
        'plugin:vue/vue3-strongly-recommended', // lv2
        //'plugin:vue/vue3-recommended', //lv3 가장 엄격
        // js 코드규칙
        'eslint:recommended'
    ],
    parserOptions : {
        // 코드를 분석할 수 있는 분석기 지정
        parser : 'babel-eslint',
        // parser : '@babel/eslint-parer',
    },
    rules : {
        // extends 에서 지정한 규칙을 그대로 사용할 거면 따로 지정해주지 않아도 됨
        // 규칙을 변경하거나 추가하고자 할때 추가해줌
        'vue/html-closing-bracket-newline':['error',{
            'sigleline' : 'never',
            'multiline' : 'always'
        }],
        'vue/html-self-closing' : ['error',{
            'html' : {
                'void' : 'always',
                'normal' : 'always',
                'component' : 'always'
            },
            'svg' : 'always',
            'math' : 'always'
        }]
    }
}