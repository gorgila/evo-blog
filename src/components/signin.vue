<template>
    <div class="modal-wrap position-fixed w-100 h-100 text-center" :class="show ? 'active': ''">
        <div class="modal fade m-auto" role="dialog" tabindex="-1" aria-labelledby="signinModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title" id="signinModalLabel">LOGIN</h2>
                        <button class="close" data-dismiss="modal" aria-label="close" @click="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group row mx-2">
                            <input type="text" class="form-control" placeholder="username" v-model="form.username" autofocus>
                            <p class="input-info text-danger text-left hidden">at least 6 characters!</p>
                        </div>
                        <div class="form-group row mx-2">
                            <input type="password" class="form-control" placeholder="password" v-model="form.password">
                            <p class="input-info text-danger text-left hidden">at least 6 characters!</p>
                        </div>
                    </div>
                    <div class="modal-footer mx-auto">
                        <button type="button" class="btn btn-outline-primary btn-accent2" @click="login">LOGIN</button>
                        <button type="button" class="btn btn-outline-primary btn-accent5" @click="register">REGISTER</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    import api from '~api'
    export default {
        props: ['show'],
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            close() {
                this.$store.commit('global/showLoginModal', false)
            },
            register() {
                this.$store.commit('global/showLoginModal', false)
                this.$store.commit('global/showRegisterModal', true)
            },
            async login() {
                if (!this.form.username || !this.form.password) {
                    this.$store.dispatch('global/showMsg', 'Please fill in all requires!')
                    return
                }

                const {
                    data: {
                        message,
                        code
                    }
                } = await api.post('frontend/user/login', this.form)
                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })
                    this.$router.go(0)
                }
            }
        }
    }
</script>