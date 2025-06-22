
import ParallaxGallery from "../components/ParallaxGallery";

const images = [
  "/aboutus1.jpeg",
  "/aboutus2.jpeg",
  "/aboutus3.jpeg",
];

const images1 = [
  "/header1.jpeg",
  "/header2.jpeg",
  "/header3.jpeg",
];

const images2 = [
  "/is1.jpeg",
  "/is2.jpeg",
  "/is3.jpeg",
];

const images3 = [
  "/is4.jpeg",
  "/is5.jpeg",
  "/is6.jpeg",
];

const images4 = [
  "/is7.jpeg",
  "/outlets-multi.jpeg",
  "/WhatsApp Image 2025-03-29 at 4.20.46 PM (1).jpeg",
];


export default function Page() {
  return (
    <div>
        <div>
             {/* Heading */}
      <h2 className="font-extrabold pt-4 text-4xl text-red-500 md:text-6xl text-center tracking-tight text-black font-['Helvetica']">
        Picture Gallery
      </h2>
        </div>
      <ParallaxGallery images={images1} />
      <ParallaxGallery images={images} />
      <ParallaxGallery images={images2} />
      <ParallaxGallery images={images3} />
      <ParallaxGallery images={images} />
      <div className="h-screen"></div>
    </div>
  );
}
