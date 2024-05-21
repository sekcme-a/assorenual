import React, { useEffect, useContext, useState} from "react"
import { useRouter } from "next/router"
import Banner from "src/components/public/Banner"
import NavbarVerticle from "src/components/public/NavbarVerticle"
import { MenuItems } from "src/data/menuItems"
import GroupList from "src/components/group/GroupList"
import LocNav from "src/components/public/LocNav"
import SubMenuTitle from "src/components/public/SubMenuTitle"
import Head from "next/head"
import HeadMeta from "src/components/public/HeadMeta"

const Group = () => {
  const [bannerRandom, setBannerRandom] = useState()
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")


  //getRandom(최소, 최대) 랜덤 자연수 생성
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

  //banner에 랜덤한 자연수를 props로 넘겨 몇가지 banner사진중 랜덤으로 보여줌
  useEffect(() => {
    setBannerRandom(getRandom(1, 5))
    MenuItems.forEach((item) => {
      if (item.path === `/group/nation`) {
        setTitle(item.title)
        setSubtitle(item.subtitle)
        return;
      }
    })
  }, [])
  

  return (
    <>
      <HeadMeta
        title="전국체육회현황 - 대한생활체육회"
        description="대한생활체육회의 전국체육회현황입니다."
        url="https://xn--vk1by6xrzecngs4l6obxj.com/group/nation"
      />

      <Banner bannerNumber={bannerRandom}/>
      <div className="subpage__container">
        <LocNav title={title} subtitle={subtitle} />
        <NavbarVerticle loc={title}/>
        <div className="content__container">
          <SubMenuTitle title={subtitle} subtitle={`대한생활체육회의 ${subtitle}입니다.`} />
          <GroupList type="nation" preview="false" />
        </div>
      </div>
    </>
  )
}
export default Group;