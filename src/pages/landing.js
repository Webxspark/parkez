import { FaCheck } from "react-icons/fa";
import heroImg from "../assets/svg/hero-img.svg";
import { useLoadingContext } from "react-router-loading";
import { getAccessFormSubmit } from "../components/functions";
import { Link } from "react-router-dom";
import ic1 from "../assets/svg/image 8.svg";
import ic2 from "../assets/svg/image 10.svg";
import ic3 from "../assets/svg/image 11.svg";
function Landing() {
  const Loading = useLoadingContext();
  Loading.done();
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="p-24">
          <button className="text-white bg-[#3c424c] border-black rounded-full px-5 py-1 ">
            #1 airport-specific parking application✈️{" "}
          </button>
          <div className="text-5xl text-white font-bold py-8">
            THE SOLUTION TO <br />
            YOUR PARKING
            <br />
            PROBLEMS IN AIRPORT
          </div>
          <div className="text-white text-md">
            <span className="leading-8">
              Our airport parking management system allows you to reserve in
              advance
            </span>
            <br />
            <span className="leading-8">
              make it easier for you to find the nearest parking lot with a
              variety
            </span>
            <span className="leading-8"> of price ranges.</span>
          </div>
          <div className="py-6">
            <div className="text-gray-400 py-4 w-full rounded-full bg-[#262c36] flex items-center justify-between px-7">
              <form onSubmit={getAccessFormSubmit}>
                <input
                  className="text-lg bg-transparent focus:outline-none "
                  placeholder="Enter your email address"
                  name="email"
                />
                <button
                  type="submit"
                  className="bg-[#4b829d] px-5 py-3 rounded-full text-white cursor-pointer w-auto"
                >
                  Get Access
                </button>
              </form>
            </div>
          </div>
          <div className="flex w-full gap-4 pt-5">
            <div className="flex gap-3 w-full">
              <FaCheck className="border-[1px] p-1 text-2xl rounded-md border-white text-[#7EC2E8]" />
              <div className="w-full text-white">No spam email</div>
            </div>
            <div className="flex gap-3 w-full">
              <FaCheck className="border-[1px] p-1 text-2xl rounded-md border-white text-[#7EC2E8]" />
              <div className="w-full text-white">24/7 Support System</div>
            </div>
          </div>
        </div>
        <div className="absolute right-12 -z-10">
          <img src={heroImg} className="h-[650px]" alt="" />
        </div>
      </div>
      <div className="w-full px-12 my-12">
        <div className="grid gap-10 grid-cols-2 bg-[#262C36] w-full rounded-lg py-6 px-6">
          <div className="text-3xl font-bold text-white px-10 mr-12">
            Our airport parking management system allows
            <span className="text-[#9FA8B8]"> you to reserve in advance</span>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col pr-12">
              <span className="text-5xl text-white font-bold">
                99
                <span className="text-[#4B829D] text-5xl">%</span>
              </span>
              <span className="text-[#9FA8B8] pt-3">
                Accurate data based
                <br />
                on our system
              </span>
            </div>
            <div className="flex items-center">
              <div className="h-16 w-[2px] bg-[#9fa8b8]"></div>
            </div>
            <div>
              <div className="flex flex-col pl-16">
                <span className="text-5xl text-white font-semibold">
                  10 <span className="text-[#4B829D] text-5xl">+</span>
                </span>
                <span className="text-[#9FA8B8] pt-3">
                  payment options
                  <br /> available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 mb-12 my-24">
        <div className="ml-28 mr-28">
          <div className="w-full py-12 my-20 bg-[#262C36] rounded-xl ">
            <div class="embed-container">
              {/* <iframe
                src="https://lnk.webxspark.com/parkez-hero-video"
                frameborder="0"
                allowfullscreen
              ></iframe> */}
            </div>
          </div>
        </div>
        <div className="mr-12">
          <button className="bg-[#262C36] px-3 py-1 text-[#FFFFFF] rounded-full">
            Our best features for you 💎
          </button>
          <div className="text-2xl pt-4 pb-8  font-semibold text-white">
            THE ULTIMATE PARKING EXPERIENCE-FEATURES YOU’LL LOVE
          </div>
          <div className="text-[#9FA8B8]">
            We are aware that many people have difficulty to park your vehicle,
            here we ensure you with safety and parking slot to save your time.
          </div>
          <div className="grid grid-cols-3 mr-12 gap-3 mt-5 ">
            <div className="bg-[#1e242b] text-white  my-6 mx-2 py-3 px-7 pb-8 rounded-2xl">
              <button className="bg-gray-700 rounded-xl p-7 mb-6 ">
                <img src={ic1} />
              </button>
              <div className="pt-4 font-semibold">
                Well organized <br />
                information
              </div>
            </div>
            <div className="bg-[#1e242b] text-white  my-6 mx-2 py-3 px-7 pb-8 rounded-2xl">
              <button className="bg-gray-700 rounded-xl p-7 mb-6 ">
                <img src={ic2} />
              </button>
              <div className="pt-4 font-semibold">
                Reliable <br />
                Security
              </div>
            </div>
            <div className="bg-[#1e242b] text-white  my-6 mx-2 py-3 px-7 pb-8 rounded-2xl">
              <button className="bg-gray-700 rounded-xl p-7 mb-6 ">
                <img src={ic3} />
              </button>
              <div className="pt-4 font-semibold">
                User- <br />
                friendly
              </div>
            </div>
          </div>
          <Link to={"/features"}>
            <button className="bg-[#343D44] border-[1px] border-[#9FA8B8] text-white rounded-full px-8 py-2 font-semibold mt-5 ">
              Learn More
            </button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-10 ">
        <div className="grid grid-cols-2 w-full mb-10">
          <div className="bg-[#21252A] px-4 pt-24 rounded-3xl ml-7 mr-12 text-center">
            <div className="text-[#B2B6BA] ">
              "I had a great experience using PARKEZ , and upon arrival, I was
              pleased to find that my parking space was already reserved for me.
              The system saved me time and reduced the stress of finding parking
              at the airport. I highly recommend this service to anyone
              traveling by air."
            </div>
            <div className="bg-[#21252A] py-10 text-[#B2B6BA]">
              ⭐4.8 From Playstore
            </div>
          </div>

          <div className="bg-[#21252A] px-4 pt-24 rounded-3xl ml-7 mr-12 text-center">
            <div className="text-[#B2B6BA] ">
              "I love the convenience of the airport parking management system.
              Being able to pre-book and pay ahead gave me peace of mind, and
              the process was quick and easy. I will definitely use this service
              again in the future."
            </div>
            <div className="bg-[#21252A] py-10 text-[#B2B6BA]">
              ⭐4.8 From Playstore
            </div>
          </div>
        </div>

        <div className="w-full">
          <button className="bg-[#21252A] text-white font-semibold px-6 py-1 rounded-full ">
            Testimonials from user🤩
          </button>
          <div className="text-white text-5xl font-bold pt-7">
            WHAT OUR USERS SAY
            <br /> ABOUT &nbsp;
            <span className="text-white">PARK</span>
            <span className="text-[#6af03b]">EZ</span>
          </div>
          <div className="text-[#9FA8B8] py-8">
            You will get many benefits from our features. Convenience
            <br /> and ease of use, saving time and effort.
          </div>
        </div>
      </div>
      <div className="bg-[#4D84A0] px-10 py-0 mx-10 my-36 rounded-3xl grid grid-cols-2">
        <div>
          <button className="text-[#FFFFFF] px-5 mt-12 py-1 bg-[#44768F] rounded-full">
            Download now🎉
          </button>
          <div className="text-white text-4xl font-semibold pt-8">
            BE PART OF THE FUTURE
            <br /> PARKING ERA
          </div>
          <div className="text-white pt-8">
            You can try this application get access here to our android
            <br /> application now.
          </div>
          <div className="bg-[#477894] rounded-full my-10 ">
            <form onSubmit={getAccessFormSubmit}>
              <input
                placeholder="Enter your email address"
                className="px-28 py-5 rounded-full bg-transparent focus:outline-none text-white"
                name="email"
              />
              <button className="bg-[#131a26] text-white px-3 py-2 rounded-full ">
                Get Access
              </button>
            </form>
          </div>
        </div>
        <div></div>
      </div>
      <div className="grid grid-cols-2 bg-[#1E242B] rounded-3xl mx-20 mb-10">
        <div className="px-10 py-8">
          <div className="font-bold flex text-2xl m-2">
            <span className="text-white">PARK</span>
            <span className="text-[#6af03b]">EZ</span>
          </div>
          <div className="text-white pt-8">
            Curious to know more about us?
            <br /> follow out our social media
          </div>
          <div></div>
        </div>
        <div className="grid grid-cols-2 mx-4 my-3 py-8">
          <div className="">
            <div className="font-semibold text-white pb-4">OUR POLICIES</div>
            <div className="text-white py-2">
              <a href="#">Privacy Policy</a>
            </div>
            <div className="text-white py-2">
              <a href="#">Term of Use</a>
            </div>
            <div className="text-white py-2">
              <a href="#">Term of Order</a>
            </div>
          </div>
          <div>
            <div className="font-semibold text-white pb-4">CONTACT US ON</div>
            <div className="text-white py-2">
              <a href="tel:9384445313">+919384445313</a>
            </div>
            <div className="text-white py-2">
              <a href="#">support@webxspark.com</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
