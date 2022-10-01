import React, {useEffect, useState} from "react"
import SubMenuTitle from "src/components/public/SubMenuTitle"
import style from "styles/info/purpose.module.css"
import { motion } from "framer-motion"
import { firestore as db } from "src/firebase/firebase"
import Loader from "src/components/public/Loader"
import Head from "next/head"
import HeadMeta from "src/components/public/HeadMeta"

const Purpose = (props) => {
  const aniDelay = 0.2;
  const aniDuration = 1;
  const aniSpeed = -20;
  const aniH2Delay = 0.5;
  let number = 0;

  const [title, setTitle] = useState("")
  const [context, setContext] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
    if (props.preview === "false") {
        await db.collection("setting").doc("purpose").get().then((doc) => {
          setTitle(doc.data().title)
          setContext(doc.data().context)
          setIsLoading(false)
        })
      }
      else {
        await db.collection("preview").doc("purpose").get().then((doc) => {
          setTitle(doc.data().title)
          setContext(doc.data().context)
          setIsLoading(false)
        })
      }
    }
    fetchData();
  },[])
  return (
    <>
       <HeadMeta
        title="대한생활체육회 - 설립목적"
        description="대한생활체육회의 설립목적을 소개합니다 - 국민의 건강과 행복의 장을 여는 대한생활체육회"
        url="https://xn--vk1by6xrzecngs4l6obxj.com/info/purpose"
      />
      {isLoading ? <Loader /> :
        <>
          <SubMenuTitle title="설립목적" subtitle="대한생활체육회의 설립목적을 소개합니다." />
          <motion.div className={style.content__container} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1, duration: 1 } }}>
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: aniH2Delay, duration: 1 } }}>{title}</motion.h2>
            <ul className={style.list}>
              {context.map((index, id) => {
                number++;
                return (
                  <motion.li className={style.item__container} key={id} initial={{ opacity: 0, x: aniSpeed }} animate={{ opacity: 1, x: 0, transition: { delay: aniH2Delay + (aniDelay * number), duration: aniDuration } }}>
                    <div className={style.number}>{number}</div>
                    <h3 className={style.content}>{index}</h3>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        </>
      }
    </>
  )
}

export default Purpose