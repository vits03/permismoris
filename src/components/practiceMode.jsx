import { useEffect, useState } from "react";
import ProgressBar from "./progressBar";
import { drivingTestQuestionsCar } from "./questions";
import ReactDOM from "react-dom/client";
import RightAnswer from "./right_answer";
import WrongAnswer from "./wrong_answer";
import { startTransition } from 'react';
import { drivingTestQuestionsBus } from "./busquestions";
import { BrowserRouter, Routes, useNavigate, Route } from "react-router-dom";
const PracticeMode = ({
  questionsIndex,
  addUserAnswer,
  userAnswers,
  questionNo,
  setQuestionNo,
  setScore,
  switchMode,
  type,
  setType,
  vehicle,
  handleReset,
  restartQuiz,
  PRACTICE_QUESTIONS,
}) => {

  const [selectedOptions, setSelectedOptions] = useState({});
      const [ drivingTestQuestions,setDrivingTestQuestions] = useState({})

  const navigate = useNavigate();


 
  const [showAnswer, setShowAnswer] = useState(false);
  const handleNextQuestion = () => {
    startTransition(() => {
        if (questionNo === PRACTICE_QUESTIONS-1) {
            navigate("/results");
          }
         setShowAnswer(false);
      setQuestionNo((prev) => prev + 1);
     
    });
  };
  //when next is cliced, check  if result is good
  // set showanswer to true
  // if true  show  right answer
  // else show wrong answer
  // add a next btn, that puts showAnswer as false and increment quesetion index


 
  useEffect(() => {
    if (questionNo === PRACTICE_QUESTIONS) {
      alert("game over");
      navigate("/results");
    }
    setSelectedOptions((prev) => ({
      ...prev,
      [questionNo]: null, // Reset current question's selection
    }));
  }, [questionNo]);

  useEffect(()=>{
       if (vehicle == "car")
        {
          setDrivingTestQuestions(drivingTestQuestionsCar);
          setType("car");
           console.log(vehicle,type)
        }
        else {
          setDrivingTestQuestions(drivingTestQuestionsBus)
          setType("bus");
        }
   restartQuiz()
   
    switchMode("practice");
   handleReset()

  },[])

  const handleOptionChange = (questionNumber, optionKey) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionNumber]: optionKey,
    }));
    addUserAnswer(questionNumber, optionKey);
  };

  const handleShowAnswer = () => {
   
      if (!userAnswers[questionNo]) {
        addUserAnswer(questionNo, "F");
      }
      setShowAnswer(true);
     
    
  };

  const checkAnswer = (index, questionIndex) => {
    if (userAnswers[index] === drivingTestQuestions[questionIndex].answer) {
      return true;
    }
   
    return false;
  };
  return (
    <>
   {questionsIndex && questionsIndex.length > 0 ? (
    <section  className="min-h-[calc(100vh-90px)] flex justify-center flex-col  items-center  ">
      <div className="flex w-95/100 flex-col items-center  rounded-3xl md:max-w-2xl text-black bg-white py-5 ">
        <div className=" w-full flex-col        text-center justify-center flex items-center text-2xl border-b-2 ">
          <h3 className="section-header text-2xl font-semibold text-gray-700   ">
            Question {questionNo + 1}
          </h3>
          <ProgressBar questionNo={questionNo + 1} totalQuestions={PRACTICE_QUESTIONS} />
        </div>
        {showAnswer ? (
          checkAnswer(questionNo, questionsIndex[questionNo]) ? (
            <RightAnswer
            handleNextQuestion={handleNextQuestion}
            nextBtn={true}
            drivingTestQuestions={drivingTestQuestions}
              setScore={setScore}
              index={questionNo}
              questionIndex={questionsIndex[questionNo]}
              userAnswer={userAnswers[questionNo]}
            />
          ) : (
            <WrongAnswer drivingTestQuestions={drivingTestQuestions} handleNextQuestion={handleNextQuestion} nextBtn={true}  index={questionNo} questionIndex={questionsIndex[questionNo]} userAnswer={userAnswers[questionNo]} rightAnswer={drivingTestQuestions[questionsIndex[questionNo]].answer}/>
          )
        ) : (
          <div className="w-9/10 flex flex-col justify-center items-center text-xl mt-3 gap-3 ">
            <div className="mt-1 text-2xl text-center font-semibold text-gray-800">
              <p>
                {drivingTestQuestions[questionsIndex[questionNo]].questionTitle}
              </p>
            </div>
            <div>
            {   drivingTestQuestions[questionsIndex[questionNo]].imageLink ? <img 
              
              src={drivingTestQuestions[questionsIndex[questionNo]]?.imageLink} 
              alt="" 
              loading="eager" 
              decoding="async"

              className="md:w-60 w-35 h-auto" 
            /> : <div className="h-10"></div>}
            {/* Preload the next image invisibly */}
{drivingTestQuestions[questionsIndex[questionNo + 1]]?.imageLink && (
  <img
    src={drivingTestQuestions[questionsIndex[questionNo + 1]]?.imageLink}
    alt=""
    style={{ display: "none" }}
    aria-hidden="true"
  />
)}

            </div>
            <div className="radio-btns mt-2 text-xl  text-gray-700 ">
              {drivingTestQuestions[questionsIndex[questionNo]].questionsAnswers.map(
                (answer, index) => {
                  return (
                    <div
                      key={index}
                      onChange={() => {
                        handleOptionChange(questionNo, Object.keys(answer)[0]);
                      }}
                      className="mt-3 flex gap-3 "
                    >
                      <input
                        checked={
                          selectedOptions[questionNo] === Object.keys(answer)[0]
                        }
                        readOnly
                        className="self-baseline cursor-pointer  appearance-none 
            h-5 w-5 
            border-2
            ring-0
            outline-none
            border-amber-600 
            rounded-full
           
         
            checked:ring-2          
            checked:ring-offset-2   
            checked:ring-amber-700
            
            checked:bg-amber-700 
            checked:border-white 
            focus:outline-none 
            transition 
            duration-200"
                        type="radio"
                        id={`q${questionNo}-opt${index}`}
                        name={`question${questionNo}`}
                      />
                      <label
                        htmlFor={`q${questionNo}-opt${index}`}
                        className="self-baseline text-sm"
                      >
                        <span className="font-medium">
                          {Object.keys(answer)[0]}:
                        </span>{" "}
                        {Object.values(answer)[0]}
                      </label>
                    </div>
                  );
                }
              )}
            </div>

            <button
              className="bg-amber-700 md:w-5/10 w-7/10 py-3 mt-3 rounded-4xl"
              onClick={handleShowAnswer}
            >
              Check Answer
            </button>
          </div>
        )}
      </div>
    </section>
      ) : (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
          <div className="text-2xl">No questions available</div>
        </div>
      )}
    </>
  );
};

export default PracticeMode;
