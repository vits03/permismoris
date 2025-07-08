 
import { useState,useEffect} from 'react';
import Tesseract from 'tesseract.js';
import './App.css';
 import { drivingTestQuestionsCar } from './components/questions';
 import { drivingTestQuestionsBus } from './components/busquestions';
 import HeroSection from './components/hero-section';
 import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RandomizeList from './components/helpers/randomizeList';
import FinalResults from './components/finalresults';
import ProgressBar from './components/progressBar';
import { Outlet ,Link} from 'react-router-dom';
import PracticeMode from './components/practiceMode';
import MockMode from './components/mockMode';
import flag from './assets/images/mu_flag.png'
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const MOCK_QUESTIONS =35;

  const PRACTICE_QUESTIONS = 20;
const [questionNo, setQuestionNo] = useState(0);
const [time,setTime]=useState(30);
const [reset,setReset]= useState(false);
const [ timerOver,setTimerOver]= useState(false);
const [mode, setMode] = useState("practice"); // Default value
const [questionsIndex, setQuestionsIndex] = useState([]);
const [ userAnswers, setUserAnswers] = useState([]);
const [ drivingTestQuestions, setDrivingTestQuestions] = useState(drivingTestQuestionsCar);
const [type,setType]= useState("");
useEffect(() => {
  drivingTestQuestions.forEach(question => {
    const img = new Image();
    img.src = question.imageLink;
  });
}, []);

useEffect(()=>{
  if (type === "car")
    {
      setDrivingTestQuestions(drivingTestQuestionsCar);
     
    }
    else {
       setDrivingTestQuestions(drivingTestQuestionsBus);

     
       
    }
},[type])



// In your route component or main layout
 // Reset scroll when route changes

const restartQuiz = ()=>{
  
  setUserAnswers([]);
  setQuestionsIndex([]);
  setQuestionNo(0);
  

}

 const addUserAnswer= (index,answer)=>{
  setUserAnswers((prev)=>{
    const newUserAnswers=[...prev];
    newUserAnswers[index]=answer;
    return newUserAnswers;
  })
 }

 

const switchMode = (newMode,type) => {
  let questionsLength;
  if (newMode !== "practice" && newMode !== "mock") {
    console.error("Invalid mode! Only 'practice' or 'test' allowed.");
    return;
  }
  if ( type === "car"){
   questionsLength = drivingTestQuestionsCar.length;
  }
  else {
    questionsLength = drivingTestQuestionsBus.length;
  }
  if (newMode === "practice"){
    setQuestionsIndex(RandomizeList(questionsLength ,PRACTICE_QUESTIONS));
  }
  else {
    setQuestionsIndex(RandomizeList(questionsLength,MOCK_QUESTIONS));
 
  }
  setMode(newMode);
};


  const handleReset=()=>{
     setReset(true);
     setTime(30)
    
   }
  return (
  
    <>
  
     <BrowserRouter> 
      <ScrollToTop />
         <header  className='flex justify-center text-xl md:text-2xl turret-road-bold mt-1  md:mt-3 cursor-pointer'><div className='py-3 mb-1 md:py-4 relative text-white '   > <Link to="/">Permis Moris</Link>    <img  className="   -z-1 -top-12 right-0  absolute w-fit h-[10rem]"src={flag} alt="" /> </div>  </header>  

 
  <Routes>

  <Route path='practice-car' element={<PracticeMode 
  
  PRACTICE_QUESTIONS={PRACTICE_QUESTIONS}
   vehicle={"car"}
    type={type}
    setType={setType}
  restartQuiz={restartQuiz}
  switchMode={switchMode}
  handleReset={handleReset}
 setQuestionNo={setQuestionNo}
  questionNo={questionNo}
  userAnswers={userAnswers}
  addUserAnswer={addUserAnswer}
  questionsIndex={questionsIndex}
  timerOver={timerOver}
  onStart={() => setReset(true)}
  setTimerOver={setTimerOver}
  
  
  
  />}/>


  
  <Route path='practice-bus' element={<PracticeMode 
  
  PRACTICE_QUESTIONS={PRACTICE_QUESTIONS}
  restartQuiz={restartQuiz}
  switchMode={switchMode}
    vehicle={"bus"}
    type={type}
    setType={setType}
  handleReset={handleReset}
 setQuestionNo={setQuestionNo}
  questionNo={questionNo}
  userAnswers={userAnswers}
  addUserAnswer={addUserAnswer}
  questionsIndex={questionsIndex}
  timerOver={timerOver}
  onStart={() => setReset(true)}
  setTimerOver={setTimerOver}
  
  
  
  />}/>
  <Route path='mock-car' element={
    <MockMode
    MOCK_QUESTIONS={MOCK_QUESTIONS}
    vehicle={"car"}
    type={type}
    setType={setType}
    restartQuiz={restartQuiz}
      time={time}
      setTime={setTime}
      switchMode={switchMode}
      questionNo={questionNo}
      setQuestionNo={setQuestionNo}
      setQuestionsIndex={setQuestionsIndex}
      reset={reset}
      setReset={setReset}
      handleReset={handleReset}
      mode={mode}
      userAnswers={userAnswers}
      addUserAnswer={addUserAnswer}
      questionsIndex={questionsIndex}
      timerOver={timerOver}
      onStart={() => setReset(true)}
      setTimerOver={setTimerOver}
    />
  }/>

   <Route path='mock-bus' element={
    <MockMode
    MOCK_QUESTIONS={MOCK_QUESTIONS}
  type={type}
    setType={setType}
    restartQuiz={restartQuiz}
      time={time}
      vehicle={"bus"}
      setTime={setTime}
      switchMode={switchMode}
      questionNo={questionNo}
      setQuestionNo={setQuestionNo}
      setQuestionsIndex={setQuestionsIndex}
      reset={reset}
      setReset={setReset}
      handleReset={handleReset}
      mode={mode}
      userAnswers={userAnswers}
      addUserAnswer={addUserAnswer}
      questionsIndex={questionsIndex}
      timerOver={timerOver}
      onStart={() => setReset(true)}
      setTimerOver={setTimerOver}
    />
  }/>
  <Route path='results' element={<FinalResults  restartQuiz={restartQuiz} drivingTestQuestions={drivingTestQuestions}  questionsIndex={questionsIndex} userAnswers={userAnswers} />}/>
  <Route path='progress' element={<ProgressBar/>}/>


     <Route path="test" element={<div>Parent <Outlet /></div>}>
  <Route path="child" element={<div>Child</div>} />
</Route>
   <Route path='/' element={<HeroSection  restartQuiz={restartQuiz} switchMode={switchMode}/>}/>
     
  
    </Routes>
    </BrowserRouter>
    <div   className='w-full text-center mt-5' > <p> © PermisMoris.com</p> <span> <a  className=' hover:text-amber-600 transition-all' href="mailto:vitthalseetah03@gmail.com">Contact me</a></span></div>
    </>
  );
}
 
export default App
