<template>
    <div class="card back-card modify-card">
        <div class="card-body d-flex flex-column justify-content-start align-items-start pb-0">
            <a-input title="Title">
                <input type="text" placeholder="title" class="form-control" name="title" v-model="form.title" />
                <span class="input-info text-danger text-left hidden">Please enter the article title!</span>
            </a-input>
            <a-input title="Category">
                <select name="category" class="form-control" v-model="form.category">
                    <option selected="selected" value="">Please Select Category</option>
                    <option v-for="item in category" :value="item.id">{{ item.cate_name }}</option>
                </select>
                <span class="input-info text-danger text-left hidden">Please enter the category this article belongs to!</span>
            </a-input>
            <div class="setting-card w-100">
                <div id="modify-content" class="settings-item-content">
                    <textarea name="content" id="editor" class="form-control hidden" data-autosave="editor-content"></textarea>
                </div>
            </div>
        </div>
        <div class="card-footer text-right border-0">
            <router-link to="/backend/article/list" class="btn btn-outline-primary btn-accent5">RETURN</router-link> 
            <button type="button" class="btn btn-outline-primary btn-accent2" @click="modify">EDIT ARTICLE</button>
        </div>
    </div>
</template>

<script lang="babel">
    /* global modifyEditor */
    import api from '~api'
    import {
        mapGetters
    } from 'vuex'
    import aInput from '../components/_input.vue'

    const fetchInitialData = async(store, config = {
        limit: 99
    }) => {
        await store.dispatch('global/category/getCategoryList', config)
    }

    export default {
        name: 'backend-article-modify',
        data() {
            return {
                form: {
                    id: this.$route.params.id,
                    title: '',
                    category: '',
                    category_name: '',
                    category_old: '',
                    content: ''
                }
            }
        },
        components: {
            aInput
        },
        computed: {
            ...mapGetters({
                category: 'global/category/getCategoryList',
                global: 'global/getGlobal'
            })
        },
        methods: {
            async modify() {
                const content = modifyEditor.getMarkdown()
                if (!this.form.title || !this.form.category || !content) {
                    this.$store.dispatch('global/showMsg', 'please complete the form!!!')
                    return
                }

                this.form.content = content
                const {
                    data: {
                        message,
                        code,
                        data
                    }
                } = await api.post('backend/article/modify', this.form)

                if (code === 200) {
                    this.$store.dispatch('global/showMsg', {
                        type: 'success',
                        content: message
                    })
                    this.$store.commit('backend/article/updateArticleItem', data)
                    this.$router.push('/backend/article/list')
                }
            }
        },
        mounted() {
            if (this.category.length <= 0) {
                fetchInitialData(this.$store)
            }

            this.$store.dispatch('backend/article/getArticleItem').then(data => {
                this.form.title = data.title
                this.form.category_old = data.categoryid
                this.form.category = data.categoryid
                this.form.content = data.content

                // eslint-disable-next-line
                window.modifyEditor = editormd('modify-content', {
                    width: '100%',
                    height: 500,
                    markdown: data.content,
                    placeholder: 'please enter content ...',
                    path: '/static/editor.md/lib/',
                    theme: this.global.nightModeOnOff ? 'dark' : 'default',
                    editorTheme: this.global.nightModeOnOff ? 'blackboard' : 'default',
                    previewTheme: this.global.nightModeOnOff ? 'dark' : 'default',
                    toolbarIcons() {
                        return [
                            "undo", "redo", "|",
                            "bold", "italic", "quote", "|",
                            "list-ul", "list-ol", "hr", "|",
                            "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "emoji", "html-entities", "|",
                            "watch", "preview", "fullscreen", "search"
                        ]
                    },
                    watch: false,
                    saveHTMLToTextarea: true
                })
            })
        },
        watch: {
            'form.category' (val) {
                const obj = this.category.find(item => item.id === val)
                this.form.category_name = obj.cate_name
            },
            'global.nightModeOnOff' (val) {
                window.modifyEditor.setTheme(val ? 'dark' : 'default')
                window.modifyEditor.setEditorTheme(val ? 'blackboard' : 'default')
                window.modifyEditor.setPreviewTheme(val ? 'dark' : 'default')
            }
        }
    }
</script>