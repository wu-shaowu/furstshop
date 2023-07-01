<template>
<div>
<Header class="magin"></Header>
<router-view></router-view>
<Footer class="footer"></Footer>

</div>

</template>

<script>
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
}
</script>

<style>
.magin {
  margin-bottom: 30px;
}
.footer {
  margin-top: 30px;
}
input {
  outline: none;
}
    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
