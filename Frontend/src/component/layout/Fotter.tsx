import * as React from "react";

type SocialIconProps = {
  src: string;
  alt: string;
};

const SocialIcon: React.FC<SocialIconProps> = ({ src, alt }) => (
  <img loading="lazy" src={src} alt={alt} className="shrink-0 self-stretch my-auto w-2.5 aspect-square" />
);

type PaymentIconProps = {
  src: string;
  alt: string;
};

const PaymentIcon: React.FC<PaymentIconProps> = ({ src, alt }) => (
  <img loading="lazy" src={src} alt={alt} className="shrink-0 aspect-[1.59] w-[41px]" />
);

const Fotter: React.FC = () => {
  const socialIcons = [
    { src: "./images/socialicon/Vector (4).png", alt: "Social Icon 1" },
    { src: "./images/socialicon/Vector (5).png", alt: "Social Icon 2" },
    { src: "./images/socialicon/Vector (6).png", alt: "Social Icon 3" },
    { src: "./images/socialicon/Vector (7).png", alt: "Social Icon 4" },
    { src: "./images/socialicon/Vector (8).png", alt: "Social Icon 5" },
  ];

  const paymentIcons = [
    { src: "./images/paymenticon/History_Of_The_MasterCard_Logo_Design___Evolution_-_2024-removebg-preview.png", alt: "Payment Icon 1" },
    { src: "./images/paymenticon/Digital_Wallets__Money_Management__and_More-removebg-preview.png", alt: "Payment Icon 2" },
    { src: "./images/paymenticon/Visa_Payment_Card_Logo_PNG_vector_in_SVG__PDF__AI__CDR_format-removebg-preview.png", alt: "Payment Icon 3" },
  ];

  return (
    <div className="flex flex-col items-center px-16 pt-14 pb-8 bg-neutral-200 max-md:px-5">
      <div className="flex flex-col w-full max-w-[1133px] max-md:max-w-full">
        <header className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <aside className="flex flex-col w-1/5 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-10">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a66bf4de36127421028e04ab2ba762fbe4d7d21f606d966d4c0922c9a0188b1?apiKey=9712cf44a35445b7a334ff7903f1f3a6&" alt="Company Logo" className="aspect-[1.35] w-[98px]" />
                <p className="mt-5 text-xs capitalize text-neutral-700">
                  Lorem ipsum dolor sit amet consectetur. Proin libero amet varius vivamus proin ut semper turpis. Lorem fames imperdiet est magna. At in massa eget nunc. Viverra integer in proin lectus dis vel rhoncus.
                </p>
                <div className="flex gap-3.5 justify-center items-center pr-20 mt-10 max-md:pr-5">
                  {socialIcons.map(icon => (
                    <SocialIcon key={icon.src} src={icon.src} alt={icon.alt} />
                  ))}
                </div>
              </div>
            </aside>
            <div className="flex flex-col ml-5 w-4/5 max-md:ml-0 max-md:w-full">
              <nav className="flex grow gap-5 justify-between max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                <section className="flex flex-col justify-center self-start text-xs text-neutral-700">
                  <h2 className="text-base text-black">Company</h2>
                  <p className="mt-4 capitalize">About us</p>
                  <p className="mt-5 capitalize">Careers</p>
                  <p className="mt-5 capitalize">Blog</p>
                  <p className="mt-5 capitalize">Contact us</p>
                  <p className="mt-5 capitalize">Affiliated</p>
                </section>
                <section className="flex flex-col justify-center self-start text-xs capitalize text-neutral-700">
                  <h2 className="text-base text-black">Shop</h2>
                  <p className="mt-4">New arrivals</p>
                  <p className="mt-5">Accessories</p>
                  <p className="mt-5">Men's</p>
                  <p className="mt-5">Women's</p>
                  <p className="mt-5">Shop all</p>
                </section>
                <section className="flex flex-col justify-center text-xs capitalize text-neutral-700">
                  <h2 className="text-base text-black">Help</h2>
                  <p className="mt-4">Customer service</p>
                  <p className="mt-5">My account</p>
                  <p className="mt-5">Find a store</p>
                  <p className="mt-5">Legal & privacy</p>
                  <p className="mt-5">Contact us</p>
                  <p className="mt-5">Gift card</p>
                </section>
                <section className="flex flex-col">
                  <h2 className="text-base text-black capitalize">Subscribe</h2>
                  <p className="mt-5 text-xs text-black capitalize">
                    Be the first to get the latest news about trends, promotions, & much more
                  </p>
                  <form className="justify-center items-end px-16 py-4 mt-5 text-xs text-black capitalize bg-white max-md:pl-5" action="#">
                    <label htmlFor="emailInput" className="sr-only">Your mail</label>
                    <input className="w-full px-4 py-2" type="email" id="emailInput" placeholder="Your mail" aria-label="Your mail" />
                    <button type="submit" className="bg-blue-500 text-white px-3 py-2 mt-5">Subscribe</button>
                  </form>
                  <p className="mt-11 text-xs text-black capitalize max-md:mt-10">Secure payment</p>
                  <div className="flex gap-5 justify-between pr-14 mt-2 max-md:pr-5">
                    {paymentIcons.map(icon => (
                      <PaymentIcon key={icon.src} src={icon.src} alt={icon.alt} />
                    ))}
                  </div>
                </section>
              </nav>
            </div>
          </div>
        </header>
      </div>
      <footer className="self-center mt-10 text-xs capitalize text-neutral-700 max-md:mt-10">copyright @{new Date().getFullYear()}</footer>
    </div>
  );
};

export default Fotter;