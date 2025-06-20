

const ProgressBar = ({questionNo=11,totalQuestions=30})=>{
   
    
    return (
        <>
       
        <div className="w-full border-amber-600 h-2 mt-2   bg-gray-200 relative rounded-2xl">
          <div className="absolute h-2 bg-amber-600  rounded-2xl transition-all duration-1000 ease-linear"
              style={{ width: `${(questionNo / totalQuestions) * 100}%` }}
              >
           
          </div>

        </div>
        </>
    )
}

export default ProgressBar;