import React,{useEffect, useState} from "react"
import style from "admin/styles/setPurpose.module.css"
import { firestore as db, storage } from "src/firebase/firebase"
import Link from "next/link"

const SetStatus = (props) => {
  const [text, setText] = useState("")
  const [img, setImg] = useState("")

  const onImgChange = async (e) => {
    if (e.target.files[0] !== undefined) {
      const imgName = e.target.files[0].name;
      setImg(imgName)
      storage.ref().child(`group/${imgName}`).put(e.target.files[0]).then(function (snapshot) {
        alert("이미지가 추가됬습니다.")
      })
    }
  }

  const onTextChange = (e) => {setText(e.target.value)}

  //firebase 데이터 가져오기
  useEffect(async () => {
    let tempText="";
    await db.collection("setting").doc(props.type).get().then((doc) => {
      const res = JSON.parse(doc.data().data)
      // setData(res)
      res.forEach((item) => {
        tempText += `${item.name}///${item.img}///${item.homepage}`
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
    // constantChange();
  }, [])

  
  //옛날 firebase 데이터 가져와서 변환시킬때
  // const constantChange = async () => {
  //   let tempText=""
  //   await db.collection("setting").doc(props.type).get().then((doc) => {
  //     const res = JSON.parse(doc.data().data)
  //     res.forEach((item) => {
  //       tempText+= `${item.groupName}///${item.img}///-///회장 : ${item.leader}\n`
  //     })
  //   })
  //   setText(tempText)
  // }

  // const constantChange = async () => {
  //   let tempText = ""
  //   await db.collection("setting").doc(props.type).get().then((doc) => {
  //     const res = JSON.parse(doc.data().data)
  //     res.forEach((item) => {
  //       tempText += `${item.name}///${item.img}///${item.homepage}///${item.data[0]}///체육회명 : ${item.name}\n`
  //     })
  //   })
  //   setText(tempText)
  // }
  
  const textToJsonAndSave = async (isPreview) => {
    let temp="[";
    const items = text.split("\n");
    items.forEach((item) => {
      if (item) {
        const splitedItem = item.split("///")
        temp += `{"name":"${splitedItem[0]}",`
        temp += `"img":"${splitedItem[1]}",`
        temp += `"homepage":"${splitedItem[2]}",`
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
        await db.collection("preview").doc(props.type).set({ data: temp })
      if (isPreview === false) {
        await db.collection("setting").doc(props.type).set({ data: temp })
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
        <p>이미지 선택 : <input type="file" name="selectedImg[]" onChange={onImgChange} accept="image/*" /></p>
        <p>{`추가된 이미지명 : ${img}`}</p>
      </div>

      <div className={`${style.container} ${style.container2}`}>
        <h4>임원현황 변경</h4>
        <p className={style.warning}>*형식 : 체육회명///이미지명(없으면"-"로 표기)///체육회홈페이지(없으면"-"로 표기)///내용1///내용2///내용3...  줄바꿈(enter키)</p>
        <p className={style.warning}>*홈페이지 주소는 전체주소를 적어야 합니다. 예)https://www.naver.com (o)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;www.naver.com (x)</p>
        <p><textarea  value={text} onChange={onTextChange} rows="30" cols="120" required/></p>
      </div>

      <Link passHref href={`/group/${props.type}Preview`}><a className={style.button} target="_blank" onClick={onPreviewClick}>미리보기</a></Link>
      <input type="submit" onClick={onSubmitClick} className={style.button2} value="적용"></input>
    </form>
  )
}

export default SetStatus;