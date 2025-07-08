
const WrongAnswer = ({questionIndex,handleNextQuestion,drivingTestQuestions,index,userAnswer,rightAnswer,nextBtn=false})=>{
  
   
      return (
        <div className={` w-9/10 py-3 ${nextBtn? "border-0" :" border-red-700 border-3 wrong-answer relative  "} px-2  rounded-4xl  flex flex-col justify-center items-center text-xl mt-3 gap-3 `}>
          <div className="mt-1 text-2xl font-semibold text-gray-800 text-center">
            {" "}
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
          <div className="radio-btns mt-0 md:mt-2 text-xl  text-gray-700 ">
            {drivingTestQuestions[questionIndex].questionsAnswers.map(
              (answer, index) => {
                return (
                  <div key={index} className={`mt-3 md:mt-1 flex gap-3 px-4 relative py-2 ${
                    Object.keys(answer)[0] === userAnswer ? "border-3 rounded-4xl  border-red-600" :
                    Object.keys(answer)[0] === rightAnswer ? "border-3 rounded-4xl input-parent  input border-green-600" : ""
                  }`}>
                    <input
                    disabled
                    readOnly
                      checked={Object.keys(answer)[0]===userAnswer}
                      className="self-baseline  cursor-pointer  appearance-none 
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
                );
              }
            )}
                    <p className="text-sm text-red-700 mt-3 font-bold text-center">Explanation: <span className="text-red-700 font-normal">{drivingTestQuestions[questionIndex].explanation}</span></p>

          </div>
          {nextBtn &&  <button
                className="bg-amber-700 md:w-5/10 w-7/10 py-3 mt-3 rounded-4xl"
                onClick={handleNextQuestion}
              >
                Next
              </button>}
        </div>
      );
}

export default WrongAnswer;