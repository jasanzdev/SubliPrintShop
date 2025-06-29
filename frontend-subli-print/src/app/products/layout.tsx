import Navbar from "@/features/core/components/layout/navbar";
import { Suspense } from "react";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <Navbar />
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          Collections
        </div>
        <div className="order-last min-h-screen w-full md:order-none">
          {children}
        </div>
        <div className="order-none flex-none md:order-last md:w-[125px]">
          <nav>
            <h3 className="hidden text-xs text-neutral-500 dark:text-neutral-400 md:block">
              title
            </h3>
          </nav>
        </div>
      </div>
    </Suspense>
  );
}
