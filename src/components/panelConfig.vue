<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <!--<div class="layout-logo">跨界养老服务平台</div>-->
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              Item 1
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              Item 4
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout :style="{padding: '0 50px'}">
        <Content :style="{padding: '24px 0', minHeight: '580px', background: '#fff'}">
          <Layout>
            <!--<Sider hide-trigger :style="{background: '#fff'}">-->
              <!--<Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" @on-select="turnToConfig">-->
                <!--<Submenu name="1" >-->
                  <!--<template slot="title">-->
                    <!--<Icon type="ios-navigate"></Icon>-->
                    <!--Item 1-->
                  <!--</template>-->
                  <!--<MenuItem name="workflow-1">一级路由</MenuItem>-->
                  <!--<MenuItem name="workflow-2">二级路由</MenuItem>-->
                  <!--<MenuItem name="workflow-3">三级路由</MenuItem>-->
                <!--</Submenu>-->
                <!--<Submenu name="2">-->
                  <!--<template slot="title">-->
                    <!--<Icon type="ios-keypad"></Icon>-->
                    <!--Item 2-->
                  <!--</template>-->
                  <!--<MenuItem name="2-1">Option 1</MenuItem>-->
                  <!--<MenuItem name="2-2">Option 2</MenuItem>-->
                <!--</Submenu>-->
                <!--<Submenu name="3">-->
                  <!--<template slot="title">-->
                    <!--<Icon type="ios-analytics"></Icon>-->
                    <!--Item 3-->
                  <!--</template>-->
                  <!--<MenuItem name="3-1">Option 1</MenuItem>-->
                  <!--<MenuItem name="3-2">Option 2</MenuItem>-->
                <!--</Submenu>-->
              <!--</Menu>-->
            <!--</Sider>-->
            <Content :style="{padding: '24px', minHeight: '480px', background: '#fff'}">
              <div class="containers" ref="content" style="height: 480px">
                <!--<div class="canvas" ref="canvas" style="height: 440px" draggable="false"></div>-->
                <!--<div id="js-properties-panel" class="panel" draggable="false"></div>-->
                <div class="canvas" ref="canvas" style="width: 80%" draggable="false"></div>
                <div id="js-properties-panel" class="panel" draggable="false"></div>
                <!--<div id="js-properties-panel" class="panel" draggable="false" style="width: 20%;align:left;padding-right: 20px"></div>-->
                <ul class="buttons" style="height: 40px">
                  <li>download</li>
                  <li style="width: 30px">
                    <a ref="saveDiagram" href="javascript:" title="download BPMN diagram" ><Icon type="md-download" style="width: 30px" /></a>
                  </li>
                  <li >
                    <a ref="saveSvg" href="javascript:" title="download as SVG image"><Icon type="md-photos" style="width: 30px"/></a>
                  </li>
                </ul>
                <!--<div class="jump_button" >-->
                  <!--<Button type="primary" @click="turnToPage" name="next">下一步</Button>-->
                  <!--&lt;!&ndash;<el-button @click="turnToPage" name="next">下一步</el-button>&ndash;&gt;-->
                <!--</div>-->
              </div>
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">2018-2020 &copy; Healthy</Footer>
    </Layout>
  </div>
</template>

