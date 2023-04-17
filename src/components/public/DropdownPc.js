import React, { useState, useEffect } from "react";
import { MenuItems } from "src/data/menuItems";
import Link from "next/link";
import { motion } from "framer-motion"
import Image from "next/image"

function DropdownPc(props) {
  const [click, setClick] = useState(false)
  const [subMenu, setSubMenu] = useState([])
  const handleClick = () => setClick(!click)

  useEffect(() => {
    if (props.mainTitle) {
      if (props.mainTitle === "체육회소개") {
        setSubMenu(["단체소개", "대회정보", "알림마당", "자료실","협력기관"])
      }
      else if (props.mainTitle === "단체소개") {
        setSubMenu(["체육회소개", "대회정보", "알림마당", "자료실","협력기관"])
      }
      else if (props.mainTitle === "대회정보") {
        setSubMenu(["체육회소개", "단체소개", "알림마당", "자료실","협력기관"])
      }
      else if (props.mainTitle === "알림마당") {
        setSubMenu(["체육회소개", "단체소개", "대회정보", "자료실","협력기관"])
      }
      else if (props.mainTitle === "자료실") {
        setSubMenu(["체육회소개", "단체소개", "대회정보", "알림마당","협력기관"])
      }
      else if (props.mainTitle === "협력기관") {
        setSubMenu(["체육회소개", "단체소개", "대회정보", "알림마당","자료실"])
      }
    }
  },[props])

  return (
    <>
      <motion.div onClick={handleClick}  className={click ? 'dropdown-container clicked' : 'dropdown-container'}
        initial={{opacity: 0}} animate={{opacity: 1, transition:{duration:0.5}}}
      >
        <div className="dropdown-m">
          <h4>국민의 건강과 행복의 장을 여는 대한생활체육회</h4>
          <h3>{props.mainTitle}</h3>
          <Image
            src="/logo-circle-noBackground.png"
            height={130}
            width={130}
            alt="대한생활체육회 로고"
            className="dropdown-logo">
          </Image>
        </div>
        <div className="dropdown-content">
          <ul className="main-dropdown-content-container">
            <h4>{props.mainTitle}</h4>
            {MenuItems.map((item, index) => {
              return (
                <>
                  {(item.title === props.mainTitle) && ((item.type === "sub") && (
                    item.highlight === "link" ?
                      <li key={index} className="dropdown-text">
                        <Link href="http://ksfaa.co.kr" passHref>
                          <a className="dropdown-link" target='_blank' onClick={() => setClick(false)}>
                            {item.subtitle}
                          </a>
                        </Link>
                      </li>
                      : 
                    item.path.includes("notice") ?
                      <li key={index} className="dropdown-text">
                        <Link
                          className="dropdown-link"
                          href={"/notice/[subtitle]/[page]"}
                          as={`${item.path}/1`}
                          passHref
                          onClick={() => setClick(false)}
                        >
                          <a>
                          <div className="dropdown-link">
                            {item.subtitle}
                              </div>
                              </a>
                        </Link>
                      </li>
                      :
                      <li key={index} className="dropdown-text">
                        <Link
                          className="dropdown-link"
                          href={item.path}
                          passHref
                          onClick={() => setClick(false)}
                          >
                            <a>
                          <div className="dropdown-link">
                            {item.subtitle}
                              </div>
                              </a>
                        </Link>
                      </li>
                ))}
                
                </>
              )
            })}
          </ul>
          {subMenu.map((subItem, subIndex) => {
            return (
              <ul className="sub-dropdown-content-container" key={subIndex}>
                <h4>{subItem}</h4>
                {MenuItems.map((item, index) => {
                  return (
                    <>
                      {(item.title === subItem) && ((item.type === "sub") && (
                        item.highlight === "link" ?
                          <li key={index} className="dropdown-text">
                            <Link href="http://ksfaa.co.kr" passHref>
                              <a className="dropdown-link" target='_blank' onClick={() => setClick(false)}>
                                {item.subtitle}
                              </a>
                            </Link>
                          </li>
                          : 
                        item.path.includes("notice") ?
                          <li key={index} className="dropdown-text">
                            <Link
                              className="dropdown-link"
                              href={"/notice/[subtitle]/[page]"}
                              as={`${item.path}/1`}
                              passHref
                              onClick={() => setClick(false)}
                              >
                                <a>
                              <div className="dropdown-link">
                                {item.subtitle}
                                  </div>
                                  </a>
                            </Link>
                          </li>
                          :
                          <li key={index} className="dropdown-text">
                            <Link
                              className="dropdown-link"
                              href={item.path}
                              passHref
                              onClick={() => setClick(false)}
                              >
                                <a>
                              <div className="dropdown-link">
                                {item.subtitle}
                                  </div>
                                  </a>
                            </Link>
                          </li>
                    ))}
                    
                    </>
                  )
                })}
              </ul>
            )
          })}
        </div>
      </motion.div>
    </>
  )
}

export default DropdownPc;