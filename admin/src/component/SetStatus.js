import React,{useEffect, useState} from "react"
import style from "admin/styles/setPurpose.module.css"
import { firestore as db, storage } from "src/firebase/firebase"
import Link from "next/link"
import { getCompressedImg } from "src/hooks/getCompressedImg"

const SetStatus = () => {
  const [data, setData] = useState()
  const [text, setText] = useState("")
  const [img, setImg] = useState("")

  const onImgChange = async (e) => {
    if (e.target.files[0] !== undefined) {
      const imgName = e.target.files[0].name;
      setImg(imgName)
      storage.ref().child(`status/${imgName}`).put(e.target.files[0]).then(function (snapshot) {
        alert("이미지가 추가됬습니다.")
      })
    }
  }

  const onTextChange = (e) => {setText(e.target.value)}

  //firebase 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      let tempText="";
      await db.collection("setting").doc("status").get().then((doc) => {
        const res = JSON.parse(doc.data().data)
        setData(res)
        res.forEach((item) => {
          tempText += `${item.spot}///${item.name}///${item.img}`
          if (item.data) {
            if (item.data[0] !== "") {
              for (let i = 0; i < item.data.length; i++) {
                tempText += `///${item.data[i]}`
              }
              tempText += "\n"
            } else tempText+="\n"
          } else {
            tempText += "\n"
          }
        })
        setText(tempText)
      })
    }
    fetchData();
  }, [])
  
  const textToJsonAndSave = async (isPreview) => {
    let temp="[";
    const items = text.split("\n");
    items.forEach((item) => {
      if (item) {
        const splitedItem = item.split("///")
        temp += `{"spot":"${splitedItem[0]}",`
        temp += `"name":"${splitedItem[1]}",`
        temp += `"img":"${splitedItem[2]}",`
        if (splitedItem.length === 3)
          temp+=`"data":[""]},`
        if(splitedItem.length>3)
          temp += `"data":[`
        if (splitedItem.length === 4) {
          temp += `"${splitedItem[3]}"]},`
        }
        else {
          for (let i = 3; i < splitedItem.length; i++) {
            if (i === 3)
              temp +=`"${splitedItem[i]}",`
            else if (i === splitedItem.length - 1)
              temp += `"${splitedItem[i]}"]},`
            else
              temp += `"${splitedItem[i]}",`
          }
        }
      }
    })
    temp = temp.substring(0, temp.length - 1)
    temp += "]"
    try {
      const res = JSON.parse(temp)
      if(isPreview===true)
        await db.collection("preview").doc("status").set({ data: temp })
      if (isPreview === false) {
        await db.collection("setting").doc("status").set({ data: temp })
        alert("적용되었습니다.")
      }
    } catch (e) {
      alert("형식에 맞게 작성되지않았습니다!\n" + e)
      return false;
    }
  }

  //string의 context를 배열로 변경하고 db에 저장
  const onPreviewClick = () => {
    textToJsonAndSave(true)
  }
  //string의 context를 배열로 변경하고 db에 저장
  const onSubmitClick = (event) => {
    event.preventDefault();
    textToJsonAndSave(false)
  }


  return (
    <form className={style.mainContainer}>
      <div className={`${style.container} ${style.container1}`}>
        <h4>이미지 추가</h4>
        <p className={style.warning}>*이미지의 크기가 2MB보다 클 경우 자동으로 압축됩니다.</p>
        <p>이미지 선택 : <input type="file" name="selectedImg[]" onChange={onImgChange} accept="image/*"/></p>
        <p>{`추가된 이미지명 : ${img}`}</p>
      </div>

      <div className={`${style.container} ${style.container2}`}>
        <h4>임원현황 변경</h4>
        <p className={style.warning}>*형식 : 직위///성명///이미지이름///프로필1///프로필2///프로필3  줄바꿈(enter키)</p>
        <p><textarea  value={text} onChange={onTextChange} rows="30" cols="120" required/></p>
      </div>

      <Link passHref href="/info/statusPreview"><a className={style.button} target="_blank" onClick={onPreviewClick}>미리보기</a></Link>
      <input type="submit" onClick={onSubmitClick} className={style.button2} value="적용"></input>
    </form>
  )
}

export default SetStatus;