<script>
  // 引入API接口
  // import {getBpmnXml, saveBpmnData, getNodeData} from '../../api/modeler'
  import BpmnViewer from 'bpmn-js'
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import Modeling from 'bpmn-js/lib/features/modeling/Modeling'
  import MySideBar from '@/components/MySideBar'
  import FooterDiv from '@/components/footer'
  import propertiesPanelModule from 'bpmn-js-properties-panel'
  import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
  import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

  export default {
    components: {
      MySideBar, FooterDiv
    },
    data(){
      return {
        id: "",
        bpmnModeler: null,
        container: null,
        canvas: null,
        xmlStr: null,
        // 点击节点获取的数据
        nodeCode: "",
        nodeName: "",
        nodeType: "",
        bpmnXmlStr: '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0fppxr8" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
          '  <bpmn:process id="Process_1" isExecutable="false">\n' +
          '    <bpmn:startEvent id="StartEvent_1" name="begin;">\n' +
          '      <bpmn:outgoing>SequenceFlow_0nrfbee</bpmn:outgoing>\n' +
          '      <bpmn:outgoing>SequenceFlow_1wpxb98</bpmn:outgoing>\n' +
          '    </bpmn:startEvent>\n' +
          '    <bpmn:SubProcess id="Task_0ho18x0" name="个人信息">\n' +
          '      <bpmn:incoming>SequenceFlow_0nrfbee</bpmn:incoming>\n' +
          '      <bpmn:incoming>SequenceFlow_1wpxb98</bpmn:incoming>\n' +
          '      <bpmn:outgoing>SequenceFlow_00ho26x</bpmn:outgoing>\n' +
          '    </bpmn:SubProcess>\n' +
          '    <bpmn:SubProcess id="Task_1ymuvem" name="医疗服务">\n' +
          '      <bpmn:incoming>SequenceFlow_00ho26x</bpmn:incoming>\n' +
          '      <bpmn:outgoing>SequenceFlow_18df8vb</bpmn:outgoing>\n' +
          '    </bpmn:SubProcess>\n' +
          '    <bpmn:endEvent id="EndEvent_1c0ed2n" name="end">\n' +
          '      <bpmn:incoming>SequenceFlow_18df8vb</bpmn:incoming>\n' +
          '    </bpmn:endEvent>\n' +
          '    <bpmn:sequenceFlow id="SequenceFlow_0nrfbee" targetRef="Task_0ho18x0" />\n' +
          '    <bpmn:sequenceFlow id="SequenceFlow_00ho26x" sourceRef="Task_0ho18x0" targetRef="Task_1ymuvem" />\n' +
          '    <bpmn:sequenceFlow id="SequenceFlow_18df8vb" sourceRef="Task_1ymuvem" targetRef="EndEvent_1c0ed2n" />\n' +
          '    <bpmn:sequenceFlow id="SequenceFlow_1wpxb98" sourceRef="StartEvent_1" targetRef="Task_0ho18x0" />\n' +
          '  </bpmn:process>\n' +
          '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
          '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
          '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
          '        <dc:Bounds x="173" y="102" width="36" height="36" />\n' +
          '        <bpmndi:BPMNLabel>\n' +
          '          <dc:Bounds x="178" y="145" width="27" height="27" />\n' +
          '        </bpmndi:BPMNLabel>\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="Task_0ho18x0_di" bpmnElement="Task_0ho18x0">\n' +
          '        <dc:Bounds x="290" y="82" width="100" height="80" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="Task_1ymuvem_di" bpmnElement="Task_1ymuvem">\n' +
          '        <dc:Bounds x="497" y="82" width="100" height="80" />\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNShape id="EndEvent_1c0ed2n_di" bpmnElement="EndEvent_1c0ed2n">\n' +
          '        <dc:Bounds x="712" y="102" width="36" height="36" />\n' +
          '        <bpmndi:BPMNLabel>\n' +
          '          <dc:Bounds x="721" y="145" width="19" height="14" />\n' +
          '        </bpmndi:BPMNLabel>\n' +
          '      </bpmndi:BPMNShape>\n' +
          '      <bpmndi:BPMNEdge id="SequenceFlow_0nrfbee_di" bpmnElement="SequenceFlow_0nrfbee">\n' +
          '        <di:waypoint x="209" y="120" />\n' +
          '        <di:waypoint x="347" y="120" />\n' +
          '        <di:waypoint x="347" y="120" />\n' +
          '        <di:waypoint x="485" y="120" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '      <bpmndi:BPMNEdge id="SequenceFlow_00ho26x_di" bpmnElement="SequenceFlow_00ho26x">\n' +
          '        <di:waypoint x="390" y="120" />\n' +
          '        <di:waypoint x="497" y="120" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '      <bpmndi:BPMNEdge id="SequenceFlow_18df8vb_di" bpmnElement="SequenceFlow_18df8vb">\n' +
          '        <di:waypoint x="597" y="120" />\n' +
          '        <di:waypoint x="712" y="120" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '      <bpmndi:BPMNEdge id="SequenceFlow_1wpxb98_di" bpmnElement="SequenceFlow_1wpxb98">\n' +
          '        <di:waypoint x="209" y="120" />\n' +
          '        <di:waypoint x="290" y="120" />\n' +
          '      </bpmndi:BPMNEdge>\n' +
          '    </bpmndi:BPMNPlane>\n' +
          '  </bpmndi:BPMNDiagram>\n' +
          '</bpmn:definitions>\n'
      }
    },
    methods:{
      createNewDiagram() {
        const that = this;
        let params = {
          id: this.id
        };
        // const bpmnXmlStr = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        //   '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0fppxr8" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
        //   '  <bpmn:process id="Process_1" isExecutable="false">\n' +
        //   '    <bpmn:startEvent id="StartEvent_1" name="begin;">\n' +
        //   '      <bpmn:outgoing>SequenceFlow_0nrfbee</bpmn:outgoing>\n' +
        //   '      <bpmn:outgoing>SequenceFlow_1wpxb98</bpmn:outgoing>\n' +
        //   '    </bpmn:startEvent>\n' +
        //   '    <bpmn:SubProcess id="Task_0ho18x0" name="个人信息">\n' +
        //   '      <bpmn:incoming>SequenceFlow_0nrfbee</bpmn:incoming>\n' +
        //   '      <bpmn:incoming>SequenceFlow_1wpxb98</bpmn:incoming>\n' +
        //   '      <bpmn:outgoing>SequenceFlow_00ho26x</bpmn:outgoing>\n' +
        //   '    </bpmn:SubProcess>\n' +
        //   '    <bpmn:SubProcess id="Task_1ymuvem" name="医疗服务">\n' +
        //   '      <bpmn:incoming>SequenceFlow_00ho26x</bpmn:incoming>\n' +
        //   '      <bpmn:outgoing>SequenceFlow_18df8vb</bpmn:outgoing>\n' +
        //   '    </bpmn:SubProcess>\n' +
        //   '    <bpmn:endEvent id="EndEvent_1c0ed2n" name="end">\n' +
        //   '      <bpmn:incoming>SequenceFlow_18df8vb</bpmn:incoming>\n' +
        //   '    </bpmn:endEvent>\n' +
        //   '    <bpmn:sequenceFlow id="SequenceFlow_0nrfbee" targetRef="Task_0ho18x0" />\n' +
        //   '    <bpmn:sequenceFlow id="SequenceFlow_00ho26x" sourceRef="Task_0ho18x0" targetRef="Task_1ymuvem" />\n' +
        //   '    <bpmn:sequenceFlow id="SequenceFlow_18df8vb" sourceRef="Task_1ymuvem" targetRef="EndEvent_1c0ed2n" />\n' +
        //   '    <bpmn:sequenceFlow id="SequenceFlow_1wpxb98" sourceRef="StartEvent_1" targetRef="Task_0ho18x0" />\n' +
        //   '  </bpmn:process>\n' +
        //   '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
        //   '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
        //   '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
        //   '        <dc:Bounds x="173" y="102" width="36" height="36" />\n' +
        //   '        <bpmndi:BPMNLabel>\n' +
        //   '          <dc:Bounds x="178" y="145" width="27" height="27" />\n' +
        //   '        </bpmndi:BPMNLabel>\n' +
        //   '      </bpmndi:BPMNShape>\n' +
        //   '      <bpmndi:BPMNShape id="Task_0ho18x0_di" bpmnElement="Task_0ho18x0">\n' +
        //   '        <dc:Bounds x="290" y="82" width="100" height="80" />\n' +
        //   '      </bpmndi:BPMNShape>\n' +
        //   '      <bpmndi:BPMNShape id="Task_1ymuvem_di" bpmnElement="Task_1ymuvem">\n' +
        //   '        <dc:Bounds x="497" y="82" width="100" height="80" />\n' +
        //   '      </bpmndi:BPMNShape>\n' +
        //   '      <bpmndi:BPMNShape id="EndEvent_1c0ed2n_di" bpmnElement="EndEvent_1c0ed2n">\n' +
        //   '        <dc:Bounds x="712" y="102" width="36" height="36" />\n' +
        //   '        <bpmndi:BPMNLabel>\n' +
        //   '          <dc:Bounds x="721" y="145" width="19" height="14" />\n' +
        //   '        </bpmndi:BPMNLabel>\n' +
        //   '      </bpmndi:BPMNShape>\n' +
        //   '      <bpmndi:BPMNEdge id="SequenceFlow_0nrfbee_di" bpmnElement="SequenceFlow_0nrfbee">\n' +
        //   '        <di:waypoint x="209" y="120" />\n' +
        //   '        <di:waypoint x="347" y="120" />\n' +
        //   '        <di:waypoint x="347" y="120" />\n' +
        //   '        <di:waypoint x="485" y="120" />\n' +
        //   '      </bpmndi:BPMNEdge>\n' +
        //   '      <bpmndi:BPMNEdge id="SequenceFlow_00ho26x_di" bpmnElement="SequenceFlow_00ho26x">\n' +
        //   '        <di:waypoint x="390" y="120" />\n' +
        //   '        <di:waypoint x="497" y="120" />\n' +
        //   '      </bpmndi:BPMNEdge>\n' +
        //   '      <bpmndi:BPMNEdge id="SequenceFlow_18df8vb_di" bpmnElement="SequenceFlow_18df8vb">\n' +
        //   '        <di:waypoint x="597" y="120" />\n' +
        //   '        <di:waypoint x="712" y="120" />\n' +
        //   '      </bpmndi:BPMNEdge>\n' +
        //   '      <bpmndi:BPMNEdge id="SequenceFlow_1wpxb98_di" bpmnElement="SequenceFlow_1wpxb98">\n' +
        //   '        <di:waypoint x="209" y="120" />\n' +
        //   '        <di:waypoint x="290" y="120" />\n' +
        //   '      </bpmndi:BPMNEdge>\n' +
        //   '    </bpmndi:BPMNPlane>\n' +
        //   '  </bpmndi:BPMNDiagram>\n' +
        //   '</bpmn:definitions>\n'

        this.bpmnModeler.importXML(this.bpmnXmlStr, function (err) {
          if (err) {
            console.error(err);
          }
          else {
            // 字符串转换成图成功后执行的函数
            that.success()
          }
          // 让图能自适应屏幕
          var canvas = that.bpmnModeler.get('canvas');
          canvas.zoom('fit-viewport');
        });

//         // 与后台交互获取到bpmnXmlStr
//         getBpmnXml(params).then(res => {
//           const bpmnXmlStr = res.obj;
// //          console.log(bpmnXmlStr)
//           this.bpmnModeler.importXML(bpmnXmlStr, function (err) {
//             if (err) {
//               console.error(err);
//             }
//             else {
//               // 字符串转换成图成功后执行的函数
//               that.success()
//             }
//             // 让图能自适应屏幕
//             var canvas = that.bpmnModeler.get('canvas');
//             canvas.zoom('fit-viewport');
//           });
//         })
      },

      // 增加事件监听器在Modeling里
      success() {
        const bpmnjs = this.bpmnModeler;
        const eventBus = bpmnjs.get('eventBus');
        const elementFactory = bpmnjs.get('elementFactory');
//        viewer没有这两个 所以不传了，
//        如果是Modeler,应该要引入且
        const commandStack = bpmnjs.get('commandStack');
        const bpmnRules = bpmnjs.get('bpmnRules');
        const modeling = new Modeling(eventBus,elementFactory,commandStack,bpmnRules);
//        const commandStack = bpmnjs.get('commandStack');
//        const bpmnRules = bpmnjs.get('bpmnRules');
//         const Modeling = require('bpmn-js/lib/features/modeling/Modeling')
//         const modeling = new Modeling(eventBus,elementFactory);
        this.addBpmnListener(this, modeling);
      },
      addBpmnListener(_self,modeling) {
        const bpmnjs = this.bpmnModeler;
        const eventBus = bpmnjs.get('eventBus');
        const events = [
          'element.click',
          'element.dblclick'
        ];
        events.forEach(function(event) {
          eventBus.on(event, function(e) {
            //bpmn:Lane bpmn:SequenceFlow bpmn:SubProcess bpmn:SequenceFlow bpmn:ExclusiveGateway
            //bpmn:Process
            //console.log(event + '   ' + JSON.stringify(e.element));
            if(e.element.type=='bpmn:Process'||e.element.type=='bpmn:Lane')
              return;

            var elementRegistry = bpmnjs.get('elementRegistry');
            var shape = elementRegistry.get(e.element.id);
            // 改变颜色
            // modeling.setColor(shape,{ stroke:'RED' });

            // console.log(shape)
            // 我是通过console找到节点id和节点名称存储在哪里的
            _self.nodeCode = shape.businessObject.id;
            _self.nodeName = shape.businessObject.name;
            _self.nodeType = shape.businessObject.$type;
            // console.log(_self.nodeCode)
            // console.log(_self.nodeName + '' + _self.nodeType)

          });
        })
      },
    },
    // computed: {
    //   bpmnXmlStr () {
    //     return this.store.getters.bpmnXmlStr();
    //   }
    // },
    mounted(){
        this.id = this.bpmnId;
        //  不需要编辑功能，所以只用Viewer就够了，之前都是Modeler

        this.container = this.$refs.content;

        var canvas = this.$refs.canvas;

        // 建模，官方文档这里讲的很详细
        this.bpmnModeler = new BpmnModeler({
          container: canvas,
          // 添加控制板
          propertiesPanel: {
            parent: '#js-properties-panel'
          },
          additionalModules: [
            // 左边工具栏以及节点
            propertiesProviderModule,
            // 右边的工具栏
            propertiesPanelModule
          ],
          moddleExtensions: {
            camunda: camundaModdleDescriptor
          }
        })







//         this.bpmnModeler = new BpmnModeler({
//           container: canvas,
// //        // 添加右边属性控制板
//           propertiesPanel: {
//             parent: '#js-properties-panel'
//           },
//         });
        this.createNewDiagram(this.bpmnModeler);
    },
      // 父组件传来的id值
      props: [
        "bpmnId",
        "modelId"
      ]
    }
