"use client";
import Link from "next/link";
import LogoSquare from "../../ui/logoSquare";
import Search from "./search";
import { ShoppingCartIcon, User } from "lucide-react";
import React, { useEffect } from "react";
import MobileMenu from "./mobile-menu";

const NavbarOld = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    { name: "Productos", href: "/products" },
    { name: "Portafolio", href: "/" },
    { name: "Cotizar", href: "/" },
  ];

  return (
    <nav
      className={`sticky top-0 w-full transition-all duration-200 bg-transparent items-center z-50 ${
        isScrolled
          ? "bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/80 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="block flex-none md:hidden">
        <MobileMenu />
      </div>
      <div className="hidden md:grid grid-col-6 grid-rows-1 p-4">
        <div className="flex col-span-1 items-center">
          <Link href="/" className="flex items-center group">
            <LogoSquare />
            <span
              className="text-xl text-foreground ml-2 font-semibold hidden md:block hover:animate-pulse transition-all duration-100 
            hover:text-indigo-300 ease-in-out relative overflow-hidden"
            >
              Jasanz Print Studio
            </span>
          </Link>
          <ul className="flex space-x-3 ml-6">
            {items.map((item) => (
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
        </div>
        <div className="flex col-span-2 col-start-3 items-center">
          <Search />
        </div>
        <div className="flex col-start-6 items-center justify-end space-x-2 mr-4">
          <Link
            href="/auth/signin"
            className="text-white transition-colors hover:text-indigo-300"
          >
            <User className="h-6 w-6" />
          </Link>
          <ShoppingCartIcon className="h-6 w-6 ml-2" />
        </div>
      </div>
    </nav>
  );
};

export default NavbarOld;
