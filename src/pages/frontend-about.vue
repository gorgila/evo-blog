<template>
    <div class="main container mt-4">
        <div class="row">
            <div class="col-12 col-lg-8">
                <div class="card about-card front-card">
                    <div class="card-body d-flex flex-column justify-content-start align-items-start border-0">
                        <h3 class="about-title font-weight-bold">ABOUT AUTHOR</h3>
                        <div class="d-flex flex-row about-item align-items-start">
                            <div class="about-item-label">Name:</div>
                            <div>Mengna Zhu</div>
                        </div>
                        <div class="d-flex flex-row about-item align-items-start">
                            <div class="about-item-label">Birth:</div>
                            <div>1993.07</div>
                        </div>
                        <div class="d-flex flex-row about-item align-items-start">
                            <div class="about-item-label">Job:</div>
                            <div>Frontend Developer</div>
                        </div>
                        <div class="d-flex flex-row about-item align-items-start">
                            <div class="about-item-label">Skills:</div>
                            <div>
                                <ul>
                                    <li>HTML5 + CSS3</li>
                                    <li>NodeJS</li>
                                    <li>Javascript</li>
                                    <li>Vue</li>
                                    <li>ES6</li>
                                    <li>GIT</li>
                                    <li>Gulp</li>
                                    <li>Webpack</li>
                                    <li>JQuery</li>
                                    <li>AngularJS</li>
                                    <li>Bootstrap</li>
                                    <li>SASS</li>
                                    <li>MySQL</li>
                                </ul>
                            </div>
                        </div>
                        
                        <h3 class="about-title font-weight-bold">ABOUT WEBSITE</h3>
                        <p class="about-web-item mt-0">
                            The server side of this website uses <span class="font-weight-bold">express</span>+<span class="font-weight-bold">MySQL</span> to build; the client side of this website uses <span class="font-weight-bold">Vue2</span> to build.
                        </p>
                        <p class="about-web-item">
                            This website contains both front and backend sides: the front side uses server side rendering patterns to render and the backend side uses single page application pattern.
                        </p>
                        <p class="about-web-item">
                            The main features contain: add, delete, modify, and check functions for administrator, user, category, article, comment, and like article features for users;
                        </p>
                        <p class="about-web-item">
                            Main skills demonstrated in this application: express, MySQL, vue2, vue2-router, vuex, webpack, babel, eslint.
                        </p>
                    </div>
                </div>    
            </div>
            <div class="col-12 col-lg-4">
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
    import trending from '../components/aside-trending.vue'

    const fetchInitialData = async store => {
        await store.dispatch('frontend/article/getTrending')
    }

    export default {
        name: 'frontend-index',
        prefetch: fetchInitialData,
        mixins: [metaMixin],
        components: {
            trending
        },
        computed: {
            ...mapGetters({
                trending: 'frontend/article/getTrending'
            })
        },
        mounted() {
            if (this.trending.length <= 0) {
                fetchInitialData(this.$store)
            } else {
                this.$store.dispatch('global/gProgress', 100)
            }
        },
        metaInfo() {
            return {
                title: 'about Evo Blog',
                meta: [{
                    vmid: 'description',
                    name: 'description',
                    content: 'Evo Blog'
                }]
            }
        }
    }
</script>