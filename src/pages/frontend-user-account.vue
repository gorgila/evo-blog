<template>
    <div class="main container mt-4">
        <div class="row">
            <div class="col-12 col-lg-8">
                <div class="card front-user-account-settings-card front-card">
                    <div class="card-body d-flex flex-column justify-content-start align-items-start pb-0">
                        <a-input title="Username">
                            <input type="text" placeholder="username" class="form-control" name="username" v-model="form.username" />
                            <span class="input-info text-danger text-left hidden">please enter the username!</span>
                        </a-input>
                        <a-input title="Email">
                            <input type="email" placeholder="email" class="form-control" name="email" v-model="form.email" />
                            <span class="input-info text-danger text-left hidden">please enter the email!</span>
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
    import account from '../components/aside-account.vue'
    import aInput from '../components/_input.vue'

    export default {
        mixins: [metaMixin],
        data() {
            return {
                form: {
                    username: '',
                    email: ''
                }
            }
        },
        components: {
            account,
            aInput
        },
        methods: {
            async getUser() {
                const {
                    data: {
                        code,
                        data
                    }
                } = await api.get('frontend/user/account')

                if (code === 200) {
                    this.form.username = data.username
                    this.form.email = data.email
                }
            },
            async modify() {
                if (!this.form.username || !this.form.email) {
                    this.$store.dispatch('global/showMsg', 'please complete the form!!!')
                    return
                }

                const {
                    data: {
                        code,
                        data
                    }
                } = await api.post('frontend/user/account', this.form)

                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: data
                    })
                }
            }
        },
        mounted() {
            this.getUser()
        },
        metaInfo() {
            return {
                title: 'account - Evo Blog',
                meta: [{
                    vmid: 'description',
                    name: 'description',
                    content: 'Evo Blog'
                }]
            }
        }
    }
</script>