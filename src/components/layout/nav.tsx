import React from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa6";
import { GoGoal } from "react-icons/go";
import { BsFillChatDotsFill} from "react-icons/bs";
import {IoSettings} from "react-icons/io5";
import {PiUserCircleFill} from "react-icons/pi"
import { Link } from "react-router-dom";

import { useState } from "react";

const menus = [
  { name: "Dashboard" ,link:'/dashboard',icon: MdOutlineDashboard  },
  { name: "My Wallet",link:'/mywallet',icon: FaWallet},
  { name: "Recent Transactions", link:'/rcttransactions',icon: FaMoneyBillWave },
  { name: "Set My Goals " ,link:'/goals',icon: GoGoal},
  { name: "Talk to Alchemo",link:'/chatbot',icon: BsFillChatDotsFill},
  { name: "Settings",link:'/settings',icon: IoSettings,margin:true},
  { name: "Adrian Tra ",link:'/profile',icon: PiUserCircleFill },/// User name here
 
];


const Navbar = () => {
  const [open, setOpen] = useState(true);
    
    return (
      
     <div
        className={`bg-dark-purple min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      
    );
}

export default Navbar
