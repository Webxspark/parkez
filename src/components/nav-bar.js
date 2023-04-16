import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginStatusContext } from "./LoginContext";
function Navbar() {
  const { loginStatus, setLoginStatus } = useContext(LoginStatusContext);
  //automatic login if localstorage.user_id exists
  useEffect(() => {
    if (!loginStatus) {
      if (localStorage.user_id) {
        setLoginStatus(true);
      }
    }
  }, [loginStatus]);
  return (
    <>
      <div className=" h-24 border-b-[1px] border-[#9FA8B8]">
        <div className="flex mx-16 justify-between items-center pt-8">
          <Link to={"/"}>
            <div className="font-bold flex text-2xl">
              <span className="text-white">PARK</span>
              <span className="text-[#6af03b]">EZ</span>
            </div>
          </Link>
          <div className="flex w-full items-center  text-[#9FA8B8] pl-24 ml-12">
          <Link to="features" className="pr-8 text-sm">
              Features
            </Link>
            <Link to="about-us" className="pr-8 text-sm">
              About Us
            </Link>
            <Link to="contact-us" className="pr-8 text-sm">
              Contact
            </Link>
          </div>
          {loginStatus ? (
            <>
              <div className="w-full flex justify-end">
                <Link to={"/dashboard"}>
                  <button className="text-white p-2 px-6 rounded-full border-[1px] border-[#9FA8B8] ">
                    Dashboard
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="w-full flex justify-end">
                <Link to={"/auth"}>
                  <button className="text-white p-2 px-6 rounded-full border-[1px] border-[#9FA8B8] ">
                    Sign in
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Navbar;
