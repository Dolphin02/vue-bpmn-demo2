<template>
  <div>
    <header-div></header-div>
    <!--<el-header height="40px;" style="border: 1px solid #eee"></el-header>-->
    <!--<div>{{"ddd"}}</div>-->
    <el-container style="border: 1px solid #eee">
      <el-aside width="17%" style="height: 100%; margin-top:3px; border: 1px solid #eee">
        <el-menu :default-openeds="['1', '']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>服务列表</template>
            <el-submenu index="1-1-1">
              <template slot="title">个人信息</template>
              <el-menu-item index="1-1-1-1" class="baseMuse">基本信息</el-menu-item>
              <el-menu-item index="1-1-1-2" class="baseMuse">微信授权</el-menu-item>
              <el-menu-item index="1-1-1-3" class="baseMuse">支付宝授权</el-menu-item>
            </el-submenu>
            <el-submenu index="1-1-2">
              <template slot="title">医疗服务</template>
              <el-menu-item index="1-1-2-1" class="baseMuse">挂号服务</el-menu-item>
              <el-menu-item index="1-1-2-2" class="baseMuse">预约医生</el-menu-item>
              <el-menu-item index="1-1-2-3" class="baseMuse">体检服务</el-menu-item>
            </el-submenu>
            <el-submenu index="1-1-3">
              <template slot="title">健康服务</template>
              <el-menu-item index="1-1-3-1" class="baseMuse">科学养生</el-menu-item>
              <el-menu-item index="1-1-3-2" class="baseMuse">营养搭配</el-menu-item>
            </el-submenu>
            <el-submenu index="1-1-4">
              <template slot="title">交通服务</template>
              <el-menu-item index="1-1-3-1" class="baseMuse">公交查询</el-menu-item>
              <el-menu-item index="1-1-3-2" class="baseMuse">地铁查询</el-menu-item>
              <el-menu-item index="1-1-3-3" class="baseMuse">出租车查询</el-menu-item>
              <el-menu-item index="1-1-3-4" class="baseMuse">自行车查询</el-menu-item>
              <el-menu-item index="1-1-3-5" class="baseMuse">高铁查询</el-menu-item>
              <el-menu-item index="1-1-3-6" class="baseMuse">飞机查询</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>其他服务</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main width="80%" style="height: 80%">
          <div class="containers" ref="content">
            <!--<div class="">-->
              <!---->
              <!--<el-upload-->
                <!--class="upload-demo"-->
                <!--action="http://localhost:8011/fileUpload"-->
                <!--:on-preview="handlePreview"-->
                <!--:on-remove="handleRemove"-->
                <!--:before-remove="beforeRemove"-->
                <!--:on-exceed="handleExceed"-->
                <!--:on-progress="handleFile"-->
                <!--:file-list="fileList">-->
                <!--<el-button size="small" type="primary">上传文件</el-button>-->
                <!--&lt;!&ndash;<div slot="tip" class="el-upload__tip">只能上传word/pdf文件，且不超过5Mb</div>&ndash;&gt;-->
              <!--</el-upload>-->
            <!--</div>-->
            <div class="canvas" ref="canvas" style=" " draggable="false"></div>
            <div id="js-properties-panel" class="panel" draggable="false"></div>
            <ul class="buttons">
              <li>download</li>
              <li style="width: 40px">
                <a ref="saveDiagram" href="javascript:" title="download BPMN diagram" ><i class="el-icon-download" style="width: 40px"/></a>
              </li>
              <li >
                <a ref="saveSvg" href="javascript:" title="download as SVG image"><i class="el-icon-picture" style="width: 40px"/></a>
              </li>
            </ul>
            <div class="jump_button">
              <el-button @click="turnToPage" name="next">下一步</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <footer-div></footer-div>
  </div>
</template>

<script>
// 引入相关的依赖
// import BpmnViewer from 'bpmn-js'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
import FooterDiv from './footer'
import HeaderDiv from './header'

