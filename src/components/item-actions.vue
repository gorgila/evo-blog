<template>
    <div class="actions-wrap d-flex flex-row align-items-center">
        <div class="action-item w-25 text-center d-flex flex-row align-items-center justify-content-center" @click="like" :class="item.like_status ? 'active' : ''">
            <i class="icon" :class="item.like_status ? 'icon-action-voteup-active' : 'icon-action-voteup'"></i>
            <span v-if="item.like > 1" class="text">{{ item.like }} likes</span>
            <span v-else>{{ item.like }} like</span>
        </div>
        <div class="action-item w-25 text-center d-flex flex-row align-items-center justify-content-center">
            <i class="icon icon-action-comment"></i>
            <span v-if="item.comment_count > 1" class="text">{{ item.comment_count }} comments</span>
            <span v-else>{{ item.comment_count }} comment</span>
        </div>
        <div class="action-item w-25 text-center d-flex flex-row align-items-center justify-content-center">
            <i class="icon icon-action-fav"></i>
            <span v-if="item.visit > 1" class="text">{{ item.visit }} visits</span>
            <span v-else>{{ item.visit }} visit</span>
        </div>
        <div class="action-item w-25 text-center d-flex flex-row align-items-center justify-content-center" @click="share">
            <i class="icon icon-action-share"></i>
            <span class="text">share</span>
        </div>
    </div>
</template>

<script lang="babel">
    import cookies from 'js-cookie'
    import api from '~api'
    export default {
        name: 'item-actions',
        props: ['item'],
        serverCacheKey: props => {
            return `frontend::topics::item::actions::${props.item.id}`
        },
        methods: {
            async like() {
                const username = cookies.get('user')
                if (!username) {
                    this.$store.dispatch('global/showMsg', 'Please Login!')
                    this.$store.commit('global/showLoginModal', true)
                    return
                }
                let url = 'frontend/like'
                if (this.item.like_status) url = 'frontend/unlike'

                const {
                    data: {
                        code,
                        message
                    }
                } = await api.get(url, {
                    id: this.item.id
                })
                if (code === 200) {
                    this.$store.commit('frontend/article/modifyLikeStatus', {
                        id: this.item.id,
                        status: !this.item.like_status
                    })
                    this.$store.dispatch('global/showMsg', {
                        content: message,
                        type: 'success'
                    })
                    this.$store.dispatch('frontend/article/getTrending')
                }
            },
            share() {
                const top = window.screen.height / 2 - 250
                const left = window.screen.width / 2 - 300
                const title = this.item.title + '- Evo Blog'

                const url = 'http://localhost:8088/article/' + this.item.id
                window.open("https://www.linkedin.com/shareArticle?mini=true&title=" + encodeURIComponent(title.replace(/&nbsp;/g, " ").replace(/<br \/>/g, " ")) + "&url=" + encodeURIComponent(url), "share to Linkedin", "height=500, width=600, top=" + top + ", left=" + left + ", toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no")
            }
        }
    }
</script>