<template>
    <div style="background-color: #4682B4;font-weight: bolder;font-color:white;font-size: 18px;padding-top: 17px; height: 40px; ">
      {{navs[0].title}}
      <!--<el-menu default-active="1" unique-opened="true" menu-trigger="hover" mode="horizontal" >-->
        <!--&lt;!&ndash;<el-menu-item v-for="(title, index) in navs" :key="index" >&ndash;&gt;-->
          <!--&lt;!&ndash;<span>{{title}}</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-menu-item>&ndash;&gt;-->

        <!--<el-menu-item v-for="nav in navs" :key="nav.index" >-->
          <!--<span>{{nav.title}}</span>-->
        <!--</el-menu-item>-->
      <!--</el-menu>-->
      <!--<el-input v-model="inputText" placeholder="请输入内容 " clearable="true">-->
        <!--<el-button slot="append" @click="setAuthor" ></el-button>-->
      <!--</el-input>-->
    </div>
</template>

<script>
    export default {
        name: "headerDiv",
        data() {
          return  {
            inputText: "",
            navs: [{
              index: "1",
              title: "健康养老服务平台",
            }]
          }
        },
        methods: {
          setAuthor: function () {
            this.$store.state.author = this.inputText
            // this.$store.state.commit('newAuthor', this.inputText)
          }
        }
    }
</script>

<style scoped>

</style>
