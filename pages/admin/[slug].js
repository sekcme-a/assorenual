import React, { useEffect, useState, useContext } from "react"
import { useRouter } from "next/router"
import { UserContext } from "src/data/context";
import AdminNavbar from "admin/src/component/AdminNavbar"
import style from "admin/styles/home.module.css"
import SetMainPopup from "admin/src/component/SetMainPopup"
import SetMainVideo from "admin/src/component/SetMainVideo"
import SetGreet from "admin/src/component/SetGreet"
import SetPurpose from "admin/src/component/SetPurpose"
import SetChart from "admin/src/component/SetCharts"
import SetStatus from "admin/src/component/SetStatus"
import SetLocation from "admin/src/component/SetLocation"
import SetGroup from "admin/src/component/SetGroup"
import PostList from "admin/src/component/PostList"
import { adminMenuItems } from "src/data/adminMenuItems"
import Loader from "src/components/public/Loader"
import HeadMeta from "src/components/public/HeadMeta";

const Admin = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { user, username, userrole } = useContext(UserContext);
  const [userLevel, setUserLevel] = useState("")
  const [title, setTitle] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setUserLevel(userrole)
    setIsLoading(false)
  }, [userrole])
  
  useEffect(() => {
    adminMenuItems.forEach((item) => {
      if (item.child === false) {
        if (item.type === "sub" && item.path===`/${slug}`)
          setTitle(item.subtitle)
        if (item.type === "main" && item.path===`/${slug}`)
          setTitle(item.title)
      }
    })
  }, [slug])
  
  const noAuthority = () => {
    return (
      <div className={style.notAdminContainer}>
        <h2>관리자 권한이 없습니다.</h2>
        <h3>관리자가 관리자 권한을 부여해야합니다.</h3>
        <h4>권한을 부여해야하는 관리자명 : {`${username}`}</h4>
      </div>
    )
  }

  return (
    <>
      <HeadMeta title="대한생활체육회 관리자페이지" description="대한생활체육회 관리자페이지" url="https://xn--vk1by6xrzecngs4l6obxj.com" />
    <div className={style.adminBackground}>
      <div className={style.bg}>
        {userLevel==="admin" || userLevel==="author" ? (
          <>
            <div className={style.navbarContainer}>
              <div className={style.navbarContainer2}>
                <AdminNavbar userrole={userrole}/>
              </div>
            </div>
            <div className={style.contentContainer}>
              <div className={style.headerContainer}>
                <p>{title}</p>
              </div>
              {slug === "mainPopup" && userLevel==="admin" ? <SetMainPopup /> : noAuthority}
              {slug === "mainVideo" && userLevel==="admin" ? <SetMainVideo /> : noAuthority}
              {slug === "pageSetting1" && userLevel==="admin" ? <SetGreet /> : noAuthority}
              {slug === "pageSetting2" && userLevel==="admin" ? <SetPurpose /> : noAuthority}
              {slug === "pageSetting3" && userLevel==="admin" ? <SetChart /> : noAuthority}
              {slug === "pageSetting4" && userLevel==="admin" ? <SetStatus /> : noAuthority}
              {slug === "pageSetting5" && userLevel==="admin" ? <SetLocation /> : noAuthority}
              {slug === "pageSetting6" && userLevel==="admin" ? <SetGroup type="nation"/> : noAuthority}
              {slug === "pageSetting7" && userLevel==="admin" ? <SetGroup type="internation"/> : noAuthority}
              {slug === "pageSetting8" && userLevel==="admin" ? <SetGroup type="sports"/> : noAuthority}
              {slug === "pageSetting9" && userLevel==="admin" ? <SetGroup type="sanha"/> : noAuthority}
              {slug === "editanouncement" && <PostList folderName="anouncement" postPerPage={9}/>}
              {slug === "editphoto" && <PostList folderName="photo" postPerPage={16}/>}
              {slug === "editreference" && <PostList folderName="reference" postPerPage={9}/>}
              {slug === "editresult" && <PostList folderName="result" postPerPage={9}/>}
              {slug === "editschedule" && <PostList folderName="schedule" postPerPage={9} />}
              {slug === "editmedia" && <PostList folderName="media" postPerPage={9} />}
              {slug === "editvideo" && <PostList folderName="video" postPerPage={16} />}
            </div>
          </>
        ) : (
            <>{isLoading ? <Loader /> : noAuthority()}</>
        )
        }
      </div>
      </div>
      </>
  )
}

export default Admin;