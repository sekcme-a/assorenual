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
import MouCompo from "src/components/mou/MouCompo"

const Mou = () => {
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
      title="대한생활체육회 - 체육회 소개"
      description="대한생활체육회의 총재 인삿말, 설립목적, 중앙조직도 등을 소개합니다."
      url="https://xn--vk1by6xrzecngs4l6obxj.com/info/greet"
      />
      {isPreview && <div className="preview">미리보기중입니다.</div>}
      <Banner bannerNumber={bannerRandom}/>
      <div className="subpage__container">
        <LocNav title="협력기관" subtitle="협력기관" />
        <NavbarVerticle loc="협력기관"/>
        <div className="content__container">
          <MouCompo type="editMou" preview="false"/>
        </div>
      </div>
    </>
  )
}
export default Mou;