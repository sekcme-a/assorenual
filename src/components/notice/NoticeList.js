import React, { useEffect, useState} from "react"
import { firestore as db } from "src/firebase/firebase"
import Link from "next/link"
import style from "styles/notice/noticeList.module.css"
import Pagination from "src/components/notice/Pagination"
import Loader from "src/components/public/Loader"
import CampaignIcon from '@mui/icons-material/Campaign';

const NoticeList = (props) => {
  const [listData, setListData] = useState([])
  const [mobileMode, setMobileMode] = useState("false")
  const [isLoading, setIsLoading] = useState(true)
  const [fixedList, setFixedList] = useState([])
  let fetchedList;
  let prevList;
  let tempData = [];
  let tempFixedData = [];

  // PC/모바일 환경에 따라 table style 바꾸기위함
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 670)
        setMobileMode(true)
      else
        setMobileMode(false)
    }
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setFixedList([])
      await db.collection("fixed").orderBy("createdAt", "desc").get().then(async (query) => {
        query.forEach((doc) => {
          if (db.collection(props.folderName).doc(doc.id)) {
            db.collection(props.folderName).doc(doc.id).get().then((doc) => {
              if (doc.data()) {
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
                tempFixedData = ([
                  ...tempFixedData,
                  {
                    title: doc.data().title,
                    uid: doc.data().uid,
                    author: doc.data().author,
                    createdAt: date,
                    id: doc.id,
                    count: doc.data().count,
                    fixed: doc.data().fixed
                  }
                ])
                setFixedList(tempFixedData)
              }
            })
          }
        })
      })
      
      if (props.page === 1) {
        setTimeout(() => {
          fetchedList = (db.collection(props.folderName)
            .orderBy("createdAt", "desc")
            .limit(9))
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
                    fixed: doc.data().fixed
                  }
                ])
              })
              setListData(tempData)
              setIsLoading(false)
            })
          }
        },0)
      }
      else if (props.page !== 1) {
        prevList = (db.collection(props.folderName)
          .orderBy("createdAt", "desc")
          .limit(9 * (props.page - 1)))
        
        await prevList.get().then(async (snap) => {
          let lastVis = snap.docs[snap.docs.length - 1]
          if (lastVis !== undefined) {
            fetchedList = db.collection(props.folderName)
              .orderBy("createdAt", "desc")
              .startAfter(lastVis)
              .limit(9)
          }
        })
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
                  fixed: doc.data().fixed
                }
              ])
            })
            setListData(tempData)
            setIsLoading(false)
          })
        }
      }
    }
    fetchData();
  }, [props.folderName])

  const onListClicked = (id) => {
    props.getPostName(id)
  }

  return (
    <>
      {isLoading ? <Loader /> : mobileMode ?
        <>
          <div className={style.menu}>
            <h4 className={style.count}>번호</h4>
            <h4 className={style.title}>제 목</h4>
          </div>
          <ul>
            {fixedList.map((item, index) => {
              return (
                <Link passhref key={index} href='/article/[filename]/[page]/[id]' as={`/article/${props.folderName}/${props.page}/${item.id}`}>
                  <a>
                  <li className={`${style.table} ${style.fixed}`}>
                    <p className={style.count}><CampaignIcon /></p>
                      <h4 className={style.title}>
                        {item.title}
                        <h4 className={style.mobile}>{item.createdAt} | {item.author}</h4>
                      </h4>
                    </li>
                    </a>
                </Link>
              )
            })}
            {listData.map((item, index) => {
              return (
                <Link passhref key={index} href='/article/[filename]/[page]/[id]' as={`/article/${props.folderName}/${props.page}/${item.id}`}>
                  <a>
                    <li className={style.table}>
                      <p className={style.count}>{item.count}</p>
                      <h4 className={style.title}>
                        {item.title}
                        <h4 className={style.mobile}>{item.createdAt} | {item.author}</h4>
                      </h4>
                    </li>
                  </a>
                </Link>
              )
            })}
          </ul>
        </>
        :
        <>
          <div className={style.menu}>
            <h4 className={style.count}>번호</h4>
            <h4 className={style.title}>제 목</h4>
            <h4 className={style.createdAt}>등록일</h4>
            <h4 className={style.author}>작성자</h4>
          </div>
          <ul className={style.list}>
            {props.mode === "admin" ? fixedList.map((item, index) => {
              return (
                <li key={index} className={`${style.table} ${style.fixed}`} onClick={() => onListClicked(item.id)}>
                  <p className={style.count}><CampaignIcon /></p>
                  <h4 className={style.title}>{item.title}</h4>
                  <h4 className={style.createdAt}>{item.createdAt}</h4>
                  <h4 className={style.author}>{item.author}</h4>
                </li>
              )
            })
            : fixedList.map((item, index) => {
              return (
                <Link passhref key={index} href='/article/[filename]/[page]/[id]' as={`/article/${props.folderName}/${props.page}/${item.id}`}>
                  <a>
                  <li className={`${style.table} ${style.fixed}`}>
                    <p className={style.count}><CampaignIcon /></p>
                    <h4 className={style.title}>{item.title}</h4>
                    <h4 className={style.createdAt}>{item.createdAt}</h4>
                    <h4 className={style.author}>{item.author}</h4>
                    </li>
                    </a>
                </Link>
              )
            })
            
            }
            {props.mode === "admin" ?
              listData.map((item, index) => {
              return (
                <li key={index} className={`${style.table} ${style.admin}`} onClick={()=>onListClicked(item.id)}>
                  <p className={style.count}>{item.count}</p>
                  <h4 className={style.title}>{item.title}</h4>
                  <h4 className={style.createdAt}>{item.createdAt}</h4>
                  <h4 className={style.author}>{item.author}</h4>
                </li>
              )
            })
              :
              listData.map((item, index) => {
              return (
                <Link passhref key={index} href='/article/[filename]/[page]/[id]' as={`/article/${props.folderName}/${props.page}/${item.id}`}>
                  <a>
                  <li className={style.table}>
                    <p className={style.count}>{item.count}</p>
                    <h4 className={style.title}>{item.title}</h4>
                    <h4 className={style.createdAt}>{item.createdAt}</h4>
                    <h4 className={style.author}>{item.author}</h4>
                    </li>
                    </a>
                </Link>
              )
            })}
          </ul>
        </>
      }
      {listData.length === 0 && isLoading===false && <h4 className={style.noPostInfo}>아직 게시물이 없습니다.</h4>}
      {props.mode === "user" && isLoading === false && <Pagination docName={props.folderName} page={props.page} postPerPage={9} />}
    </>
  )
}

export default NoticeList;