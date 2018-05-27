<template>
    <div class="card backend-login-card back-card">
        <div class="card-body d-flex flex-column justify-content-start align-items-start pb-0">
            <a-input title="Username">
                <input type="text" class="form-control" name="username" placeholder="username" v-model="form.username">
                <span class="input-info text-danger text-left hidden">Please enter your username!</span>
            </a-input>
            <a-input title="Password">
                <input type="password" name="password" class="form-control" placeholder="password" v-model="form.password">
                <span class="input-info text-danger text-left hidden">Please enter your password!</span>
            </a-input>
        </div>
        <div class="card-footer text-center border-0">
            <button type="button" class="btn btn-outline-primary btn-accent2" @click="login">LOGIN</button>
        </div>
    </div>
</template>

<script lang="babel">
    import cookies from 'js-cookie'
    import api from '~api'
    import aInput from '~components/_input.vue'

    export default {
        name: 'login',
        beforeRouteEnter: (to, from, next) => {
            if (cookies.get('b_user')) {
                next('/backend/article/list')
            } else {
                next()
            }
        },
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        components: {
            aInput
        },
        methods: {
            async login() {
                if (!this.form.username || !this.form.password) {
                    this.$store.dispatch('global/showMsg', 'please enter username and password!')
                    return
                }

                const {
                    data: {
                        data,
                        code
                    }
                } = await api.post('/backend/admin/login', this.form)

                if (data && code === 200) {
                    this.$router.replace('/backend/article/list')
                }
            }
        }
    }
</script>