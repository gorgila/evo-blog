<template>
    <div class="setting-card w-100">
        <div class="setting-item with-input d-flex flex-row justify-content-start align-items-start">
            <h4 class="setting-title">{{ title }}</h4>
            <div class="setting-item-content" :class="classes">
                <div class="setting-input-wrap">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="babel">
    export default {
        props: ['title', 'classes']
    }
</script>