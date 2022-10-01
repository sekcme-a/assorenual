import React, { useEffect, useState } from "react"
import Map from "src/components/info/Map"
import SubMenuTitle from "src/components/public/SubMenuTitle"
import style from "styles/info/location.module.css"
import { firestore as db } from "src/firebase/firebase"
import Loader from "src/components/public/Loader"
import Head from "next/head"
import HeadMeta from "src/components/public/HeadMeta"

const Location = (props) => {

  const [isLoading, setIsLoading] = useState(true)
  const [locX, setLocX] = useState()
  const [locY, setLocY] = useState()
  const [address, setAddress] = useState()
  const [bus, setBus] = useState()
  const [subway, setSubway] = useState()

  useEffect(() => {
    const fetchData = async () => {
      if (props.preview === "true") {
        await db.collection("preview").doc("location").get().then((doc) => {
          setLocX(doc.data().locX)
          setLocY(doc.data().locY)
          setAddress(doc.data().address)
          setBus(doc.data().bus)
          setSubway(doc.data().subway)
          setIsLoading(false)
        })
      }
      else
        await db.collection("setting").doc("location").get().then((doc) => {
          setLocX(doc.data().locX)
          setLocY(doc.data().locY)
          setAddress(doc.data().address)
          setBus(doc.data().bus)
          setSubway(doc.data().subway)
          setIsLoading(false)
        })
    }
    fetchData();
  }, [])

  return (
    <>
       <HeadMeta
        title="대한생활체육회 - 오시는 길"
        description="대한생활체육회 오시는 길 - 서울특별시 영등포구 버드나루로88, 인따르시아빌딩 101호"
        url="https://xn--vk1by6xrzecngs4l6obxj.com/info/location"
      />
      { isLoading?<Loader /> :
        <>
          <SubMenuTitle title="오시는 길" subtitle="대한생활체육회로 오시는 길을 안내드립니다." />
          <Map locX={locX} locY={locY}/>
          <div className={style.title}>찾아오시는 길</div>
          <div className={style.mainContainer}>
            <div className={style.container}><div className={style.item}>- 주 소</div><div className={style.context}>{address}<br/> </div></div>
            <div className={style.container}><div className={style.item}>- 지하철 역</div><div className={style.context}>{subway}<br/> </div></div>
            <div className={style.container}><div className={style.item}>- 버스정류장</div><div className={style.context}>{bus}</div></div>
          </div>
        </>
      }
    </>
  )
}

export default Location