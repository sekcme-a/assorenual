import React, { useState } from "react";
import { adminMenuItems } from "src/data/adminMenuItems"
import style from "admin/styles/adminNavbar.module.css"
import Link from "next/link"
import { auth } from "src/firebase/firebase";
import Router ,{useRouter} from "next/router";
import ModeIcon from '@mui/icons-material/Mode';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import LogoutIcon from '@mui/icons-material/Logout';

const AdminNavbar = (props) => {
  const [clickedMain, setClickedMain] = useState("")

  const onLogoutClick = () => {
    auth.signOut()
    Router.push("/")
  }

  const onMainItemClick = (title) => {
    if (title!==clickedMain)
      setClickedMain(title)
    else
      setClickedMain("")
  }

  const getIcon = (icon) => {
    if(icon==="ModeIcon")
      return <ModeIcon className={style.icon} />
    if (icon === "AdminPanelSettingsIcon")
      return <AdminPanelSettingsIcon className={style.icon}/>
  }

  const router = useRouter()
  const onItemClick = (url) => {
    if(url===window.location.pathname)
      router.reload(url)
    else 
      router.push(url)
  }
  return (
    <div className={style.container}>
      <div className={style.logo}>
        대한생활체육회
      </div>
      <ul className={style.itemContainer}>
        {props.userrole==="admin" && adminMenuItems.map((item, index) => {
          return (
            <>
              {(item.type === "main" && item.child === true) &&
                <li className={style.mainItem} onClick={() => onMainItemClick(item.title)} key={index}>
                  {getIcon(item.icon)}<p>{item.title}</p>{item.title===clickedMain ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                </li>
              }
              {(item.type === "main" && item.child===false)&&
                <Link passHref href={`/admin${item.path}`} >
                  <a>
                    <li className={style.mainItem} onClick={() => onMainItemClick(item.title)} key={index}>
                      {getIcon(item.icon)}<p>{item.title}</p>
                    </li>
                  </a>
                </Link>
              }
              {(item.type === "sub" && item.title===clickedMain) &&
                <li className={style.subItem} key={index} onClick={()=>onItemClick(`/admin${item.path}`)}>
                  {item.subtitle}
                </li>
              }
            </>
          )
        })}
        {props.userrole==="author" && adminMenuItems.map((item, index) => {
          return (
            <>
              {(item.type === "main" && item.child === true && item.level==="author") &&
                <li className={style.mainItem} onClick={() => onMainItemClick(item.title)} key={index}>
                  {getIcon(item.icon)}<p>{item.title}</p>{item.title===clickedMain ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                </li>
              }
              {(item.type === "main" && item.child===false && item.level==="author")&&
                <Link passHref href={`/admin${item.path}`} >
                  <a>
                  <li className={style.mainItem} onClick={() => onMainItemClick(item.title)} key={index}>
                    {getIcon(item.icon)}<p>{item.title}</p>
                    </li>
                    </a>
                </Link>
              }
              {(item.type === "sub" && item.title===clickedMain && item.level==="author") &&
                <Link passHref href={`/admin${item.path}`} >
                  <a><li className={style.subItem} key={index} >
                    {item.subtitle}
                  </li>
                    </a>
                </Link>
              }
            </>
          )
        })}
        <li className={style.mainItem} onClick={onLogoutClick}>
          <LogoutIcon className={style.icon}/><p>로그아웃</p>
        </li>
      </ul>
    </div>
  )
}

export default AdminNavbar