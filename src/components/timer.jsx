import { useEffect, } from "react";


const Timer=({time,setTime,reset,setReset,handleReset,setTimerOver})=>{
 
 


  useEffect(() => {
    let timer;
    if (reset && time > 0) {
      timer = setTimeout(() => setTime(t => t - 1), 1000);
    } else if (time === 0) {
      setReset(true);
      setTimerOver(true);
      // Add your timeout logic here
    }
    return () => clearTimeout(timer);
  }, [reset, time]);


    return (
        <div>
        
            <div className="  px-6 py-1 text-center text-xl rounded-4xl bg-amber-700 text-white" onClick={handleReset}> <span>{time||"0"}</span>s</div>
        </div>
        
    )

  

}

export default Timer;