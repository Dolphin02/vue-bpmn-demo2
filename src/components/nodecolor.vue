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
  <!--import flowView from '../../components/flow/FlowsView.vue'-->
  <!--import {getBpmnXml, saveBpmnData, getNodeData} from '../../api/modeler'-->
  <!--export default {-->
    <!--name: 'nodecolor',-->
    <!--components: {-->
      <!--flowView-->
    <!--},-->
    <!--data(){-->
      <!--return {-->
        <!--id: "",-->
        <!--bpmnModeler: null,-->
        <!--container: null,-->
        <!--canvas: null,-->
        <!--xmlStr: null,-->
        <!--// 点击节点获取的数据-->
        <!--nodeCode: "",-->
        <!--nodeName: "",-->
        <!--// 弹窗相关的数据-->
        <!--dialogVisible: false,-->
        <!--dialog_id: "",-->
        <!--dialog_confBaseId: ''-->
      <!--}-->
    <!--},-->
    <!--methods:{-->
      <!--createNewDiagram() {-->
        <!--const that = this;-->
        <!--let params = {-->
          <!--id: this.id-->
        <!--};-->
        <!--getBpmnXml(params).then(res => {-->
          <!--const bpmnXmlStr = res.obj;-->
<!--//          console.log(bpmnXmlStr)-->
          <!--this.bpmnModeler.importXML(bpmnXmlStr, function (err) {-->
            <!--if (err) {-->
              <!--console.error(err);-->
            <!--}-->
            <!--that.success()-->
            <!--const canvas = that.bpmnModeler.get('canvas');-->
            <!--canvas.zoom('fit-viewport');-->
            <!--// 就是在这里写死了-->
            <!--const nodeCodes = ['StartEvent_1','Task_0qg0mca','Task_0307aue'];-->
            <!--const colorClass = 'nodeSuccess';-->
            <!--that.setNodeColor(nodeCodes, colorClass, canvas);-->

            <!--const nodeCodes2 = ['SequenceFlow_1u5gq9e','SequenceFlow_1n5pril'];-->
            <!--const colorClass2 = 'lineSuccess';-->
            <!--that.setNodeColor(nodeCodes2, colorClass2, canvas);-->
          <!--});-->
        <!--})-->
      <!--},-->

      <!--// 返回表格页面-->
      <!--back() {-->
        <!--const data = false;-->
        <!--this.$emit("closeEdit", data);-->
      <!--},-->


      <!--success() {-->
        <!--const bpmnjs = this.bpmnModeler;-->
        <!--const eventBus = bpmnjs.get('eventBus');-->
        <!--const elementFactory = bpmnjs.get('elementFactory');-->
<!--//        viewer没有这两个 所以不传了-->
<!--//        const commandStack = bpmnjs.get('commandStack');-->
<!--//        const bpmnRules = bpmnjs.get('bpmnRules');-->
        <!--const Modeling = require('bpmn-js/lib/features/modeling/Modeling')-->
        <!--const commandStack = require('diagram-js/lib/command/index');-->
        <!--const bpmnRules = require('bpmn-js/lib/features/rules/index');-->
        <!--const modeling = new Modeling(eventBus,elementFactory,commandStack,bpmnRules);-->
<!--//        this.setLineColor('Task_0307aue','RED', this, modeling);-->
        <!--this.addBpmnListener(this, modeling);-->
      <!--},-->
      <!--// 给节点添加监听时间(点击)-->
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
            <!--if(e.element.type === 'bpmn:Process' || e.element.type === 'bpmn:Lane')-->
              <!--return;-->

            <!--//debugger;-->
            <!--const   elementRegistry = bpmnjs.get('elementRegistry');-->
            <!--const shape = elementRegistry.get(e.element.id);-->
<!--//            console.log(shape)-->
<!--//            modeling.setColor(shape,{ stroke:'RED' });-->
<!--//            _self.nodeCode=e.element.id;-->
            <!--_self.nodeCode = shape.businessObject.id;-->
<!--//            console.log(_self.nodeCode)-->
            <!--_self.nodeName = shape.businessObject.name;-->
            <!--_self.getDialogId()-->
          <!--});-->
        <!--});-->
      <!--},-->
      <!--// 给已经走过的流程添加颜色-->
      <!--setNodeColor(nodeCodes, colorClass, canvas){-->
        <!--for(let i = 0; i < nodeCodes.length; i++) {-->
          <!--canvas.addMarker(nodeCodes[i], colorClass);-->
        <!--}-->

      <!--},-->

      <!--// 获取给弹窗的id-->
      <!--getDialogId(){-->
        <!--const that = this;-->
        <!--const params = {-->
          <!--nodeCode: this.nodeCode,-->
          <!--modelId: this.modelId-->
        <!--};-->
        <!--getNodeData(params).then(res => {-->
          <!--that.dialog_id = res.obj.id;-->
          <!--that.dialog_confBaseId = res.obj.confBaseId;-->
          <!--that.dialogVisible = true;-->
        <!--})-->
      <!--}-->

    <!--},-->
    <!--mounted(){-->
      <!--this.id = this.bpmnId;-->
      <!--var BpmnModeler = require('bpmn-js');-->
      <!--this.container = this.$refs.content;-->

      <!--var canvas = this.$refs.canvas;-->
      <!--this.bpmnModeler = new BpmnModeler({-->
        <!--container: canvas,-->
<!--//-->
<!--//        // 添加右边属性控制板-->
<!--//        propertiesPanel: {-->
<!--//          parent: '#js-properties-panel'-->
<!--//        },-->

      <!--});-->
      <!--this.createNewDiagram(this.bpmnModeler);-->
    <!--},-->
    <!--props: [-->
      <!--"bpmnId",-->
      <!--"modelId"-->
    <!--]-->
  <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
