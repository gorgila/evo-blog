<template>
    <div class="card topics-card front-card">
        <div class="card-header d-flex flex-row align-items-end justify-content-between">
            <span class="topic-source">
                category: 
                <router-link :to="'/category/' + item.categoryid" v-text="item.category_name" class="topic-minor-link align-middle"></router-link>
            </span>
            <span class="topic-time">{{item.update_date}}</span>
        </div>
        <div class="card-body">
            <div class="topic-main-link-wrap">
                <router-link :to="'/article/' + item.id" v-text="item.title"></router-link>
            </div>

            <div class="topic-desc-wrap">
                <div class="topic-article-content markdown-body" v-text="item.content"></div>
            </div>
        </div>
        <actions :item="item"></actions>
    </div>
</template>

<script lang="babel">
    import actions from './item-actions.vue'

    export default {
        name: 'index-item',
        props: ['item'],
        serverCacheKey: props => {
            return `frontend::topics::item::${props.item.id}`
        },
        data() {
            return {
                showMore: false
            }
        },
        components: {
            actions
        }
    }
</script>