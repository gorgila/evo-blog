<template>
    <div class="card back-list-card back-card table-responsive-md">
        <table class="table text-center m-0 back-list-table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">CATEGORY NAME</th>
                    <th scope="col">CATEGORY ORDER</th>
                    <th scope="col">ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in category">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.cate_name }}</td>
                    <td>{{ item.cate_order }}</td>
                    <td class="d-flex flex-row align-items-center justify-content-center list-action">
                        <router-link :to="'/backend/category/modify/' + item.id">edit</router-link>
                        <a href="javascript:;" v-if="item.is_delete" @click="recover(item.id)">recover</a>
                        <a href="javascript:;" v-else @click="deletes(item.id)">delete</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="babel">
    import api from '~api'
    import {
        mapGetters
    } from 'vuex'

    const fetchInitialData = async(store, config = {
        limit: 99
    }) => {
        await store.dispatch('global/category/getCategoryList', config)
    }

    export default {
        name: 'backend-category-list',
        computed: {
            ...mapGetters({
                category: 'global/category/getCategoryList'
            })
        },
        mounted() {
            if (this.category.length <= 0) {
                fetchInitialData(this.$store)
            }
        },
        methods: {
            async recover(id) {
                const {
                    data: {
                        code,
                        message
                    }
                } = await api.get('backend/category/recover', {
                    id
                })

                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })
                    this.$store.commit('global/category/recoverCategory', id)
                }
            },
            async deletes(id) {
                const {
                    data: {
                        code,
                        message
                    }
                } = await api.get('backend/category/delete', {
                    id
                })

                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })
                    this.$store.commit('global/category/deleteCategory', id)
                }
            }
        }
    }
</script>