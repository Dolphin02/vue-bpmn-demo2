import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters' // 导入响应的模块，*相当于引入了这个组件下所有导出的事例
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)
// 首先声明一个需要全局维护的状态 state,比如 我这里举例的resturantName
// noinspection JSAnnotator
const state = {
  resturantName: '飞歌餐馆', // 默认值
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
  // id: xxx  如果还有全局状态也可以在这里添加
  // name:xxx
}

// 注册上面引入的各大模块
const store = new Vuex.Store({
  state,    // 共同维护的一个状态，state里面可以是很多个全局状态
  getters,  // 获取数据并渲染
  actions,  // 数据的异步操作
  mutations  // 处理数据的唯一途径，state的改变或赋值只能在这里
})

export default store  // 导出store并在 main.js中引用注册。
