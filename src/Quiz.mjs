
export const papers = {
  paper1: {
    name: "练习卷 (一)",
    questions: [
      {
        id: "p1q1",
        type: "single",
        question: "选择会谈的内容时，应该使之适合（ ）。",
        options: ["咨询师的职业兴趣", "咨询师的理论水平", "求助者的心理强度", "求助者的接受能力"],
        answer: 3 
      },
      {
        id: "p1q2",
        type: "single",
        question: "鼓励技术中最常用的方法是（ ）。",
        options: ["不断提问", "给予奖励", "及时表扬", "直接重复求助者的话"],
        answer: 3
      },
      {
        id: "p1q3",
        type: "single",
        question: "心理咨询师在咨询关系中最重要是（ ）。",
        options: ["增进来访者的利益和福祉", "遵守保密原则", "满足求助者的需求", "尊重求助者"],
        answer: 3
      },
      {
        id: "p1q4",
        type: "multiple",
        question: "婴儿动作发展的规律性包括（ ）。",
        options: ["从整体动作向分化动作发展", "从分化动作向整体动作发展", "从随意动作向不随意动作发展", "从不随意动作向随意动作发展"],
        answer: [0, 3]
      },
      {
        id: "p1q5",
        type: "multiple",
        question: "精神分裂症患者通常会表现出（ ）。",
        options: ["自知力受到破坏", "智能低下", "精神活动不协调", "意识障碍"],
        answer: [0, 2]
      }
      // ... 剩下的 200 多道题请按这个格式继续添加
    ]
  },
  paper2: {
    name: "练习卷 (二)",
    questions: [
      // ===== 一、单选题 =====
      { id: "p1s1", type: "single", question: "咨询师使用自我开放的目的在于（ ）。", options: ["抒发自己的情感", "促进求助者的开放", "获得求助者的认同", "对求助者表示同情"], answer: 1 },
      { id: "p1s2", type: "single", question: "在咨询过程中，各种影响性技术都属于（ ）。", options: ["内容表达", "影响性概述", "内容反应", "参与性概述"], answer: 0 },
      { id: "p1s3", type: "single", question: "运用心理学理论来描述求助者的思想、情感和行为的原因、实质等，这种技术是（ ）。", options: ["释义", "指导", "解释", "面质"], answer: 2 },
      { id: "p1s4", type: "single", question: "当咨询过程中求助者出现言行不一致或前后言语不一致的情况时，咨询师要使用（ ）技术。", options: ["解释", "鼓励", "面质", "倾听"], answer: 2 },
      { id: "p1s5", type: "single", question: "以下属于违背心理咨询伦理的行为是（ ）。", options: ["咨询过程中进行书面记录", "询问来访者的婚姻状况", "未经来访者同意录音录像", "难以胜任时对来访者进行转介"], answer: 2 },
      { id: "p1s6", type: "single", question: "仅有尊重而没有热情的心理咨询师会使咨询关系显得（ ）。", options: ["情理交融", "轻松愉快", "公事公办", "亲切友好"], answer: 2 },
      { id: "p1s7", type: "single", question: "心理咨询能否成功主要取决于（ ）。", options: ["心理咨询师的经验", "求助者的配合", "心理咨询师的修养", "家属们的配合"], answer: 1 },
      { id: "p1s8", type: "single", question: "当求助者发生意外时，心理咨询师采用会谈法予以帮助，这是（ ）。", options: ["诊断性会谈", "摄入性会谈", "危机性会谈", "治疗性会谈"], answer: 2 },
      { id: "p1s9", type: "single", question: "记忆过程包括（ ）个基本环节。", options: ["4", "5", "2", "3"], answer: 3 },
      { id: "p1s10", type: "single", question: "屏幕上一个静止的亮点，盯着它看时，有时候觉得它在移动，这是（ ）。", options: ["动景现象", "诱导运动", "自主运动", "似动现象"], answer: 2 },
      { id: "p1s11", type: "single", question: "在出现意外事件或遇到危险情景时出现的高度紧张的情绪状态叫（ ）。", options: ["应激", "焦虑", "激情", "心境"], answer: 0 },
      { id: "p1s12", type: "single", question: "一朵云彩，看起来觉得它像一匹奔马，并且越看越像，这说明知觉具有（ ）。", options: ["理解性", "整体性", "恒常性", "选择性"], answer: 0 },
      { id: "p1s13", type: "single", question: "为了避免在初诊接待中出现紧张情绪，心理咨询师应该在接诊前（ ）。", options: ["深入了解并记录求助者的人格特点", "掌握并能够熟练使用各种理论方法", "熟练掌握初诊接待的各项操作步骤", "熟练掌握各种临床心理测验的使用"], answer: 2 },
      { id: "p1s14", type: "single", question: "性心理咨询工作的基本原则是（ ）。", options: ["性知识、性生理、性技术教育相统一", "性知识、性生理、性法制教育相统一", "性知识、性道德、性法制教育相统一", "性医学、性道德、性法制教育相统一"], answer: 2 },
      { id: "p1s15", type: "single", question: "与精神分析理论关系最小的概念是（ ）。", options: ["宣泄", "防御", "焦虑", "意志自由"], answer: 3 },
      { id: "p1s16", type: "single", question: "对于心理咨询师，可不必着重强调的条件是（ ）。", options: ["自知之明", "善于容纳他人", "身体健康", "自我平衡能力"], answer: 2 },
      { id: "p1s17", type: "single", question: "遭受强烈的或灾难性的精神创伤后，数月至半年内出现的精神障碍，称为（ ）。", options: ["情感障碍", "急性应激障碍", "认知障碍", "创伤后应激障碍"], answer: 3 },
      { id: "p1s18", type: "single", question: "兴奋性思维联想障碍的一种常见形式是（ ）。", options: ["思维奔逸", "思维散漫", "被洞悉感", "妄想心境"], answer: 0 },
      { id: "p1s19", type: "single", question: "精神疾病患者错觉的特点是（ ）。", options: ["能够进行自我校正", "感知综合障碍", "不能接受现实检验", "感觉功能障碍"], answer: 2 },
      { id: "p1s20", type: "single", question: "精神分析理论认为，在人的成长过程中，未来心理健康的充分必要条件是（ ）。", options: ["合理使用不同形式的“心理防御机制”", "力比多的驱动", "顺利地度过“性心理”发展的每个阶段", "潜意识的结构"], answer: 2 },
      { id: "p1s21", type: "single", question: "先前学习的材料对识记和回忆后学习材料的干扰作用是（ ）。", options: ["倒摄抑制", "后干扰", "前摄抑制", "前干扰"], answer: 2 },
      { id: "p1s22", type: "single", question: "视觉性言语中枢位于（ ）。", options: ["额叶", "颞上回", "角回", "颞中回"], answer: 2 },
      { id: "p1s23", type: "single", question: "红灯灭后眼睛里出现了蓝绿色的灯影，这是（ ）。", options: ["负后像", "彩色对比", "正后像", "互补现象"], answer: 0 },
      { id: "p1s24", type: "single", question: "正常和异常的心理活动是（ ）。", options: ["可以互相转化的", "无法进行分析的", "可以直接测量的", "无法间接测量的"], answer: 0 },
      { id: "p1s25", type: "single", question: "艾里克森认为童年期良好的人格特征是（ ）。", options: ["希望品质", "意志品质", "目标品质", "能力品质"], answer: 3 },
      { id: "p1s26", type: "single", question: "长时记忆遗忘的主要原因是自然衰退和（ ）。", options: ["固化", "迁移", "干扰", "定势"], answer: 2 },
      { id: "p1s27", type: "single", question: "持环境决定论观点的是（ ）。", options: ["机能主义心理学", "格式塔心理学", "行为主义心理学", "精神分析学说"], answer: 2 },
      { id: "p1s28", type: "single", question: "参与性技术不包括（ ）。", options: ["倾听", "内容反应", "面质", "情感反应"], answer: 2 },
      { id: "p1s29", type: "single", question: "共情就是（ ）。", options: ["把握求助者的情感与思维", "体验求助者的内心世界", "必须与求助者拥有同样的情感", "最为关键的咨询特质"], answer: 1 },
      { id: "p1s30", type: "single", question: "根据《中华人民共和国精神卫生法》，以下属于心理咨询师工作对象的是（ ）。", options: ["精神分裂症患者", "确诊强迫神经症的来访者", "抑郁发作的来访者", "人际适应或情感问题的来访者"], answer: 3 },

      // ===== 二、多选题 =====
      { id: "p1m1", type: "multiple", question: "意志的品质有（ ）。", options: ["自觉性", "目的性", "坚韧性", "自制性"], answer: [0, 2, 3] },
      { id: "p1m2", type: "multiple", question: "符合马斯洛需要层次理论的说法包括（ ）。", options: ["层次越高的需要出现越晚", "层次越低的需要出现越晚", "层次越低的需要力量越强", "层次越高的需要力量越强"], answer: [0, 2] },
      { id: "p1m3", type: "multiple", question: "容易引起无意注意的刺激包括（ ）。", options: ["强度大的刺激", "突然出现的刺激", "固定不变的物体", "新颖的刺激"], answer: [0, 1, 3] },
      { id: "p1m4", type: "multiple", question: "长时记忆遗忘的主要原因包括（ ）。", options: ["前摄抑制", "倒摄抑制", "自然衰退", "编码错误"], answer: [0, 1, 2] },
      { id: "p1m5", type: "multiple", question: "咨询师使用释义技术的目的包括（ ）。", options: ["对某些抽象、复杂的心理现象和过程进行解释", "使求助者有机会再次剖析自己的困扰", "指出求助者身上存在的矛盾，促进求助者的探索", "加强理解、促进沟通"], answer: [1, 3] },
      { id: "p1m6", type: "multiple", question: "梦境的主要特点包括（ ）。", options: ["不协调性", "创造性", "不连续性", "认知的不确定性"], answer: [0, 2, 3] },
      { id: "p1m7", type: "multiple", question: "言语的特点包括（ ）。", options: ["言语是交流思想、进行交际的过程", "言语是一种心理现象", "言语活动离不开语言", "言语是一种社会现象"], answer: [0, 1, 2] },
      { id: "p1m8", type: "multiple", question: "遗忘的主要原因包括（ ）。", options: ["信息错构", "信息干扰", "自然衰退", "意识抑制"], answer: [1, 2] },

      // ===== 三、判断题 =====
      { id: "p1j1", type: "single", question: "集体潜意识是弗洛伊德理论中的概念。", options: ["正确", "错误"], answer: 1 }, // 荣格提出的
      { id: "p1j2", type: "single", question: "求助者的主要问题一定是最先提出的问题。", options: ["正确", "错误"], answer: 1 },
      { id: "p1j3", type: "single", question: "脑的最古老部位是脑干。", options: ["正确", "错误"], answer: 0 },
      { id: "p1j4", type: "single", question: "无对象性的知觉是错觉。", options: ["正确", "错误"], answer: 1 }, // 错觉是有对象的歪曲，无对象的是幻觉
      { id: "p1j5", type: "single", question: "全部社会化的前提是道德社会化。", options: ["正确", "错误"], answer: 1 }, // 前提通常是语言社会化
      { id: "p1j6", type: "single", question: "调节内脏系统活动的皮层下中枢位于下丘脑。", options: ["正确", "错误"], answer: 0 }
    ]
  }
};