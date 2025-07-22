
import CouponWizard from "./components/CouponWizard";
import Header from "./components/Header";
import CouponWizardProvider from "./components/CouponWizardProvider";

export default function Home() {
  return (
    <>
      <Header/>
        <CouponWizardProvider>
      <CouponWizard />
    </CouponWizardProvider>
       <div className="h-10"></div>
    </>
  );
}
