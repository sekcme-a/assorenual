import React, { useEffect } from 'react'
import style from "styles/info/location.module.css"
import Script from "next/script"
import Link from "next/link"
import { Map, MapMarker } from "react-kakao-maps-sdk"

const KakaoMap =(props)=>{
      
  return (
    <div className={style.map}>
      <Map
        center={{ lat: props.locX, lng: props.locY }}
        style={{ width: "100%", height: "360px" }}
      >
        <MapMarker position={{ lat: props.locX, lng: props.locY }}>
          <div className={style.marker}>(사)대한생활체육회<br />
            <Link passhref href={`https://map.kakao.com/link/map/대한생활체육회,${props.locX},${props.locY}`}><a target="_blank">큰지도보기</a></Link> /
            <Link passhref href={`https://map.kakao.com/link/to/대한생활체육회,${props.locX},${props.locY}`}><a target="_blank"> 길찾기</a></Link>
          </div>
        </MapMarker>
      </Map>
    </div>
    )
}

export default KakaoMap;