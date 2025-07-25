"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { QRCodeCanvas } from "qrcode.react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Spinner from "./Spinner";

type FormData = {
  name: string;
  email: string;
  otp?: string;
  mobile?: string;
};

export default function CouponWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [otpError, setOtpError] = useState("");
  const [qrToken, setQrToken] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [existingCoupon, setExistingCoupon] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<FormData>();
  const { executeRecaptcha } = useGoogleReCaptcha();

  async function checkRateLimit(email: string) {
    setLoading(true);
    const res = await fetch("/api/rate-limit", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setLoading(false);

    // Show old coupon if exists and not redeemed
    if (!data.allowed && data.reason === "active_coupon" && data.coupon) {
      setExistingCoupon(data.coupon);
      setQrToken(data.coupon);
      setStep(4);
      return false;
    }
    // Still block if under 7-day lock (but no active coupon)
    if (!data.allowed && data.reason === "already_claimed") {
      setRateLimited(true);
      return false;
    }
    setRateLimited(false);
    return true;
  }

  async function onStep1(data: FormData) {
    if (!(await checkRateLimit(data.email))) return;
    setLoading(true);
    setFormData({ name: data.name, email: data.email });
    await fetch("/api/otp", {
      method: "POST",
      body: JSON.stringify({ email: data.email }),
    });
    setStep(2);
    setLoading(false);
  }

  async function onStep2(data: FormData) {
    setLoading(true);
    const res = await fetch("/api/otp", {
      method: "PUT",
      body: JSON.stringify({ email: formData.email, otp: data.otp }),
    });
    const json = await res.json();
    setLoading(false);
    if (json.valid) {
      setStep(3);
      setFormData({ ...formData, otp: data.otp });
    } else {
      setOtpError("Invalid OTP. Try again.");
    }
  }

  async function onStep3(data: FormData) {
    setFormData({ ...formData, mobile: data.mobile });
    setLoading(true);

    // v3 recaptcha: Get a token for action "coupon_submit"
    if (!executeRecaptcha) {
      setLoading(false);
      alert("reCAPTCHA not yet loaded, please try again.");
      return;
    }
    const token = await executeRecaptcha("coupon_submit");
    if (!token) {
      setLoading(false);
      alert("reCAPTCHA verification failed. Try again.");
      return;
    }

    // Verify token on backend (should check the score there)
    const res = await fetch("/api/verify-captcha", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    if (!json.success || json.score < 0.5) {
      setLoading(false);
      alert("Suspicious activity detected. Please try again later.");
      return;
    }

    // Generate QR JWT
    const resp = await fetch("/api/jwt", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        mobile: data.mobile,
      }),
    });
    const qrJson = await resp.json();
    setQrToken(qrJson.token);
    setStep(4);
    setLoading(false);
  }

  // Style helpers
  const inputClass =
    "mb-2 block w-full rounded-lg border border-gray-200 py-2 px-4 bg-white focus:outline-none focus:border-red-500";
  const buttonClass = `w-full py-2 rounded-lg font-bold text-lg shadow transition-all ${loading ? "opacity-60 cursor-not-allowed" : ""}`;
  const redBtn = buttonClass + ` bg-[#D72638] text-white hover:bg-[#ad1927]`;
  const yellowBox =
    "bg-[#FFD600] border-4 border-[#D72638] rounded-2xl shadow-lg p-8";

  return (
    <div className="flex flex-col items-center mt-10">
      <div
        className={yellowBox}
        style={{
          maxWidth: 410,
          width: "100%",
        }}
      >
        <div className="text-center mb-6">
          <span
            className="inline-block text-2xl font-extrabold tracking-wider"
            style={{ color: "#D72638" }}
          >
            🎟️ GolGappaKing Coupon
          </span>
        </div>

        {rateLimited && (
          <div className="text-red-600 mb-4 font-semibold text-center">
            You have already generated a coupon this week. Please try again next week!
          </div>
        )}

        {step === 1 && !rateLimited && (
          <form onSubmit={handleSubmit(onStep1)}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#D72638" }}>
              Step 1: Enter your details
            </h2>
            <input
              {...register("name", { required: true })}
              placeholder="Name"
              className={inputClass}
              style={{ borderColor: "#D72638" }}
              disabled={loading}
            />
            <input
              {...register("email", { required: true })}
              placeholder="Email"
              type="email"
              className={inputClass}
              style={{ borderColor: "#D72638" }}
              disabled={loading}
            />
            <button type="submit" className={redBtn} disabled={loading}>
              {loading ? (
                <span className="opacity-100"><Spinner /></span>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onStep2)}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#D72638" }}>
              Step 2: Verify OTP
            </h2>
            <input
              {...register("otp", { required: true })}
              placeholder="Enter OTP"
              className={inputClass}
              style={{ borderColor: "#D72638" }}
              disabled={loading}
            />
            {otpError && <div className="text-red-500">{otpError}</div>}
            <button type="submit" className={redBtn} disabled={loading}>
              {loading ? (
                <span className="opacity-100"><Spinner /></span>
              ) : (
                "Verify"
              )}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit(onStep3)}>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#D72638" }}>
              Step 3: Enter mobile number
            </h2>
            <input
              {...register("mobile", { required: true })}
              placeholder="Mobile Number"
              type="tel"
              className={inputClass}
              style={{ borderColor: "#D72638" }}
              disabled={loading}
            />
            <button type="submit" className={redBtn} disabled={loading}>
              {loading ? (
                <span className="opacity-100"><Spinner /></span>
              ) : (
                "Continue"
              )}
            </button>
          </form>
        )}

        {step === 4 && (
          <div className="text-center">
            <h2 className="text-lg font-bold mb-4" style={{ color: "#D72638" }}>
              Step 4: Your Coupon QR
            </h2>
            {qrToken ? (
              <div className="flex flex-col items-center gap-4">
                <span className="font-semibold text-[#D72638] text-base">
                  Please <b>take a screenshot</b> of this QR and show it at the
                  Cart Counter.
                  <br />
                  (यह QR स्क्रीनशॉट ले लें और काउंटर पर दिखाएँ)
                </span>
                <div className="bg-white p-4 rounded-xl border-2 border-[#FFD600] shadow-md">
                  <QRCodeCanvas value={qrToken} size={220} />
                </div>
                {existingCoupon && (
                  <div className="text-xs text-gray-600 mt-2">
                    (This coupon is still valid and has not been redeemed yet.)
                  </div>
                )}
              </div>
            ) : (
              <Spinner size={48} color="#FFD600" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
