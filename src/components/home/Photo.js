import React, {useState, useEffect} from "react"
import style from "styles/home/photo.module.css"
import { firestore as db } from "src/firebase/firebase"
import Link from "next/link"
import Loader from "src/components/public/Loader"
import ReactPlayer from "react-player/lazy"

const Photo = () => {
  const [listData, setListData] = useState([])
  const [videoList, setVideoList] = useState([])
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [isVideoLoading, setIsVideoLoading] = useState(true)
  const [mute, setMute] = useState(true)
    let fetchedList;
  let prevList;
  let tempData = [];
  let tempVideo = [];

  useEffect(() => {
    fetchedList = (db.collection("photo")
      .orderBy("createdAt", "desc")
      .limit(4))
    if (fetchedList !== undefined) {
      fetchedList.get().then((data) => {
        data.forEach((doc) => {
          const d = new Date(doc.data().createdAt.toMillis())
          let date;
          if(d.getMonth()+1<10 && d.getDate()<10)
            date = d.getFullYear() + ".0" + (d.getMonth() + 1) + ".0" + d.getDate()
          else if(d.getMonth()+1<10 && d.getDate()>=10)
            date = d.getFullYear() + ".0" + (d.getMonth() + 1) + "." + d.getDate()
          else if(d.getMonth()+1>=10 && d.getDate()<10)
            date = d.getFullYear() + "." + (d.getMonth() + 1) + ".0" + d.getDate()
          else if(d.getMonth()+1>=10 && d.getDate()>=10)
            date = d.getFullYear() + "." + (d.getMonth() + 1) + "." + d.getDate()
          tempData = ([
            ...tempData,
            {
              title: doc.data().title,
              uid: doc.data().uid,
              author: doc.data().author,
              createdAt: date,
              id: doc.id,
              count: doc.data().count,
              thumbnail: doc.data().thumbnail
            }
          ])
        })
        setListData(tempData)
        setIsImageLoading(false)
      })
    }
    fetchedList = (db.collection("video")
      .orderBy("createdAt", "desc")
      .limit(16))
    if (fetchedList !== undefined) {
      fetchedList.get().then((data) => {
        data.forEach((doc) => {
          const d = new Date(doc.data().createdAt.toMillis())
          let date;
          if(d.getMonth()+1<10 && d.getDate()<10)
            date = d.getFullYear() + ".0" + (d.getMonth() + 1) + ".0" + d.getDate()
          else if(d.getMonth()+1<10 && d.getDate()>=10)
            date = d.getFullYear() + ".0" + (d.getMonth() + 1) + "." + d.getDate()
          else if(d.getMonth()+1>=10 && d.getDate()<10)
            date = d.getFullYear() + "." + (d.getMonth() + 1) + ".0" + d.getDate()
          else if(d.getMonth()+1>=10 && d.getDate()>=10)
            date = d.getFullYear() + "." + (d.getMonth() + 1) + "." + d.getDate()
          tempVideo = ([
            ...tempVideo,
            {
              title: doc.data().title,
              uid: doc.data().uid,
              author: doc.data().author,
              createdAt: date,
              id: doc.id,
              count: doc.data().count,
              thumbnail: doc.data().thumbnail
            }
          ])
        })
        setVideoList(tempVideo)
        setIsVideoLoading(false)
        setMute(false)
      })
    }
  },[])

  return (
    <div className={style.container}>
      <h4 className={style.title}>대한생활체육회는 지금...</h4>
      <div className={style.contentContainer}>
        <h5 className={style.subtitle}>포토갤러리</h5>
        <Link passhref href="/notice/photo/1">
          <a><div className={style.button}>더보기</div></a>
        </Link>
        <ul className={style.list}>
          {isImageLoading ? <Loader /> : listData.map((item, index) => {
            return (
              <Link passhref key={index} href='/article/[filename]/[page]/[id]' as={`/article/photo/1/${item.id}`}>
                <a>
                <li className={style.imgTable}>
                  {item.thumbnail && (
                    <div className={style.imgContainer}>
                      <img src={item.thumbnail} alt={item.title}/>
                    </div>
                  )}
                  <div className={style.textContainer}>
                    <div className={style.imgTitle}>{item.title}</div>
                    <div className={style.imgCreatedAt}>{item.createdAt}</div>
                  </div>
                  </li>
                  </a>
              </Link>
            )
          })}
        </ul>
      </div>

      <div className={style.contentContainerVideo}>
        <div className={style.vidContainer}>
          <h5 className={style.subtitle2}>동영상갤러리</h5>
          <Link passhref href="/notice/video/1">
            <a><div className={style.button2}>더보기</div></a>
          </Link>
        </div>
        <ul className={style.list}>
          {isVideoLoading ? <Loader /> : videoList.map((item, index) => {
            return (
                <li key={index} className={style.imgTable}>
                  {item.thumbnail && (
                    <div className={style.videoContainer}>
                      <ReactPlayer className={style.video}url={item.thumbnail} playing={false} muted={mute} controls={true} light={true} pip={true}/>
                    </div>
                  )}
                <Link passhref href='/article/[filename]/[page]/[id]' as={`/article/video/1/${item.id}`}>
                  <a>
                    <div className={style.textContainer}>
                      <div className={style.imgTitle}>{item.title}</div>
                      <div className={style.imgCreatedAt}>{item.createdAt}</div>
                    </div>
                    </a>
                </Link>
                </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
export default Photo