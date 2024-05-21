
import React, { useEffect, useContext, useState} from "react"
import { useRouter } from "next/router"
import Banner from "src/components/public/Banner"
import NavbarVerticle from "src/components/public/NavbarVerticle"
import { MenuItems } from "src/data/menuItems"
import LocNav from "src/components/public/LocNav"
import Locationa from "src/components/info/Location"
import HeadMeta from "src/components/public/HeadMeta"

const Location = () => {
  const [bannerRandom, setBannerRandom] = useState()
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")


  const router = useRouter();

  //getRandom(최소, 최대) 랜덤 자연수 생성
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

  useEffect(() => {
    setBannerRandom(getRandom(1, 5))
    MenuItems.forEach((item) => {
      if (item.path === `/info/location`) {
        setTitle(item.title)
        setSubtitle(item.subtitle)
        return;
      }
    })
  }, [])
  return(
    <>
          <HeadMeta
      title= "오시는 길 - 대한생활체육회" 
      description= "대한생활체육회로 오시는 길을 안내드립니다 : 영등포동7가 94-49" 
      url={`https://xn--vk1by6xrzecngs4l6obxj.com/info/location`}
      />
        <Banner bannerNumber={bannerRandom}/>
      <div className="subpage__container">
        <LocNav title={title} subtitle={subtitle} />
        <NavbarVerticle loc={title}/>
        <div className="content__container">
          <Locationa preview="false" />
        </div>
      </div>
    
    </>
  )
}

export default Location