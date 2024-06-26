import React, {useState, useContext, useEffect} from "react"
import Link from "next/link"
import Image from "next/image"
import { MenuItems } from "src/data/menuItems"
import DropdownPc from "src/components/public/DropdownPc"
import { useRouter } from "next/router"

const Navbar = () => {
  const [click, setClick] = useState(false)
  const [dropdownmo, setDropdownmo] = useState(false)
  const [onMouseTitle, setOnMouseTitle] = useState("")
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const router = useRouter()

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const onMouseEnter = (title) => {
    setOnMouseTitle(title)
    setDropdownmo(true)
  }
  
  const onMouseLeave = () => {
    setDropdownmo(false)
  }
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link href="/" passHref>
          <a>
          {/* <Image
            src="/logo.png"
            height={60}
            width={190}
            alt="대한생활체육회 로고"
            className="navbar-logo-img">
            </Image> */}
            <img
              src="/logo.png"
              className="navbar-logo-img"
              alt="대생체 로고"
              style={{width:"190px"}}
            />
            </a>
        </Link>
      </div>
      <ul className="navbar-content">
        {MenuItems.map((item, index) => {
          return (
            <>
              {(item.type === "main") && ((item.child) ? (
                <>
                  <li className="nav-item"
                    key={index}
                    onMouseEnter={() => onMouseEnter(item.title)}
                    onMouseLeave={onMouseLeave}
                    // onClick={()=>router.push
                  >
                    {item.title}
                    {dropdownmo && (item.title === onMouseTitle && <DropdownPc mainTitle={onMouseTitle} onClick={closeMobileMenu}/>)}
                  </li>
                  <div className="nav-border"></div>
                </>
              ) : (
                  <>
                    <li className="nav-item" key={index}>
                      <Link href={item.path} className="nav-links" onClick={closeMobileMenu} passHref><a>{item.title}</a></Link>
                    </li>
                    <div className="nav-border"></div>
                  </>
              ))}
            </>
          )
        })}
        {/* <Link href="http://ksfaa.co.kr"><a className="nav-item logIn" target="_blank" style={{fontSize:"14px"}}>회원가입/회원증 확인</a></Link> */}
      </ul>
    </div>
  )
}
export default Navbar;