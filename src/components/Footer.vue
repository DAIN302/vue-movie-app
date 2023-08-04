<template>
    <footer>
        <Logo />
        <a href="https://github.com/DAIN302" target="_blank">
            (c){{ new Date().getFullYear() }} DAIN
        </a>
    </footer>
</template>

<script>
    import Logo from '~/components/Logo'
    export default {
        components : {
            Logo
        }
    }
</script>

<style lang="scss" scoped>
    footer {
        padding: 70px 0;
        text-align: center;
        opacity: .3;
        .logo {
            display: block;
            margin-bottom: 4px;
        }
    }

</style>