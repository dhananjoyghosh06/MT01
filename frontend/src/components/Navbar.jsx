// Navbar.js
import {React, useEffect, useState, useRef} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaLinkedin, FaGithub,FaRegSmile } from "react-icons/fa";
import { FiSidebar } from 'react-icons/fi';
import './navbar.css'; // Make sure to import the CSS file
import Sidebar from './Sidebar';
import axios from 'axios';
import { MdOutlineWork } from "react-icons/md";

const Navbar = () => {
const location = useLocation();
const [isOpen, setIsOpen] = useState(false);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [isLogout, setIsLogout] = useState(false);
const [isProfileChecked, setIsProfileChecked] = useState(false);

  const getMenuItems = () => {
    switch (location.pathname) {
      case '/':
        return [
          { name: 'Courses', path: '/courses' },
          { name: 'Explore', path: '/explore' },
          {name:'Contact', path:'/contact'},
          {name:"Articles", path:'/articles'},
          {name:'Tutorials', path:'/tutorials'}
        ];
      case '/courses':
        return [
          { name: 'Home', path: '/' },
          { name: 'Explore', path: '/explore' },
          {name:'Contact', path:'/contact'},
          {name:"Articles", path:'/articles'},
          {name:'Tutorials', path:'/tutorials'}
        ];
      case '/explore':
        return [
          { name: 'Home', path: '/' },
          { name: 'Courses', path: '/courses' },
          {name:'Contact', path:'/contact'},
          {name:"Articles", path:'/articles'},
          {name:'Tutorials', path:'/tutorials'}
        ];
      case '/contact':
        return [
          { name: 'Home', path: '/' },
          { name: 'Courses', path: '/courses' },
          { name: 'Explore', path: '/explore' },

          {name:"Articles", path:'/articles'},
          {name:'Tutorials', path:'/tutorials'}
        ];
        case '/articles':
        return [
          { name: 'Home', path: '/' },
          { name: 'Courses', path: '/courses' },
          { name: 'Explore', path: '/explore' },
          {name:'Contact', path:'/contact'},
          {name:'Tutorials', path:'/tutorials'}
        ];
        case '/tutorials':
        return [
          { name: 'Home', path: '/' },
          { name: 'Courses', path: '/courses' },
          { name: 'Explore', path: '/explore' },
          {name:'Contact', path:'/contact'},
          {name:'Articles', path:'/articles'}
        ];
      default:
        return [
          { name: 'Home', path: '/' },
          { name: 'Courses', path: '/courses' },
          { name: 'Explore', path: '/explore' },
          {name:'Contact', path:'/contact'},
          {name:'Articles', path:'/articles'},
          {name:'Tutorials', path:'/tutorials'}
        ];
    }
  };

  const menuItems = getMenuItems();

  const handleSidebar = () =>{
    
    setIsOpen(!isOpen);
  }

  const sidebarRef = useRef();
  const handleOutsideClick = (event)=>{
        if(sidebarRef.current && !sidebarRef.current.contains(event.target)){
            setIsOpen(false);
        }
  }

  useEffect(()=>{
    if(isOpen){
      document.addEventListener('mousedown', handleOutsideClick);
    return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [isOpen])

  const handleProfile =()=>{
    setIsProfileChecked(!isProfileChecked);
  }

  //checking for token
  
  useEffect(()=>{ // doubt
      // const tokenFromLocal = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkaGFuYW5qb3lnaG9zaG9mZmljaWFsQGdtYWlsLmNvbSIsImlhdCI6MTczMjk4MDMyMCwiZXhwIjoxNzMzMDY2NzIwfQ.mL7KZzAl8iyMaTZLqBIw63OeGTNnuedsoi8RlN0VMAymiZWtPOZgWEYQoh2w5NyOC9atPW3xmO8BKEsNkb02qg"
      const tokenfromlocal = localStorage.getItem("token");

      const fetchAuth = async() =>{
        try{
          console.log(isProfileChecked);
          if(tokenfromlocal == null) throw new Error("token is null");

          console.log("token peyechi",tokenfromlocal);
          const res = await axios.get("http://localhost:8081/user/authCheck", {
            headers:{
              Authorization:`Bearer ${tokenfromlocal}`
            },
          })
          if(res.data == true){
            setIsAuthenticated(true);
          }else{
            setIsAuthenticated(false);
          }
          // console.log("response data", res.data);
        }catch(e){
            setIsAuthenticated(false);
            console.log("Error occured", e);
        }
      }

      fetchAuth();
  },[])
  const handleLogout = ()=>{
    setIsLogout(true);
  }
  const handleConfirm = ()=>{
    localStorage.removeItem("token");
    setIsLogout(false);
    setIsProfileChecked(false);
    window.location.reload();

  }
  const handleCancel = ()=>{
    
    setIsProfileChecked(false);
    setIsLogout(false);
  }
  const [profileDetails, setProfileDeatils] = useState(false);
  useEffect(()=>{
      getProfileDetails();
  },[])
   const getProfileDetails = async () => {
      try {
          const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8081/user/getProfiledetails",
          {
              headers:{
                  'Authorization': `Bearer ${token}`
              }
          }
        );
        if (response.data != null) {
          console.log(response);
          setProfileDeatils(response.data);
          console.log(response.data[1]);
        }
        else throw new Error("No profile found");
      } catch (e) {
        console.log("err", e);
      }
    };
    return (
    <div className={`h-[100px] flex justify-between items-center px-10 bg-gray-800 text-white  ${location.pathname !== '/' ? ' top-0 left-0 right-0 z-50' : ''}`}>
      <div className='flex gap-2 items-center'>
        <h3 className='text-xl font-bold '>MT01 </h3>
        <FaRegSmile  className='text-yellow-400'/>
      </div>
      <div className='md:flex md:space-x-4 hidden'>
        {menuItems.map((item) => (
          <li key={item.name} className='list-none'>
            <Link to={item.path} className='underline-effect hover:text-gray-400'>
              {item.name}
            </Link>
          </li>
        ))}
      </div>
      <div className='md:flex md:space-x-4 md:text-xl flex items-center'>
        {isAuthenticated ? 
        <div>
            <button onClick={handleProfile} className='hover:text-gray-400 hover:scale-125 relative'> 
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={profileDetails ? profileDetails[1]: "https://res.cloudinary.com/myhunger/image/upload/v1732900455/pngegg_czii0o.png"} />
                </div>
              </div>
             {isProfileChecked &&  <ul tabIndex={0} className="absolute right-8 top-6 dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow z-[1] text-blue-500 z-99">
                <li><Link to="/profile">Profile</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul> }
              { isLogout &&  <ul tabIndex={0} className="absolute right-4 top-6 dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow z-99">
                <li><button onClick={handleConfirm}>Confirm</button></li>
                <li><button onClick={handleCancel}>Cancel</button></li>
              </ul> }
          </button>

        </div>
         : 
        <div className='flex items-center'>
          <Link to={"/login"} className='w-[120px] h-[40px] text-center text-[#2a67b1] font-normal flex items-center justify-center rounded-md hover:bg-white'>
          Login 
        </Link>
        <Link to={"/signup"} className='w-[120px] h-[40px] text-center text-[#2a67b1] color-[#2a67b1] font-normal flex items-center justify-center rounded-md hover:bg-white'>
          Signup
        </Link>
        </div>
        
        }
        
        
      </div>

      { !isOpen ? 
      <Link className='md:hidden ' onClick={handleSidebar} >
          <FiSidebar className='size-[30px]' />
          
      </Link> : <div ref={sidebarRef}><Sidebar handleSidebar={handleSidebar} isAuthenticated={isAuthenticated} menuItems={menuItems}/></div> }
    </div>
  );
};

export default Navbar;