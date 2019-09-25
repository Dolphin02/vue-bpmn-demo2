<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1" @on-select="turnToPage">
          <div class="layout-logo">跨界养老服务平台</div>
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
      <Layout :style="{padding: '0 50px'}">
        <!--<Breadcrumb :style="{margin: '16px 0'}">-->
          <!--<BreadcrumbItem>Home</BreadcrumbItem>-->
          <!--<BreadcrumbItem>Components</BreadcrumbItem>-->
          <!--<BreadcrumbItem>Layout</BreadcrumbItem>-->
        <!--</Breadcrumb>-->
        <Content :style="{padding: '24px 0', minHeight: '580px', background: '#fff'}">
          <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
              <Menu active-name="1-2" theme="light" width="auto" :open-names="['1', '2', '3']" @on-select="turnToConfig">
                <Submenu name="1" >
                  <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    线上服务
                  </template>
                  <Submenu name="1-1" >
                    <template slot="title">
                      个人信息
                    </template>
                    <MenuItem name="workflow-1">信息授权</MenuItem>
                    <MenuItem name="workflow-3">信息获取</MenuItem>
                  </Submenu>
                  <Submenu name="1-2" >
                    <template slot="title">
                      医疗服务
                    </template>
                    <MenuItem name="workflow-1">在线问诊</MenuItem>
                    <!--<MenuItem name="workflow-2">医疗服务</MenuItem>-->
                    <MenuItem name="workflow-1">体检服务</MenuItem>
                    <MenuItem name="workflow-3">药物清单</MenuItem>
                  </Submenu>

                  <MenuItem name="workflow-3">预约挂号</MenuItem>
                  <MenuItem name="workflow-3">医疗本</MenuItem>
                  <Submenu name="1-3" >
                    <template slot="title">
                      购买药物
                    </template>
                    <MenuItem name="workflow-1">药物列表</MenuItem>
                    <MenuItem name="workflow-2">药物详情</MenuItem>
                    <MenuItem name="workflow-3">下单</MenuItem>
                    <MenuItem name="workflow-3">评价</MenuItem>
                    <MenuItem name="workflow-3">退换货</MenuItem>
                  </Submenu>
                </Submenu>

                <Submenu name="2">
                  <template slot="title">
                    <Icon type="ios-keypad"></Icon>
                    线下服务
                  </template>
                  <MenuItem name="2-1">健康测量</MenuItem>
                  <MenuItem name="2-2">针灸按摩</MenuItem>
                </Submenu>
                <Submenu name="3">
                  <template slot="title">
                    <Icon type="ios-analytics"></Icon>
                    第三方服务
                  </template>
                  <MenuItem name="3-1">订餐服务</MenuItem>
                  <MenuItem name="3-2">地图服务</MenuItem>
                </Submenu>
              </Menu>
            </Sider>
            <Content :style="{padding: '24px', minHeight: '570px', background: '#fff'}">
              <div class="containers" ref="content" style="height: 570px; padding-right: 80px">
                <div class="canvas" ref="canvas" style="height: 560px; width: 80%;margin-right: 80px" draggable="true"></div>
                <!--<div id="js-properties-panel" class="panel" draggable="false"></div>-->
                <ul class="buttons" style="height: 40px">
                  <li>download</li>
                  <li style="width: 30px">
                    <a ref="saveDiagram" href="javascript:" title="download BPMN diagram" ><Icon type="md-download" style="width: 30px" /></a>
                  </li>
                  <li >
                    <a ref="saveSvg" href="javascript:" title="download as SVG image"><Icon type="md-photos" style="width: 30px"/></a>
                  </li>
                </ul>
                <div class="jump_button" >
                  <Button type="primary" @click="turnToConfig" name="next">下一步</Button>
                </div>
              </div>
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">2018-2020 &copy; Healthy</Footer>
      <!--<footer-div></footer-div>-->
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
import FooterDiv from './footer'
import HeaderDiv from './header'
// import {getBpmnXml, saveBpmnData, getNodeData} from '../../api/modeler'

export default {
  components: {HeaderDiv, FooterDiv},
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
    }
  },
  methods: {
    turnToConfig(done) {
      this.bpmnModeler.saveXML({ format: true }, function (err, xml) {
      done(err, xml)
      })
      this.setBpmnXmlStr()
    },

    turnToPage (route) {
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
      const that = this
      let params = {
        id: this.id
      }
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(this.xmlStr, function (err) {
        if (err) {
          console.error(err)
        }
        // var canvas = _self.bpmnModeler.getDefinitions('canvas')
        // // let canvas = this.bpmnModeler.get('canvas');
        // _self.canvas = canvas
        // canvas.addMarker('StartEvent_1', 'highlight');
        const canvas = that.bpmnModeler.get('canvas');
        canvas.zoom('fit-viewport');
        // 在这里写死了
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

    // 获取给弹窗的id
    getDialogId(){
      const that = this;
      const params = {
        nodeCode: this.nodeCode,
        modelId: this.modelId
      };
      that.getNodeData(params).then(res => {
        that.dialog_id = res.obj.id;
        that.dialog_confBaseId = res.obj.confBaseId;
        that.dialogVisible = true;
      })
    },

    getNodeData() {
      //获取流程图的根元素
      this.canvas.getRootElement();
    },

    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveSVG (done) {
      // 把传入的done再传给bpmn原型的saveSVG函数调用
      this.bpmnModeler.saveSVG(done)
    },
    // 下载为XML格式,done是个函数，调用的时候传入的
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
        this.xmlStr = data
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

  created: function() {
    this.xmlStr = this.bpmnXmlStr;
    this.createNewDiagram(this.bpmnModeler)
  },
  mounted: function () {
    // 获取到属性ref为“content”的dom节点
    this.container = this.$refs.content
    // 获取到属性ref为“canvas”的dom节点
    const canvas = this.$refs.canvas

    // 建模，官方文档这里讲的很详细
    this.bpmnModeler = new BpmnModeler({
      container: canvas,
      // 添加控制板
      // propertiesPanel: {
      //   parent: '#js-properties-panel'
      // },
      additionalModules: [
        // 左边工具栏以及节点
        propertiesProviderModule,
        // 右边的工具栏
        // propertiesPanelModule
      ],
      // moddleExtensions: {
      //   camunda: camundaModdleDescriptor
      // }
    })

    this.createNewDiagram(this.bpmnModeler)
    // this.xmlStr = this.bpmnXmlStr;


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
        _this.xmlStr = xml
      })
      _this.turnToConfig(function (err, xml) {
        // _this.setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml)
        _this.xmlStr = xml
        // console.log(_this.xmlStr)
      })
      // _this.turnToPage(route, function (err, xml) {
      //   _this.setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml)
      //   _this.xmlStr = xml;
      // })
    })

    // this.turnToConfig(function (err, xml) {
    //   // _this.setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml)
    //   _this.xmlStr = xml
    //   // console.log(_this.xmlStr)
    // })


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
  /*@import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';*/
  .containers{
    position: absolute;
    background-color: #ffffff;
    padding-right: 10px;
    width: 97%;
    height: 80%;
  }
  .canvas{
    padding: 0;
    height: 100%;
    width: 97%;
  }
  .panel{
    position: absolute;
    right: 0;
    top: 0;
    width: 20%;
    height: 270px;
    margin-right: 20px;
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
    width: 220px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
    /*height: 40px;*/
  }
</style>
