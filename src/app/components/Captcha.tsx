"use client";
import ReCAPTCHA from "react-google-recaptcha";
import { forwardRef, useImperativeHandle, useRef } from "react";

// Fix: allow null in the return type for executeAsync
export type RecaptchaHandle = {
  execute: () => void;
  reset: () => void;
  executeAsync: () => Promise<string | null>;
  getValue: () => string | null;
  getWidgetId: () => number | null;
};

type CaptchaProps = {
  onSuccess: (token: string | null) => void;
};

const Captcha = forwardRef<RecaptchaHandle, CaptchaProps>(({ onSuccess }, ref) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useImperativeHandle(ref, () => ({
    execute: () => recaptchaRef.current?.execute(),
    reset: () => recaptchaRef.current?.reset(),
    // returns Promise<string | null>
    executeAsync: () =>
      recaptchaRef.current?.executeAsync?.() ?? Promise.resolve(null),
    getValue: () => recaptchaRef.current?.getValue() || null,
    getWidgetId: () => recaptchaRef.current?.getWidgetId() ?? null,
  }));

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
