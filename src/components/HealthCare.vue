<!--suppress ALL -->
<template>
  <div class="layout">
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1" @on-select="turnToPage">
        <!--<div class="layout-logo">跨界养老服务平台</div>-->
        <div class="layout-nav">
          <MenuItem name="1">
            <Icon type="ios-navigate"></Icon>
            主页
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-keypad"></Icon>
            配置页
          </MenuItem>
          <!--<MenuItem name="3">-->
            <!--<Icon type="ios-analytics"></Icon>-->
            <!--Item 3-->
          <!--</MenuItem>-->
          <!--<MenuItem name="4">-->
            <!--<Icon type="ios-paper"></Icon>-->
            <!--Item 4-->
          <!--</MenuItem>-->
        </div>
      </Menu>
    </Header>
    <Layout>
      <!--<Layout :style="{padding: '0 50px'}">-->
      <!--<Content :style="{padding: '24px 0', minHeight: '580px', background: '#fff'}">-->
        <!--<Layout>-->
          <!--<Content :style="{padding: '24px', minHeight: '570px', background: '#fff'}">-->
            <!--<div class="containers" ref="content" style="height: 570px">-->
              <!--<div class="canvas" ref="canvas" style="width: 80%; height: 440px;"></div>-->
      <Content :style="{padding: '24px 0', minHeight: '570px', background: '#fff'}">
        <Layout>
          <Content :style="{padding: '24px', minHeight: '970px', background: '#fff'}">
            <div class="containers" ref="content" >
              <div class="canvas" ref="canvas" style="width: 80%;"></div>
              <div id="js-properties-panel" class="panel"></div>
              <ul class="buttons">
                <li>download</li>
                <li style="width: 40px">
                  <a ref="saveDiagram" href="javascript:" title="download BPMN diagram" ><i class="el-icon-download" style="width: 40px"/></a>
                </li>
                <li >
                  <a ref="saveSvg" href="javascript:" title="download as SVG image"><i class="el-icon-picture" style="width: 40px"/></a>
                </li>
              </ul>
            </div>
          </Content>

        </Layout>

      </Content>
      <Footer class="layout-footer-center" height="40px">2018-2020 &copy; Healthy</Footer>
    </Layout>
  </div>
</template>

<script>
// 引入相关的依赖
// import BpmnViewer from 'bpmn-js'
import BpmnModeler from 'bpmn-js/lib/Modeler'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

