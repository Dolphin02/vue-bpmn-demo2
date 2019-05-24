<template>
  <div>
    <Sider hide-trigger :style="{background: '#fff'}">
      <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" @on-select="turnToConfig">
        <Submenu name="1" >
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            Item 1
          </template>
          <MenuItem name="workflow-1">一级路由</MenuItem>
          <MenuItem name="workflow-2">二级路由</MenuItem>
          <MenuItem name="workflow-3">三级路由</MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            Item 2
          </template>
          <MenuItem name="2-1">Option 1</MenuItem>
          <MenuItem name="2-2">Option 2</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>
            Item 3
          </template>
          <MenuItem name="3-1">Option 1</MenuItem>
          <MenuItem name="3-2">Option 2</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
  </div>
</template>

<script>
  export default {
    name: 'MySideBar'
  }
</script>

<style scoped>

</style>
