import { message } from "antd";
import { useLoadingContext } from "react-router-loading";
const ContactUs = () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const Loading = useLoadingContext();
  Loading.done();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const ENDPOINT = "https://hackverseind-2023.webxspark.com/science/contact.php";
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (name === "" || email === "" || subject === "" || message === "") {
      messageApi.info("Please fill all the required fields!");
      return;
    }
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("subject", subject);
    data.append("message", message);
    data.append("send", true);

    fetch(ENDPOINT, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          messageApi.success(data.message, 5);
          e.target.reset();
        } else {
          messageApi.error(data.error, 5);
        }
      });
  };

  return (
    <>
      <div className="my-12 w-full flex gap-4 flex-col items-center justify-center">
        <h1 className="text-white font-semibold text-4xl">
        THE FIX FOR YOUR PARKING  PROBLEMS.
        </h1>
        <p className="text-white">
        Your Parking Woes End Here with our app. Any queries contact us :
        </p>
      </div>
      <div className="flex items-center justify-center mb-12">
        <div className="bg-[#1E242B] rounded-xl px-6 py-8">
          <form onSubmit={handleFormSubmit}>
            <div className="flex gap-6 mb-6">
              <input
                className="w-full bg-[#3F454D] focus:outline-none rounded-lg text-[#fff] placeholder-[#9FA8B8] px-4 py-3"
                type={"text"}
                value={
                  localStorage.user_id
                    ? JSON.parse(localStorage.user_id)["name"]
                    : ""
                }
                name="name"
                placeholder="Name"
              />
              <input
                className="w-full bg-[#3F454D] focus:outline-none rounded-lg text-[#fff] placeholder-[#9FA8B8] px-4 py-3"
                type={"email"}
                value={
                  localStorage.user_id
                    ? JSON.parse(localStorage.user_id)["email"]
                    : ""
                }
                name="email"
                placeholder="Email address"
              />
            </div>
            <div className="mb-6">
              <input
                className="w-full bg-[#3F454D] focus:outline-none rounded-lg text-[#fff] placeholder-[#9FA8B8] px-4 py-3"
                type={"text"}
                name="subject"
                placeholder="Subject"
              />
            </div>
            <div className="mb-6">
              <textarea
                className="w-full bg-[#3F454D] focus:outline-none rounded-lg text-[#fff] placeholder-[#9FA8B8] px-4 py-3 resize-none"
                rows={4}
                name="message"
                placeholder="Message"
              />
            </div>
            <div className="flex gap-6 mb-6 items-center w-full justify-between">
              <button
                type="submit"
                className="text-white px-10 py-3 rounded-full bg-[#4B829D]"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
        {messageContextHolder}
      </div>
    </>
  );
};

export default ContactUs;
