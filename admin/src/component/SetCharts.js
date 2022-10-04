import React,{useEffect, useState} from "react"
import style from "admin/styles/setChart.module.css"
import { getCompressedImg } from "src/hooks/getCompressedImg"
import { firestore as db } from "src/firebase/firebase"
import Link from "next/link"
import { storage } from "src/firebase/firebase"

const SetChart = () => {
  const [image, setImage] = useState()
  const [imageChanged, setImageChanged] = useState(false)

  const onImgChange = async (e) => {
    setImageChanged(true);
    setImage(e.target.files[0])
  }

  const onSubmitClick = async (event) => {
    event.preventDefault();
    const imgUrl = await uploadImageToStorage();
    db.collection("setting").doc("chart").set({imgUrl: imgUrl})
    alert("적용되었습니다.")
  }

  const onPreviewClick = async () => {
    const imgUrl = await uploadPreviewImageToStorage();
    db.collection("preview").doc("chart").set({imgUrl: imgUrl})
  }

  //이미지를 storage preview폴더에 저장하고, 이미지url을 반환
  const uploadPreviewImageToStorage = async () => {
    return new Promise(async function (resolve, reject) {
      const fileRef = storage.ref().child(`preview/chart`)
      if (imageChanged === true) {
        await fileRef.put(image)
        const url = await fileRef.getDownloadURL()
        resolve(url)
      }
      else
        resolve(image)
    })
  }
  const uploadImageToStorage = async () => {
    return new Promise(async function (resolve, reject) {
      const fileRef = storage.ref().child(`setting/chart`)
      if(imageChanged===true)
        await fileRef.put(image)
      else
        resolve(image)
      const url = await fileRef.getDownloadURL()
      resolve(url)
    })
  }

  //firebase 데이터 가져오기
  useEffect(async() => {
    await db.collection("setting").doc("chart").get().then((doc) => {
      setImage(doc.data().imgUrl)
    })
  },[])

  return (
    <form className={style.mainContainer}>
      <div className={`${style.container} ${style.container1}`}>
        <h4>이미지 변경</h4>
        <p className={style.warning}>*이미지의 용량이 너무 크면 로딩시간이 오래걸립니다.</p>
        <p>이미지 선택 : <input type="file" name="selectedImg[]" onChange={onImgChange} accept="image/*"/></p>
      </div>

      <Link passHref href="/info/chartPreview"><a className={style.button} target="_blank" onClick={onPreviewClick}>미리보기</a></Link>
      <input type="submit" onClick={onSubmitClick} className={style.button2} value="적용"></input>
    </form>
  )
}

export default SetChart;