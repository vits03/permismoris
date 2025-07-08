import { useEffect, useState } from "react";
import Timer from "./timer";
import ProgressBar from "./progressBar";
import { drivingTestQuestionsCar } from './questions';
import { drivingTestQuestionsBus } from "./busquestions";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes,useNavigate, Route } from "react-router-dom";
import {Helmet} from "react-helmet"
const MockMode = ({
  time,
  setTime,
  reset,
  setReset,
  timerOver,
  type,
  setType,
  vehicle,
  handleReset,
  questionsIndex,
  onStart,
  setTimerOver,
  switchMode,
  addUserAnswer,
  userAnswers,
  questionNo,
  setQuestionNo,
  restartQuiz,
  MOCK_QUESTIONS,
}) => {
    const [selectedOptions, setSelectedOptions] = useState({});
    const [ drivingTestQuestions,setDrivingTestQuestions] = useState({})
const navigate = useNavigate();
  ///this component returns the question and has question index , all questions , setQuestionIndex, SetuserSelection,userSelection,userScore,
 
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
    switchMode("mock",type);
   handleReset()
 

  
  },[])
useEffect(()=>{
  console.log(questionsIndex)
},[questionsIndex])
  useEffect(() => {
    if ( questionNo  === MOCK_QUESTIONS){
        alert("game over")
        navigate("/results")
    }
    setSelectedOptions(prev => ({
      ...prev,
      [questionNo]: null // Reset current question's selection
    }));
  }, [questionNo]);

  const handleOptionChange = (questionNumber, optionKey) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionNumber]: optionKey
    }));
    addUserAnswer(questionNumber, optionKey);
  };

useEffect(()=>{
  //  alert(timerOver)

    if ( timerOver){
        if ( questionNo  ===MOCK_QUESTIONS-1){
            
            navigate("/results")
        }
      setTimerOver(false);
       if ( ! userAnswers[questionNo]){
        addUserAnswer(questionNo,"F")
      }
      handleReset()
      setQuestionNo((prev)=> prev+1)
     
      
    }
},[timerOver])


const handleNextQuestion = ()=>{
    if ( questionNo === MOCK_QUESTIONS-1){
     
       navigate("/results")
    }
    else {
        if ( ! userAnswers[questionNo]){
            addUserAnswer(questionNo,"F")
          }
         setQuestionNo(prev=>prev+1);

          handleReset()
    }
   
   
}

 const commonKeywords = [
    "oral learner test",
    "Mauritius driving test",
  ];

  const vehicleKeywords = type === "car"
    ? ["car"]
    : type === "bus"
    ? ["mechanique", "mechanik", "bus"]
    : [];

  const seoKeywords = [...commonKeywords, ...vehicleKeywords].join(", ");

  const seoTitle = `Mock ${type.charAt(0).toUpperCase() + type.slice(1)} Driving Test - Mauritius`;

  // if timer runs out before user selection , mark as wrong answer and go to next question
  // if timer runs out after user selection but before clikcing on  btn, set answer and go to next question
  // when the user click btn before timer , stop timer, record answer and go to next question.
  return (
    <>
       <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={`Prepare for your ${type} driving test in Mauritius with our mock tests.`} />
        <meta name="keywords" content={seoKeywords} />
      </Helmet>

      {questionsIndex && questionsIndex.length > 0 ? (
        <section className="min-h-[calc(100vh-90px)] flex justify-center flex-col items-center">
          <div className="flex w-95/100 flex-col items-center rounded-3xl md:max-w-2xl text-black bg-white py-2   ">
            <div className="w-full flex-col text-center justify-center flex items-center text-2xl border-b-2">
              <h3 className="section-header text-lg font-semibold text-gray-700">
                Question {questionNo + 1}
              </h3>
              <ProgressBar questionNo={questionNo + 1} totalQuestions={MOCK_QUESTIONS} />
            </div>
  
            <div className="w-9/10 flex flex-col justify-center items-center text-xl mt-3 gap-3">
              <Timer
                time={time}
                setTime={setTime}
                reset={reset}
                setReset={setReset}
                handleReset={handleReset}
                onStart={onStart}
                setTimerOver={setTimerOver}
              />
              <div className="mt-1 text-lg font-semibold text-center text-gray-800">
                {drivingTestQuestions[questionsIndex[questionNo]]?.questionTitle || "No questions"}
              </div>
              <div>
               {
  drivingTestQuestions[questionsIndex[questionNo]]?.imageLink ? (
    <img 
      src={drivingTestQuestions[questionsIndex[questionNo]].imageLink} 
      alt="Question illustration" 
      loading="eager"
      decoding="async"
      className="md:w-60 w-35 h-auto" 
    />
  ) : (
    <div className="h-10"></div>
  )
}
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
              <div className="radio-btns mt-2 text-xl text-gray-700">
                {drivingTestQuestions[questionsIndex[questionNo]]?.questionsAnswers?.map((answer, index) => (
                  <div 
                    key={index}  
                    onChange={() => handleOptionChange(questionNo, Object.keys(answer)[0])} 
                    className="mt-3 flex gap-3"
                  >
                    <input
                      checked={selectedOptions[questionNo] === Object.keys(answer)[0]}
                      className="self-baseline cursor-pointer appearance-none h-5 w-5 border-2 ring-0 outline-none border-amber-600 rounded-full checked:ring-2 checked:ring-offset-2 checked:ring-amber-700 checked:bg-amber-700 checked:border-white focus:outline-none transition duration-200"
                      type="radio"
                      id={`q${questionNo}-opt${index}`}
                      name={`question${questionNo}`}
                    />
                    <label htmlFor={`q${questionNo}-opt${index}`} className="self-baseline text-sm">
                      <span className="font-medium">{Object.keys(answer)[0]}:</span> {Object.values(answer)[0]}
                    </label>
                  </div>
                ))}
              </div>
              
              <button 
                className="bg-amber-700 md:w-5/10 w-6/10 text-lg py-3 mt-3 rounded-4xl hover:bg-amber-600 transition duration-200" 
                onClick={handleNextQuestion}
              >
                Next
              </button>
            </div>
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

export default MockMode;