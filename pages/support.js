import { useEffect } from "react";
import { useState } from "react"
import MouCompo from "src/components/mou/MouCompo";
import Banner from "src/components/public/Banner";
import HeadMeta from "src/components/public/HeadMeta"
import LocNav from "src/components/public/LocNav";
import NavbarVerticle from "src/components/public/NavbarVerticle";

import SupportCompo from "src/components/support/Support"


const Support = () => {
  const [bannerRandom, setBannerRandom] = useState()

  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

  useEffect(() => {
    setBannerRandom(getRandom(1,5))
  },[])

  return(
    <>
      <HeadMeta
      title="후원안내 - 대한생활체육회"
      description="대한생활체육회는 기획재정부 지정기부금단체로서 기부금은 지정기부금에 해당되어 세제상의 혜택을 받을 수 있습니다."
      url="https://xn--vk1by6xrzecngs4l6obxj.com/support"
      />
      <Banner bannerNumber={bannerRandom}/>
      <div className="subpage__container">
        <LocNav title="후원 안내" subtitle="후원 안내" />
        <NavbarVerticle loc="후원안내"/>
        <div className="content__container">
          <SupportCompo />
        </div>
      </div>
    </>
  )
}

export default Support