</script>

<style lang="scss">
  /*左边工具栏以及编辑节点的样式*/
  /*@import 'bpmn-js/dist/assets/diagram-js.css';*/
  @import "bpmn-js/dist/assets/diagram-js.css";
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
  /*右边工具栏样式*/
  /*@import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';*/
  .containers{
    position: absolute;
    background-color: #ffffff;
    padding-right: 10px;
    width: 75%;
    height: 80%;
  }
  .canvas{
    padding: 0;
    height: 100%;
  }
  /*.panel{*/
    /*position: absolute;*/
    /*right: 0;*/
    /*top: 0;*/
    /*width: 20%;*/
    /*height: 270px;*/
  /*}*/
  .panel{
    position: absolute;
    right: 0;
    top: 0;
    width: 20%;
  }
  .highlight:not(.djs-connection) .djs-visual > :nth-child(1) {
    fill: green !important; /* color elements as green */
  }
  .nodeSuccess:not(.djs-connection) .djs-visual > :nth-child(1) {
    stroke: green !important;
    stroke-width: 3px;
    /* elements as success */
  }

  .nodeError:not(.djs-connection) .djs-visual > :nth-child(1) {
    stroke: red !important;
    stroke-width: 3px;
    /* elements as error */
  }

  .lineSuccess:not(.djs-shape) .djs-visual :last-child{
    stroke: green !important;
  }

  .lineError:not(.djs-shape) .djs-visual :last-child{
    stroke: red !important;
  }
  .baseMuse{
    font-size: 12px;
    color: #4d4d4d;
  }
  .buttons{
    position: absolute;
    left: 10px;
    bottom: 20px;
    &>li{
      display:inline-block;margin: 5px;
      &>a{
        color: #999;
        background: #eee;
        cursor: not-allowed;
        padding: 8px;
        border: 1px solid #ccc;
        &.active{
          color: #333;
          background: #fff;
          cursor: pointer;
        }
      }
    }
  }
  .jump_button{
    position: absolute;
    /*align: center;*/
    right: 130px;
    bottom: 30px;
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #515a6e;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    color: #515a6e;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>
