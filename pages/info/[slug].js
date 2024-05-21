import React, { useEffect, useContext, useState} from "react"
import { useRouter } from "next/router"
import Banner from "src/components/public/Banner"
import NavbarVerticle from "src/components/public/NavbarVerticle"
import { MenuItems } from "src/data/menuItems"
import LocNav from "src/components/public/LocNav"
import Greet from "src/components/info/Greet"
import Purpose from "src/components/info/Purpose"
import Chart from "src/components/info/Chart"
import Status from "src/components/info/Status"
import Location from "src/components/info/Location"
import Head from "next/head"
import HeadMeta from "src/components/public/HeadMeta"

const Info = () => {
  const [bannerRandom, setBannerRandom] = useState()
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [isPreview, setIsPreview] = useState(false)


  const router = useRouter();
  const { slug } = router.query

  //getRandom(최소, 최대) 랜덤 자연수 생성
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

  //banner에 랜덤한 자연수를 props로 넘겨 몇가지 banner사진중 랜덤으로 보여줌
  useEffect(() => {
    setBannerRandom(getRandom(1, 5))
    let path = slug;
    if (path === "greetPreview") { path = "greet"; setIsPreview(true) }
    if (path ==="purposePreview") {path = "purpose"; setIsPreview(true) }
    if (path ==="chartPreview") {path = "chart"; setIsPreview(true) }
    if (path ==="statusPreview") {path = "status"; setIsPreview(true) }
    if (path === "locationPreview") {path = "location"; setIsPreview(true) }
    MenuItems.forEach((item) => {
      if (item.path === `/info/${path}`) {
        setTitle(item.title)
        setSubtitle(item.subtitle)
        return;
      }
    })
  }, [slug])
  

  return (
    <>
      <HeadMeta
      title={
        slug==="greet" ? "총재 인사말 - 대한생활체육회" : 
        slug==="purpose" ? "설립목적 - 대한생활체육회" : 
        slug==='chart' ? '조직도 - 대한생활체육회' : 
        slug==="status" ? "임원현황 - 대한생활체육회" :
        "오시는 길 - 대한생활체육회" 
      }
      description={
        slug==="greet" ? "대한생활체육회 총재 김균식의 인사말입니다." : 
        slug==="purpose" ? "대한생활체육회의 설립목적을 소개합니다 - 스포츠가 최고의 국민건강 복지다." : 
        slug==='chart' ? '대한생활체육회의 중앙 조직도를 소개합니다.' : 
        slug==="status" ? "현재 대한생활체육회의 임원현황을 소개드립니다." :
        "대한생활체육회로 오시는 길을 안내드립니다 : 영등포동7가 94-49" 
      }
      url={`https://xn--vk1by6xrzecngs4l6obxj.com/info/${slug}`}
      />
      {isPreview && <div className="preview">미리보기중입니다.</div>}
      <Banner bannerNumber={bannerRandom}/>
      <div className="subpage__container">
        <LocNav title={title} subtitle={subtitle} />
        <NavbarVerticle loc={title}/>
        <div className="content__container">
          {slug==="greetPreview" && <Greet preview="true" />}
          {slug==="purposePreview" && <Purpose preview="true" />}
          {slug==="chartPreview" && <Chart preview="true" />}
          {slug==="statusPreview" && <Status preview="true" />}
          {slug==="locationPreview" && <Location preview="true" />}
        </div>
      </div>
    </>
  )
}
export default Info;