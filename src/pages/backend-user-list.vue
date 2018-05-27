<template>
    <div class="card back-list-card back-card table-responsive-md">
        <table class="table text-center m-0 back-list-table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">USERNAME</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">UPDATE DATE</th>
                    <th scope="col">ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in user.data">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.username }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.update_date | timeYmd }}</td>
                    <td class="d-flex flex-row align-items-center justify-content-center list-action">
                        <router-link :to="'/backend/user/modify/' + item.id">edit</router-link>
                        <a href="javascript:;" @click="recover(item.id)" v-if="item.is_delete">recover</a>
                        <a href="javascript:;" @click="deletes(item.id)" v-else>delete</a>
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="user.hasNext">
                <tr>
                    <td class="text-center" colspan="5">
                        <a @click="loadMore()" href="javascript:;">MORE</a>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script lang="babel">
    import api from '~api'
    import {
        mapGetters
    } from 'vuex'

    const fetchInitialData = async(store, config = {
        page: 1
    }) => {
        await store.dispatch('backend/user/getUserList', config)
    }

    export default {
        name: 'backend-user-list',
        computed: {
            ...mapGetters({
                user: 'backend/user/getUserList'
            })
        },
        methods: {
            loadMore(page = this.user.page + 1) {
                fetchInitialData(this.$store, {
                    page
                })
            },
            async recover(id) {
                const {
                    data: {
                        code,
                        message
                    }
                } = await api.get('backend/user/recover', {
                    id
                })

                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })

                    this.$store.commit('backend/user/recoverUser', id)
                }
            },
            async deletes(id) {
                const {
                    data: {
                        code,
                        message
                    }
                } = await api.get('backend/user/delete', {
                    id
                })

                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })
                    this.$store.commit('backend/user/deleteUser', id)
                }
            }
        },
        mounted() {
            if (this.user.data.length <= 0) {
                fetchInitialData(this.$store)
            }
        }
    }
</script>