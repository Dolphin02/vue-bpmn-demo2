<template>
  <div class="footer">
    <!--<ul>-->
      <!--<li v-for="lis in ul">{{lis.li}}</li>-->
    <!--</ul>-->
    <!--<p>-->
      <!--Copyright&nbsp;&copy;&nbsp;{{bpmnXmlStr}} - 2019 All rights reserved-->
    <!--</p>-->
    <p>2018-2020 &copy; Healthy</p>
  </div>
</template>

<script>
  export default {
    name: 'footerDiv',
    data () {
      return {
        author: "jinting"
        // ul: [
        //   { li: '琉璃之金' },
        //   { li: '朦胧之森' },
        //   { li: '缥缈之滔' },
        //   { li: '逍遥之火' },
        //   { li: '璀璨之沙' }
        // ]
      }
    },
    // computed: {
    //   author () {
    //     return this.$store.state.bpmnXmlStr
    //   }
    // }
  }
</script>

<style>
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    /*align: center;*/
    width: 100%;
    text-align: center;
  }
</style>
