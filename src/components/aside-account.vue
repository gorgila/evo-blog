<template>
    <div class="card aside-card front-card">
        <div class="card-body p-0 d-flex flex-column align-items-left justify-content-center">
            <router-link to="/user/account" active-class="active" class="side-entry d-flex flex-row align-items-center justify-content-between">
                <div class="d-flex flex-row align-items-center">
                    <i class="icon icon-articles"></i>
                    account
                </div>
                <i class="icon icon-arrow-right"></i>
            </router-link>
            <router-link to="/user/password" active-class="active" class="side-entry d-flex flex-row align-items-center justify-content-between">
                <div class="d-flex flex-row align-items-center">
                    <i class="icon icon-articles"></i>
                    password
                </div>
                <i class="icon icon-arrow-right"></i>
            </router-link>
            <a @click="handleLogout" href="javascript:;" class="side-entry d-flex flex-row align-items-center justify-content-between">
                <div class="d-flex flex-row align-items-center">
                    <i class="icon icon-articles"></i>
                    logout
                </div>
                <i class="icon icon-arrow-right"></i>
            </a>
        </div>
    </div>
</template>

<script lang="babel">
    import api from '~api'

    export default {
        name: 'aside-account',
        serverCacheKey: () => {
            return `aside::account`
        },
        methods: {
            async handleLogout() {
                await api.post('frontend/user/logout', {})
                window.location.href = '/'
            }
        }
    }
</script>