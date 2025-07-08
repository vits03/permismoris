const RightAnswer = ({ index,questionIndex,handleNextQuestion,drivingTestQuestions, userAnswer,nextBtn=false }) => {
   
  
  return (
    <div className={`w-9/10 flex flex-col ${nextBtn? "border-0":"relative right-answer border-green-500 border-3"} px-2 py-3  rounded-4xl justify-center items-center text-xl mt-3 gap-3 `}>
      <div className="mt-1 text-lg text-center font-semibold text-gray-800">
     {!nextBtn ?<h3  className="text-lg font-semibold mb-4">Question {index+1}</h3>:""}
        <p>{drivingTestQuestions[questionIndex].questionTitle}</p>
      </div>
      <div>
        <img
          src={drivingTestQuestions[questionIndex].imageLink}
          alt=""
          loading="lazy"
          className="md:w-60 w-35 h-auto "
        />
      </div>
      <div className="radio-btns mt-2 text-xl  text-gray-700 ">
        {drivingTestQuestions[questionIndex].questionsAnswers.map(
          (answer, index) => {
            return (
                <div key={index} className={`mt-0 flex gap-3 relative px-4 py-2 ${
                    Object.keys(answer)[0] === userAnswer ? nextBtn? "border-3 rounded-4xl input-parent  border-green-600" :"border-3  rounded-4xl  border-green-600 ":"py-3"
                  }`}>
                <input
                disabled
                readOnly
                                       checked={Object.keys(answer)[0]===userAnswer}

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
                  id={`q${questionIndex}-opt${index}`}
                  name={`question${questionIndex}`}
                />
                <label
                  htmlFor={`q${questionIndex}-opt${index}`}
                  className="self-baseline text-sm"
                >
                  <span className="font-medium">{Object.keys(answer)[0]}:</span>{" "}
                  {Object.values(answer)[0]}
                </label>
              </div>
             
            )
          }
        )}
        <p className="text-sm text-green-700 font-bold text-center my-3">Explanation: <span className="text-green-700 font-normal">{drivingTestQuestions[questionIndex].explanation}</span></p>
      </div> 
        {nextBtn &&  <button
                className="bg-amber-700 md:w-5/10 w-6/10 py-3 mt-3 text-lg rounded-4xl"
                onClick={handleNextQuestion}
              >
                Next
              </button>}
    </div>
  
  );
};

export default RightAnswer;
