<template>
    <div class="card back-comment-card back-card">
        <div class="card-body py-0">
            <div class="list-group">
                <div v-for="item in comments.data" class="list-group-item d-flex flex-row align-items-start comment-item">
                    <img src="/static/images/portfoilo-icon.jpg" alt="portfoilo-icon" class="avatar-img" />
                    <div class="comment-content-wrap d-flex flex-column align-items-start justify-content-start">
                        <span class="comment-author-wrap">
                            <a href="javascript:;" class="comment-author">{{ item.username }}</a>
                        </span>
                        <div class="comment-content">{{ item.content }}</div>
                        <div class="comment-footer">
                            <span class="comment-time">{{ item.timestamp | timeAgo }}</span>
                            <a href="javascript:;" class="comment-action-item" @click="recover(item.id)" v-if="item.is_delete">recover</a>
                            <a href="javascript:;" class="comment-action-item" @click="deletes(item.id)" v-else>delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="comments.hasNext" class="card-footer text-center">
            <a href="javascript:;" @click="loadMore()">MORE</a>
        </div>
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
        config.all = 1
        await store.dispatch('global/comment/getCommentList', config)
    }

    export default {
        name: 'backend-article-comment',
        computed: {
            ...mapGetters({
                comments: 'global/comment/getCommentList'
            })
        },
        methods: {
            loadMore(page = this.comments.page + 1) {
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
                } = await api.get('frontend/comment/recover', {
                    id
                })

                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })
                    this.$store.commit('global/comment/recoverComment', id)
                }
            },
            async deletes(id) {
                const {
                    data: {
                        code,
                        message
                    }
                } = await api.get('frontend/comment/delete', {
                    id
                })
                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })
                    this.$store.commit('global/comment/deleteComment', id)
                }
            }
        },
        mounted() {
            if (this.comments.data.length <= 0) {
                fetchInitialData(this.$store)
            }
        }
    }
</script>