<template>
    <div class="main container mt-4">
        <div class="row">
            <div class="col-12 col-lg-8 ">
                <div class="card front-user-password-card front-card">
                    <div class="card-body d-flex flex-column justify-content-start align-items-start pb-0">
                        <a-input title="Old Password">
                            <input type="password" name="old_password" placeholder="old password" class="form-control" v-model="form.old_password" />
                        </a-input>
                        <a-input title="New Password">
                            <input type="password" name="password" placeholder="new password" class="form-control" v-model="form.password" />
                        </a-input>
                        <a-input title="Repeat Password">
                            <input type="password" name="re_password" placeholder="repeat password" class="form-control" v-model="form.re_password">
                        </a-input>
                    </div>
                    <div class="card-footer text-right border-0">
                        <button type="button" class="btn btn-outline-primary btn-accent2" @click="modify">SAVE</button>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-4">
                <account></account>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    import api from '~api'
    import metaMixin from '~mixins'
    import account from '~components/aside-account.vue'
    import aInput from '~components/_input.vue'

    export default {
        mixins: [metaMixin],
        data() {
            return {
                form: {
                    old_password: '',
                    password: '',
                    re_password: ''
                }
            }
        },
        components: {
            aInput,
            account
        },
        methods: {
            async modify() {
                if (!this.form.password || !this.form.old_password || !this.form.re_password) {
                    this.$store.dispatch('global/showMsg', 'please complete the form!!!')
                    return
                } else if (this.form.password !== this.form.re_password) {
                    this.$store.dispatch('global/showMsg', 'two times passwords did not match!!!')
                    return
                }

                const {
                    data: {
                        code,
                        data
                    }
                } = await api.post('frontend/user/password', this.form)

                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: data
                    })

                    this.form.old_password = ''
                    this.form.password = ''
                    this.form.re_password = ''
                }
            }
        },
        mounted() {
            this.$store.dispatch('global/gProgress', 100)
        },
        metaInfo() {
            return {
                title: 'password - Evo Blog',
                meta: [{
                    vmid: 'description',
                    name: 'description',
                    content: 'Evo Blog'
                }]
            }
        }
    }
</script>