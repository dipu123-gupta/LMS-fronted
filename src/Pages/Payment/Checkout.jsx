import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import toast from "react-hot-toast";

import HomeLayout from "../../Layouts/HomeLayout.jsx";

// Razorpay actions
import {
  getRazorpayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice.js";

// Refresh user after payment
import { getUserData } from "../../Redux/Slices/AuthSlice.js";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  // 🔑 courseId jo CourseDescription se aaya
  const courseId = state?.courseId;

  // Razorpay state
  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscriptionId = useSelector(
    (state) => state?.razorpay?.subscription_id
  );

  // Logged-in user
  const user = useSelector((state) => state?.auth?.data);

  /* =========================
     INITIAL LOAD
     - Razorpay key
     - Create subscription (course-wise)
  ========================== */
  useEffect(() => {
    if (!courseId) {
      toast.error("Invalid course selection");
      navigate("/");
      return;
    }

    (async () => {
      await dispatch(getRazorpayId());
      await dispatch(purchaseCourseBundle({ courseId }));
    })();
  }, [courseId, dispatch, navigate]);

  /* =========================
     HANDLE PAYMENT
  ========================== */
  const handleSubscription = async (e) => {
    e.preventDefault();

    if (!razorpayKey || !subscriptionId) {
      toast.error("Payment initialization failed");
      return;
    }

    const options = {
      key: razorpayKey,
      subscription_id: subscriptionId,
      name: "Coursify Pvt Ltd",
      description: "Course Purchase",

      theme: {
        color: "#facc15",
      },

      prefill: {
        name: user?.name,
        email: user?.email,
      },

      handler: async (response) => {
        /*
          Razorpay returns:
          - razorpay_payment_id
          - razorpay_subscription_id
          - razorpay_signature
        */

        const paymentDetails = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_subscription_id: response.razorpay_subscription_id,
          razorpay_signature: response.razorpay_signature,
          courseId, // 🔥 IMPORTANT
        };

        const res = await dispatch(verifyUserPayment(paymentDetails));

        if (res?.payload?.success) {
          toast.success("Payment successful! Activating course...");

          // 🔥 Webhook delay handle
          setTimeout(async () => {
            await dispatch(getUserData()); // refresh user
            navigate("/checkout/success", {
              state: { courseId },
            });
          }, 100);
        } else {
          toast.error("Payment verification failed");
        }
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-white"
      >
        <div className="w-80 h-[27rem] flex flex-col justify-between rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">
          
          {/* HEADER */}
          <h1 className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-center py-4 text-2xl font-extrabold text-black">
            Course Checkout
          </h1>

          {/* CONTENT */}
          <div className="px-5 py-4 space-y-4 text-center">
            <p className="text-sm text-gray-200">
              You are purchasing access to this course.
              <br />
              <span className="text-yellow-400 font-semibold">
                Lifetime access included
              </span>
            </p>

            <p className="flex items-center justify-center gap-1 text-3xl font-extrabold text-yellow-400">
              <BiRupee />
              <span>999</span>
            </p>

            <div className="text-xs text-gray-400">
              <p>✔ One-time payment</p>
              <p>✔ Full course access</p>
              <p>✔ No auto-renewal</p>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 text-xl font-bold bg-yellow-400 text-black hover:bg-yellow-500 transition-all"
          >
            Pay Now 🚀
          </button>
        </div>
      </form>
    </HomeLayout>
  );
};

export default Checkout;
