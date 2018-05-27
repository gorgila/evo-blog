<template>
    <div id="app" class="g-doc" :class="global.nightModeOnOff ? 'theme-night' : 'theme-day'">            
        <navigation :backend="backend"></navigation>
        <transition name="fade" mode="out-in">
            <router-view :key="key" class="router"></router-view>
        </transition>
        <template v-if="!backend">
            <sign-up :show="global.showRegisterModal"></sign-up>
            <sign-in :show="global.showLoginModal"></sign-in>
        </template>
</div>
</template>

<script lang="babel">
    import {
        mapGetters
    } from 'vuex'
    import nProgress from 'nprogress'
    import navigation from './components/navigation.vue'
    import signUp from './components/signup.vue'
    import signIn from './components/signin.vue'

    export default {
        computed: {
            ...mapGetters({
                global: 'global/getGlobal'
            }),
            key() {
                return this.$route.path.replace(/\//g, '_')
            },
            backend() {
                return this.$route.path.indexOf('backend') >= 0
            }
        },
        components: {
            navigation,
            signUp,
            signIn
        },
        watch: {
            'global.progress' (val) {
                if (val === 0) {
                    nProgress.set(0)
                    nProgress.start()
                } else if (val === 100) {
                    nProgress.done()
                } else {
                    nProgress.set(val / 100)
                    nProgress.start()
                }
            }
        }
    }
</script>