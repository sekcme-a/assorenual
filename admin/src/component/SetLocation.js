import React, {useEffect, useState} from "react"
import style from "admin/styles/setLocation.module.css"
import Link from "next/link"
import { firestore as db } from "src/firebase/firebase"

const SetLocation = () => {
  const [locX, setLocX] = useState("")
  const [locY, setLocY] = useState("")
  const [address, setAddress] = useState("")
  const [subway, setSubway] = useState("")
  const [bus, setBus] = useState("")

  const onLocXChange = (e) => {setLocX(e.target.value)}
  const onLocYChange = (e) => {setLocY(e.target.value)}
  const onAddressChange = (e) => {setAddress(e.target.value)}
  const onSubwayChange = (e) => {setSubway(e.target.value)}
  const onBusChange = (e) => { setBus(e.target.value) }
  
  useEffect(() => {
    const fetchData = async () => {
      await db.collection("setting").doc("location").get().then((doc) => {
        setLocX(doc.data().locX)
        setLocY(doc.data().locY)
        setAddress(doc.data().address)
        setSubway(doc.data().subway)
        setBus(doc.data().bus)
      })
    }
    fetchData();
  },[])


  const onPreviewClick = async () => {
    if(locX==="" || locY===""|| address==="" || subway==="" || bus==="" || locX===undefined|| locY===undefined|| address===undefined|| subway===undefined || bus===undefined)
      alert("빈칸을 채워주세요.")
    else {
      db.collection("preview").doc("location").set({ locX: locX, locY: locY, address: address, subway: subway, bus: bus})
    }
  }

  const onSubmitClick = (event) => {
    event.preventDefault();
    if(locX==="" || locY===""|| address==="" || subway==="" || bus==="" || locX===undefined|| locY===undefined|| address===undefined|| subway===undefined || bus===undefined)
      alert("빈칸을 채워주세요.")
    else {
      db.collection("setting").doc("location").set({ locX: locX, locY: locY, address: address, subway: subway, bus: bus})
      alert("적용되었습니다.")
    }
  }

  return (
    <form className={style.mainContainer}>
      <div className={`${style.container} ${style.container2}`}>
        <h4>지도 좌표 변경</h4>
        <p>경도 : <input type="text" value={locX} onChange={onLocXChange} size="60" required/></p>
        <p>위도 : <input type="text" value={locY} onChange={onLocYChange} size="60" required/></p>
      </div>

      <div className={`${style.container} ${style.container3}`}>
        <h4>주소 문구 변경</h4>
        <p><textarea  value={address} onChange={onAddressChange} rows="4" cols="120" required/></p>
      </div>

      <div className={`${style.container} ${style.container3}`}>
        <h4>지하철 역 문구 변경</h4>
        <p><textarea  value={subway} onChange={onSubwayChange} rows="6" cols="120" required/></p>
      </div>

      <div className={`${style.container} ${style.container3}`}>
        <h4>버스정류장 문구 변경</h4>
        <p><textarea  value={bus} onChange={onBusChange} rows="6" cols="120" required/></p>
      </div>

      <Link passHref href="/info/locationPreview"><a className={style.button} target="_blank" onClick={onPreviewClick}>미리보기</a></Link>
      <input type="submit" onClick={onSubmitClick} className={style.button2} value="적용"></input>
    </form>
  )
}

export default SetLocation;