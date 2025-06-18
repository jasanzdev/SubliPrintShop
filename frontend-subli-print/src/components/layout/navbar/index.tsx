import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search from "./search";
import LogoSquare from "@/components/ui/logoSquare";
import CartModal from "@/components/ui/cartModal";
import { User } from "lucide-react";

export default async function Navbar() {
  const menu = [
    { name: "Productos", href: "/products" },
    { name: "Portafolio", href: "/" },
    { name: "Cotizar", href: "/" },
  ];
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full md:w-1/3  items-center">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              PrintShop
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-1 text-sm md:flex md:items-center">
              {menu.map((item) => (
                <li key={item.name} className="inline-block items-center">
                  <Link
                    href={item.href}
                    className="text-[1rem] hover:text-accent transition-all ease-in-out group"
                  >
                    <span className="relative text-foreground overflow-hidden">
                      {item.name}
                      <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex w-full md:w-1/2 pl-4">
          <Search />
        </div>
        <div className="flex justify-end md:w-1/6">
          <Suspense
            fallback={
              <div className="w-6 h-6 animate-pulse bg-gray-200 rounded-full"></div>
            }
          >
            <Link
              href="/auth/signin"
              className="text-white transition-colors hover:text-indigo-300"
            >
              <User className="h-6 w-6" />
            </Link>
            <CartModal />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