export default {
  components: {HeaderDiv, FooterDiv},
  data () {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
      xmlStr: null,
      processName: ''
    }
  },
  methods: {
    turnToPage (route) {
      console.log("here here here", route);
      let { name, params, query } = {}
      params = {"XmlStr": this.xmlStr};
      // query = {"name": "health"};
      name = "Research";
      this.$router.push('/health')
      this.$router.push({
        name: '/health',
        params: {"XmlStr": this.xmlStr},
        query: '/health',
      }
      )
    },
    createNewDiagram () {
      const that = this
      let params = {
        id: this.id
      }
      const bpmnXmlStr = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0fppxr8" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
        '  <bpmn:process id="Process_1" isExecutable="false">\n' +
        '    <bpmn:startEvent id="StartEvent_1" name="begin;">\n' +
        '      <bpmn:outgoing>SequenceFlow_0nrfbee</bpmn:outgoing>\n' +
        '      <bpmn:outgoing>SequenceFlow_1wpxb98</bpmn:outgoing>\n' +
        '    </bpmn:startEvent>\n' +
        '    <bpmn:task id="Task_0ho18x0" name="个人信息">\n' +
        '      <bpmn:incoming>SequenceFlow_0nrfbee</bpmn:incoming>\n' +
        '      <bpmn:incoming>SequenceFlow_1wpxb98</bpmn:incoming>\n' +
        '      <bpmn:outgoing>SequenceFlow_00ho26x</bpmn:outgoing>\n' +
        '    </bpmn:task>\n' +
        '    <bpmn:task id="Task_1ymuvem" name="医疗服务">\n' +
        '      <bpmn:incoming>SequenceFlow_00ho26x</bpmn:incoming>\n' +
        '      <bpmn:outgoing>SequenceFlow_18df8vb</bpmn:outgoing>\n' +
        '    </bpmn:task>\n' +
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
        '        <dc:Bounds x="485" y="82" width="100" height="80" />\n' +
        '      </bpmndi:BPMNShape>\n' +
        '      <bpmndi:BPMNShape id="Task_1ymuvem_di" bpmnElement="Task_1ymuvem">\n' +
        '        <dc:Bounds x="712" y="82" width="100" height="80" />\n' +
        '      </bpmndi:BPMNShape>\n' +
        '      <bpmndi:BPMNShape id="EndEvent_1c0ed2n_di" bpmnElement="EndEvent_1c0ed2n">\n' +
        '        <dc:Bounds x="1056" y="102" width="36" height="36" />\n' +
        '        <bpmndi:BPMNLabel>\n' +
        '          <dc:Bounds x="1065" y="145" width="19" height="14" />\n' +
        '        </bpmndi:BPMNLabel>\n' +
        '      </bpmndi:BPMNShape>\n' +
        '      <bpmndi:BPMNEdge id="SequenceFlow_0nrfbee_di" bpmnElement="SequenceFlow_0nrfbee">\n' +
        '        <di:waypoint x="209" y="120" />\n' +
        '        <di:waypoint x="347" y="120" />\n' +
        '        <di:waypoint x="347" y="120" />\n' +
        '        <di:waypoint x="485" y="120" />\n' +
        '      </bpmndi:BPMNEdge>\n' +
        '      <bpmndi:BPMNEdge id="SequenceFlow_00ho26x_di" bpmnElement="SequenceFlow_00ho26x">\n' +
        '        <di:waypoint x="585" y="120" />\n' +
        '        <di:waypoint x="649" y="120" />\n' +
        '        <di:waypoint x="649" y="120" />\n' +
        '        <di:waypoint x="712" y="120" />\n' +
        '      </bpmndi:BPMNEdge>\n' +
        '      <bpmndi:BPMNEdge id="SequenceFlow_18df8vb_di" bpmnElement="SequenceFlow_18df8vb">\n' +
        '        <di:waypoint x="812" y="120" />\n' +
        '        <di:waypoint x="934" y="120" />\n' +
        '        <di:waypoint x="934" y="120" />\n' +
        '        <di:waypoint x="1056" y="120" />\n' +
        '      </bpmndi:BPMNEdge>\n' +
        '      <bpmndi:BPMNEdge id="SequenceFlow_1wpxb98_di" bpmnElement="SequenceFlow_1wpxb98">\n' +
        '        <di:waypoint x="209" y="120" />\n' +
        '        <di:waypoint x="347" y="120" />\n' +
        '        <di:waypoint x="347" y="120" />\n' +
        '        <di:waypoint x="485" y="120" />\n' +
        '      </bpmndi:BPMNEdge>\n' +
        '    </bpmndi:BPMNPlane>\n' +
        '  </bpmndi:BPMNDiagram>\n' +
        '</bpmn:definitions>\n'

      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(bpmnXmlStr, function (err) {
        if (err) {
          console.error(err)
        }
        // console.log("hahahahah: ", _self.bpmnModeler.getDefinitions('canvas'))
        // var canvas = _self.bpmnModeler.getDefinitions('canvas')
        // // let canvas = this.bpmnModeler.get('canvas');
        // _self.canvas = canvas
        // canvas.addMarker('StartEvent_1', 'highlight');









        const canvas = that.bpmnModeler.get('canvas');
        canvas.zoom('fit-viewport');
        // 就是在这里写死了
        const nodeCodes = ['Task_0ho18x0'];
        const colorClass = 'nodeSuccess';
        that.setNodeColor(nodeCodes, colorClass, canvas);

        // const nodeCodes2 = ['SequenceFlow_1u5gq9e','SequenceFlow_1n5pril'];
        // const colorClass2 = 'lineSuccess';
        // that.setNodeColor(nodeCodes2, colorClass2, canvas);







      })
    },

    //从外界导入XML
    importXML(bpmnXmlStr) {
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(bpmnXmlStr, function (err) {
        if (err) {
          console.error('could not import BPMN 2.0 diagram', err)
        }
        var canvas = bpmnModeler.get('canvas');

        // zoom to fit full viewport
        canvas.zoom('fit-viewport');
      })
    },

    // 给已经走过的流程添加颜色
    setNodeColor(nodeCodes, colorClass, canvas){
      for(let i = 0; i < nodeCodes.length; i++) {
        canvas.addMarker(nodeCodes[i], colorClass);
      }

    },

    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveSVG (done) {
      // 把传入的done再传给bpmn原型的saveSVG函数调用
      this.bpmnModeler.saveSVG(done)
    },
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveDiagram (done) {
      // 把传入的done再传给bpmn原型的saveXML函数调用
      this.bpmnModeler.saveXML({ format: true }, function (err, xml) {
        done(err, xml)
      })
    },
    // 当图发生改变的时候会调用这个函数，这个data就是图的xml
    setEncoded (link, name, data) {
      // 把xml转换为URI，下载要用到的
      const encodedData = encodeURIComponent(data)
      // 获取到图的xml，保存就是把这个xml提交给后台
      this.xmlStr = data
      // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
      if (data) {
        link.className = 'active'
        link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
        link.download = name
      }
    }
  },
  mounted () {
    // 获取到属性ref为“content”的dom节点
    this.container = this.$refs.content
    // 获取到属性ref为“canvas”的dom节点
    const canvas = this.$refs.canvas

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
        // propertiesPanelModule
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    })

    // 下载画图
    let _this = this
    // 获取a标签dom节点
    const downloadLink = this.$refs.saveDiagram
    const downloadSvgLink = this.$refs.saveSvg
    // 给图绑定事件，当图有发生改变就会触发这个事件
    this.bpmnModeler.on('commandStack.changed', function () {
      _this.saveSVG(function (err, svg) {
        _this.setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg)
      })

      _this.saveDiagram(function (err, xml) {
        _this.setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml)
      })
    })

    this.createNewDiagram(this.bpmnModeler)
  }
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
  @import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
  .containers{
    position: absolute;
    background-color: #ffffff;
    width: 80%;
    height: 80%;
  }
  .canvas{
    padding: 0;
    height: 100%;
  }
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
    right: 180px;
    bottom: 30px;
  }
</style>
