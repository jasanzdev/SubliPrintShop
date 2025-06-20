import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

interface CardProps {
  icon: JSX.Element;
  name: string;
  desc: string;
  services: string[];
  button: {
    text: string;
    link: string;
  };
}

const CardServices = (props: CardProps) => {
  const { icon, name, desc, services, button } = props;
  return (
    <div className="rounded-lg hover:border-2 hover:border-border transition-color hover:shadow-2xl">
      <div className="flex-col container bg-muted/30 p-4 rounded-lg shadow-lg border-border">
        <div className="text-center mb-4">
          <div className="items-center justify-center">{icon && icon}</div>
          <h2 className=" text-2xl text-foreground font-semibold">{name}</h2>
          <p className="text-lg text-foreground">{desc}</p>
        </div>
        {services && (
          <ul className="flex flex-col space-y-3">
            {services.map((service, index) => (
              <li key={index} className="flex items-center ml-5 ">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-foreground">{service}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center justify-center">
          {button && (
            <Link href={button.link} className="mt-4 px-4 py-2 btn btn-primary">
              {button.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardServices;
