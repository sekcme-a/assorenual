import React, { useEffect, useState } from "react";
import { MenuItems } from "src/data/menuItems"
import Image from "next/image"
import Link from "next/link";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const Navbar = () => {
  const [click, setClick] = useState(false)
  const [titleClick, setTitleClick] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState("")


  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const onTitleClick = (title) => {
    if (titleClick && selectedTitle===title) {
      setTitleClick(false)
    } else if (titleClick && selectedTitle!==title) {
      setTitleClick(true)
      setSelectedTitle(title)
    } else if (titleClick === false && selectedTitle !== title) {
      setSelectedTitle(title)
      setTitleClick(true)
    } else if (titleClick === false) {
      setTitleClick(true)
    }
  }

  useEffect(() => {
    setClick(false)
  },[])

  return (
    <div className="navbar-mobile">
      <div className="navbar-mobile-logo">
        <Link href="/" passHref>
          <a>
          <Image
            src="/logo.png"
            height={50}
            width={150}
            alt="대한생활체육회 로고"
            className="navbar-logo-img"
            />
            </a>
        </Link>
      </div>
      <div className="mobile-menu-icon" onClick={handleClick}>
        <Link href="http://ksfaa.co.kr"><a className="mobile-login" target="_blank">회원가입 및 회원증 확인</a></Link>
        {click ? <CloseIcon />:<MenuIcon />}
      </div>
      <ul className={click ? 'mobile-nav-menu active' : 'mobile-nav-menu'}>
        {MenuItems.map((item, index) => {
          return (
            <>
              {(item.type === "main") ? (
                <>
                  <li key={index} onClick={()=>onTitleClick(item.title)} className={titleClick ? (item.title === selectedTitle ? "mobile-nav-title mobile-nav-title-selected":"mobile-nav-title"):"mobile-nav-title"}>
                    {`${item.title}`}{titleClick ? (item.title === selectedTitle ? <ArrowDropUpIcon className="mobile-arrowIcon" /> : <ArrowDropDownIcon className="mobile-arrowIcon" />) : <ArrowDropDownIcon className="mobile-arrowIcon" />}
                  </li>
                </>
              ) : (
                <>
                    {titleClick && (selectedTitle === item.title && (item.type === "sub" && (
                      item.highlight === "link" ?
                      
                        <li key={index} className="mobile-nav-item">
                          <Link href="http://ksfaa.co.kr" passHref>
                            <a target='_blank' onClick={closeMobileMenu}>
                              {item.subtitle}
                            </a>
                          </Link>
                        </li>
                      
                      : 
                      item.path.includes("notice") ?
                        <Link href={"/notice/[subtitle]/[page]"} as={`${item.path}/1`} passHref>
                          <a>
                          <li key={index} className="mobile-nav-item" onClick={closeMobileMenu}>
                            {item.subtitle}
                              </li>
                              </a>
                        </Link>
                        :
                        <Link href={item.path} passHref>
                          <a>
                          <li key={index} className="mobile-nav-item" onClick={closeMobileMenu}>
                            {item.subtitle}
                              </li>
                              </a>
                        </Link>
                    )
                  ))}
                </>
              )
              }
            </>
          )
        })}
      </ul>
    </div>
  );
};

export default Navbar;
