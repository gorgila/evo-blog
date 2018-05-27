<template>
    <div class="card back-list-card back-card table-responsive-md">
        <table class="table text-center m-0 back-list-table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">USERNAME</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">LAST UPDATE</th>
                    <th scope="col">ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in admin.data">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.username }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.update_date | timeYmd }}</td>
                    <td class="d-flex flex-row align-items-center justify-content-center list-action">
                        <router-link :to="'/backend/admin/modify/' + item.id">edit</router-link>
                        <a href="javascript:;" @click="recover(item.id)" v-if="item.is_delete">recover</a>
                        <a href="javascript:;" @click="deletes(item.id)" v-else>delete</a>
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="admin.hasNext">
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
        await store.dispatch('backend/admin/getAdminList', config)
    }

    export default {
        name: 'backend-admin-list',
        computed: {
            ...mapGetters({
                admin: 'backend/admin/getAdminList'
            })
        },
        methods: {
            loadMore(page = this.admin.page + 1) {
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
                } = await api.get('backend/admin/recover', {
                    id
                })

                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })
                    this.$store.commit('backend/admin/recoverAdmin', id)
                }
            },
            async deletes(id) {
                const {
                    data: {
                        code,
                        message
                    }
                } = await api.get('backend/admin/delete', {
                    id
                })

                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })
                    this.$store.commit('backend/admin/deleteAdmin', id)
                }
            }
        },
        mounted() {
            if (this.admin.data.length <= 0) {
                fetchInitialData(this.$store)
            }
        }
    }
</script>