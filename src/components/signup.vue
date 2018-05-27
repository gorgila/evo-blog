<template>
    <div class="modal-wrap position-fixed w-100 h-100 text-center" :class="show ? 'active': ''">
        <div class="modal fade m-auto" role="dialog" tabindex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title" id="signupModalLabel">REGISTER</h2>
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
                            <input type="email" class="form-control" placeholder="email" v-model="form.email">
                            <p class="input-info text-danger text-left hidden">at least 6 characters!</p>
                        </div>
                        <div class="form-group row mx-2">
                            <input type="password" class="form-control" placeholder="password" v-model="form.password">
                            <p class="input-info text-danger text-left hidden">at least 6 characters!</p>
                        </div>
                        <div class="form-group row mx-2">
                            <input type="password" class="form-control" placeholder="repeat password" v-model="form.re_password">
                            <p class="input-info text-danger text-left hidden">at least 6 characters!</p>
                        </div>
                    </div>
                    <div class="modal-footer mx-auto">
                        <button type="button" class="btn btn-outline-primary btn-accent2" @click="register">REGISTER</button>
                        <button type="button" class="btn btn-outline-primary btn-accent5" @click="login">LOGIN</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    import api from '~api'
    import {
        strlen
    } from '~utils'

    export default {
        props: ['show'],
        data() {
            return {
                form: {
                    username: '',
                    email: '',
                    password: '',
                    re_password: ''
                }
            }
        },
        methods: {
            close() {
                this.$store.commit('global/showRegisterModal', false)
            },
            login() {
                this.$store.commit('global/showLoginModal', true)
                this.$store.commit('global/showRegisterModal', false)
            },
            async register() {
                if (!this.form.username || !this.form.password || !this.form.email) {
                    this.$store.dispatch('global/showMsg', 'Please fill in all requires!')
                    return
                } else if (strlen(this.form.username) < 4) {
                    this.$store.dispatch('global/showMsg', 'The length of the username at least 4 characters!')
                    return
                } else if (strlen(this.form.password) < 8) {
                    this.$store.dispatch('global/showMsg', 'The length of the password at least 8 characters!')
                    return
                } else if (this.form.password !== this.form.re_password) {
                    this.$store.dispatch('global/showMsg', "Two passwords do not match!")
                    return
                }

                const {
                    data: {
                        message,
                        code
                    }
                } = await api.post('frontend/user/insert', this.form)

                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })
                    this.login()
                }
            }
        }
    }
</script>