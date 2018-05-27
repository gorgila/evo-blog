<template>
    <div class="card back-card modify-card">
        <div class="card-body d-flex flex-column justify-content-start align-items-start pb-0">
            <a-input title="Category Name">
                <input type="text" class="form-control" name="cate_name" placeholder="category name" v-model="form.cate_name" />
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
            <button type="button" class="btn btn-outline-primary btn-accent2" @click="insert">ADD CATEGORY</button>
        </div>
    </div>
</template>

<script lang="babel">
    import api from '~api'
    import aInput from '../components/_input.vue'

    export default {
        name: 'backend-category-insert',
        data() {
            return {
                form: {
                    cate_name: '',
                    cate_order: ''
                }
            }
        },
        components: {
            aInput
        },
        methods: {
            async insert() {
                if (!this.form.cate_name || !this.form.cate_order) {
                    this.$store.dispatch('global/showMsg', 'please complete the form!!!')
                    return
                }

                const {
                    data: {
                        message,
                        code,
                        data
                    }
                } = await api.post('backend/category/insert', this.form)

                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })
                    this.$store.commit('global/category/insertCategoryItem', data)
                    this.$router.push('/backend/category/list')

                    this.$store.dispatch('global/category/getCategoryList', {
                        limit: 99
                    })
                }
            }
        }
    }
</script>