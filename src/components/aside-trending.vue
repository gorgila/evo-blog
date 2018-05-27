<template>
    <div class="card text-center aside-trending-card front-card">
        <div class="card-header">HOT ARTICLES</div>
        <div class="card-body">
            <div class="trending-item d-flex flex-row justify-content-start" v-for="(item, index) in trending">
                <span class="badge rounded-circle font-weight-light text-center p-0">{{ index + 1 }}</span>
                <div class="d-flex flex-column">
                    <router-link :to="`/article/${item.id}`" class="trending-title font-weight-bold text-left">{{ item.title }}</router-link>
                    <div class="trending-meta d-flex flex-row">
                        <div class="trending-meta-item">
                            <i class="icon icon-action-voteup"></i>{{ item.like }}
                        </div>
                        <div class="trending-meta-item">
                            <i class="icon icon-action-comment"></i>{{ item.comment_count }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    export default {
        name: 'aside-trending',
        props: ['trending'],
        serverCacheKey: () => {
            return `aside::trending`
        }
    }
</script>