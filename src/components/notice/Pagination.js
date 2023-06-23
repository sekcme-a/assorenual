import React, { useEffect, useState } from "react"
import { firestore as db } from "src/firebase/firebase"
import style from "styles/notice/pagination.module.css"
import Link from "next/link"
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Pagination = (props) => {
  const [pageList, setPageList] = useState([])
  const [warpPage, setWarpPage] = useState([])
  const [gotoPage, setGotoPage] = useState()
  const [lastPage, setLastPage] = useState()
  useEffect(async() => {
    let firstPage;
    let endPage
    let tempPageList = []
    let tempWarpPage = []
    setGotoPage(props.page)
    await db.collection('postCount').doc(props.docName).get().then((doc) => {
      let pageCount;
      if (doc.data()?.count % props.postPerPage !== 0)
        pageCount = Math.floor(doc.data()?.count/props.postPerPage) + 1
      else
        pageCount = Math.floor(doc.data()?.count /props.postPerPage)
      setLastPage(pageCount)
      if (props.page < 4 && pageCount<=7) {
        firstPage = 1
        endPage = pageCount
        tempWarpPage.push(0)
        tempWarpPage.push(0)
      } else if (props.page < 4 && pageCount > 7) {
        firstPage = 1
        endPage = 7
        tempWarpPage.push(0)
        tempWarpPage.push(8)
      } else if (props.page >= 4 && pageCount <= 7) {
        firstPage = 1
        endPage = pageCount
        tempWarpPage.push(0)
        tempWarpPage.push(0)
      } else if (props.page >= 4 && pageCount > 7 && pageCount > props.page + 3) {
        firstPage = props.page-3
        endPage = props.page + 3
        tempWarpPage.push(props.page-4)
        tempWarpPage.push(props.page+4)
      } else if (props.page >= 4 && pageCount > 7 && pageCount <= props.page + 3) {
        firstPage = pageCount -6
        endPage = pageCount
        tempWarpPage.push(pageCount -7)
        tempWarpPage.push(0)
      }
      for (let i = firstPage; i <= endPage; i++){
        tempPageList.push(i)
      }
      setPageList(tempPageList)
      setWarpPage(tempWarpPage)
    })
  }, [props])
  
  const onGotoPageChange = (event) => {
    if (event.target.value > lastPage)
    {
      alert(`${lastPage}가 마지막 페이지입니다.`)
      setGotoPage(lastPage)
    }
    else
      setGotoPage(event.target.value)
  }
  return (
    <>
      <ul className={style.pagination}>
        {warpPage && (warpPage[0] !== 0 &&
          <Link href='/notice/[filename]/[page]' as={`/notice/${props.docName}/${warpPage[0]}`} passhref>
            <a><li className={style.page}><ArrowLeftIcon /></li></a>
          </Link>
        )}
        {pageList.map((page, index) => {
          return (
            <>
              {
                page === props.page ? (
                  <li key={index} className={`${style.currentPage} ${style.page}`}>{page}</li>
                ):(
                <Link key={index} href='/notice/[filename]/[page]' as={`/notice/${props.docName}/${page}`} passhref>
                  <a><li className={style.page}>{page}</li></a>
                </Link>
              )}
            </>
          )
        })}
        {warpPage && (warpPage[1] !== 0 &&
          <Link href='/notice/[filename]/[page]' as={`/notice/${props.docName}/${warpPage[1]}`} passhref>
            <a><li className={style.page}><ArrowRightIcon /></li></a>
          </Link>
        )}
      </ul>
      <div className={style.gotoContainer}>
        <input className={style.input} type="text" id="name" size="1" value={gotoPage} onChange={onGotoPageChange} /><p>/{lastPage}페이지</p>
        <Link href='/notice/[filename]/[page]' as={`/notice/${props.docName}/${gotoPage}` } passhref>
          <a><div className={style.button}>이동</div></a>
        </Link>
      </div>
    </>
  )
}

export default Pagination;