// src/app/components/Captcha.tsx
"use client";
import ReCAPTCHA from "react-google-recaptcha";
import { forwardRef, useImperativeHandle, useRef } from "react";

type CaptchaProps = {
  onSuccess: (token: string | null) => void;
};

// Forward ref so parent can call execute()
const Captcha = forwardRef<ReCAPTCHA, CaptchaProps>(({ onSuccess }, ref) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useImperativeHandle(ref, () => ({
    execute: () => {
      recaptchaRef.current?.execute();
    },
  }) as any);

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      size="invisible"
      onChange={onSuccess}
    />
  );
});

Captcha.displayName = "Captcha";
export default Captcha;
