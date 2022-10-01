import React, {useEffect, useState} from "react"
import SubMenuTitle from "src/components/public/SubMenuTitle"
import style from "styles/info/chart.module.css"
import { firestore as db } from "src/firebase/firebase"
import Loader from "src/components/public/Loader"
import Link from "next/link"
import LazyItem from "src/components/public/LazyItem"
import Head from "next/head"
import HeadMeta from "src/components/public/HeadMeta"

const Chart = (props) => {
  const [imgUrl, setImgUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (props.preview === true) {
        await db.collection("preview").doc("chart").get().then((doc) => {
          setImgUrl(doc.data().imgUrl)
          setLoading(false)
        })
      }
      else
        await db.collection("setting").doc("chart").get().then((doc) => {
          setImgUrl(doc.data().imgUrl)
          setLoading(false)
        })
    }
    fetchData();
  },[])
  return (
    <>
       <HeadMeta
        title="대한생활체육회 - 중앙 조직도"
        description="대한생활체육회의 중앙 조직도를 소개합니다 - 국민의 건강과 행복의 장을 여는 대한생활체육회"
        url="https://xn--vk1by6xrzecngs4l6obxj.com/info/chart"
      />

      <SubMenuTitle title="중앙 조직도" subtitle="대한생활체육회의 중앙 조직도를 소개합니다."/>
      <div className={style.container}>
        {loading ? (<Loader />) : (<img src={imgUrl} alt="조직도" className={style.image}></img>)}
      </div>
    </>
  )
}

export default Chart;