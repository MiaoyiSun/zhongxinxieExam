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
  const currentAnswer = answers[current] !== undefined ? answers[current] : (isMulti ? [] : null);

  // 自动保存逻辑...
  useEffect(() => {
    const saved = localStorage.getItem("quiz_answers");
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("quiz_answers", JSON.stringify(answers));
  }, [answers]);

  // 计时逻辑...
  useEffect(() => {
    if (page !== "exam" || submitted) return;
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [page, submitted]);

  const handleSelect = (index) => {
    if (showResult) return;
    if (isMulti) {
      let newArr = [...currentAnswer];
      newArr.includes(index) ? (newArr = newArr.filter(i => i !== index)) : newArr.push(index);
      setAnswers({ ...answers, [current]: newArr });
    } else {
      setAnswers({ ...answers, [current]: index });
    }
  };

  const checkAnswer = () => {
    if (currentAnswer === null || (isMulti && currentAnswer.length === 0)) return alert("请先选择答案");
    setShowResult(true);
    // 错题本逻辑保持不变...
    let isCorrect = isMulti ? [...currentAnswer].sort().join(',') === [...q.answer].sort().join(',') : currentAnswer === q.answer;
    let wrong = JSON.parse(localStorage.getItem("quiz_wrong") || "[]");
    if (!isCorrect) {
      if (!wrong.find(item => item.id === q.id)) wrong.push(q);
    } else {
      wrong = wrong.filter(item => item.id !== q.id);
    }
    localStorage.setItem("quiz_wrong", JSON.stringify(wrong));
  };

  const getLetter = (index) => String.fromCharCode(65 + index);

  // 1. 首页渲染
  if (page === "home") {
    return (
      <div style={{maxWidth: '500px', margin: '60px auto', padding: '20px', textAlign: 'center'}}>
        <h1 style={{fontSize: '2rem', marginBottom: '30px'}}>心理学在线测试</h1>
        <div className="quiz-card">
          <p style={{marginBottom: '15px', color: '#666'}}>请选择试卷：</p>
          <select 
            value={selectedPaper} 
            onChange={e => setSelectedPaper(e.target.value)}
            style={{width: '100%', padding: '12px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #ddd'}}
          >
            {Object.entries(papers).map(([key, p]) => <option key={key} value={key}>{p.name}</option>)}
          </select>
          <button onClick={() => {setPage("exam"); setCurrent(0); setSubmitted(false); setTime(0); setShowResult(false);}} className="btn-primary w-full" style={{marginBottom: '15px'}}>开始做题</button>
          <button onClick={() => setPage("review")} className="option-btn" style={{textAlign: 'center', fontWeight: 'bold', color: '#ef4444'}}>复习错题本</button>
        </div>
      </div>
    );
  }

  // 2. 错题本渲染
  if (page === "review") {
    const wrong = JSON.parse(localStorage.getItem("quiz_wrong") || "[]");
    return (
      <div style={{maxWidth: '600px', margin: '40px auto', padding: '20px'}}>
        <button onClick={() => setPage("home")} style={{background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px'}}>← 返回首页</button>
        <h2 style={{marginBottom: '20px'}}>我的错题 ({wrong.length})</h2>
        {wrong.map((wq, i) => (
          <div key={i} className="quiz-card" style={{marginBottom: '15px', padding: '20px'}}>
            <p style={{fontWeight: 'bold', marginBottom: '10px'}}>{wq.question}</p>
            <div style={{color: '#166534', backgroundColor: '#dcfce7', padding: '10px', borderRadius: '8px', fontSize: '0.9rem'}}>
              正确答案：{Array.isArray(wq.answer) ? wq.answer.map(a => getLetter(a)).join(', ') : getLetter(wq.answer)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 3. 考试页面渲染
  return (
    <div style={{maxWidth: '600px', margin: '40px auto', padding: '20px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center'}}>
        <button onClick={() => setPage("home")} style={{background: 'none', border: 'none', color: '#999', cursor: 'pointer'}}>退出</button>
        <span style={{background: '#e2e8f0', padding: '5px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold'}}>
          ⏱ {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
        </span>
      </div>

      {!submitted ? (
        <div className="quiz-card">
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
             <span style={{fontSize: '0.75rem', fontWeight: 'bold', color: '#2563eb', textTransform: 'uppercase'}}>{isMulti ? "多选题" : "单选题"}</span>
             <span style={{fontSize: '0.75rem', color: '#ccc'}}>{current + 1} / {questions.length}</span>
          </div>
          
          <h2 style={{fontSize: '1.25rem', marginBottom: '25px', lineHeight: '1.5'}}>{q.question}</h2>

          <div style={{marginBottom: '30px'}}>
            {q.options.map((opt, i) => {
              let btnClass = "option-btn";
              const isSelected = isMulti ? currentAnswer.includes(i) : currentAnswer === i;
              if (showResult) {
                const isCorrect = isMulti ? q.answer.includes(i) : q.answer === i;
                if (isCorrect) btnClass += " correct";
                else if (isSelected) btnClass += " wrong";
              } else if (isSelected) {
                btnClass += " selected";
              }

              return (
                <button key={i} onClick={() => handleSelect(i)} disabled={showResult} className={btnClass}>
                  <span style={{marginRight: '12px', fontWeight: '800'}}>{getLetter(i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {!showResult ? (
            <button onClick={checkAnswer} className="btn-primary w-full">确认答案</button>
          ) : (
            <button 
              onClick={current < questions.length - 1 ? () => {setCurrent(current+1); setShowResult(false);} : () => setSubmitted(true)} 
              className="btn-primary w-full" 
              style={{backgroundColor: '#22c55e'}}
            >
              {current < questions.length - 1 ? "下一题 ➔" : "查看总成绩"}
            </button>
          )}
        </div>
      ) : (
        <div className="quiz-card" style={{textAlign: 'center'}}>
          <h2 style={{fontSize: '1.5rem', marginBottom: '15px'}}>🎉 练习完成！</h2>
          <p style={{color: '#666', marginBottom: '25px'}}>你的错题已自动存入错题本。</p>
          <button onClick={() => setPage("home")} className="btn-primary w-full">返回首页</button>
        </div>
      )}
    </div>
  );
}