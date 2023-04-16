import {FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import alan  from "../assets/svg/alan 1.svg";
import jayna   from "../assets/svg/jayna 1.svg";
import kalps   from "../assets/svg/kalps 1.svg";
function AboutUs() {
  return (
    <>
      <div>
        <div className="text-5xl text-white font-bold p-8">ABOUT US</div>
        <div className="leading-8 text-lg w-4/5 px-8 text-white ">
          We are a team of passionate undergraduate students from SRM University
          dedicated to making airport parking simple, convenient, and
          affordable. Our state-of-the-art parking management system leverages
          the latest technology to provide real-time availability, pre-booking
          options, and personalized preferences. We pride ourselves on
          exceptional customer support, with a friendly and knowledgeable team
          available 24/7 to assist you. Thank you for choosing us.
        </div>
      </div>
      <div className="text-white font-semibold text-3xl py-8 text-center">
        MEET OUR TEAM
      </div>
      <div className="grid grid-cols-3 mr-12 gap-3 mt-5 ">
        <div className="bg-[#1e242b] text-white  my-6 mx-10 p-8 rounded-2xl">
        <img src={alan} />
          <div className="text-white font-bold text-2xl">Alan Christofer</div>
          <div className="pt-4 font-semibold ">
            <FaGithub className="my-4" />
            <FaTwitter className="my-4" />
            <FaLinkedin className="my-4" />
          </div>
        </div>
        <div className="bg-[#1e242b] text-white flex my-6 mx-10 p-8 rounded-2xl">
          <div>
        <img src={jayna} />
            <div className="text-white font-bold text-2xl">Jayna Mukesh</div>
            <div>
              <div className="pt-4 font-semibold">
                <FaGithub className="my-4" />
                <FaTwitter className="my-4" />
                <FaLinkedin className="my-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#1e242b] text-white  my-6 mx-10 p-8 rounded-2xl">
        <img src={kalps} />
          <div className=" pt-3 text-white font-bold text-2xl">Kalpitha<br /> S V</div>
          <div className="pt-4 font-semibold ">
            <FaGithub className="my-4" />
            <FaTwitter className="my-4" />
            <FaLinkedin className="my-4" />
          </div>
        </div>
      </div>
    </>
  );
}
export default AboutUs;
