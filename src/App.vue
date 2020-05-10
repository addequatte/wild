<template>
    <div id="app">
        <mt-header title="WILDBERRIES">
            <router-link to="/" slot="left">
                <mt-button icon="back" class="mb-0"></mt-button>
            </router-link>
        </mt-header>
        <router-view></router-view>
    </div>
</template>

<script>
    import {Header} from 'mint-ui';

    export default {
        name: 'app',
        components: {
            Header
        },
    }
</script>

<style>
    ul {
        padding: 0;
    }
    ul ul{
        padding-left: 1rem;
    }
    ul li {
        padding: 0.4rem;
        list-style: none;
    }
    img {
        max-width: 100%;
    }
    button {
        width: 100%;
        margin-bottom: 1rem;
    }
    .mb-0 {
      margin-bottom: 0;
    }
    .mb-1 {
        margin-bottom: 1rem;
    }
    .dot-box {
        outline: 3px dotted #eee;
        background:  #eee;
        padding: 0.5rem;
    }
    .dot-box-error {
        outline: 3px dotted #e88f8f;
        background:  #e88f8f;
        padding: 0.5rem;
    }
</style>
<style>
    h3 {
        color: #666;
    }
    #app {
        padding: 1rem;
    }

    .mint-header {
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        background: linear-gradient(45deg, #b611a0, #471173);
        margin-bottom: 1rem;
    }

</style>
