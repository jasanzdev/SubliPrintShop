import Image from "next/image";
import Logo from "../../../public/logo.png";

const LogoSquare = () => {
  return (
    <div>
      <Image src={Logo} alt="Logo Print Studio 16x16" width={40} height={40} />
    </div>
  );
};

export default LogoSquare;
