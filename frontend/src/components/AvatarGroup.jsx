import React, { useState } from 'react'
import { Tilt } from 'react-tilt';
const AvatarGroup = () => {
  const [isHovered, setIsHovered] = useState(false);
  const handleisHovered = () =>{
    setIsHovered(!isHovered);
  }
  const [count, setCount] = useState(0);
  const handleCount = (num)=>{
      setCount(num);
  }
  return (
    <Tilt className="avatar-group -space-x-6 rtl:space-x-reverse" >
  <div className="avatar hover:scale-110 cursor-pointer" >
    <div className="w-10">
      <img src="https://res.cloudinary.com/myhunger/image/upload/v1732875032/Students/20240725_122136_jgqwss.jpg" />
    </div>
    
  </div>
  <div className="avatar hover:scale-110 cursor-pointer">
    <div className="w-10">
      <img src="https://res.cloudinary.com/myhunger/image/upload/v1732875205/Students/1728017553213_mjaxhn.jpg" />
    </div>
    
  </div>
  <div className="avatar hover:scale-110 cursor-pointer" >
    <div className="w-10">
      <img src="https://res.cloudinary.com/myhunger/image/upload/v1732886075/Students/arnab_nszoax.jpg" />
    </div>
    
  </div>
  <div className="avatar hover:scale-110 cursor-pointer" >
    <div className="w-10">
      <img src="https://res.cloudinary.com/myhunger/image/upload/v1732886154/Students/sujit_s_bl1qul.jpg" />
    </div>
   
  </div>
  <div className="avatar hover:scale-110 cursor-pointer" >
    <div className="w-10">
      <img src="https://res.cloudinary.com/myhunger/image/upload/v1732886337/Students/joy_s_nmsjkq.jpg" />
    </div>
    
  </div>
  <div className="avatar hover:scale-110 cursor-pointer" >
    <div className="w-10 ">
      <img src="https://res.cloudinary.com/myhunger/image/upload/v1732886902/Students/sandip_cytduk.jpg" />
    </div>
   
  </div>
    </Tilt>
  )
}

export default AvatarGroup