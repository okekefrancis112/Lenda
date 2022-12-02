import React, { useState } from "react";
import styles from "../../styles/Header.module.css";
import { FaAngleDown } from "react-icons/fa";
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
    path: "/resources",
    subs: [
      {
        title: "Deposit Matic",
        path: "/",
      },
      {
        title: "Borrow Matic",
        path: "/",
      },
      {
        title: "Buy NFT",
        path: "/",
      },
      {
        title: "Sell NFT",
        path: "/",
      },
    ],
  },
  {
    title: "Yield",
    path: "/yield",
  },
  {
    title: "Community",
    path: "/community",
    subs: [
      {
        title: "Twitter",
        path: "/",
      },
      {
        title: "Telegram",
        path: "/",
      },
      {
        title: "Discord",
        path: "/",
      },
      {
        title: "Instagram",
        path: "/",
      },
      {
        title: "LinkedIn",
        path: "/",
      },
    ],
  },
  {
    title: "Products",
    path: "/products",
    subs: [
      {
        title: "Lend protocol",
        path: "/",
      },
      {
        title: "NFT Marketplace",
        path: "/",
      },
    ],
  },
  {
    title: "Auctions",
    path: "/auctions",
    subs: [
      {
        title: "Health factor alert list",
        path: "/",
      },
      {
        title: "Auction",
        path: "/",
      },
    ],
  },
];

const Header = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  console.log(isMobile);
  return (
    <>
      <div className="bg-darkNavyBlue">
        <div className="max-w-[1300px] mx-auto px-10 text-[#fff] flex justify-between items-center py-4">
          <div className="flex gap-5 items-center">
            <GiHamburgerMenu
              cursor="pointer"
              className="lg:hidden text-2xl"
              onClick={() => setIsMobile(true)}
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
                      className={`flex flex-col absolute bg-[#7e5bd6] py-2 rounded-md min-w-[170px] hidden z-10 ${styles.navDropdown}`}
                    >
                      {item.subs.map((option, i) => (
                        <p
                          key={i}
                          className="hover:bg-navyBlue px-2 cursor-pointer px-3 py-1"
                        >
                          {option.title}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </ul>

          <CustomBtn />
        </div>
      </div>

      {isMobile && <MobileNav setIsMobile={setIsMobile} />}
    </>
  );
};

export default Header;

export function MobileNav({ setIsMobile }) {
  const [isContentDisplayed, setContentDisplayed] = useState(null);
  return (
    <div
      className="bg-navyBlue fixed top-0 left-0 z-10 h-screen w-screen md:hidden text-white"
      style={{ transition: "opacity 5s ease" }}
    >
      <div className="px-10 py-4 flex items-center justify-between">
        <span className="text-3xl font-bold">
          <Link href="/">LENDA</Link>
        </span>
        <CgClose
          className="text-2xl"
          onClick={() => {
            setIsMobile(false);
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
                    <p key={i} className="text-[#ddd]">
                      {option.title}
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
