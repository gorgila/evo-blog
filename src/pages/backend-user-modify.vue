<template>
    <div class="card back-card modify-card">
        <div class="card-body d-flex flex-column justify-content-start align-items-start pb-0">
            <a-input title="Username">
                <input type="text" placeholder="username" class="form-control" name="username" v-model="form.username" />
                <span class="input-info text-danger text-left hidden">Please enter the username!</span>
            </a-input>
            <a-input title="Email">
                <input type="text" placeholder="email" class="form-control" name="email" v-model="form.email" />
                <span class="input-info text-danger text-left hidden">Please enter the email!</span>
            </a-input>
            <a-input title="Password">
                <input type="password" name="password" placeholder="password" class="form-control" v-model="form.password" />
                <span class="input-info text-danger text-left hidden">Please enter the password!</span>
            </a-input>
        </div>
        <div class="card-footer text-right border-0">
            <router-link to="/backend/user/list" class="btn btn-outline-primary btn-accent5">RETURN</router-link>                
            <button type="button" class="btn btn-outline-primary btn-accent2" @click="modify">EDIT USER</button>
        </div>
    </div>
</template>

<script lang="babel">
    import api from '~api'
    import {
        mapGetters
    } from 'vuex'
    import aInput from '~components/_input.vue'

    const fetchInitialData = async store => {
        await store.dispatch('backend/user/getUserItem')
    }

    export default {
        data() {
            return {
                form: {
                    id: this.$route.params.id,
                    username: '',
                    email: '',
                    password: ''
                }
            }
        },
        components: {
            aInput
        },
        computed: {
            ...mapGetters({
                item: 'backend/user/getUserItem'
            })
        },
        methods: {
            async modify() {
                if (!this.form.username || !this.form.email) {
                    this.$store.dispatch('global/showMsg', 'please complete the form!!!')
                    return
                }

                const {
                    data: {
                        message,
                        code,
                        data
                    }
                } = await api.post('backend/user/modify', this.form)

                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })
                    this.$store.commit('backend/user/updateUserItem', data)
                    this.$router.push('/backend/user/list')
                }
            }
        },
        mounted() {
            if (!this.item.path !== this.$route.path) {
                fetchInitialData(this.$store)
            } else {
                this.form.username = this.item.data.username
                this.form.email = this.item.data.email
            }
        },
        watch: {
            item(val) {
                this.form.username = val.data.username
                this.form.email = val.data.email
            }
        }
    }
</script>