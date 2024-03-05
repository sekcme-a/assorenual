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
      title="대한생활체육회 - 후원안내"
      description="대한생활체육회 후원을 안내드립니다."
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