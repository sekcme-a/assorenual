import React, {useEffect, useState} from "react"
import style from "styles/home/headerPopup.module.css"
import { firestore as db, storage } from "src/firebase/firebase"
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Link from "next/link"
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Navigation, Autoplay} from "swiper";


const HeaderPopup = () => {

  const [urlList, setUrlList] = useState([])
  const [linkList, setLinkList] = useState([])
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [mobileMode, setMobileMode] = useState("false")
  SwiperCore.use([Autoplay])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 870)
        setMobileMode(true)
      else
        setMobileMode(false)
    }
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [])

  useEffect(() => {
    const fetchUrl = async () => {
      let list = [];
      let list2 = [];
      await db.collection("setting").doc("mainPopup").get().then((doc) => {
        const res = JSON.parse(doc.data().data)
        res.forEach(async (item) => {
          await storage.ref(`mainPopup/${item.img}`).getDownloadURL().then((url) => {
            list.push(url)
            setUrlList(list)
                      list2.push(item.link)
          setLinkList(list2)
          })
        })
        setIsLoading(false)
      })
    }
    fetchUrl();
  }, [])

  const onRightButtonClick = () => {
    if(urlList.length>count+1)
      setCount(count+1)
    else
      setCount(0)
  }
  const onLeftButtonClick = () => {
    if(count===0)
      setCount(urlList.length-1)
    else
      setCount(count-1)
  }
  
  return (
    <>
      {mobileMode===false ?
      <div className={style.container}>
        {linkList[count] === "-" || linkList[count] === undefined ?
          <img className={style.img} src={urlList[count]} alt={urlList[count]} />
          :
          <Link passhref href={linkList[count]}>
            <a><img className={style.img} src={urlList[count]} alt={urlList[count]} /></a>
          </Link>
        }
        {isLoading === false &&
          <div className={style.buttonContainer}>
            <ArrowLeftIcon className={style.button} onClick={onLeftButtonClick} />
            <ArrowRightIcon className={style.button} onClick={onRightButtonClick} />
          </div>
        }
      </div >
      :
      <div className={style.mobile_container}>
        <Swiper
          grabCursor={true}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className={style.swiper}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          slidesPerView="auto"
        >

          {urlList.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className={style.img_container}>
                  {/* <img src={item} /> */}
                  <Image src={item} alt="배경" layout="fill" objectFit="cover" objectPosition="center" />
                </div>
                {/* <SwiperContainer data={item} /> */}
              </SwiperSlide>
            )
          })}

        </Swiper>
      </div>
      }
    </>
  )
}
export default HeaderPopup;