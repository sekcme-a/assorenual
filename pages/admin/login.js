import React, { useState, useCallback, useContext , useEffect } from "react"
import {firebase, auth, googleAuthProvider, firestore} from "src/firebase/firebase"
import Image from "next/image"
import { UserContext } from "src/data/context";
import Router from "next/router"
import Link from "next/link"
import style from "admin/styles/login.module.css"
import HeadMeta from "src/components/public/HeadMeta";

const Login = () => {

  const { user, username, userrole } = useContext(UserContext)
  useEffect(() => {
    if (username) {
      console.log("어드민창으로")
    } else if (user) {
      Router.push("/admin/setting/name")
    }
  },[user])

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider)
  }

  return (
    <>
      <HeadMeta title="대한생활체육회 관리자페이지" description="대한생활체육회 관리자페이지" url="https://xn--vk1by6xrzecngs4l6obxj.com" />
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.loginContainer}>
          {console.log(firestore)}
          <h4>Admin Login</h4>
          <div className={style.border} />
          <div className={style.loginButtonContainer}>
            <div className={style.loginButton} onClick={signInWithGoogle}>
              <p>구글로 로그인</p>
            </div>
          </div>
        </div>
        <div className={style.styleContainer}>
          <h4>국민의 건강과<br/>행복의 장을 여는<br/></h4>
          <h3>대한생활체육회</h3>
        </div>
      </div>
      </div>
    </>
  )
}
export default Login;