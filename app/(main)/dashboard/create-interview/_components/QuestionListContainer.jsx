import React from 'react'

function QuestionListContainer({questionList}) {
  return (
    <div>
        <h2 className='font-bold text-lg mb-3'>Generated Questions:</h2>
                <div className='p-5 bg-white rounded-xl border border-gray-300 shadow-md flex flex-col gap-5'> 
                    {questionList.map((item,index) => (
                        <div key={index} className='p-2  border border-gray-200 rounded-xl my-2 mb-1'>
                            <h2 className='font-bold'>{item.question}</h2>
                            <p className='text-sm text-primary'>Type: {item?.type}</p>
                        </div>
                    ))}
                </div>
    </div>
  )
}

export default QuestionListContainer