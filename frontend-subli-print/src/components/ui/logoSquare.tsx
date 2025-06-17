import Image from "next/image";
import { Suspense } from "react";

const LogoSquare = () => {
  return (
    <Suspense
      fallback={
        <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-md" />
      }
    >
      <Image
        src="/logo.png"
        alt="Logo Print Studio 16x16"
        width={40}
        height={40}
        priority
        loading="eager"
        className="rounded-md"
      />
    </Suspense>
  );
};

export default LogoSquare;
