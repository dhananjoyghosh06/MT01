import React from 'react'
import { Tilt } from 'react-tilt'

const Topics = () => {
  const defaultOptions = {
    reverse:        false,  // reverse the tilt direction
    max:            35,     // max tilt rotation (degrees)
    perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
    speed:          1000,   // Speed of the enter/exit transition
    transition:     true,   // Set a transition on enter/exit.
    axis:           null,   // What axis should be disabled. Can be X or Y.
    reset:          true,    // If the tilt effect has to be reset on exit.
    easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
  }
    const topics = ["Web Development", "Quick Compiler", "Tutorials", "Articles", "Dev Challenges", "Interview Experiences", "Mock Tests", "Core CS Subjects"]
  return (
    <div className='w-[55%] h-full grid grid-cols-2 gap-5 less800:w-[80%]'>
            {
                topics.map(
                (item, index)=>(
                    <Tilt options={defaultOptions}  key={index} className='text-white bg-[#2C3E50] text-center flex justify-center items-center cursor-pointer rounded-lg  border border-1 border-blue-600 hover:bg-white hover:border-blue-600 hover:text-blue-600 hover:scale-110 hover:ease-in-out less800:h-[80px] z-0'>
                    {item}
                    </Tilt >
                ))
            }
    </div>
  )
}

export default Topics