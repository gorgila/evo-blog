<template>
    <div class="col-12 col-lg-4">
        <div class="card aside-card front-card">
            <div class="card-body p-0 d-flex flex-column align-items-left justify-content-center">
                <router-link to="/backend/admin/list" active-class="active" class="side-entry d-flex flex-row align-items-center justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <i class="icon icon-articles"></i>
                        manage accounts
                    </div>
                    <i class="icon icon-arrow-right"></i>
                </router-link>
                <router-link to="/backend/user/list" active-class="active" class="side-entry d-flex flex-row align-items-center justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <i class="icon icon-articles"></i>
                        account list                        
                    </div>
                    <i class="icon icon-arrow-right"></i>
                </router-link>
            </div>
        </div>
        <div class="card aside-card front-card">
            <div class="card-body p-0 d-flex flex-column align-items-left justify-content-center">
                <router-link to="/backend/category/insert" active-class="active" class="side-entry d-flex flex-row align-items-center justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <i class="icon icon-articles"></i>
                        add category                       
                    </div>
                    <i class="icon icon-arrow-right"></i>
                </router-link>
                <router-link to="/backend/category/list" active-class="active" class="side-entry d-flex flex-row align-items-center justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <i class="icon icon-articles"></i>
                        manage category                    
                    </div>
                    <i class="icon icon-arrow-right"></i>
                </router-link>
                <router-link to="/backend/article/insert" active-class="active" class="side-entry d-flex flex-row align-items-center justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <i class="icon icon-articles"></i>
                        publish article                    
                    </div>
                    <i class="icon icon-arrow-right"></i>
                </router-link>
                <router-link to="/backend/article/list" active-class="active" class="side-entry d-flex flex-row align-items-center justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <i class="icon icon-articles"></i>
                        manage article                 
                    </div>
                    <i class="icon icon-arrow-right"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    export default {
        name: 'backend-menu',
        serverCacheKey: () => {
            return `backend::menu`
        }
    }
</script>