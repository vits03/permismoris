import { useEffect, useState } from "react";
import { drivingTestQuestions } from "./questions";
import RightAnswer from "./right_answer";
import WrongAnswer from "./wrong_answer";
import { useNavigate } from "react-router-dom";
const FinalResults = ({ restartQuiz,questionsIndex, userAnswers }) => {
  let userAnswer;
  let rightAnswer;

  const [score, setScore] = useState(0);

  //function that takes an index and checks if user answer is right or not.
  const navigate = useNavigate();


  //function that takes in the score and the total number of questions . function returns a message based on the user score

const scoreMessage = ()=>{
  if (score ===0){
    return "Bizin rentre jockey mm sa😞"
}
    if ( questionsIndex && score){
       
    const percentage = (score / questionsIndex.length) * 100;
      if (percentage < 30){
        return "Ale trap sa livre la Bro 🤦🏽‍♂️"
      }
      else if (percentage < 60){
          return "Bizin apran encore ene tigit Bro🫣"
      }
      else if (percentage < 80){
          return "Re essayer. Tone passe pres 😅"

      }
      else  if ( percentage <= 100){
        return ` Felicitation Bro🥳  Pli bon chauffeur ki toi pena!😉`
      }
    }
    return "error in props";
 
}



  useEffect(()=>{
    if (  questionsIndex.length === 0){
        
      navigate('/');
    }
    console.log(questionsIndex)
  },[])
  const handleClick=()=>{
    restartQuiz();
    navigate('/');
  }
  
  useEffect(() => {
    questionsIndex.map((questionIndex, index) => {
      if (userAnswers[index] === drivingTestQuestions[questionIndex].answer) {
        setScore((prev) => prev + 1);
      }
    });
  }, []);



  const checkAnswer = (index, questionIndex) => {
    if (userAnswers[index] === drivingTestQuestions[questionIndex].answer) {
      userAnswer = drivingTestQuestions[questionIndex].answer;
      return true;
    }
    userAnswer = userAnswers[index];
    rightAnswer = drivingTestQuestions[questionIndex].answer;
    return false;
  };

  return (
    <div className="flex w-95/100 flex-col   gap-8  items-center mx-auto  rounded-3xl md:max-w-xl text-black bg-white py-5 ">
      <div className=" w-full flex-col     text-center justify-center flex items-center text-2xl border-b-2 ">
        <h3 className="section-header text-2xl font-semibold text-gray-700   ">
          Results
        </h3>
      </div>
      <div className="text-xl font-semibold text-center border-2 py-3  w-9/10 px-6 rounded-3xl border-amber-600">
          <p>Your score is :</p>

            <div className="text-3xl mt-3"><span className="text-amber-600 text-4xl">{score}</span>/{questionsIndex.length}</div>
            <p className="my-5 text-2xl text-amber-600">{scoreMessage()}</p>
            <button className="bg-amber-700 py-2 px-4  mt-10 hover:bg-amber-600 rounded-3xl" onClick={handleClick}>Restart</button>

      </div>
      <h2 className="font-semibold text-xl border-2 rounded-full px-2 py-1 border-amber-600 mt-3">Questions Summary</h2>
      {questionsIndex.map((questionIndex, index) => {
        if (checkAnswer(index, questionIndex)) {
          return (
            <RightAnswer
              setScore={setScore}
              index={index}
              questionIndex={questionIndex}
              userAnswer={userAnswer}
            />
          );
        } else {
          return (
            <WrongAnswer
              index={index}
              questionIndex={questionIndex}
              userAnswer={userAnswer}
              rightAnswer={rightAnswer}
            />
          );
        }
      })}
    </div>
  );
};

export default FinalResults;
