<template>
    <div class="main container mt-4">
        <div class="row">
            <div class="col-12 col-lg-8 front-article-card">
                <template v-if="!article.isLoad">
                    <div class="card article-warning-card front-card">
                        <div class="card-body">LOADING...</div>
                    </div>
                </template>
<template v-else-if="article.data.id">
                    <div class="card article-title-card front-card">
                        <div class="card-body">
                            <router-link :to="'/category/' + article.data.categoryid" v-text="article.data.category_name" class="cate-link"></router-link>
                            <h2 class="article-title">
                                <router-link :to="'/article/' + article.data.id" v-text="article.data.title"></router-link>
                            </h2>
                        </div>
                    </div>
                    <div class="card article-detail-card front-card">
                        <div class="card-body">
                            <div class="article-detail markdown-body" v-html="addTarget(article.data.html)"></div>
                        </div>
                        <actions :item="article.data"></actions>
                    </div>
                    <comment :comments="comments"></comment>
                </template>
<template v-else>
                    <div class="card bg-white article-warning-card front-card">
                        <div class="card-body">This article does not exist or has already been deleted...</div>
                    </div>
                </template>
</div>
<div class="col-12 col-lg-4">
    <category :category="category"></category>
    <trending :trending="trending"></trending>
</div>
</div>
</div>
</template>

<script lang="babel">
    import {
        mapGetters
    } from 'vuex'
    import metaMixin from '~mixins'
    import actions from '../components/item-actions.vue'
    import category from '../components/aside-category.vue'
    import trending from '../components/aside-trending.vue'
    import comment from '../components/frontend-comment.vue'

    const fetchInitialData = async store => {
        store.dispatch('global/category/getCategoryList')
        store.dispatch('frontend/article/getTrending')
        store.dispatch(`global/comment/getCommentList`, {
            page: 1,
            limit: 5
        })
        await store.dispatch('frontend/article/getArticleItem')
    }

    export default {
        name: 'frontend-article',
        prefetch: fetchInitialData,
        mixins: [metaMixin],
        beforeRouteUpdate(to, from, next) {
            if (to.path !== from.path) {
                fetchInitialData(this.$store)
            } else {
                this.$store.dispatch('global/gProgress', 100)
            }
            next()
        },
        computed: {
            ...mapGetters({
                article: 'frontend/article/getArticleItem',
                comments: 'global/comment/getCommentList',
                category: 'global/category/getCategoryList',
                trending: 'frontend/article/getTrending'
            })
        },
        components: {
            actions,
            comment,
            category,
            trending
        },
        methods: {
            addTarget(content) {
                if (!content) return ''
                return content.replace(/<a(.*?)href="http/g, '<a$1target="_blank" href="http')
            }
        },
        mounted() {
            fetchInitialData(this.$store)
        },
        metaInfo() {
            const title = this.article.data.title ? this.article.data.title + ' - Evo Blog' : 'Evo Blog'
            return {
                title,
                meta: [{
                    vmid: 'description',
                    name: 'description',
                    content: title
                }]
            }
        }
    }
</script>