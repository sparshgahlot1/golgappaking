"use client";
import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const YELLOW = "#FFD600";
const RED = "#D72638";
const WHITE = "#FFF";

interface CouponInfo {
  name?: string;
  email?: string;
  mobile?: string;
  ts?: number;
}

export default function CartManagerPage() {
  const [message, setMessage] = useState("");
  const [couponInfo, setCouponInfo] = useState<CouponInfo | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;
    if (typeof window !== "undefined" && scannerRef.current) {
      scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: 250 },
        false
      );
      scanner.render(
        async (decodedText: string) => {
          setMessage("Processing...");
          const res = await fetch("/api/redeem", {
            method: "POST",
            body: JSON.stringify({ token: decodedText }),
            headers: { "Content-Type": "application/json" },
          });
          const json = await res.json();
          setMessage(json.message);
          setCouponInfo(json.details || null);
          setTimeout(() => {
            setCouponInfo(null);
            setMessage("");
          }, 2000);
          scanner?.clear();
        },
        () => {
          // No-op: you can show an error if you want!
        }
      );
    }
    return () => {
      scanner?.clear().catch(() => {});
    };
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: YELLOW,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 0"
    }}>
      <div
        style={{
          background: WHITE,
          borderRadius: 28,
          boxShadow: `0 4px 32px 0 rgba(215,38,56,0.13)`,
          border: `3px solid ${RED}`,
          maxWidth: 420,
          width: "100%",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h2
          className="mb-6 font-extrabold tracking-wider"
          style={{
            fontSize: 28,
            color: RED,
            textShadow: "0 2px 8px rgba(255, 214, 0, 0.2)",
            letterSpacing: 1,
            marginBottom: 28,
          }}
        >
          Cart Manager QR Scanner
        </h2>
        <div className="mb-6 w-full flex justify-center">
          <div
            id="qr-reader"
            ref={scannerRef}
            style={{
              width: 320,
              borderRadius: 18,
              overflow: "hidden",
              border: `2px solid ${YELLOW}`,
              boxShadow: `0 1px 12px 0 ${RED}33`,
            }}
          />
        </div>
        {message && (
          <div
            className={`rounded-lg px-3 py-2 mb-2 font-semibold text-center`}
            style={{
              background:
                message.includes("valid")
                  ? "#DAF7A6"
                  : message.includes("already")
                  ? "#FFEF99"
                  : "#FFCDD2",
              color:
                message.includes("valid")
                  ? "#249900"
                  : message.includes("already")
                  ? "#B68400"
                  : RED,
              border: `1.5px solid ${
                message.includes("valid")
                  ? "#249900"
                  : message.includes("already")
                  ? "#B68400"
                  : RED
              }`,
              fontSize: 17,
              marginBottom: 8,
            }}
          >
            {message}
          </div>
        )}
        {couponInfo && (
          <div
            className="w-full mt-2 p-4 rounded-xl text-base"
            style={{
              background: "#FAFAFA",
              border: `1.5px solid ${YELLOW}`,
              color: "#333",
              fontSize: 15,
              letterSpacing: 0.1,
            }}
          >
            <div>
              <b style={{ color: RED }}>Name:</b> {couponInfo.name}
            </div>
            <div>
              <b style={{ color: RED }}>Email:</b> {couponInfo.email}
            </div>
            <div>
              <b style={{ color: RED }}>Mobile:</b> {couponInfo.mobile}
            </div>
            <div>
              <b style={{ color: RED }}>Generated:</b>{" "}
              {couponInfo.ts ? new Date(couponInfo.ts).toLocaleString() : ""}
            </div>
          </div>
        )}
        <button
          onClick={() => {
            setCouponInfo(null);
            setMessage("");
            window.location.reload();
          }}
          style={{
            marginTop: 28,
            background: RED,
            color: WHITE,
            fontWeight: 700,
            fontSize: 18,
            borderRadius: 18,
            padding: "12px 0",
            width: "100%",
            letterSpacing: 1,
            boxShadow: `0 2px 16px 0 ${RED}30`,
            transition: "all 0.18s",
            border: "none",
            cursor: "pointer",
          }}
        >
          Scan Next Coupon
        </button>
      </div>
    </div>
  );
}
