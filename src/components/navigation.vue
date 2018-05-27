<template>
    <nav class="navbar navbar-expand-xl sticky-top" :class="global.nightModeOnOff ? 'navbar-dark' : 'navbar-light'">
        <div v-if="backend" class="container-fluid">
            <a href="/" class="navbar-brand logo-link"><i class="icon icon-nav-logo"></i><span class="hidden">Evo Blog</span></i></a>
            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#blog-navbar-collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="blog-navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a href="/" class="nav-link">
                            <i class="icon icon-nav-home"></i>
                            <span class="text">HOME</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/trending/visit" class="nav-link">
                            <i class="icon icon-nav-explore"></i>
                            <span class="text">HOT</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/about" class="nav-link">
                            <i class="icon icon-nav-about"></i>
                            <span class="text">ABOUT</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <label class="switch" for="night-mode-switch">
                            <input type="checkbox" class="switch" id="night-mode-switch" v-model="global.nightModeOnOff" @change="switchMode">
                            <span class="slider round"></span>
                        </label>
                        <span class="text">NIGHT</span>
                    </li>
                </ul>
            </div>
        </div>

        <div v-else class="container-fluid">
            <span v-if="isLogin" class="nav-me">
                <router-link to="/user/account">
                    <img src="/static/images/portfoilo-icon.jpg" class="nav-avatar-img"/>
                </router-link>
            </span>
            <span v-else class="nav-me">
                <a href="javascript:;" @click="login">
                    <img src="/static/images/portfoilo-icon.jpg" class="nav-avatar-img">
                </a>
            </span>

            <router-link to="/" active-class="current" exact class="navbar-brand logo-link">
                <i class="icon icon-nav-logo"></i>
                <span class="hidden">Evo Blog</span>
            </router-link>
            
            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#blog-navbar-collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="blog-navbar-collapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link to="/" active-class="current" exact class="nav-link">
                            <i class="icon icon-nav-home"></i>
                            <span class="text">HOME</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/trending/visit" active-class="current" class="nav-link">
                            <i class="icon icon-nav-explore"></i>
                            <span class="text">HOT</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/about" active-class="current" class="nav-link">
                            <i class="icon icon-nav-about"></i>
                            <span class="text">ABOUT</span>
                        </router-link>
                    </li>
                    <li class="nav-item night-switch">
                        <label class="switch" for="night-mode-switch">
                            <input type="checkbox" class="switch" id="night-mode-switch" v-model="global.nightModeOnOff" @change="switchMode">
                            <span class="slider round"></span>
                        </label>
                        <span class="text">NIGHT</span>
                    </li>
                </ul>
                <div class="form-inline my-3 my-xl-0">
                    <span class="nav-search">
                        <i class="icon icon-search-white"></i>
                        <input type="search" @keyup.enter="search($event)" placeholder="search..." class="form-control mr-sm-2 nav-search-input" aria-label="search">
                    </span>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="babel">
    import cookies from 'js-cookie'
    import {
        mapGetters
    } from 'vuex'
    export default {
        props: ['backend'],
        data() {
            return {
                isLogin: cookies.get('user')
            }
        },
        computed: {
            ...mapGetters({
                global: 'global/getGlobal'
            })
        },
        methods: {
            login() {
                this.$store.commit('global/showLoginModal', true)
            },
            search(event) {
                var qs = event.target.value
                if (qs === '') return false

                this.$router.replace('/search/' + qs)
            },
            switchMode() {
                cookies.set('nightMode', this.global.nightModeOnOff)
            }
        }
    }
</script>