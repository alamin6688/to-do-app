"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import logo from "../../../public/logo.png";
import ThemeToggle from "./ThemeToggle";
import { useSession,signOut } from "next-auth/react";

const Navbar = () => {
  const pathName = usePathname();
  const session = useSession();
  console.log(session)
  const links = (
    <div className="rounded-xl p-4 lg:p-0 dark:bg-primary dark:text-white font-semibold uppercase flex flex-col lg:flex-row gap-5">
      <Link href={`/`} className={`${pathName === "/" && "text-secondary"}`}>
        Home
      </Link>
      <Link
        href={`#`}
        className={`${pathName === "/about" && "text-secondary"}`}
      >
        About
      </Link>
      <Link
        href={`#`}
        className={`${pathName === "/contact" && "text-blue-400"}`}
      >
        Contact
      </Link>
    </div>
  );
  return (
    <div className="bg-base-100 dark:bg-[#00283A] bg-opacity-80 shadow-lg">
      <div className="navbar flex justify-between max-w-screen-2xl mx-auto ">
        <div className="">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className=" lg:hidden mr-4 scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-2 z-[1] shadow-xl w-34 rounded-box"
            >
              {links}
            </ul>
          </div>
          <div className="flex gap-[6px] items-center">
            <Image src={logo} height={35} width={35} alt="logo" />
            <Link href={`/`} className=" text-2xl font-bold">
              <cite>
                <span className="text-primary dark:text-white">
                  To<span className="text-secondary">Do</span>
                </span>
              </cite>
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="gap-5">
          <ThemeToggle />

            {session?.data?.user?.image && (
              <Image
                src={session?.data?.user?.image}
                height={50}
                width={50}
                alt="logo"
                className="rounded-full"
              />
            )}
            {!session.data ? (
              <Link
                href={`/login`}
                className="btn btn-primary text-white bg-blue-500 border-none"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => signOut()}
                className="btn btn-primary text-white border-none"
              >
                SignOut
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
