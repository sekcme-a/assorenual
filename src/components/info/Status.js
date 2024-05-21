import React, {useEffect, useState} from "react";
import { firestore as db, storage } from "src/firebase/firebase"
import style from "styles/info/status.module.css"
import Image from "next/image"
import Head from "next/head"
import SubMenuTitle from "src/components/public/SubMenuTitle"
import LazyItem from "src/components/public/LazyItem"
import Loader from "src/components/public/Loader"
import HeadMeta from "src/components/public/HeadMeta"

const Status = (props) => {
  let title;
  let subtitle;
  let prevSpot; //직위
  const [statusData, setStatusData] = useState([])
  const [loading, setLoading] = useState(true)
  // const [imgList, setImgList] = useState([])

  useEffect(async () => {
    if (props.preview === "true") {
      await db.collection("preview").doc("status").get().then(async (doc) => {
        const res = JSON.parse(doc.data().data)
        setStatusData(res)
        setLoading(false)
      })
    } else {
      await db.collection("setting").doc("status").get().then(async (doc) => {
        const res = JSON.parse(doc.data().data)
        setStatusData(res)
        setLoading(false)
      })
    }

  },[])
  //총원수 및 임원 수 구하기.
  const getTotal = () => {
    let spot = [];
    let number = [];
    let exist = false;
    let totalNumber = 0;
    let result = "총원";
    statusData.forEach((item) => {
      exist = false;
      if (spot.length !== 0) {
        for (let i = 0; i < spot.length; i++){
          if (item.spot === spot[i]) {
            exist = true;
            number[i]++;
          }
        }
        if (exist === false) {
          number[spot.length] = 1;
          spot[spot.length] = item.spot;
        }
      } else {
        spot[0] = item.spot;
        number[0] = 1;
      }
      totalNumber++;
    })
    result += ` ${totalNumber}명 (`;
    for (let i = 0; i < spot.length; i++){
      result += `${spot[i]} ${number[i]}명`
      if (i !== (spot.length - 1))
        result += ", "
    }
    result += ")"
    return result;
  }

  // const getImg = async (imgName) => {
  //   storage.ref(`status/${imgName}`).getDownloadURL().then((url) => {
  //     console.log(url)
  //     return url
  //   })
  //   // return new Promise(async function (resolve, reject) {
  //   //   await storage.ref(`status/${imgName}`).getDownloadURL().then((url) => {
  //   //     resolve(url)
  //   //   })
  //   // })
  //   // return "/asdf"
  // }

  return (
    <>
      <div className={style.customBodyStatus}>
      </div>
      <div className={style.body}>
        <div className={style.bodyContainer}>
          <div className={style.contentContainer}>
            <div className={style.menuContainer}>
              <h4 className={style.menuResult}>{subtitle}</h4>
              <div className={style.menuBorder}></div>
            </div>
            <SubMenuTitle title="임원현황" subtitle="대한생활체육회 임원현황을 소개합니다."/>
            <div className={style.statusResultContainer}>
              <h5>▶ {getTotal()}</h5>
            </div>
            <div className={style.statusContainer}>
              {statusData.map((item, index) => {
                return (
                  <>
                    {prevSpot !== item.spot && (
                      <>
                        <div className={style.position}>{item.spot}</div>
                        <div className={style.hide}>{prevSpot = item.spot}</div>
                      </>
                    )}
                    <div key={index} className={style.card}>
                      <div className={style.box}>
                        <div className={style.content}>
                          <div className={style.idPhotoContainer}>
                            <div className={style.idPhoto}>
                              {loading ? <Loader />: <LazyItem key={index} nameOfClass="idPhoto" src={`status/${item.img}`} name={item.name} />}
                            </div>
                          </div>
                          <div className={style.idTextContainer}>
                            <h6>{`직위 : ${item.spot}`}</h6>
                            <h6>{`성명 : ${item.name}`}</h6>
                            {Array.from(item.data).map((text, index) => {
                              return (
                                <>
                                    {item.data[0] === text ? <h6 key={index}>{`프로필 : ${text}`}</h6>
                                      : <h6 key={index}>{text}</h6>
                                  }
                                </>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
              )})}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Status;