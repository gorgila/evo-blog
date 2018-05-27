<template>
    <div id="app" class="g-doc" :class="global.nightModeOnOff ? 'theme-night' : 'theme-day'">
        <Navigation :backend="backend"></Navigation>
        <div class="main container mt-4">
            <div class="row">
                <div class="col-12 col-lg-8" :class="{'mx-auto': isLogin}">
                    <transition name="fade" mode="out-in">
                        <router-view :key="key" class="router"></router-view>
                    </transition>
                </div>
                <backend-menu v-if="!isLogin"></backend-menu>
            </div> 
        </div>
    </div>
</template>

<script lang="babel">
    import {
        mapGetters
    } from 'vuex'
    import NProgress from 'nprogress'
    import Navigation from './components/navigation.vue'
    import backendMenu from './components/backend-menu.vue'

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
            },
            isLogin() {
                return ['/backend', '/backend/'].includes(this.$route.path)
            }
        },
        components: {
            backendMenu,
            Navigation
        },
        watch: {
            'global.progress' (val) {
                if (val === 0) {
                    NProgress.set(0)
                    NProgress.start()
                } else if (val === 100) {
                    NProgress.done()
                } else {
                    NProgress.set(val / 100)
                    NProgress.start()
                }
            }
        }
    }
</script>