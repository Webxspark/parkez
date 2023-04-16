import { andi } from "../assets/svg/Vector(2).svg";
import { getAccessFormSubmit } from "../components/functions";
function Features() {
  return (
    <>
      <div className="font-bold flex text-4xl px-10 py-16">
        <span className="text-white">Features- PARK</span>
        <span className="text-[#6af03b]">EZ</span>
      </div>
      <div className="flex">
        <p className="text-white text-sm leading-7 w-1/2 mx-10">
          <ul className="">
            <li className="py-1">
              ParkEZ offer a wide range of features to provide a seamless and
              personalized parking experience for travelers. In addition to
              pre-booking and real-time parking availability, there are options
              for contactless check-in and check-out, personalized parking
              preferences, and 24/7 customer service support.
            </li>{" "}
            <li className="py-1">
              Personalized parking preferences, such as proximity to the
              terminal, covered or uncovered parking options 24/7 customer
              service support to address any questions or concerns before,
              during, or after the parking experience.
            </li>{" "}
            <li className="py-1">
              Multiple payment options, including credit/debit cards, mobile
              payments, and discount codes.
            </li>{" "}
            <li className="py-1"></li>Loyalty programs, and flexible
            cancellation policies
            <li className="py-1">
              ParkEZ have user-friendly interfaces, straightforward reservation
              processes, and responsive customer service to ensure a stress-free
              experience for travelers. By utilizing advanced technology and
              reliable customer service ParkEZ provide travelers with peace of
              mind and a hassle-free parking experience before and after their
              flights.
            </li>
          </ul>
        </p>
        <div className="bg-[#4D84A0] pl-5 pr-1 py-16 mb-8 rounded-3xl mr-12">
          <div className="text-black font-bold text-2xl">
            GET &nbsp;{" "}
            <div className="font-bold flex text-2xl">
              <span className="text-white">PARK</span>
              <span className="text-[#6af03b]">EZ</span>
            </div>
          </div>
          <div className="text-black font-bold text-2xl">ANDROID APP</div>
          <div className="text-white text-2xl font-semibold my-10">
            BE A PART OF THE FUTURE
            <br /> PARKING ERA
          </div>
          <div className="text-[#FFFFFF]">
            You can try this application get access here to our <br />
            android application now.{" "}
          </div>
          <div className="flex mx-10 gap-3">
            <div className="">
              <div className="text-gray-400 py-2 w-full my-8 rounded-full bg-[#477894] flex items-center justify-between px-4 ">
                <form onSubmit={getAccessFormSubmit} className="w-full flex">
                  <input
                    className="text-lg bg-transparent focus:outline-none "
                    placeholder="Enter your email address"
                    name="email"
                  />
                  <button className="bg-[#131A26] px-8 py-1 rounded-full  text-white">
                    Get Access
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Features;
