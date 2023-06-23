import React, { useEffect, useState }  from "react"
import style from "styles/home/article.module.css"
import { firestore as db } from "src/firebase/firebase"
import Link from "next/link"
import Loader from "src/components/public/Loader"
import CampaignIcon from '@mui/icons-material/Campaign';

const Article = () => {
  const [selected, setSelected] = useState("anouncement")
  const [listData, setListData] = useState([])
  const [mobileMode, setMobileMode] = useState("false")
  const [isLoading, setIsLoading] = useState(true)
  const [fixedList, setFixedList] = useState([])
  let fetchedList;
  let prevList;
  let tempData = [];
  let tempFixedData = [];

  useEffect(() => {
    setIsLoading(true)
    let fixedCount = 0
    setFixedList([])
    const fetchData = async () => {
        fetchedList = (db.collection(selected)
          .orderBy("createdAt", "desc")
          .limit(6))
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
                createdAt: date,
                id: doc.id,
              }
            ])
          })
          setListData(tempData)
          setIsLoading(false)
        })
      }
    }
    fetchData();
  }, [selected])
  

  const onTabClick = (num) => {
    if (num === 0)
      setSelected("anouncement")
    if (num === 1)
      setSelected("media")
    if (num === 2)
      setSelected("schedule")
    if (num ===3)
      setSelected("apply")
  }
  return (
    <div className={style.container}>
      <div className={style.articleContainer}>
        <ul className={style.tab}>
          <li onClick={()=>onTabClick(0)} className={selected==="anouncement" ? `${style.selected}` : undefined}>공지/소식사항</li>
          <li onClick={() => onTabClick(1)} className={selected==="media" ? `${style.selected}` : undefined}>언론보도</li>
          <li onClick={() => onTabClick(2)} className={selected==="schedule" ? `${style.selected}` : undefined}>대회/행사일정</li>
          <li onClick={() => onTabClick(3)} className={selected==="apply" ? `${style.selected}` : undefined}>대회신청</li>
          <Link passHref href='notice/anouncement/1'><a><li> +</li></a></Link>
        </ul>
        <ul className={style.contentContainer}>
          {isLoading ? <Loader /> : listData.map((item, index) => {
            return (
              <Link passHref key={index} href='/article/[filename]/[page]/[id]' as={`/article/${selected}/1/${item.id}`}>
                <a>
                  <li className={style.table}>
                    <p>●</p>
                    <h4 className={style.createdAt}>{item.createdAt}</h4>
                    <h4 className={style.title}>{item.title}</h4>
                  </li>
                </a>
              </Link>
            )
          })}
        </ul>
      </div>
    </div>    
  )
}

export default Article;