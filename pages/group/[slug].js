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
  const [isPreview, setIsPreview] = useState(false)


  const router = useRouter();
  const { slug } = router.query

  //getRandom(최소, 최대) 랜덤 자연수 생성
  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

  //banner에 랜덤한 자연수를 props로 넘겨 몇가지 banner사진중 랜덤으로 보여줌
  useEffect(() => {
    setBannerRandom(getRandom(1, 5))
    let path = slug;
    if (path === "nationPreview") { path = "nation"; setIsPreview(true) }
    if (path === "internationPreview") {path = "internation"; setIsPreview(true) }
    if (path === "sportsPreview") {path = "sports"; setIsPreview(true) }
    if (path === "sanhaPreview") {path = "sanha"; setIsPreview(true) }
    MenuItems.forEach((item) => {
      if (item.path === `/group/${path}`) {
        setTitle(item.title)
        setSubtitle(item.subtitle)
        return;
      }
    })
  }, [slug])
  

  return (
    <>
      <HeadMeta
        title="대한생활체육회 - 단체소개"
        description="대한생활체육회의 전국, 국제 체육회 현황과 종목별 운영현황, 산하단체들을 소개합니다."
        url="https://xn--vk1by6xrzecngs4l6obxj.com/group/nation"
      />

      {isPreview && <div className="preview">미리보기중입니다.</div>}
      <Banner bannerNumber={bannerRandom}/>
      <div className="subpage__container">
        <LocNav title={title} subtitle={subtitle} />
        <NavbarVerticle loc={title}/>
        <div className="content__container">
          <SubMenuTitle title={subtitle} subtitle={`대한생활체육회의 ${subtitle}입니다.`} />
          {slug === "nation" && <GroupList type="nation" preview="false" />}
          {slug === "internation" && <GroupList type="internation" preview="false" />}
          {slug === "sports" && <GroupList type="sports" preview="false" />}
          {slug === "sanha" && <GroupList type="sanha" preview="false" />}
          {slug==="nationPreview" && <GroupList type="nation" preview="true" />}
          {slug==="internationPreview" && <GroupList type="internation" preview="true" />}
          {slug==="sportsPreview" && <GroupList type="sports" preview="true" />}
          {slug==="sanhaPreview" && <GroupList type="sanha" preview="true" />}
        </div>
      </div>
    </>
  )
}
export default Group;