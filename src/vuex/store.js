import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    bpmnXmlStr: '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0fppxr8" targetNamespace="http://bpmn.io/schema/bpmn">\n' +
      '  <bpmn:process id="Process_1" isExecutable="false">\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_0nrfbee" />\n' +
      '    <bpmn:startEvent id="StartEvent_0aw7fqm">\n' +
      '      <bpmn:outgoing>SequenceFlow_0y3mhkm</bpmn:outgoing>\n' +
      '    </bpmn:startEvent>\n' +
      '    <bpmn:subProcess id="Task_0x9ax7u" name="医疗服务">\n' +
      '      <bpmn:incoming>SequenceFlow_084dnnh</bpmn:incoming>\n' +
      '      <bpmn:outgoing>SequenceFlow_03vs7x4</bpmn:outgoing>\n' +
      '      <bpmn:task id="Task_1mjpwi9" name="在线问诊">\n' +
      '        <bpmn:incoming>SequenceFlow_004d6zo</bpmn:incoming>\n' +
      '        <bpmn:outgoing>SequenceFlow_0gxbxzd</bpmn:outgoing>\n' +
      '        <bpmn:outgoing>SequenceFlow_1232sii</bpmn:outgoing>\n' +
      '      </bpmn:task>\n' +
      '      <bpmn:exclusiveGateway id="ExclusiveGateway_15zv2sl" name="是否需要体检">\n' +
      '        <bpmn:incoming>SequenceFlow_0gxbxzd</bpmn:incoming>\n' +
      '        <bpmn:outgoing>SequenceFlow_1o5fzuq</bpmn:outgoing>\n' +
      '        <bpmn:outgoing>SequenceFlow_0wcjpta</bpmn:outgoing>\n' +
      '      </bpmn:exclusiveGateway>\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_0gxbxzd" sourceRef="Task_1mjpwi9" targetRef="ExclusiveGateway_15zv2sl" />\n' +
      '      <bpmn:task id="Task_0r1rtw3" name="体检服务">\n' +
      '        <bpmn:incoming>SequenceFlow_1o5fzuq</bpmn:incoming>\n' +
      '        <bpmn:outgoing>SequenceFlow_004d6zo</bpmn:outgoing>\n' +
      '      </bpmn:task>\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_1o5fzuq" name="是" sourceRef="ExclusiveGateway_15zv2sl" targetRef="Task_0r1rtw3" />\n' +
      '      <bpmn:intermediateThrowEvent id="IntermediateThrowEvent_1qcg95d">\n' +
      '        <bpmn:incoming>SequenceFlow_0wcjpta</bpmn:incoming>\n' +
      '      </bpmn:intermediateThrowEvent>\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_0wcjpta" name="否" sourceRef="ExclusiveGateway_15zv2sl" targetRef="IntermediateThrowEvent_1qcg95d" />\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_004d6zo" sourceRef="Task_0r1rtw3" targetRef="Task_1mjpwi9" />\n' +
      '      <bpmn:exclusiveGateway id="ExclusiveGateway_0noh3p5" name="是否需要开药">\n' +
      '        <bpmn:incoming>SequenceFlow_1232sii</bpmn:incoming>\n' +
      '        <bpmn:outgoing>SequenceFlow_00dqxdt</bpmn:outgoing>\n' +
      '        <bpmn:outgoing>SequenceFlow_0l8ordm</bpmn:outgoing>\n' +
      '      </bpmn:exclusiveGateway>\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_1232sii" sourceRef="Task_1mjpwi9" targetRef="ExclusiveGateway_0noh3p5" />\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_00dqxdt" name="是" sourceRef="ExclusiveGateway_0noh3p5" targetRef="Task_1ubs7pw" />\n' +
      '      <bpmn:intermediateThrowEvent id="IntermediateThrowEvent_1pw0rj4">\n' +
      '        <bpmn:incoming>SequenceFlow_0l8ordm</bpmn:incoming>\n' +
      '      </bpmn:intermediateThrowEvent>\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_0l8ordm" name="否" sourceRef="ExclusiveGateway_0noh3p5" targetRef="IntermediateThrowEvent_1pw0rj4" />\n' +
      '      <bpmn:subProcess id="Task_1ubs7pw" name="购买药物">\n' +
      '        <bpmn:incoming>SequenceFlow_00dqxdt</bpmn:incoming>\n' +
      '        <bpmn:task id="Task_0psh6ly" name="药物列表">\n' +
      '          <bpmn:outgoing>SequenceFlow_0svyhnf</bpmn:outgoing>\n' +
      '        </bpmn:task>\n' +
      '        <bpmn:task id="Task_1e0t0xn" name="药物详情">\n' +
      '          <bpmn:incoming>SequenceFlow_0svyhnf</bpmn:incoming>\n' +
      '          <bpmn:outgoing>SequenceFlow_1vqfd43</bpmn:outgoing>\n' +
      '        </bpmn:task>\n' +
      '        <bpmn:sequenceFlow id="SequenceFlow_0svyhnf" sourceRef="Task_0psh6ly" targetRef="Task_1e0t0xn" />\n' +
      '        <bpmn:task id="Task_0z7t4e7" name="下单">\n' +
      '          <bpmn:incoming>SequenceFlow_1vqfd43</bpmn:incoming>\n' +
      '          <bpmn:outgoing>SequenceFlow_0wng2s6</bpmn:outgoing>\n' +
      '          <bpmn:outgoing>SequenceFlow_1egtxt9</bpmn:outgoing>\n' +
      '        </bpmn:task>\n' +
      '        <bpmn:sequenceFlow id="SequenceFlow_1vqfd43" sourceRef="Task_1e0t0xn" targetRef="Task_0z7t4e7" />\n' +
      '        <bpmn:intermediateThrowEvent id="IntermediateThrowEvent_1bx69gl">\n' +
      '          <bpmn:incoming>SequenceFlow_0wng2s6</bpmn:incoming>\n' +
      '        </bpmn:intermediateThrowEvent>\n' +
      '        <bpmn:sequenceFlow id="SequenceFlow_0wng2s6" sourceRef="Task_0z7t4e7" targetRef="IntermediateThrowEvent_1bx69gl" />\n' +
      '        <bpmn:exclusiveGateway id="ExclusiveGateway_1ipi1hy" name="是否需要退换货">\n' +
      '          <bpmn:incoming>SequenceFlow_1egtxt9</bpmn:incoming>\n' +
      '          <bpmn:outgoing>SequenceFlow_0k6neqz</bpmn:outgoing>\n' +
      '          <bpmn:outgoing>SequenceFlow_14ding3</bpmn:outgoing>\n' +
      '        </bpmn:exclusiveGateway>\n' +
      '        <bpmn:sequenceFlow id="SequenceFlow_1egtxt9" sourceRef="Task_0z7t4e7" targetRef="ExclusiveGateway_1ipi1hy" />\n' +
      '        <bpmn:task id="Task_1uu0xiv" name="退换货">\n' +
      '          <bpmn:incoming>SequenceFlow_0k6neqz</bpmn:incoming>\n' +
      '        </bpmn:task>\n' +
      '        <bpmn:sequenceFlow id="SequenceFlow_0k6neqz" sourceRef="ExclusiveGateway_1ipi1hy" targetRef="Task_1uu0xiv" />\n' +
      '        <bpmn:task id="Task_1gbtw2y" name="评价">\n' +
      '          <bpmn:incoming>SequenceFlow_14ding3</bpmn:incoming>\n' +
      '        </bpmn:task>\n' +
      '        <bpmn:sequenceFlow id="SequenceFlow_14ding3" name="否" sourceRef="ExclusiveGateway_1ipi1hy" targetRef="Task_1gbtw2y" />\n' +
      '      </bpmn:subProcess>\n' +
      '    </bpmn:subProcess>\n' +
      '    <bpmn:subProcess id="SubProcess_0ty9vjg" name="注册/登录">\n' +
      '      <bpmn:incoming>SequenceFlow_0y3mhkm</bpmn:incoming>\n' +
      '      <bpmn:outgoing>SequenceFlow_1go622v</bpmn:outgoing>\n' +
      '      <bpmn:task id="Task_1ly9w85" name="登录">\n' +
      '        <bpmn:incoming>SequenceFlow_1nxwoqq</bpmn:incoming>\n' +
      '        <bpmn:incoming>SequenceFlow_1c8pt6w</bpmn:incoming>\n' +
      '        <bpmn:outgoing>SequenceFlow_0z3fk6u</bpmn:outgoing>\n' +
      '      </bpmn:task>\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_0z3fk6u" sourceRef="Task_1ly9w85" targetRef="ExclusiveGateway_09dzm7l" />\n' +
      '      <bpmn:exclusiveGateway id="ExclusiveGateway_09dzm7l" name="用户名是否存在">\n' +
      '        <bpmn:incoming>SequenceFlow_0z3fk6u</bpmn:incoming>\n' +
      '        <bpmn:outgoing>SequenceFlow_16wkf2c</bpmn:outgoing>\n' +
      '        <bpmn:outgoing>SequenceFlow_0c0t1jl</bpmn:outgoing>\n' +
      '      </bpmn:exclusiveGateway>\n' +
      '      <bpmn:task id="Task_0dseu5y" name="注册">\n' +
      '        <bpmn:incoming>SequenceFlow_16wkf2c</bpmn:incoming>\n' +
      '        <bpmn:incoming>SequenceFlow_1dt3zfn</bpmn:incoming>\n' +
      '        <bpmn:outgoing>SequenceFlow_1fy9llp</bpmn:outgoing>\n' +
      '      </bpmn:task>\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_16wkf2c" name="否" sourceRef="ExclusiveGateway_09dzm7l" targetRef="Task_0dseu5y" />\n' +
      '      <bpmn:exclusiveGateway id="ExclusiveGateway_19f4yzf" name="注册是否成功">\n' +
      '        <bpmn:incoming>SequenceFlow_1fy9llp</bpmn:incoming>\n' +
      '        <bpmn:outgoing>SequenceFlow_1dt3zfn</bpmn:outgoing>\n' +
      '        <bpmn:outgoing>SequenceFlow_1nxwoqq</bpmn:outgoing>\n' +
      '      </bpmn:exclusiveGateway>\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_1fy9llp" sourceRef="Task_0dseu5y" targetRef="ExclusiveGateway_19f4yzf" />\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_1dt3zfn" name="否" sourceRef="ExclusiveGateway_19f4yzf" targetRef="Task_0dseu5y" />\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_1nxwoqq" name="是" sourceRef="ExclusiveGateway_19f4yzf" targetRef="Task_1ly9w85" />\n' +
      '      <bpmn:exclusiveGateway id="ExclusiveGateway_06e5icu" name="合法用户">\n' +
      '        <bpmn:incoming>SequenceFlow_0c0t1jl</bpmn:incoming>\n' +
      '        <bpmn:outgoing>SequenceFlow_1c8pt6w</bpmn:outgoing>\n' +
      '      </bpmn:exclusiveGateway>\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_0c0t1jl" name="是" sourceRef="ExclusiveGateway_09dzm7l" targetRef="ExclusiveGateway_06e5icu" />\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_1c8pt6w" name="否" sourceRef="ExclusiveGateway_06e5icu" targetRef="Task_1ly9w85" />\n' +
      '    </bpmn:subProcess>\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_1go622v" name="是" sourceRef="SubProcess_0ty9vjg" targetRef="Task_0abzf3j" />\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_0y3mhkm" sourceRef="StartEvent_0aw7fqm" targetRef="SubProcess_0ty9vjg" />\n' +
      '    <bpmn:subProcess id="Task_0abzf3j" name="个人信息">\n' +
      '      <bpmn:incoming>SequenceFlow_1go622v</bpmn:incoming>\n' +
      '      <bpmn:outgoing>SequenceFlow_16vlhlq</bpmn:outgoing>\n' +
      '      <bpmn:task id="Task_1owr60x" name="信息授权">\n' +
      '        <bpmn:incoming>SequenceFlow_1gcpfzk</bpmn:incoming>\n' +
      '        <bpmn:outgoing>SequenceFlow_1pdjgut</bpmn:outgoing>\n' +
      '      </bpmn:task>\n' +
      '      <bpmn:exclusiveGateway id="ExclusiveGateway_0blvd8m" name="同意">\n' +
      '        <bpmn:incoming>SequenceFlow_1pdjgut</bpmn:incoming>\n' +
      '        <bpmn:outgoing>SequenceFlow_0l2ai9m</bpmn:outgoing>\n' +
      '        <bpmn:outgoing>SequenceFlow_1gcpfzk</bpmn:outgoing>\n' +
      '      </bpmn:exclusiveGateway>\n' +
      '      <bpmn:task id="Task_1ygn5yu" name="信息获取">\n' +
      '        <bpmn:incoming>SequenceFlow_0l2ai9m</bpmn:incoming>\n' +
      '      </bpmn:task>\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_1pdjgut" sourceRef="Task_1owr60x" targetRef="ExclusiveGateway_0blvd8m" />\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_0l2ai9m" name="是" sourceRef="ExclusiveGateway_0blvd8m" targetRef="Task_1ygn5yu" />\n' +
      '      <bpmn:sequenceFlow id="SequenceFlow_1gcpfzk" name="否" sourceRef="ExclusiveGateway_0blvd8m" targetRef="Task_1owr60x" />\n' +
      '    </bpmn:subProcess>\n' +
      '    <bpmn:endEvent id="EndEvent_04fjidw">\n' +
      '      <bpmn:incoming>SequenceFlow_03vs7x4</bpmn:incoming>\n' +
      '    </bpmn:endEvent>\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_16vlhlq" sourceRef="Task_0abzf3j" targetRef="ExclusiveGateway_126k0j8" />\n' +
      '    <bpmn:task id="Task_12suk2h" name="医疗本">\n' +
      '      <bpmn:outgoing>SequenceFlow_0hdvupb</bpmn:outgoing>\n' +
      '    </bpmn:task>\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_03vs7x4" sourceRef="Task_0x9ax7u" targetRef="EndEvent_04fjidw" />\n' +
      '    <bpmn:parallelGateway id="ExclusiveGateway_126k0j8">\n' +
      '      <bpmn:incoming>SequenceFlow_16vlhlq</bpmn:incoming>\n' +
      '      <bpmn:incoming>SequenceFlow_0hdvupb</bpmn:incoming>\n' +
      '      <bpmn:outgoing>SequenceFlow_084dnnh</bpmn:outgoing>\n' +
      '    </bpmn:parallelGateway>\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_0hdvupb" sourceRef="Task_12suk2h" targetRef="ExclusiveGateway_126k0j8" />\n' +
      '    <bpmn:sequenceFlow id="SequenceFlow_084dnnh" sourceRef="ExclusiveGateway_126k0j8" targetRef="Task_0x9ax7u" />\n' +
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
      '        <dc:Bounds x="70" y="155" width="36" height="36" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNShape id="SubProcess_003urof_di" bpmnElement="Task_0x9ax7u" isExpanded="false">\n' +
      '        <dc:Bounds x="593.5" y="132.5" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNShape id="Task_1owr60x_di" bpmnElement="Task_1owr60x">\n' +
      '        <dc:Bounds x="191" y="117" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNShape id="ExclusiveGateway_0blvd8m_di" bpmnElement="ExclusiveGateway_0blvd8m" isMarkerVisible="true">\n' +
      '        <dc:Bounds x="341" y="132" width="50" height="50" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="355" y="108" width="22" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1pdjgut_di" bpmnElement="SequenceFlow_1pdjgut">\n' +
      '        <di:waypoint x="291" y="157" />\n' +
      '        <di:waypoint x="341" y="157" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="Task_1ygn5yu_di" bpmnElement="Task_1ygn5yu">\n' +
      '        <dc:Bounds x="441" y="117" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_0l2ai9m_di" bpmnElement="SequenceFlow_0l2ai9m">\n' +
      '        <di:waypoint x="391" y="157" />\n' +
      '        <di:waypoint x="441" y="157" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="411" y="139" width="11" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1gcpfzk_di" bpmnElement="SequenceFlow_1gcpfzk">\n' +
      '        <di:waypoint x="366" y="157" />\n' +
      '        <di:waypoint x="366" y="237" />\n' +
      '        <di:waypoint x="241" y="237" />\n' +
      '        <di:waypoint x="241" y="197" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="298" y="219" width="11" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="SubProcess_0ty9vjg_di" bpmnElement="SubProcess_0ty9vjg" isExpanded="false">\n' +
      '        <dc:Bounds x="160.5" y="132.5" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNShape id="Task_1ly9w85_di" bpmnElement="Task_1ly9w85">\n' +
      '        <dc:Bounds x="-61" y="92" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_0z3fk6u_di" bpmnElement="SequenceFlow_0z3fk6u">\n' +
      '        <di:waypoint x="39" y="132" />\n' +
      '        <di:waypoint x="78" y="132" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="ExclusiveGateway_09dzm7l_di" bpmnElement="ExclusiveGateway_09dzm7l" isMarkerVisible="true">\n' +
      '        <dc:Bounds x="78" y="107" width="50" height="50" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="64" y="83" width="77" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNShape id="Task_0dseu5y_di" bpmnElement="Task_0dseu5y">\n' +
      '        <dc:Bounds x="192" y="92" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_16wkf2c_di" bpmnElement="SequenceFlow_16wkf2c">\n' +
      '        <di:waypoint x="128" y="132" />\n' +
      '        <di:waypoint x="192" y="132" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="155" y="114" width="11" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="ExclusiveGateway_19f4yzf_di" bpmnElement="ExclusiveGateway_19f4yzf" isMarkerVisible="true">\n' +
      '        <dc:Bounds x="356" y="107" width="50" height="50" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="416" y="125" width="66" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1fy9llp_di" bpmnElement="SequenceFlow_1fy9llp">\n' +
      '        <di:waypoint x="292" y="132" />\n' +
      '        <di:waypoint x="356" y="132" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1go622v_di" bpmnElement="SequenceFlow_1go622v">\n' +
      '        <di:waypoint x="260" y="173" />\n' +
      '        <di:waypoint x="316" y="173" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="276" y="149" width="11" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1dt3zfn_di" bpmnElement="SequenceFlow_1dt3zfn">\n' +
      '        <di:waypoint x="381" y="157" />\n' +
      '        <di:waypoint x="381" y="207" />\n' +
      '        <di:waypoint x="242" y="207" />\n' +
      '        <di:waypoint x="242" y="172" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="306" y="189" width="11" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1nxwoqq_di" bpmnElement="SequenceFlow_1nxwoqq">\n' +
      '        <di:waypoint x="381" y="107" />\n' +
      '        <di:waypoint x="381" y="67" />\n' +
      '        <di:waypoint x="-11" y="67" />\n' +
      '        <di:waypoint x="-11" y="92" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="180" y="49" width="11" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="ExclusiveGateway_06e5icu_di" bpmnElement="ExclusiveGateway_06e5icu" isMarkerVisible="true">\n' +
      '        <dc:Bounds x="192" y="217" width="50" height="50" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="195" y="193" width="44" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_0c0t1jl_di" bpmnElement="SequenceFlow_0c0t1jl">\n' +
      '        <di:waypoint x="103" y="157" />\n' +
      '        <di:waypoint x="103" y="242" />\n' +
      '        <di:waypoint x="192" y="242" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="113" y="197" width="11" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1c8pt6w_di" bpmnElement="SequenceFlow_1c8pt6w">\n' +
      '        <di:waypoint x="217" y="267" />\n' +
      '        <di:waypoint x="217" y="296" />\n' +
      '        <di:waypoint x="-18" y="296" />\n' +
      '        <di:waypoint x="-18" y="172" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="94" y="278" width="11" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_0y3mhkm_di" bpmnElement="SequenceFlow_0y3mhkm">\n' +
      '        <di:waypoint x="106" y="173" />\n' +
      '        <di:waypoint x="161" y="173" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="SubProcess_0tushw7_di" bpmnElement="Task_0abzf3j" isExpanded="false">\n' +
      '        <dc:Bounds x="316" y="133" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNShape id="EndEvent_04fjidw_di" bpmnElement="EndEvent_04fjidw">\n' +
      '        <dc:Bounds x="754" y="155" width="36" height="36" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_16vlhlq_di" bpmnElement="SequenceFlow_16vlhlq">\n' +
      '        <di:waypoint x="416" y="173" />\n' +
      '        <di:waypoint x="491" y="173" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="Task_12suk2h_di" bpmnElement="Task_12suk2h">\n' +
      '        <dc:Bounds x="316" y="23" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_03vs7x4_di" bpmnElement="SequenceFlow_03vs7x4">\n' +
      '        <di:waypoint x="694" y="173" />\n' +
      '        <di:waypoint x="754" y="173" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="ParallelGateway_0lw0c6f_di" bpmnElement="ExclusiveGateway_126k0j8">\n' +
      '        <dc:Bounds x="491" y="148" width="50" height="50" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_0hdvupb_di" bpmnElement="SequenceFlow_0hdvupb">\n' +
      '        <di:waypoint x="416" y="63" />\n' +
      '        <di:waypoint x="516" y="63" />\n' +
      '        <di:waypoint x="516" y="148" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_084dnnh_di" bpmnElement="SequenceFlow_084dnnh">\n' +
      '        <di:waypoint x="541" y="173" />\n' +
      '        <di:waypoint x="594" y="173" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="Task_1mjpwi9_di" bpmnElement="Task_1mjpwi9">\n' +
      '        <dc:Bounds x="571" y="60" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNShape id="ExclusiveGateway_15zv2sl_di" bpmnElement="ExclusiveGateway_15zv2sl" isMarkerVisible="true">\n' +
      '        <dc:Bounds x="721" y="75" width="50" height="50" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="781" y="93" width="66" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_0gxbxzd_di" bpmnElement="SequenceFlow_0gxbxzd">\n' +
      '        <di:waypoint x="671" y="100" />\n' +
      '        <di:waypoint x="721" y="100" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="Task_0r1rtw3_di" bpmnElement="Task_0r1rtw3">\n' +
      '        <dc:Bounds x="696" y="-58" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1o5fzuq_di" bpmnElement="SequenceFlow_1o5fzuq">\n' +
      '        <di:waypoint x="746" y="75" />\n' +
      '        <di:waypoint x="746" y="22" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="729" y="42" width="11" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="IntermediateThrowEvent_1qcg95d_di" bpmnElement="IntermediateThrowEvent_1qcg95d">\n' +
      '        <dc:Bounds x="728" y="164" width="36" height="36" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_0wcjpta_di" bpmnElement="SequenceFlow_0wcjpta">\n' +
      '        <di:waypoint x="746" y="125" />\n' +
      '        <di:waypoint x="746" y="164" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="752" y="138" width="11" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_004d6zo_di" bpmnElement="SequenceFlow_004d6zo">\n' +
      '        <di:waypoint x="696" y="-18" />\n' +
      '        <di:waypoint x="621" y="-18" />\n' +
      '        <di:waypoint x="621" y="60" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="ExclusiveGateway_0noh3p5_di" bpmnElement="ExclusiveGateway_0noh3p5" isMarkerVisible="true">\n' +
      '        <dc:Bounds x="596" y="194" width="50" height="50" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="525" y="212" width="66" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1232sii_di" bpmnElement="SequenceFlow_1232sii">\n' +
      '        <di:waypoint x="621" y="140" />\n' +
      '        <di:waypoint x="621" y="194" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_00dqxdt_di" bpmnElement="SequenceFlow_00dqxdt">\n' +
      '        <di:waypoint x="621" y="244" />\n' +
      '        <di:waypoint x="621" y="311" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="631" y="279" width="11" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="IntermediateThrowEvent_1pw0rj4_di" bpmnElement="IntermediateThrowEvent_1pw0rj4">\n' +
      '        <dc:Bounds x="707" y="201" width="36" height="36" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_0l8ordm_di" bpmnElement="SequenceFlow_0l8ordm">\n' +
      '        <di:waypoint x="646" y="219" />\n' +
      '        <di:waypoint x="707" y="219" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="671" y="201" width="11" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="SubProcess_0gbz68e_di" bpmnElement="Task_1ubs7pw" isExpanded="false">\n' +
      '        <dc:Bounds x="571" y="311" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNShape id="Task_0psh6ly_di" bpmnElement="Task_0psh6ly">\n' +
      '        <dc:Bounds x="295" y="244" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNShape id="Task_1e0t0xn_di" bpmnElement="Task_1e0t0xn">\n' +
      '        <dc:Bounds x="445" y="244" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_0svyhnf_di" bpmnElement="SequenceFlow_0svyhnf">\n' +
      '        <di:waypoint x="395" y="284" />\n' +
      '        <di:waypoint x="445" y="284" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="Task_0z7t4e7_di" bpmnElement="Task_0z7t4e7">\n' +
      '        <dc:Bounds x="595" y="244" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1vqfd43_di" bpmnElement="SequenceFlow_1vqfd43">\n' +
      '        <di:waypoint x="545" y="284" />\n' +
      '        <di:waypoint x="595" y="284" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="IntermediateThrowEvent_1bx69gl_di" bpmnElement="IntermediateThrowEvent_1bx69gl">\n' +
      '        <dc:Bounds x="702" y="348" width="36" height="36" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_0wng2s6_di" bpmnElement="SequenceFlow_0wng2s6">\n' +
      '        <di:waypoint x="695" y="284" />\n' +
      '        <di:waypoint x="720" y="284" />\n' +
      '        <di:waypoint x="720" y="348" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="ExclusiveGateway_1ipi1hy_di" bpmnElement="ExclusiveGateway_1ipi1hy" isMarkerVisible="true">\n' +
      '        <dc:Bounds x="745" y="259" width="50" height="50" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="731" y="235" width="77" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_1egtxt9_di" bpmnElement="SequenceFlow_1egtxt9">\n' +
      '        <di:waypoint x="695" y="284" />\n' +
      '        <di:waypoint x="745" y="284" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="Task_1uu0xiv_di" bpmnElement="Task_1uu0xiv">\n' +
      '        <dc:Bounds x="845" y="244" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_0k6neqz_di" bpmnElement="SequenceFlow_0k6neqz">\n' +
      '        <di:waypoint x="795" y="284" />\n' +
      '        <di:waypoint x="845" y="284" />\n' +
      '      </bpmndi:BPMNEdge>\n' +
      '      <bpmndi:BPMNShape id="Task_1gbtw2y_di" bpmnElement="Task_1gbtw2y">\n' +
      '        <dc:Bounds x="845" y="406" width="100" height="80" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '      <bpmndi:BPMNEdge id="SequenceFlow_14ding3_di" bpmnElement="SequenceFlow_14ding3">\n' +
      '        <di:waypoint x="770" y="309" />\n' +
      '        <di:waypoint x="770" y="446" />\n' +
      '        <di:waypoint x="845" y="446" />\n' +
      '        <bpmndi:BPMNLabel>\n' +
      '          <dc:Bounds x="780" y="375" width="11" height="14" />\n' +
      '        </bpmndi:BPMNLabel>\n' +
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
