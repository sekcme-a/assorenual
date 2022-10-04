import React,{useEffect, useState} from "react"
import style from "admin/styles/setPurpose.module.css"
import { firestore as db } from "src/firebase/firebase"
import Link from "next/link"

const SetPurpose = () => {
  const [title, setTitle] = useState("")
  const [contextTransfer, setContextTransfer] = useState("")

  const onTitleChange = (e) => { setTitle(e.target.value) }
  const onContextTransferChange = (e)=>{setContextTransfer(e.target.value)}


  //firebase 데이터 가져오기
  useEffect(async() => {
    await db.collection("preview").doc("purpose").get().then((doc) => {
      setTitle(doc.data().title)
      transferContext(doc.data().context)
    })
  }, [])
  
  //배열의 context를 string으로 변경
  const transferContext = (data) => {
    let temp = "";
    data.forEach((item) => {
      temp += `${item}\n`;
    })
    setContextTransfer(temp.slice(0,-1))
  }

  //string의 context를 배열로 변경하고 db에 저장
  const onPreviewClick = () => {
    if (title === "" || contextTransfer === "" || title === undefined || contextTransfer === undefined)
      alert("빈칸을 채워주세요")
    else {
      const context = contextTransfer.split(/\r\n|\r|\n/)
      db.collection("preview").doc("purpose").set({ title: title, context: context})
    }
  }
  //string의 context를 배열로 변경하고 db에 저장
  const onSubmitClick = () => {
    if (title === "" || contextTransfer === "" || title === undefined || contextTransfer === undefined)
      alert("빈칸을 채워주세요")
    else {
      const context = contextTransfer.split(/\r\n|\r|\n/)
      db.collection("setting").doc("purpose").set({ title: title, context: context })
      alert("적용되었습니다.")
    }
  }


  return (
    <form className={style.mainContainer}>
      <div className={`${style.container} ${style.container1}`}>
        <h4>제목 변경</h4>
        <p>제목 문구 : <input type="text" value={title} onChange={onTitleChange} size="60" required/></p>
      </div>

      <div className={`${style.container} ${style.container2}`}>
        <h4>목적 문구 변경</h4>
        <p className={style.warning}>*목적은 줄바꿈으로 구분해주세요.</p>
        <p><textarea  value={contextTransfer} onChange={onContextTransferChange} rows="15" cols="120" required/></p>
      </div>

      <Link passHref href="/info/purposePreview"><a className={style.button} target="_blank" onClick={onPreviewClick}>미리보기</a></Link>
      <input type="submit" onClick={onSubmitClick} className={style.button2} value="적용"></input>
    </form>
  )
}

export default SetPurpose;