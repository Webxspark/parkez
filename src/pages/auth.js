import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "react-router-loading";
import { LoginStatusContext } from "../components/LoginContext";
import { message } from "antd";
const Auth = () => {
  const [formView, setFormView] = useState("login");
  const { loginStatus, setLoginStatus } = useContext(LoginStatusContext);
  const navigate = useNavigate();
  const [messageApi, messageContextHolder] = message.useMessage();
  const ENDPOINT = "https://hackverseind-2023.webxspark.com/science/userAuth.php";
  const handleSignupFormSubmit = (e) => {
    e.preventDefault();
    //send fetch req to ENDPOINT in urlformencoded format
    const formData = new FormData(e.target);
    const fname = formData.get("fname");
    const lname = formData.get("lname");
    const email = formData.get("email");
    const password = formData.get("password");
    const cpassword = formData.get("cpassword");
    //validate form
    if (fname === "" || lname === "" || email === "" || password === "") {
      messageApi.info(
        "Please fill all the required fields to create a new account!"
      );
      return;
    }
    if (password !== cpassword) {
      messageApi.info("Passwords do not match");
      return;
    }
    const data = new URLSearchParams();
    data.append("name", fname + " " + lname);
    data.append("email", email);
    data.append("password", password);
    data.append("signup", "true");

    fetch(ENDPOINT, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          messageApi.success(data.message, 5);
          var userInfo = {
            name: data.context.content.name,
            email: data.context.content.email,
            tag: data.context.content.tag,
          };
          localStorage.setItem("user_id", JSON.stringify(userInfo));
          setLoginStatus(true);
        } else {
          messageApi.error(data.error, 5);
        }
      });
  };
  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    //send fetch req to ENDPOINT in urlformencoded format
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    //validate form
    if (email === "" || password === "") {
      messageApi.info(
        "Please fill all the required fields to create a new account!"
      );
      return;
    }
    
    const data = new URLSearchParams();
    data.append("email", email);
    data.append("password", password);
    data.append("login", "true");

    fetch(ENDPOINT, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          messageApi.success(data.message, 5);
          var userInfo = {
            name: data.context.content.name,
            email: data.context.content.email,
            tag: data.context.content.tag,
          };
          localStorage.setItem("user_id", JSON.stringify(userInfo));
          setLoginStatus(true);
        } else {
          messageApi.error(data.error, 5);
        }
      });
  };
  const Loading = useLoadingContext();
  Loading.done();
  useEffect(() => {
    if (loginStatus) {
      navigate("/");
    }
  }, [loginStatus]);
  return (
    <>
      {formView === "signup" ? (
        <>
          <div className="my-12 w-full flex gap-4 flex-col items-center justify-center">
            <h1 className="text-white font-semibold text-3xl">
              Login to Your Account
            </h1>
            <p className="text-white">
              Choose from 130,000 online video courses with new additions
              published every second month
            </p>
          </div>
          <div className="grid grid-cols-2">
            <div className="mx-16">
              <div className="bg-[#1E242B] rounded-xl px-6 py-8">
                <form onSubmit={handleSignupFormSubmit}>
                  <div className="flex gap-6 mb-6">
                    <input
                      className="w-full bg-[#3F454D] focus:outline-none rounded-lg text-[#fff] placeholder-[#9FA8B8] px-4 py-3"
                      type={"text"}
                      name="fname"
                      placeholder="First name"
                    />
                    <input
                      className="w-full bg-[#3F454D] focus:outline-none rounded-lg text-[#fff] placeholder-[#9FA8B8] px-4 py-3"
                      type={"text"}
                      name="lname"
                      placeholder="Last name"
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      className="w-full bg-[#3F454D] focus:outline-none rounded-lg text-[#fff] placeholder-[#9FA8B8] px-4 py-3"
                      type={"email"}
                      name="email"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      className="w-full bg-[#3F454D] focus:outline-none rounded-lg text-[#fff] placeholder-[#9FA8B8] px-4 py-3"
                      type={"password"}
                      name="password"
                      placeholder="New Password"
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      className="w-full bg-[#3F454D] focus:outline-none rounded-lg text-[#fff] placeholder-[#9FA8B8] px-4 py-3"
                      type={"password"}
                      name="cpassword"
                      placeholder="Confirm new Password"
                    />
                  </div>
                  <div className="flex gap-6 mb-6 items-center w-full justify-between">
                    <button
                      type="submit"
                      className="text-white px-10 py-3 rounded-full bg-[#4B829D]"
                    >
                      Sign Up
                    </button>
                    <p className="text-white flex gap-2">
                      Already a member?{" "}
                      <div
                        onClick={() => {
                          setFormView("login");
                        }}
                        className="text-[#4D84A0] cursor-pointer"
                      >
                        Login
                      </div>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="my-12 w-full flex gap-4 flex-col items-center justify-center">
            <h1 className="text-white font-semibold text-3xl">
            Login to Your Account            </h1>
            <p className="text-white">
            Experience Hassle-Free Airport Parking by logging in to your account
            </p>
          </div>
          <div className="grid grid-cols-2">
            <div className="mx-16">
              <div className="bg-[#1E242B] rounded-xl px-6 py-8">
                <form onSubmit={handleLoginFormSubmit}>
                  <div className="mb-6">
                    <input
                      className="w-full bg-[#3F454D] focus:outline-none rounded-lg text-[#fff] placeholder-[#9FA8B8] px-4 py-3"
                      type={"email"}
                      name="email"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      className="w-full bg-[#3F454D] focus:outline-none rounded-lg text-[#fff] placeholder-[#9FA8B8] px-4 py-3"
                      type={"password"}
                      name="password"
                      placeholder="New Password"
                    />
                  </div>
                  <div className="flex gap-6 mb-6 items-center w-full justify-between">
                    <button
                      type="submit"
                      className="text-white px-10 py-3 rounded-full bg-[#4B829D]"
                    >
                      Login
                    </button>
                    <p className="text-white flex gap-2">
                      New here?{" "}
                      <div
                        onClick={() => {
                          setFormView("signup");
                        }}
                        className="text-[#4D84A0] cursor-pointer"
                      >
                        Create an Account
                      </div>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
      {messageContextHolder}
    </>
  );
};
export default Auth;
