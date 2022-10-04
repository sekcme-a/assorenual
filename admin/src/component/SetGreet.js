import React,{useEffect, useState} from "react"
import style from "admin/styles/setGreet.module.css"
import { getCompressedImg } from "src/hooks/getCompressedImg"
import { firestore as db } from "src/firebase/firebase"
import Link from "next/link"
import { storage } from "src/firebase/firebase"

const SetGreet = () => {
  const [image, setImage] = useState()
  const [imageChanged, setImageChanged] = useState(false)
  const [text1,setText1] = useState("")
  const [text2,setText2] = useState("")
  const [text3, setText3] = useState("")
  const [text4, setText4] = useState("")

  const onImgChange = async (e) => {
    setImageChanged(true);
    if(e!==undefined)
      setImage(await getCompressedImg(e))
  }

  const onText1Change = (e) => {setText1(e.target.value)}
  const onText2Change = (e) => {setText2(e.target.value)}
  const onText3Change = (e) => { setText3(e.target.value) }
  const onText4Change = (e) => { setText4(e.target.value) }
  
  const onSubmitClick = async (event) => {
    event.preventDefault();
    if(text1==="" || text2===""|| text3==="" || text4==="")
      alert("빈칸을 채워주세요.")
    else {
      const imgUrl = await uploadImageToStorage();
      db.collection("setting").doc("greet").set({imgUrl: imgUrl, imgTitle: text1, title: text2, subtitle: text3, context: text4})
      alert("적용되었습니다.")
    }
  }

  const onPreviewClick = async () => {
    if(text1==="" || text2===""|| text3==="" || text4==="" || text1===undefined|| text2===undefined|| text3===undefined|| text4===undefined)
      alert("빈칸을 채워주세요.")
    else {
      const imgUrl = await uploadPreviewImageToStorage();
      db.collection("preview").doc("greet").set({imgUrl: imgUrl, imgTitle: text1, title: text2, subtitle: text3, context: text4})
    }
  }

  //이미지를 storage preview폴더에 저장하고, 이미지url을 반환
  const uploadPreviewImageToStorage = async () => {
    return new Promise(async function (resolve, reject) {
      const fileRef = storage.ref().child(`preview/greet`)
      console.log(imageChanged)
      console.log(image)
      console.log(text4)
      if (imageChanged === true) {
        await fileRef.put(image.imgData)
        const url = await fileRef.getDownloadURL()
        resolve(url)
      }
      else
        resolve(image)
    })
  }
  const uploadImageToStorage = async () => {
    return new Promise(async function (resolve, reject) {
      const fileRef = storage.ref().child(`setting/greet`)
      if(imageChanged===true)
        await fileRef.put(image.imgData)
      else
        resolve(image)
      const url = await fileRef.getDownloadURL()
      resolve(url)
    })
  }

  //firebase 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      await db.collection("setting").doc("greet").get().then((doc) => {
        setImage(doc.data().imgUrl)
        setText1(doc.data().imgTitle)
        setText2(doc.data().title)
        setText3(doc.data().subtitle)
        setText4(doc.data().context)
      })
    }
    fetchData();
  },[])

  return (
    <form className={style.mainContainer}>
      <div className={`${style.container} ${style.container1}`}>
        <h4>이미지 변경</h4>
        <p className={style.warning}>*이미지의 크기가 2MB보다 클 경우 자동으로 압축됩니다.</p>
        <p>이미지 선택 : <input type="file" name="selectedImg[]" onChange={onImgChange} accept="image/*"/></p>
      </div>

      <div className={`${style.container} ${style.container2}`}>
        <h4>이미지 문구 변경</h4>
        <p>이미지 문구 : <input type="text" value={text1} onChange={onText1Change} size="60" required/></p>
      </div>

      <div className={`${style.container} ${style.container2}`}>
        <h4>주제목 변경</h4>
        <p>주제목 문구 : <input type="text" value={text2} onChange={onText2Change} size="60" required/></p>
      </div>

      <div className={`${style.container} ${style.container2}`}>
        <h4>부제목 변경</h4>
        <p>부제목 문구 : <input type="text" value={text3} onChange={onText3Change} size="60" required/></p>
      </div>

      <div className={`${style.container} ${style.container3}`}>
        <h4>인사말 변경</h4>
        <p className={style.warning}>*단락은 {`</>`} 로 구분해주세요.</p>
        <p><textarea  value={text4} onChange={onText4Change} rows="15" cols="120" required/></p>
      </div>
      <Link passHref href="/info/greetPreview"><a className={style.button} target="_blank" onClick={onPreviewClick}>미리보기</a></Link>
      <input type="submit" onClick={onSubmitClick} className={style.button2} value="적용"></input>
    </form>
  )
}

export default SetGreet;