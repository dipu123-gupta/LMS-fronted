import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import React, { useEffect } from "react";
import { BiRupee } from "react-icons/bi";
import { useNavigate } from "react-router-dom"; // ✅ react-router-dom सही है
import {
  getRazorpayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice.js";
import toast from "react-hot-toast";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔑 Razorpay public key (backend se)
  const razorpayKey = useSelector((state) => state?.razorpay?.key);

  // 🆔 Subscription ID (razorpay subscription create hone ke baad)
  const subscription_id = useSelector(
    (state) => state?.razorpay?.subscription_id,
  );

  // 👤 Logged-in user data (auth slice se aata hai)
  const userData = useSelector((state) => state?.auth?.data);

  /* =========================
     HANDLE SUBSCRIPTION
  ========================== */
  const handleSubscription = async (e) => {
    e.preventDefault();

    // ❌ Agar key ya subscription id hi nahi mili
    if (!razorpayKey || !subscription_id) {
      toast.error("Payment initialization failed");
      return;
    }

    // 🔧 Razorpay options
    const options = {
      key: razorpayKey, // public key
      subscription_id: subscription_id, // subscription id
      name: "Coursify Pvt Ltd",
      description: "Course Subscription",

      // 🎨 Razorpay theme
      theme: {
        color: "#f37254",
      },

      // 👤 Auto-fill user info
      prefill: {
        email: userData?.email,
        name: userData?.name,
      },

      // ✅ Payment success handler
      handler: async (response) => {
        /*
          response me Razorpay ye deta hai:
          - razorpay_payment_id
          - razorpay_subscription_id
          - razorpay_signature
        */

        const paymentDetails = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_subscription_id: response.razorpay_subscription_id,
          razorpay_signature: response.razorpay_signature,
        };

        // 🔐 Backend me payment verify
        const res = await dispatch(verifyUserPayment(paymentDetails));

        // ✅ Verification success / fail
        if (res?.payload?.success) {
          toast.success("Payment verified successfully");
          navigate("/checkout/success");
        } else {
          toast.error("Payment verification failed");
          navigate("/checkout/fail");
        }
      },
    };

    // 🚀 Razorpay popup open
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  /* =========================
     INITIAL LOAD
     - Razorpay key lao
     - Subscription create karo
  ========================== */
  const load = async () => {
    await dispatch(getRazorpayId()); // 🔑 key
    await dispatch(purchaseCourseBundle()); // 🆔 subscription
  };

  // ⏳ Page load par call hoga
  useEffect(() => {
    load();
  }, []);

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-white"
      >
        <div
          className="w-80 h-[27rem] flex flex-col justify-between rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-xl hover:shadow-yellow-500/20 transition-all duration-300"
        >
          {/* HEADER */}
          <h1
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-center py-4 text-2xl font-extrabold tracking-wide"
          >
            Subscription Bundle
          </h1>

          {/* CONTENT */}
          <div className="px-5 py-4 space-y-4 text-center">
            <p className="text-[15px] leading-relaxed text-gray-200">
              This purchase will allow you to access all available courses on
              our platform for{" "}
              <span className="text-yellow-400 font-bold">1 Year</span>.
              <br />
              All existing & newly launched courses included.
            </p>

            <p className="flex items-center justify-center gap-1 text-3xl font-extrabold text-yellow-400">
              <BiRupee />
              <span>999</span>
              <span className="text-sm text-gray-300 font-medium">/year</span>
            </p>

            <div className="text-sm text-gray-400 space-y-1">
              <p>✔ 100% refund on cancellation</p>
              <p>* Terms & conditions apply</p>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 text-xl font-bold bg-yellow-400 text-black hover:bg-yellow-500 active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            Buy Now 🚀
          </button>
        </div>
      </form>
    </HomeLayout>
  );
};

export default Checkout;
