<!--<template>-->
  <!--<div class="containers" ref="content">-->
    <!--<div class="canvas" ref="canvas"></div>-->
    <!--<el-button class="back" type="primary" @click="back">返回列表</el-button>-->
    <!--<el-dialog-->
      <!--:title="nodeName"-->
      <!--:visible.sync="dialogVisible"-->
      <!--:show-close="true"-->
      <!--width="30%"-->
      <!--size="large">-->
      <!--<flow-view :nodeName="nodeName" :nodeCode="nodeCode" :nodeId="dialog_id"-->
                 <!--:confBaseId="dialog_confBaseId" :modelId="modelId"></flow-view>-->
    <!--</el-dialog>-->
    <!--&lt;!&ndash;<div id="js-properties-panel" class="panel"></div>&ndash;&gt;-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--// 引入API接口-->
  <!--// import {getBpmnXml, saveBpmnData, getNodeData} from '../../api/modeler'-->

  <!--export default {-->
    <!--data(){-->
      <!--return {-->
        <!--id: "",-->
        <!--bpmnModeler: null,-->
        <!--container: null,-->
        <!--canvas: null,-->
        <!--xmlStr: null,-->
        <!--// 点击节点获取的数据-->
        <!--nodeCode: "",-->
        <!--nodeName: ""-->
      <!--}-->
    <!--},-->
    <!--methods:{-->
      <!--createNewDiagram() {-->
        <!--const that = this;-->
        <!--let params = {-->
          <!--id: this.id-->
        <!--};-->
        <!--// 与后台交互获取到bpmnXmlStr-->
        <!--getBpmnXml(params).then(res => {-->
          <!--const bpmnXmlStr = res.obj;-->
<!--//          console.log(bpmnXmlStr)-->
          <!--this.bpmnModeler.importXML(bpmnXmlStr, function (err) {-->
            <!--if (err) {-->
              <!--console.error(err);-->
            <!--}-->
            <!--else {-->
              <!--// 字符串转换成图成功后执行的函数-->
              <!--that.success()-->
            <!--}-->
            <!--// 让图能自适应屏幕-->
            <!--var canvas = that.bpmnModeler.get('canvas');-->
            <!--canvas.zoom('fit-viewport');-->
          <!--});-->
        <!--})-->
      <!--},-->

      <!--// 增加事件监听器在Modeling里-->
      <!--success() {-->
        <!--const bpmnjs = this.bpmnModeler;-->
        <!--const eventBus = bpmnjs.get('eventBus');-->
        <!--const elementFactory = bpmnjs.get('elementFactory');-->
<!--//        viewer没有这两个 所以不传了，-->
<!--//        如果是Modeler,应该要引入且const modeling = new Modeling(eventBus,elementFactory,commandStack,bpmnRules);-->
<!--//        const commandStack = bpmnjs.get('commandStack');-->
<!--//        const bpmnRules = bpmnjs.get('bpmnRules');-->
        <!--const Modeling = require('bpmn-js/lib/features/modeling/Modeling')-->
        <!--const modeling = new Modeling(eventBus,elementFactory);-->
        <!--this.addBpmnListener(this, modeling);-->
      <!--},-->
      <!--addBpmnListener(_self,modeling) {-->
        <!--const bpmnjs = this.bpmnModeler;-->
        <!--const eventBus = bpmnjs.get('eventBus');-->
        <!--const events = [-->
          <!--'element.click',-->
          <!--'element.dblclick'-->
        <!--];-->
        <!--events.forEach(function(event) {-->
          <!--eventBus.on(event, function(e) {-->
            <!--//bpmn:Lane bpmn:SequenceFlow bpmn:Task bpmn:SequenceFlow bpmn:ExclusiveGateway-->
            <!--//bpmn:Process-->
            <!--//console.log(event + '   ' + JSON.stringify(e.element));-->
            <!--if(e.element.type=='bpmn:Process'||e.element.type=='bpmn:Lane')-->
              <!--return;-->

            <!--var elementRegistry = bpmnjs.get('elementRegistry');-->
            <!--var shape = elementRegistry.get(e.element.id);-->
            <!--// 改变颜色-->
            <!--// modeling.setColor(shape,{ stroke:'RED' });-->

            <!--// console.log(shape)-->
            <!--// 我是通过console找到节点id和节点名称存储在哪里的-->
            <!--_self.nodeCode = shape.businessObject.id;-->
            <!--_self.nodeName = shape.businessObject.name;-->
            <!--// console.log(_self.nodeCode)-->
            <!--// console.log(_self.nodeName)-->
          <!--});-->
        <!--})-->
      <!--},-->
    <!--},-->
      <!--mounted(){-->
        <!--this.id = this.bpmnId;-->
        <!--//  不需要编辑功能，所以只用Viewer就够了，之前都是Modeler-->
        <!--var BpmnModeler = require('bpmn-js');-->
        <!--this.container = this.$refs.content;-->

        <!--var canvas = this.$refs.canvas;-->
        <!--this.bpmnModeler = new BpmnModeler({-->
          <!--container: canvas,-->
<!--//        // 添加右边属性控制板-->
<!--//        propertiesPanel: {-->
<!--//          parent: '#js-properties-panel'-->
<!--//        },-->
        <!--});-->
        <!--this.createNewDiagram(this.bpmnModeler);-->
      <!--},-->
      <!--// 父组件传来的id值-->
      <!--props: [-->
        <!--"bpmnId",-->
        <!--"modelId"-->
      <!--]-->
    <!--}-->
<!--</script>-->

<!--<style lang="scss">-->
  <!--@import "./css/diagram-js.css";-->
  <!--@import "./css/app.css";-->
  <!--@import "./vendor/bpmn-font/css/bpmn-embedded.css";-->
  <!--.containers{-->
    <!--position: absolute;-->
    <!--display: inline-block;-->
    <!--background-color: #ffffff;-->
    <!--width: 100%;-->
    <!--height: 90%;-->
  <!--}-->
  <!--.canvas{-->
    <!--width: 100%;-->
    <!--height: 100%;-->
  <!--}-->
  <!--.panel{-->
    <!--position: absolute;-->
    <!--right: 0;-->
    <!--top: 0;-->
    <!--width: 300px;-->
  <!--}-->
  <!--.back {-->
    <!--display: inline-block;-->
    <!--position: absolute;-->
    <!--bottom: 20px;-->
    <!--left: 5px;-->
  <!--}-->
  <!--.nodeSuccess:not(.djs-connection) .djs-visual > :nth-child(1) {-->
    <!--stroke: green !important;-->
    <!--stroke-width: 3px;-->
    <!--/* elements as success */-->
  <!--}-->

  <!--.nodeError:not(.djs-connection) .djs-visual > :nth-child(1) {-->
    <!--stroke: red !important;-->
    <!--stroke-width: 3px;-->
    <!--/* elements as error */-->
  <!--}-->

  <!--.lineSuccess:not(.djs-shape) .djs-visual :last-child{-->
    <!--stroke: green !important;-->
  <!--}-->

  <!--.lineError:not(.djs-shape) .djs-visual :last-child{-->
    <!--stroke: red !important;-->
  <!--}-->
<!--</style>-->
