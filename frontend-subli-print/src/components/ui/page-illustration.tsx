import Image from "next/image";

export default function PageIllustration({
  multiple = false,
}: {
  multiple?: boolean;
}) {
  return (
    <>
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/4"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src="/page-illustration.svg"
          width={846}
          height={594}
          alt="Page illustration"
          priority
        />
      </div>
      {multiple && (
        <>
          <div
            className="pointer-events-none absolute left-1/2 top-[400px] -z-10 -mt-20 -translate-x-full opacity-50"
            aria-hidden="true"
          >
            <Image
              className="max-w-none"
              src="/blurred-shape-gray.svg"
              width={760}
              height={668}
              alt="Blurred shape"
              priority={false}
              loading="lazy"
            />
          </div>
          <div
            className="pointer-events-none absolute left-1/2 top-[440px] -z-10 -translate-x-1/3"
            aria-hidden="true"
          >
            <Image
              className="max-w-none"
              src="/blurred-shape.svg"
              width={760}
              height={668}
              alt="Blurred shape"
              priority={false}
              loading="lazy"
            />
          </div>
        </>
      )}
    </>
  );
}
