import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "react-router-loading";
import { LoginStatusContext } from "../components/LoginContext";
import ChennaiAirportImg from "../assets/img/airport.png";
import { Progress, Modal, message } from "antd";
import carImg from "../assets/img/car.png";
import Skeleton from "../components/dashboard-skeleton";
import useRazorpay from "react-razorpay";
const Dashboard = () => {
  const Loading = useLoadingContext();
  Loading.done();
  const { loginStatus, setLoginStatus } = useContext(LoginStatusContext);
  const navigate = useNavigate();
  const [parkingData, setParkingData] = useState(false);
  const [price, setPrice] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(false);
  const [messageAPI, contextMSG] = message.useMessage();
  const bookSlot = (slot_id) => {
    setSelectedSlot(slot_id);
    setOpen(true);
  };
  const Table = ({ items }) => {
    return (
      <>
        {items.map((item, index) => {
          return (
            <div className="flex items-center justify-center border-[1px] border-white text-white p-4 px-6">
              {item.status === "free" ? (
                <>
                  <div
                    className="cursor-pointer hover:underline"
                    onClick={() => {
                      bookSlot(item.slot_id);
                    }}
                  >
                    FREE
                  </div>
                </>
              ) : item.status === "booked" ? (
                "BOOKED"
              ) : (
                <img src={carImg} alt="carimg" width={60} />
              )}
            </div>
          );
        })}
      </>
    );
  };
  //fetch request to backend and get parking data using fetch
  const Razorpay = useRazorpay();
  const makePayment = (e) => {
    if (price === 0) {
      messageAPI.info("Please select a valid details to continue!");
      return;
    }
    const options = {
      key: "rzp_test_fbLrXPK6fAE4Oj", // Enter the Key ID generated from the Dashboard
      amount: price.replace(/[^0-9]/g, "") * 100,
      currency: "INR",
      name: "Webxspark",
      description: "Test Transaction",
      image: "https://webxspark.com/bundles/images/og_image.png",
      handler: function (response) {
        var payment_id = response.razorpay_payment_id;
        //send fetch request to endpoint in urlformencode method
        const paymentPushData = new URLSearchParams();
        paymentPushData.append("pay", true);
        paymentPushData.append("slot_id", selectedSlot);
        paymentPushData.append("amount", price.replace(/[^0-9]/g, ""));
        paymentPushData.append(
          "tag",
          JSON.parse(localStorage.getItem("user_id"))["tag"]
        );
        fetch("https://hackverseind-2023.webxspark.com/science/processPayment.php", {
          method: "POST",
          body: paymentPushData,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 200) {
              messageAPI.success(data.message, 5);
              setOpen(false);
              __exec();
            } else {
              messageAPI.error(data.error, 5);
            }
          });
      },
      prefill: {
        name: JSON.parse(localStorage.getItem("user_id"))["name"],
        email: JSON.parse(localStorage.getItem("user_id"))["email"],
      },
      notes: {
        address: "Webxspark Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      messageAPI.error("Something went wrong. Please try again later!");
    });
    rzp1.open();
  };
  const ENDPOINT =
    "https://hackverseind-2023.webxspark.com/science/parkingSlots.php?getList&id=ez_airport_7dad1b";
  function calculatePrice() {
    var startDateTimePicker = document.getElementsByName("startDateTimePicker");
    var endDateTimePicker = document.getElementsByName("endDateTimePicker");
    var startDate = new Date(startDateTimePicker[0].value);
    var endDate = new Date(endDateTimePicker[0].value);
    var timeDifference = Math.abs(endDate - startDate);
    var minutesDifference = Math.floor(timeDifference / 1000 / 60);

    var parkingCharge = 0;
    if (minutesDifference <= 30) {
      parkingCharge = 20;
    } else {
      parkingCharge = Math.ceil((minutesDifference - 30) / 60) * 10 + 20;
    }

    if (isNaN(parkingCharge)) {
      setPrice(0);
    } else {
      setPrice("Rs. " + parkingCharge);
    }
  }
  function __exec() {
    fetch(ENDPOINT, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setParkingData(data.context.content);
        var content = data.context.content;
        content.forEach((element) => {
          console.log(element);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (!parkingData) {
      __exec();
    }
  }, [parkingData]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!loginStatus) {
      navigate("/auth");
    }
  }, [loginStatus]);
  return (
    <>
      {!parkingData ? (
        <Skeleton />
      ) : (
        <>
          <Modal
            title={`Book Slot "${selectedSlot}"`}
            centered
            open={open}
            onOk={() => makePayment(false)}
            onCancel={() => setOpen(false)}
            width={1000}
            className=""
          >
            <form>
              <div className="my-12 mx-8">
                <div>
                  <label className="text-lg">
                    Start Date/Time
                    <span className="text-red-600 font-semibold text-xl">
                      *
                    </span>
                  </label>
                  <input
                    type="datetime-local"
                    name="startDateTimePicker"
                    onKeyUp={calculatePrice}
                    className="bg-transparent focus:outline-none border-b-2 border-[#9FA8B8] w-full text-white"
                  />
                </div>
                <div className="my-6">
                  <label className="text-lg">
                    End Date/Time:{" "}
                    <span className="text-red-600 font-semibold text-xl">
                      *
                    </span>
                  </label>
                  <input
                    type="datetime-local"
                    onKeyUp={calculatePrice}
                    name="endDateTimePicker"
                    className="bg-transparent focus:outline-none border-b-2 border-[#9FA8B8] w-full text-white"
                  />
                </div>
                <div className="text-right">{price}</div>
              </div>
            </form>
          </Modal>
          <div className="flex">
            <div className=" mx-20 my-10">
              <div className="text-[#9FA8B8]">
                Parking Locations operated near you
              </div>
              <div className="flex items-center justify-center h-full my-4">
                <div className="flex gap-2 bg-[#3F454D] px-4 py-6 rounded-2xl w-full">
                  <img
                    src={ChennaiAirportImg}
                    alt="Chennai Airport"
                    className="w-30"
                  />
                  <div>
                    <div className="text-white flex items-center justify-center h-full font-bold ">
                      Chennai Airport-Domestic
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#9FA8B8] w-[1px] mt-10"></div>
            <div className="my-10 mx-12">
              <div className="text-white text-3xl font-bold ">
                Chennai Airport-Domestic
              </div>
              <div className="flex gap-8">
                <div>
                  <div className="grid grid-cols-2 h-12 gap- my-12">
                    <Table items={parkingData.slice(0, 10)} />
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-2 h-12 gap- my-12">
                    <Table items={parkingData.slice(10, 20)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {contextMSG}
        </>
      )}
    </>
  );
};
export default Dashboard;
