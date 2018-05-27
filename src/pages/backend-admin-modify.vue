<template>
    <div class="card back-card modify-card">
        <div class="card-body d-flex flex-column justify-content-start align-items-start pb-0">
            <a-input title="Username">
                <input type="text" class="form-control" name="username" placeholder="username" v-model="form.username" />
                <span class="input-info text-danger text-left hidden">Please enter username!</span>
            </a-input>
            <a-input title="Email">
                <input type="email" class="form-control" name="email" placeholder="email" v-model="form.email" />
                <span class="input-info text-danger text-left hidden">Please enter email!</span>
            </a-input>
            <a-input title="Password">
                <input type="password" class="form-control" name="password" placeholder="password" v-model="form.password">
                <span class="input-info text-danger text-left hidden">please enter password!</span>
            </a-input>
        </div>
        <div class="card-footer text-right border-0">
            <router-link to="/backend/admin/list" class="btn btn-outline-primary btn-accent5">RETURN</router-link>                
            <button type="button" class="btn btn-outline-primary btn-accent2" @click="modify">EDIT ADMINSTRATOR</button>
        </div>
    </div>
</template>

<script lang="babel">
    import {
        mapGetters
    } from 'vuex'
    import api from '~api'
    import backendMenu from '~components/backend-menu.vue'
    import aInput from '~components/_input.vue'

    const fetchInitialData = async store => {
        await store.dispatch('backend/admin/getAdminItem')
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
            aInput,
            backendMenu
        },
        computed: {
            ...mapGetters({
                item: 'backend/admin/getAdminItem'
            })
        },
        methods: {
            async modify() {
                if (!this.form.username || !this.form.email) {
                    this.$store.dispatch('global/showMsg', 'please complete the form!')
                    return
                }

                const {
                    data: {
                        message,
                        code,
                        data
                    }
                } = await api.post('backend/admin/modify', this.form)

                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })

                    this.$store.commit('backend/admin/updateAdminItem', data)
                    this.$router.push('/backend/admin/list')
                }
            }
        },
        mounted() {
            if (this.item.path !== this.$route.path) {
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