export default {
  data () {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
      xmlStr: null,
      processName: '',
      headerHref : {
        1: "",
        2: "health",
        3: "config"
      },
      // bpmnXmlStr: '<?xml version="1.0" encoding="UTF-8"?>\n' +
      //   '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0fppxr8" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
      //   '  <bpmn:process id="Process_1" isExecutable="false">\n' +
      //   '    <bpmn:sequenceFlow id="SequenceFlow_0nrfbee" targetRef="Task_0ho18x0" />\n' +
      //   '    <bpmn:startEvent id="StartEvent_0aw7fqm">\n' +
      //   '      <bpmn:outgoing>SequenceFlow_0wqjqvq</bpmn:outgoing>\n' +
      //   '    </bpmn:startEvent>\n' +
      //   '    <bpmn:sequenceFlow id="SequenceFlow_0wqjqvq" sourceRef="StartEvent_0aw7fqm" targetRef="Task_0abzf3j" />\n' +
      //   '    <bpmn:intermediateThrowEvent id="IntermediateThrowEvent_1nh6gvk">\n' +
      //   '      <bpmn:incoming>SequenceFlow_1d2bl1g</bpmn:incoming>\n' +
      //   '    </bpmn:intermediateThrowEvent>\n' +
      //   '    <bpmn:subProcess id="Task_0abzf3j" name="个人信息">\n' +
      //   '      <bpmn:incoming>SequenceFlow_0wqjqvq</bpmn:incoming>\n' +
      //   '      <bpmn:outgoing>SequenceFlow_1xdmyls</bpmn:outgoing>\n' +
      //   '    </bpmn:subProcess>\n' +
      //   '    <bpmn:subProcess id="Task_0x9ax7u" name="医疗服务">\n' +
      //   '      <bpmn:incoming>SequenceFlow_1voiina</bpmn:incoming>\n' +
      //   '      <bpmn:outgoing>SequenceFlow_1d2bl1g</bpmn:outgoing>\n' +
      //   '    </bpmn:subProcess>\n' +
      //   '    <bpmn:exclusiveGateway id="ExclusiveGateway_126k0j8">\n' +
      //   '      <bpmn:incoming>SequenceFlow_1xdmyls</bpmn:incoming>\n' +
      //   '      <bpmn:outgoing>SequenceFlow_1voiina</bpmn:outgoing>\n' +
      //   '    </bpmn:exclusiveGateway>\n' +
      //   '    <bpmn:sequenceFlow id="SequenceFlow_1xdmyls" sourceRef="Task_0abzf3j" targetRef="ExclusiveGateway_126k0j8" />\n' +
      //   '    <bpmn:sequenceFlow id="SequenceFlow_1voiina" sourceRef="ExclusiveGateway_126k0j8" targetRef="Task_0x9ax7u" />\n' +
      //   '    <bpmn:sequenceFlow id="SequenceFlow_1d2bl1g" sourceRef="Task_0x9ax7u" targetRef="IntermediateThrowEvent_1nh6gvk" />\n' +
      //   '  </bpmn:process>\n' +
      //   '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
      //   '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
      //   '      <bpmndi:BPMNEdge id="SequenceFlow_0nrfbee_di" bpmnElement="SequenceFlow_0nrfbee">\n' +
      //   '        <di:waypoint x="209" y="120" />\n' +
      //   '        <di:waypoint x="347" y="120" />\n' +
      //   '        <di:waypoint x="347" y="284" />\n' +
      //   '        <di:waypoint x="485" y="284" />\n' +
      //   '      </bpmndi:BPMNEdge>\n' +
      //   '      <bpmndi:BPMNShape id="StartEvent_0aw7fqm_di" bpmnElement="StartEvent_0aw7fqm">\n' +
      //   '        <dc:Bounds x="239" y="155" width="36" height="36" />\n' +
      //   '      </bpmndi:BPMNShape>\n' +
      //   '      <bpmndi:BPMNEdge id="SequenceFlow_0wqjqvq_di" bpmnElement="SequenceFlow_0wqjqvq">\n' +
      //   '        <di:waypoint x="275" y="173" />\n' +
      //   '        <di:waypoint x="325" y="173" />\n' +
      //   '      </bpmndi:BPMNEdge>\n' +
      //   '      <bpmndi:BPMNShape id="IntermediateThrowEvent_1nh6gvk_di" bpmnElement="IntermediateThrowEvent_1nh6gvk">\n' +
      //   '        <dc:Bounds x="782" y="155" width="36" height="36" />\n' +
      //   '      </bpmndi:BPMNShape>\n' +
      //   '      <bpmndi:BPMNShape id="SubProcess_0fzzktz_di" bpmnElement="Task_0abzf3j">\n' +
      //   '        <dc:Bounds x="325" y="133" width="100" height="80" />\n' +
      //   '      </bpmndi:BPMNShape>\n' +
      //   '      <bpmndi:BPMNShape id="SubProcess_003urof_di" bpmnElement="Task_0x9ax7u">\n' +
      //   '        <dc:Bounds x="610" y="133" width="100" height="80" />\n' +
      //   '      </bpmndi:BPMNShape>\n' +
      //   '      <bpmndi:BPMNShape id="ExclusiveGateway_126k0j8_di" bpmnElement="ExclusiveGateway_126k0j8" isMarkerVisible="true">\n' +
      //   '        <dc:Bounds x="491" y="148" width="50" height="50" />\n' +
      //   '      </bpmndi:BPMNShape>\n' +
      //   '      <bpmndi:BPMNEdge id="SequenceFlow_1xdmyls_di" bpmnElement="SequenceFlow_1xdmyls">\n' +
      //   '        <di:waypoint x="425" y="173" />\n' +
      //   '        <di:waypoint x="491" y="173" />\n' +
      //   '      </bpmndi:BPMNEdge>\n' +
      //   '      <bpmndi:BPMNEdge id="SequenceFlow_1voiina_di" bpmnElement="SequenceFlow_1voiina">\n' +
      //   '        <di:waypoint x="541" y="173" />\n' +
      //   '        <di:waypoint x="610" y="173" />\n' +
      //   '      </bpmndi:BPMNEdge>\n' +
      //   '      <bpmndi:BPMNEdge id="SequenceFlow_1d2bl1g_di" bpmnElement="SequenceFlow_1d2bl1g">\n' +
      //   '        <di:waypoint x="710" y="173" />\n' +
      //   '        <di:waypoint x="782" y="173" />\n' +
      //   '      </bpmndi:BPMNEdge>\n' +
      //   '    </bpmndi:BPMNPlane>\n' +
      //   '  </bpmndi:BPMNDiagram>\n' +
      //   '</bpmn:definitions>\n'
    }
  },
  methods: {
    turnToPage (route) {
      // this.setBpmnXmlStr()
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        console.log(route)
        name = route.name
        params = route.params
        query = route.query
      }
      if (route in this.headerHref){
        name = this.headerHref[route];
      }
      this.$router.push('/'+name)
    },
    createNewDiagram () {
      let self = this

      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(this.bpmnXmlStr, function (err) {
        if (err) {
          console.error(err)
        }
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
    },
    setBpmnXmlStr: function () {
      this.$store.state.bpmnXmlStr = this.xmlStr
      // this.$store.state.commit('newAuthor', this.inputText)
    }
  },
  computed: {
    bpmnXmlStr () {
      return this.$store.state.bpmnXmlStr
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
        propertiesPanelModule
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
    width: 97%;
    height: 90%;
    margin-right: 5px;
  }
  .canvas{
    padding: 0;
    height: 100%;
  }
  .panel{
    position: absolute;
    right: 0;
    top: -20px;
    width: 20%;
    height: 100%;
    padding-right: 20px
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
    width: 220px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }
  .buttons{
    position: absolute;
    left: 20px;
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
</style>
