import React, { useState } from "react";
import styles from "../../styles/Header.module.css";
import { FaAngleDown } from "react-icons/fa";
import { IoIosContact } from "react-icons//io";
import Link from "next/link";
import { CustomBtn } from "../customBtn/customBtn";
import { CgClose } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";

const navItems = [
  {
    title: "Home",
    path: "/",
  },

  {
    title: "Liquidity",
    path: "/",
    subs: [
      {
        title: "mMatic Faucet",
        path: "/faucet",
      },
      {
        title: "Deposit Matic",
        path: "/deposit",
      },
      {
        title: "Borrow Matic",
        path: "/borrow",
      },
      {
        title: "Buy NFT",
        path: "/marketplace",
      },
      {
        title: "Sell NFT",
        path: "/marketplace",
      },
    ],
  },
  {
    title: "Yield",
    path: "/yield",
  },
  // {
  //   title: "Community",
  //   path: "/",
  //   subs: [
  //     {
  //       title: "Twitter",
  //       path: "/",
  //     },
  //     {
  //       title: "Telegram",
  //       path: "/",
  //     },
  //     {
  //       title: "Discord",
  //       path: "/",
  //     },
  //     {
  //       title: "Instagram",
  //       path: "/",
  //     },
  //     {
  //       title: "LinkedIn",
  //       path: "/",
  //     },
  //   ],
  // },
  {
    title: "Products",
    path: "/",
    subs: [
      {
        title: "Lend pool",
        path: "/borrow",
      },
      {
        title: "NFT Marketplace",
        path: "/marketplace",
      },
    ],
  },
  {
    title: "Auctions",
    path: "/",
    subs: [
      {
        title: "Health factor alert list",
        path: "/alert-list",
      },
      {
        title: "Auction",
        path: "/auction",
      },
    ],
  },
];

const Header = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  const lockScroll = React.useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  console.log(isMobile);
  return (
    <>
      <div className="bg-darkNavyBlue">
        <div className="max-w-[1300px] mx-auto px-5 md:px-10 text-[#fff] flex justify-between items-center py-4">
          <div className="flex gap-5 items-center">
            <GiHamburgerMenu
              cursor="pointer"
              className="lg:hidden text-2xl"
              onClick={() => {
                setIsMobile(true);
                lockScroll();
              }}
            />

            <span className="text-3xl font-bold">
              <Link href="/">LENDA</Link>
            </span>
          </div>

          <ul className="hidden lg:flex gap-5 items-center">
            {navItems.map((item, i) => {
              return (
                <div className={`relative ${styles.navContainer}`} key={i}>
                  <li className="cursor-pointer flex items-center gap-1 mb-2">
                    <Link href={`${item.path}`}>
                      <span>{item.title}</span>
                    </Link>
                    {item.subs && <FaAngleDown />}
                  </li>

                  {item.subs && (
                    <div
                      className={`flex flex-col absolute bg-[#7e5bd6]  rounded-md min-w-[170px] hidden z-10 ${styles.navDropdown}`}
                    >
                      {item.subs.map((option, i) => (
                        <p
                          key={i}
                          className="hover:bg-navyBlue px-2 cursor-pointer px-3 py-1"
                        >
                          <Link href={option.path}>
                            <span> {option.title}</span>
                          </Link>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </ul>

          <div className="flex gap-4 items-center">
            <Link href="/dashboard">
              {/* <IoMdContact fontSize={25} /> */}
              <IoIosContact fontSize={30} />
            </Link>

            <CustomBtn />
          </div>
        </div>
      </div>

      {isMobile && <MobileNav setIsMobile={setIsMobile} />}
    </>
  );
};

export default Header;

export function MobileNav({ setIsMobile }) {
  const [isContentDisplayed, setContentDisplayed] = useState(null);
  const unlockScroll = React.useCallback(() => {
    document.body.style.overflow = "";
  }, []);

  return (
    <div
      className="bg-navyBlue fixed top-0 left-0 z-10 h-screen w-screen md:hidden text-white"
      style={{ transition: "opacity 5s ease" }}
    >
      <div className="px-5 md:px-10 py-4 flex items-center justify-between">
        <span className="text-3xl font-bold">
          <Link href="/">LENDA</Link>
        </span>
        <CgClose
          className="text-2xl"
          onClick={() => {
            setIsMobile(false);
            unlockScroll();
            // unlockScroll();
          }}
        />
      </div>

      <ul className="flex flex-col items-center justify-center">
        {navItems.map((item, i) => {
          return (
            <div key={i}>
              <li className="cursor-pointer flex items-center gap-1 mb-2">
                {/* <Link href={`${item.path}`}> */}
                <span>{item.title}</span>
                {/* </Link> */}
                {item.subs && (
                  <FaAngleDown onClick={() => setContentDisplayed(i)} />
                )}
              </li>

              {item.subs && isContentDisplayed === i && (
                <div
                  className={`${
                    isContentDisplayed ? "flex" : "hidden"
                  } flex-col items-center`}
                >
                  {item.subs.map((option, i) => (
                    <p
                      key={i}
                      className="text-[#ddd]"
                      onClick={() => setIsMobile(false)}
                    >
                      <Link href={`${option.path}`}>{option.title}</Link>
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}
