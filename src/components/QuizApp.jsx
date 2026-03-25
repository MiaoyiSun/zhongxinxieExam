import React, { useState, useEffect } from "react";

// ===== 题库数据区 =====
// 请根据你 Word 文档中的蓝色选项，修改这里的 answer 字段
const papers = {
  paper1: {
    name: "练习卷 (一)",
    questions: [
      {
        id: "p1q1",
        type: "single",
        question: "选择会谈的内容时，应该使之适合（ ）。",
        options: ["咨询师的职业兴趣", "咨询师的理论水平", "求助者的心理强度", "求助者的接受能力"],
        answer: 3 // 代表 D (默认填写的占位符，请核对)
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
        answer: [0, 3] // 数组代表多选：代表 A 和 D (请核对)
      },
      {
        id: "p1q5",
        type: "multiple",
        question: "精神分裂症患者通常会表现出（ ）。",
        options: ["自知力受到破坏", "智能低下", "精神活动不协调", "意识障碍"],
        answer: [0, 2] // 代表 A 和 C (请核对)
      }
    ]
  },
  paper2: {
    name: "练习卷 (二)",
    questions: [
      {
        id: "p2q1",
        type: "single",
        question: "咨询师使用自我开放的目的在于（ ）。",
        options: ["抒发自己的情感", "促进求助者的开放", "获得求助者的认同", "对求助者表示同情"],
        answer: 1 // 代表 B (请核对)
      },
      {
        id: "p2q2",
        type: "single",
        question: "在咨询过程中，各种影响性技术都属于（ ）。",
        options: ["内容表达", "影响性概述", "内容反应", "参与性概述"],
        answer: 0
      },
      {
        id: "p2q3",
        type: "single",
        question: "运用心理学理论来描述求助者的思想、情感和行为的原因、实质等，这种技术是（ ）。",
        options: ["释义", "指导", "解释", "面质"],
        answer: 2
      },
      {
        id: "p2q4",
        type: "multiple",
        question: "遗忘的主要原因包括（ ）。",
        options: ["信息错构", "信息干扰", "自然衰退", "意识抑制"],
        answer: [1, 2] // 代表 B 和 C (请核对)
      },
      {
        id: "p2q5",
        type: "multiple",
        question: "根据思维的形态所划分的思维的种类包括（ ）。",
        options: ["动作思维", "形象思维", "抽象思维", "创造性思维"],
        answer: [0, 1, 2] // 代表 A, B, C (请核对)
      }
    ]
  }
};

