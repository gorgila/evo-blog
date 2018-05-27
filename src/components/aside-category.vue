<template>
    <div class="card aside-cate-card front-card">
        <div class="card-body justify-content-center flex-column">
            <template v-for="item in filterCate(category)">
                <router-link :to="`/category/${item.id}`" class="aside-cate-item d-flex flex-row align-items-center justify-content-between">
                    <div class="aside-meta d-flex flex-row align-items-center">
                        <i class="icon topic-image"/> 
                        <div class="text-left">
                            <h3 class="aside-cate-title font-weight-bold">{{item.cate_name}}</h3>
                            <p v-if="item.cate_num > 1" class="aside-cate-meta">{{item.cate_num}} articles</p>
                            <p v-else class="aside-cate-meta">{{item.cate_num || 0}} article</p>
                        </div>
                    </div>
                    <i class="icon icon-arrow-right"></i>
                </router-link>
            </template>
</div>
</div>
</template>
<script lang="babel">
    export default {
        name: 'aside-category',
        props: ['category'],
        serverCacheKey: () => {
            return `aside::category`
        },
        methods: {
            filterCate(category) {
                return category.filter(item => item.is_delete !== 1)
            }
        }
    }
</script>