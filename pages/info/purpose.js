
import React, { useEffect, useContext, useState} from "react"
import { useRouter } from "next/router"
import Banner from "src/components/public/Banner"
import NavbarVerticle from "src/components/public/NavbarVerticle"
import { MenuItems } from "src/data/menuItems"
import LocNav from "src/components/public/LocNav"
import Purposea from "src/components/info/Purpose"
import HeadMeta from "src/components/public/HeadMeta"

const Purpose = () => {
  const [bannerRandom, setBannerRandom] = useState()
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [isPreview, setIsPreview] = useState(false)


  const router = useRouter();

  //getRandom(최소, 최대) 랜덤 자연수 생성
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

  useEffect(() => {
    setBannerRandom(getRandom(1, 5))
    MenuItems.forEach((item) => {
      if (item.path === `/info/purpose`) {
        setTitle(item.title)
        setSubtitle(item.subtitle)
        return;
      }
    })
  }, [])
  return(
    <>
          <HeadMeta
      title= "설립목적 - 대한생활체육회" 
      description= "대한생활체육회의 설립목적을 소개합니다 - 스포츠가 최고의 국민건강 복지다." 
      url={`https://xn--vk1by6xrzecngs4l6obxj.com/info/purpose`}
      />
        <Banner bannerNumber={bannerRandom}/>
      <div className="subpage__container">
        <LocNav title={title} subtitle={subtitle} />
        <NavbarVerticle loc={title}/>
        <div className="content__container">
          <Purposea preview="false" />
        </div>
      </div>
    
    </>
  )
}

export default Purpose