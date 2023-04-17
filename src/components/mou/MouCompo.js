import React, { useState, useEffect } from "react"
import Loader from "src/components/public/Loader"
import { firestore as db, storage } from "src/firebase/firebase"
import style from "styles/mou/mouList.module.css"
import LazyItem from "src/components/public/LazyItem"
import Link from "next/link"

const MouCompo = (props) => {
  const [groupData, setGroupData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect( () => {
    const fetchData = async () => {
      if (props.preview === "true") {
        await db.collection("preview").doc(props.type).get().then(async (doc) => {
          if(doc.exists){
            const res = JSON.parse(doc.data().data)
            setGroupData(res)
          }
          setIsLoading(false)
        })
      }
      else {
        await db.collection("setting").doc(props.type).get().then(async (doc) => {
          if(doc.exists){
            const res = JSON.parse(doc.data().data)
            console.log(res)
            setGroupData(res)
          }
          setIsLoading(false)
        })
      }
    }
    fetchData();
  }, [])
  
  //item.data 는 배열인데 배열마다 enter키로 분리한 string으로 변경
  const convertData = (data) => {
    let result =""
    data.forEach((item) => {
      result += `${item}\n`
    })
    return result
  }
  
  const lookClose = (img, name) => {
    // let obj;
    let storageRef = storage.ref()
    // storageRef.child(`group/${img}`).getDownloadURL().then((url) => {
    //   obj = window.open(url, "", "width=400, height=600,")
    // }).catch((e)=>{alert(e)})
    storageRef.child(`group/${img}`).getDownloadURL().then((url) => {
      var img=new Image();
      img.src=url;
      var OpenWindow=window.open("", `_blank`, "width=400, height=600");
      OpenWindow.document.write(`<style>body{margin:0px;}</style><img src="${url}" width="400">`);
    }).catch((e)=>{alert(e)})
    }

  return (
    <div>
      <div style={{fontSize:"20px",  marginBottom:"10px"}}>대한생활체육회와 협력하고있는 기관들을 소개합니다.</div>
      {isLoading ? <Loader /> : (
        <>
          {groupData.map((item, index) => {
            return (
              <>
                <div className={style.container} key={index}>
                 
                  <div className={style.imgContainer} onClick={()=>lookClose(item.img, item.name)}>
                    {item.img === "-" ? <LazyItem src={`group/none.svg`} name={item.name} nameOfClass="groupImage" /> :
                      <LazyItem src={`group/${item.img}`} name={item.name} nameOfClass="groupImage"/>
                    }
                  </div>
                  <div className={style.contextContainer}>
                    <div className={style.title}>{item.name}</div>
                    <p>{convertData(item.data)}</p>
                    {item.homepage !== "-" &&
                      <Link passHref href={item.homepage}><a className={style.button} target="_blank">홈페이지 방문</a></Link>
                    }
                  </div>
                </div>
              </>
            )
          })}
        </>
      )}
    </div>
  )
}
export default MouCompo