<template>
    <div class="card back-card modify-card">
        <div class="card-body d-flex flex-column justify-content-start align-items-start pb-0">
            <a-input title="Category Name">
                <input type="text" class="form-control" placeholder="category name" name="cate_name" v-model="form.cate_name" />
                <span class="input-info text-danger text-left hidden">Please enter category name!</span>
            </a-input>
            <a-input title="Category Order">
                <select name="category" class="form-control" v-model="form.cate_order">
                    <option selected="selected" value="">PLEASE SELECT CATEGORY ORDER</option>
                    <option value="title">article title</option>
                    <option value="visit">visits amount</option>
                    <option value="like">likes amount</option>
                    <option value="comment_count">comments amount</option>
                    <option value="create_date">create date</option>
                    <option value="update_date">update date</option>
                </select>
                <span class="input-info text-danger text-left hidden">Please enter category order!</span>
            </a-input>
        </div>
        <div class="card-footer text-right border-0">
            <router-link to="/backend/category/list" class="btn btn-outline-primary btn-accent5">RETURN</router-link>                
            <button type="button" class="btn btn-outline-primary btn-accent2" @click="modify">EDIT CATEGORY</button>
        </div>
    </div>
</template>

<script lang="babel">
    import api from '~api'
    import {
        mapGetters
    } from 'vuex'
    import aInput from '../components/_input.vue'

    const fetchInitialData = async store => {
        await store.dispatch('global/category/getCategoryItem')
    }

    export default {
        name: 'backend-category-modify',
        data() {
            return {
                form: {
                    id: this.$route.params.id,
                    cate_name: '',
                    cate_order: ''
                }
            }
        },
        components: {
            aInput
        },
        computed: {
            ...mapGetters({
                item: 'global/category/getCategoryItem'
            })
        },
        methods: {
            async modify() {
                if (!this.form.cate_name || !this.form.cate_order) {
                    this.$store.dispatch('global/showMsg', 'please complete the from!!!')
                    return
                }

                const {
                    data: {
                        message,
                        code,
                        data
                    }
                } = await api.post('backend/category/modify', this.form)

                if (code === 200 && data) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })
                    this.$store.commit('global/category/updateCategoryItem', data)
                    this.$router.push('/backend/category/list')
                }
            }
        },
        mounted() {
            if (!this.item.id || this.item.path !== this.$route.path) {
                fetchInitialData(this.$store)
            } else {
                this.form.cate_name = this.item.cate_name
                this.form.cate_order = this.item.cate_order
            }
        },
        watch: {
            item(val) {
                this.form.cate_name = val.cate_name
                this.form.cate_order = val.cate_order
            }
        }
    }
</script>