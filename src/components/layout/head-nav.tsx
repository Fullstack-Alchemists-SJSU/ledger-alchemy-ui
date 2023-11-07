import React from 'react'
import { FaInbox } from 'react-icons/fa6';
import {BsArrowsFullscreen} from 'react-icons/bs';
import {AiFillQuestionCircle} from 'react-icons/ai';


const Header = () => {
  return (
    <div className="header bg-white flex justify-between items-center px-4 py-2 shadow-md">
      <div className="flex items-center space-x-2"> {/* space-x-2 provides space between the icons */}
        <FaInbox className="text-2xl" />
        <BsArrowsFullscreen className="text-2xl" />
      </div>


     
      <div>
        <AiFillQuestionCircle className="text-2xl" />
      </div>
    </div>
  )
}

export default Header