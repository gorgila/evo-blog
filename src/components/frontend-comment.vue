<template>
    <div class="card comments-card front-card">
        <div class="card-header d-flex flex-column align-items-end">
            <div class="comment-post-input-wrap d-flex flex-row align-items-start w-100">
                <img src="/static/images/portfoilo-icon.jpg" alt="portfoilo-icon" class="avatar-img" />
                <textarea v-model="form.content" id="content" cols="30" rows="4" class="textarea-input base-input"></textarea>
            </div>
            <button type="button" class="btn btn-outline-primary btn-accent2 comment-post-btn" @click="postComment">COMMENT</button>
        </div>
        <div class="card-body py-0">
            <div class="list-group">
                <div v-for="item in comments.data" class="list-group-item d-flex flex-row align-items-start comment-item">
                    <img src="/static/images/portfoilo-icon.jpg" alt="portfoilo-icon" class="avatar-img" />
                    <div class="comment-content-wrap d-flex flex-column align-items-start justify-content-start">
                        <span class="comment-author-wrap">
                            <a href="javascript:;" class="comment-author">{{ item.username }}</a>
                        </span>
                        <div class="comment-content" v-text="item.content"></div>
                        <div class="comment-footer">
                            <span v-text="item.create_date"></span>
                            <a href="javascript:;" class="comment-action-item" @click="reply(item)">reply</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="comments.hasNext" class="card-footer text-center">
            <a href="javascript:;" @click="loadcomment()">MORE</a>
        </div>
    </div>
</template>

<script lang="babel">
    import api from '~api'
    import cookies from 'js-cookie'

    export default {
        props: ['comments'],
        data() {
            return {
                form: {
                    id: this.$route.params.id,
                    content: ''
                }
            }
        },
        methods: {
            loadcomment() {
                this.$store.dispatch('global/comment/getCommentList', {
                    id: this.$route.params.id,
                    page: this.comments.page + 1,
                    limit: 10
                })
            },
            async postComment() {
                const username = cookies.get('user')

                if (!username) {
                    this.$store.dispatch('global/showMsg', 'please login first!!!')
                    this.$store.commit('global/showLoginModal', true)
                } else if (this.form.content === '') {
                    this.$store.dispatch('global/showMsg', 'please enter comment content!!!')
                } else {
                    const {
                        data: {
                            code,
                            data
                        }
                    } = await api.post('frontend/comment/insert', this.form)

                    if (code === 200) {
                        this.form.content = ''
                        this.$store.dispatch('global/showMsg', {
                            content: 'commented successfully',
                            type: 'success'
                        })
                        this.$store.commit('global/comment/insertCommentItem', data)
                    }
                }
            },
            reply(item) {
                this.form.content = 'reply @' + item.username + ': '
                document.querySelector('#content').focus()
            }
        }
    }
</script>