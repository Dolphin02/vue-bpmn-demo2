import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    bpmnXmlStr: '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0fppxr8" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
      '  <bpmn:process id="Process_1" isExecutable="false">\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_0nrfbee" targetRef="Task_0ho18x0" />\n' +
      '    <bpmn:startEvent id="StartEvent_0aw7fqm">\n' +
      '      <bpmn:outgoing>SequenceFlow_0wqjqvq</bpmn:outgoing>\n' +
      '    </bpmn:startEvent>\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_0wqjqvq" sourceRef="StartEvent_0aw7fqm" targetRef="Task_0abzf3j" />\n' +
      '    <bpmn:intermediateThrowEvent id="IntermediateThrowEvent_1nh6gvk">\n' +
      '      <bpmn:incoming>SequenceFlow_1d2bl1g</bpmn:incoming>\n' +
      '    </bpmn:intermediateThrowEvent>\n' +
      '    <bpmn:subProcess id="Task_0abzf3j" name="个人信息">\n' +
      '      <bpmn:incoming>SequenceFlow_0wqjqvq</bpmn:incoming>\n' +
      '      <bpmn:outgoing>SequenceFlow_1xdmyls</bpmn:outgoing>\n' +
      '    </bpmn:subProcess>\n' +
      '    <bpmn:subProcess id="Task_0x9ax7u" name="医疗服务">\n' +
      '      <bpmn:incoming>SequenceFlow_1voiina</bpmn:incoming>\n' +
      '      <bpmn:outgoing>SequenceFlow_1d2bl1g</bpmn:outgoing>\n' +
      '    </bpmn:subProcess>\n' +
      '    <bpmn:exclusiveGateway id="ExclusiveGateway_126k0j8">\n' +
      '      <bpmn:incoming>SequenceFlow_1xdmyls</bpmn:incoming>\n' +
      '      <bpmn:outgoing>SequenceFlow_1voiina</bpmn:outgoing>\n' +
      '    </bpmn:exclusiveGateway>\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_1xdmyls" sourceRef="Task_0abzf3j" targetRef="ExclusiveGateway_126k0j8" />\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_1voiina" sourceRef="ExclusiveGateway_126k0j8" targetRef="Task_0x9ax7u" />\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_1d2bl1g" sourceRef="Task_0x9ax7u" targetRef="IntermediateThrowEvent_1nh6gvk" />\n' +
      '  </bpmn:process>\n' +
      '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
      '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_0nrfbee_di" bpmnElement="SequenceFlow_0nrfbee">\n' +
      '        <di:waypoint x="209" y="120" />\n' +
      '        <di:waypoint x="347" y="120" />\n' +
      '        <di:waypoint x="347" y="284" />\n' +
      '        <di:waypoint x="485" y="284" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="StartEvent_0aw7fqm_di" bpmnElement="StartEvent_0aw7fqm">\n' +
      '        <dc:Bounds x="239" y="155" width="36" height="36" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_0wqjqvq_di" bpmnElement="SequenceFlow_0wqjqvq">\n' +
      '        <di:waypoint x="275" y="173" />\n' +
      '        <di:waypoint x="325" y="173" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="IntermediateThrowEvent_1nh6gvk_di" bpmnElement="IntermediateThrowEvent_1nh6gvk">\n' +
      '        <dc:Bounds x="782" y="155" width="36" height="36" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNShape id="SubProcess_0fzzktz_di" bpmnElement="Task_0abzf3j">\n' +
      '        <dc:Bounds x="325" y="133" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNShape id="SubProcess_003urof_di" bpmnElement="Task_0x9ax7u">\n' +
      '        <dc:Bounds x="610" y="133" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNShape id="ExclusiveGateway_126k0j8_di" bpmnElement="ExclusiveGateway_126k0j8" isMarkerVisible="true">\n' +
      '        <dc:Bounds x="491" y="148" width="50" height="50" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1xdmyls_di" bpmnElement="SequenceFlow_1xdmyls">\n' +
      '        <di:waypoint x="425" y="173" />\n' +
      '        <di:waypoint x="491" y="173" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1voiina_di" bpmnElement="SequenceFlow_1voiina">\n' +
      '        <di:waypoint x="541" y="173" />\n' +
      '        <di:waypoint x="610" y="173" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1d2bl1g_di" bpmnElement="SequenceFlow_1d2bl1g">\n' +
      '        <di:waypoint x="710" y="173" />\n' +
      '        <di:waypoint x="782" y="173" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '    </bpmndi:BPMNPlane>\n' +
      '  </bpmndi:BPMNDiagram>\n' +
      '</bpmn:definitions>\n'
  },
  mutations: {
    newBpmnXmlStr (state, msg) {
      state.bpmnXmlStr = msg
    }
  }
})

export default store
