import { useNavigate } from "react-router";
import { useRef } from "react";

const HeroSection = ({ switchMode,restartQuiz }) => {
  let navigate = useNavigate();
  const handleClick = (mode,vehicle) => {
    switchMode(mode);
    restartQuiz();
    navigate(`/${mode}-${vehicle}`);
  };

  const nextSectionRef = useRef(null);

  const handleScroll = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
    <div className="h-[calc(100vh-72px)] min-h-110">
      <div className="h-97/100  px-4 text-[#FFFFFF] justify-evenly items-center flex flex-col">
        
          <h1 className="text-center opacity-100  text-amber-50 font-semibold">
            Practice Oral Learners Test MCQs
          </h1>
          <h2 className="text-center text-xl font-semibold mt-3">
            Free  Oral driving tests with real exam questions for Learner Drivers
          </h2>
        
        <div className=" text-xl">
          <p>✅Real exams questions</p>
          <p className="mt-4">✅Instant feedback</p>
          <p className="mt-4">✅Timed Mock Tests</p>
        </div>
        <button onClick={handleScroll}
          className="bg-white    mb-3 py-4 shadow-2xl btn w-7/10  md:w-3/10 rounded-4xl text-black font-bold text-xl hover:bg-amber-600 hover:text-white transition duration-500 ease-in-out"

        >
          Start Quiz
        </button>
      </div>
      </div>
      
      <section ref={nextSectionRef} 
         className="w-full h-screen min-h-180 flex  justify-center items-center ">
        <div className="flex bg-white   gap-5 w-95/100 lg:w-9/10 max-w-4xl  mx-auto h-80/100 py-5 md:h-7/10 rounded-3xl flex-col items-center justify-evenly   md:pb-15 px-3">
          <h3 className="text-4xl text-amber-700     ">Features</h3>
          <div className="features-container rounded-3xl h-95/10 gap-3 border-2 justify-evenly w-full items-center flex flex-col  md:flex-row ">
            <div className="md:w-3/10 w-95/100 h-45/100 md:h-8/10 text-black bg-green-100 text-center  gap-3 py-3  md:py-8 rounded-4xl flex flex-col justify-evenly items-center border-green-700 border-2">
              <p className="text-lg text-green-700">Practice Mode</p>

              <div className="text-left  text-sm flex flex-col justify-evenly  gap-4 h-6/10 pl-2">
                <p>
                  {" "}
                  <span className="rounded-full">🟠</span>No time Limit
                </p>
                <p>
                  {" "}
                  <span className="rounded-full">🟠</span>Answers provided after
                  question
                </p>
                <p>
                  {" "}
                  <span className="rounded-full">🟠</span>20 multiple choice
                  questions{" "}
                </p>
              </div>
              <button  onClick={()=>handleClick("practice","car")} className="px-4 py-2 bg-green-700 w-5/10 rounded-full hover:bg-green-600 transition-all ">
                {" "}
                Car
              </button>
                <button  onClick={()=>handleClick("practice","bus")} className="px-4 py-2 bg-green-700 w-5/10 rounded-full hover:bg-green-600 transition-all ">
                {" "}
                 Bus
              </button>
            </div>
            <div className="md:w-3/10 w-95/100 h-45/100 text-black bg-red-100 text-center  md:h-8/10 py-3 md:py-8  gap-3  rounded-4xl flex flex-col justify-evenly items-center border-amber-700 border-2">
              <p className="text-lg text-amber-700">Mock Mode</p>

              <div className="text-left  text-sm flex flex-col gap-4  justify-evenly h-6/10 pl-2">
                <p>
                  {" "}
                  <span className="rounded-full">🟠</span>30 seconds time limit
                  /question
                </p>
                <p>
                  {" "}
                  <span className="rounded-full">🟠</span>Answer provided at the
                  End
                </p>
                <p>
                  {" "}
                  <span className="rounded-full">🟠</span>35 multiple choice
                  questions{" "}
                </p>
              </div>
              <button onClick={()=>handleClick("mock","car")} className=" px-4 py-2 bg-amber-700 w-5/10 rounded-full hover:bg-amber-600 transition-all ">
                {" "}
               Car
              </button>
                <button onClick={()=>handleClick("mock","bus")} className=" px-4 py-2 bg-amber-700 w-5/10 rounded-full hover:bg-amber-600 transition-all ">
                {" "}
                Bus
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
