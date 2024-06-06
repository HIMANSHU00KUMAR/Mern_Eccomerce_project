import * as React from "react";

type BenefitCardProps = {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
};

const BenefitCard: React.FC<BenefitCardProps> = ({ imageSrc, altText, title, description }) => (
  <div className="flex gap-5">
    <img loading="lazy" src={imageSrc} alt={altText} className="shrink-0 w-8 aspect-square" />
    <div className="flex flex-col px-5">
      <p className="text-sm font-medium text-neutral-700">{title}</p>
      <p className="text-xs font-light text-zinc-600">{description}</p>
    </div>
  </div>
);

const Landing4: React.FC = () => {
  const benefits = [
    { imageSrc: "./images/services/servises.png", altText: "Free Delivery Icon", title: "Free Delivery", description: "Free Delivery On All Shipping" },
    { imageSrc: "./images/services/servises (1).png", altText: "Customer Support Icon", title: "Customer Support", description: "Customer Support 24 Hours" },
    { imageSrc: "./images/services/servises (2).png", altText: "Money Return Icon", title: "Money Return", description: "Money Return in 24 Hours" },
    { imageSrc: "./images/services/servises (3).png", altText: "Order Discount Icon", title: "Order Discount", description: "20% Discount on All Purchases" }
  ];

  return (
    <section className="flex gap-3 mx-20 my-10 justify-between max-md:flex-wrap">
      {benefits.map((benefit, index) => (
        <BenefitCard
          key={index}
          imageSrc={benefit.imageSrc}
          altText={benefit.altText}
          title={benefit.title}
          description={benefit.description}
        />
      ))}
    </section>
  );
};

export default Landing4;