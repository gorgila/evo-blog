<template>
    <div class="card back-list-card back-card table-responsive-md">
        <table class="table text-center m-0 back-list-table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">TITLE</th>
                    <th scope="col">CATEGORY</th>
                    <th scope="col">LAST UPDATE</th>
                    <th scope="col">ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in topics.data">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ item.title }}</td>
                    <td>{{ item.category_name }}</td>
                    <td>{{ item.update_date | timeAgo }}</td>
                    <td class="d-flex flex-row align-items-center justify-content-center list-action">
                        <router-link :to="'/backend/article/modify/' + item.id">edit</router-link>
                        <a href="javascript:;" v-if="item.is_delete" @click="recover(item.id)">recover</a>
                        <a href="javascript:;" v-else @click="deletes(item.id)">delete</a>
                        <router-link :to="'/backend/article/comment/' + item.id" v-if="item.comment_count > 0">comment</router-link>
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="topics.hasNext">
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
        await store.dispatch('backend/article/getArticleList', config)
    }

    export default {
        name: 'backend-article-list',
        computed: {
            ...mapGetters({
                topics: 'backend/article/getArticleList'
            })
        },
        methods: {
            loadMore(page = this.topics.page + 1) {
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
                } = await api.get('backend/article/recover', {
                    id
                })

                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })
                    this.$store.commit('backend/article/recoverArticle', id)
                }
            },
            async deletes(id) {
                const {
                    data: {
                        code,
                        message
                    }
                } = await api.get('backend/article/delete', {
                    id
                })

                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })
                    this.$store.commit('backend/article/deleteArticle', id)
                }
            }
        },
        mounted() {
            if (this.topics.data.length <= 0) {
                fetchInitialData(this.$store)
            }
        }
    }
</script>