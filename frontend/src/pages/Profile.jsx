import React, { useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdCall } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import Navbar from "../components/Navbar";
import { MdOutlineWork } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import { RiLinksLine } from "react-icons/ri";
import { TbCertificate } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import UploadImage from "../components/UploadImage";

const Profile = () => {
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  //image url getting
  const [profileDetails, setProfileDeatils] = useState(null); // [name, imagelink, role]
  const [imageUpload, setImageUpload] = useState(false);
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
  const handleImageUpload = () => {
    setImageUpload(!imageUpload);
  };

  return (
    <div className="h-auto">
      <Navbar />
      <div className="w-full h-auto bg-[#F5F5F5] flex justify-center items-center">
        <div className="w-[80%] h-auto  flex justify-center ">
          <div className="w-[35%] h-[950px] flex flex-col justify-evenly items-center ">
            {/* Avatar */}
            <Tilt className="h-[200px] w-[90%] p-4 border border-1 border-[#FFFEF0 ] bg-white">
              <div className="flex justify-between items-center">
                <div className="avatar ">
                  <div
                    className="w-14 rounded-full cursor-pointer"
                    onClick={handleImageUpload}
                  >
                    <img
                      src={
                       ( profileDetails ? profileDetails[1] :
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp") || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                <button className="text-base text-blue-500">Edit</button>
              </div>

              <h1 className="font-bold text-base text-black mt-2">
              {(profileDetails ? profileDetails[0] : "John Doe") || "John Doe"}

              </h1>

              <br></br>
              <br></br>
              <h1 className="font-bold text-xl text-black">
                Software Developer
              </h1>
            </Tilt>
            <Tilt className="h-[200px] w-[90%] bg-white border border-1 border-[#FFFEF0 ]  p-4 flex flex-col justify-between ">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black">
                  Personal Information
                </h1>
                <button className="text-base text-blue-500">Edit</button>
              </div>
              <div className="h-[70%] flex flex-col justify-around items-center">
                <div className="w-[95%] flex gap-4 items-center">
                  <HiOutlineMailOpen />
                 <p className="text-base text-black ">
                 {(profileDetails && profileDetails[3]) || "johndoeoff@gmail.com"}
                  </p>
                </div>
                <div className="w-[95%] flex gap-4 items-center">
                  <MdCall />
                  <p className="text-base text-black ">(+91) 9749700161</p>
                </div>
                <div className="w-[95%] flex gap-4 items-center">
                  <FaLocationDot />
                  <p className="text-base text-black ">India</p>
                </div>
              </div>
            </Tilt>
            {/* Need Modification */}
            <Tilt className="h-[200px] w-[90%] bg-white border border-[#FFFEF0 ] p-4 flex flex-col gap-4 ">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black">My Resume</h1>
                <button className="text-base text-blue-500">
                  + Add Resume
                </button>
              </div>
              <p className="font-base text-gray-500">Add you resume here</p>
            </Tilt>
            <Tilt className="h-[200px] w-[90%] bg-white border border-[#FFFEF0 ] p-4 flex flex-col gap-4 ">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black">Skills</h1>
                <button className="text-base text-blue-500">+ Add</button>
              </div>
              <div></div>
            </Tilt>
          </div>
          <div className="w-[65%] h-auto flex flex-col p-7 gap-10 items-center ">
            <Tilt className="w-[90%] h-[200px] bg-white p-4 rounded-lg border border-1 border-[#FFFEF0 ]">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <MdOutlineWork size={23} />
                  <p className="font-bold text-xl ">Work Experience</p>
                </div>
                <button className="text-base text-blue-500 flex gap-1 items-center">
                  <FaPlus size={14} />
                  Add Experience
                </button>{" "}
              </div>
              <div>
                <br />
                Add your work experience. Don’t forget to add those internships
                as well.
              </div>
            </Tilt>
            <Tilt className="w-[90%] h-[200px] bg-white p-4 rounded-lg border border-1 border-[#FFFEF0 ]">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <FaGraduationCap size={23} />
                  <p className="font-bold text-xl ">Education</p>
                </div>
                <button className="text-base text-blue-500 flex gap-1 items-center">
                  <FaPlus size={14} />
                  Add Education
                </button>{" "}
              </div>
              <div>
                <br />
                Add your Education.
              </div>
            </Tilt>
            <Tilt className="w-[90%] h-[200px] bg-white p-4 rounded-lg border border-1 border-[#FFFEF0 ]">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <RiLinksLine size={23} />
                  <p className="font-bold text-xl ">Links</p>
                </div>
                <button className="text-base text-blue-500 flex gap-1 items-center">
                  <FaPlus size={14} />
                  Add Links
                </button>{" "}
              </div>
              <div>
                <br />
                Add your Social Links.
              </div>
            </Tilt>
            <Tilt className="w-[90%] h-[200px] bg-white p-4 rounded-lg border border-1 border-[#FFFEF0 ]">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <TbCertificate size={23} />
                  <p className="font-bold text-xl ">My Certifications</p>
                </div>
                <button className="text-base text-blue-500 flex gap-1 items-center">
                  <FaPlus size={14} />
                  Add Certificates
                </button>
              </div>
              <div>
                <br />
                Add your Social Links.
              </div>
            </Tilt>
          </div>
        </div>
      </div>
      {imageUpload && <UploadImage imageUpload={imageUpload} onClose={handleImageUpload}/>}
    </div>
  );
};

export default Profile;