export default function QuizApp() {
  const [page, setPage] = useState("home");
  const [selectedPaper, setSelectedPaper] = useState("paper1");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const questions = papers[selectedPaper]?.questions || [];
  const q = questions[current];
  const isMulti = q?.type === "multiple";

  // 获取当前题目的作答状态（多选为数组，单选为数字）
  const currentAnswer = answers[current] !== undefined ? answers[current] : (isMulti ? [] : null);

  // ===== 自动保存 =====
  useEffect(() => {
    const saved = localStorage.getItem("quiz_answers");
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("quiz_answers", JSON.stringify(answers));
  }, [answers]);

  // ===== 计时 =====
  useEffect(() => {
    if (page !== "exam" || submitted) return;
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [page, submitted]);

  // ===== 选择选项的逻辑 =====
  const handleSelect = (index) => {
    if (showResult) return; // 已经确认答案后不可更改

    if (isMulti) {
      // 多选逻辑：点击切换选中状态
      let newArr = [...currentAnswer];
      if (newArr.includes(index)) {
        newArr = newArr.filter((i) => i !== index);
      } else {
        newArr.push(index);
      }
      setAnswers({ ...answers, [current]: newArr });
    } else {
      // 单选逻辑：直接覆盖
      setAnswers({ ...answers, [current]: index });
    }
  };

  // ===== 确认答案并判分 =====
  const checkAnswer = () => {
    if (currentAnswer === null || (isMulti && currentAnswer.length === 0)) {
      alert("请至少选择一个选项！");
      return;
    }

    setShowResult(true);

    // 判断对错逻辑
    let isCorrect = false;
    if (isMulti) {
      const userSorted = [...currentAnswer].sort().join(",");
      const correctSorted = [...q.answer].sort().join(",");
      isCorrect = userSorted === correctSorted;
    } else {
      isCorrect = currentAnswer === q.answer;
    }

    // 记录错题本
    let wrong = JSON.parse(localStorage.getItem("quiz_wrong") || "[]");
    if (!isCorrect) {
      if (!wrong.find((item) => item.id === q.id)) {
        wrong.push(q);
      }
    } else {
      wrong = wrong.filter((item) => item.id !== q.id);
    }
    localStorage.setItem("quiz_wrong", JSON.stringify(wrong));
  };

  const nextQuestion = () => {
    setShowResult(false);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const submit = () => {
    let score = 0;
    questions.forEach((question, i) => {
      const userAns = answers[i];
      if (question.type === "multiple") {
        if (userAns && [...userAns].sort().join(",") === [...question.answer].sort().join(",")) {
          score++;
        }
      } else {
        if (userAns === question.answer) score++;
      }
    });

    setSubmitted(true);
    alert(`交卷成功！\n最终得分: ${score} / ${questions.length}`);
  };

  // 辅助函数：将索引转换为 A, B, C, D
  const getLetter = (index) => String.fromCharCode(65 + index);

  // ==========================================
  // UI 渲染区
  // ==========================================

  if (page === "home") {
    return (
      <div className="p-6 max-w-xl mx-auto text-center mt-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">心理学在线测试库</h1>
        <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm border">
          <p className="mb-3 text-gray-600 font-medium">选择要练习的试卷：</p>
          <select
            value={selectedPaper}
            onChange={(e) => setSelectedPaper(e.target.value)}
            className="w-full border p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(papers).map(([key, p]) => (
              <option key={key} value={key}>
                {p.name} (共 {p.questions.length} 题)
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 transition text-white p-4 rounded-xl font-bold text-lg shadow-md"
            onClick={() => {
              setPage("exam");
              setCurrent(0);
              setSubmitted(false);
              setTime(0);
              setShowResult(false);
            }}
          >
            开始做题
          </button>
          <button
            className="border-2 border-red-400 text-red-500 hover:bg-red-50 transition p-4 rounded-xl font-bold text-lg"
            onClick={() => setPage("review")}
          >
            复习错题本
          </button>
        </div>
      </div>
    );
  }

  if (page === "review") {
    const wrong = JSON.parse(localStorage.getItem("quiz_wrong") || "[]");
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <button
          onClick={() => setPage("home")}
          className="mb-6 text-gray-500 hover:text-gray-800 font-medium flex items-center gap-1"
        >
          ← 返回首页
        </button>
        <h2 className="text-2xl font-bold mb-6 text-red-600 flex items-center gap-2">
          <span>📝</span> 我的错题本
        </h2>
        {wrong.length === 0 ? (
          <div className="bg-green-50 text-green-700 p-8 rounded-2xl text-center font-medium">
            太棒了！暂无错题 🎉
          </div>
        ) : (
          wrong.map((wq, i) => (
            <div key={i} className="bg-white border p-5 mb-4 rounded-2xl shadow-sm">
              <p className="font-bold text-gray-800 mb-3">
                <span className="text-red-500 mr-2">[{wq.type === "multiple" ? "多选题" : "单选题"}]</span>
                {wq.question}
              </p>
              <div className="space-y-2 mb-3 text-gray-600">
                {wq.options.map((opt, idx) => (
                  <p key={idx} className={wq.answer.includes?.(idx) || wq.answer === idx ? "font-bold text-green-600" : ""}>
                    {getLetter(idx)}. {opt}
                  </p>
                ))}
              </div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-block font-medium">
                标准答案：
                {wq.type === "multiple"
                  ? wq.answer.map((a) => getLetter(a)).join(", ")
                  : getLetter(wq.answer)}
              </div>
            </div>
          ))
        )}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setPage("home")} className="text-gray-500 hover:text-gray-800 font-medium">
          ← 返回首页
        </button>
        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-bold">
          ⏱ {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
        </span>
      </div>

      <h1 className="text-2xl font-bold mb-4 text-gray-800">{papers[selectedPaper].name}</h1>

      {!submitted && (
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
          <div className="flex justify-between items-end mb-4 border-b pb-4">
            <span className={`px-3 py-1 rounded-md text-sm font-bold ${isMulti ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
              {isMulti ? "多选题" : "单选题"}
            </span>
            <span className="text-sm text-gray-500 font-medium">
              进度 {current + 1} / {questions.length}
            </span>
          </div>

          <h2 className="text-lg font-semibold mb-6 text-gray-800 leading-relaxed">{q.question}</h2>

          <div className="space-y-3">
            {q.options.map((opt, i) => {
              let style = "border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50";
              const isSelected = isMulti ? currentAnswer.includes(i) : currentAnswer === i;
              const isCorrectAns = isMulti ? q.answer.includes(i) : q.answer === i;

              // 视觉反馈逻辑
              if (showResult) {
                if (isCorrectAns) style = "bg-green-100 border-green-500 text-green-800 font-bold"; // 标绿正确答案
                else if (isSelected) style = "bg-red-100 border-red-500 text-red-800 line-through"; // 标红并划掉选错的答案
                else style = "opacity-50 border-gray-100"; // 其他未选项变暗
              } else if (isSelected) {
                style = "bg-blue-100 border-blue-500 text-blue-800 font-bold shadow-sm"; // 选中状态
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={showResult}
                  className={`block w-full text-left p-4 border-2 rounded-xl transition-all duration-200 ${style}`}
                >
                  <span className="mr-3 inline-block font-bold">{getLetter(i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* 底部操作按钮 */}
          <div className="mt-8 pt-4 border-t">
            {!showResult ? (
              <button
                onClick={checkAnswer}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-md"
              >
                确认答案
              </button>
            ) : (
              <button
                onClick={current < questions.length - 1 ? nextQuestion : submit}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition shadow-md"
              >
                {current < questions.length - 1 ? "下一题 ➔" : "交卷并查看总分"}
              </button>
            )}
          </div>
        </div>
      )}

      {submitted && (
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center mt-6">
          <div className="text-5xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">考试完成！</h2>
          <p className="text-gray-500 mb-6">您的所有作答已保存，错题已自动归入错题本。</p>
          <button
            onClick={() => setPage("home")}
            className="w-full bg-blue-100 text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-200 transition"
          >
            返回主页查看错题
          </button>
        </div>
      )}
    </div>
  );
}