import React, { useEffect, useState} from "react"
import { firestore as db } from "src/firebase/firebase"
import Link from "next/link"
import style from "admin/styles/postList.module.css"
import Pagination from "src/components/notice/Pagination"
import Loader from "src/components/public/Loader"
import CampaignIcon from '@mui/icons-material/Campaign';
import NoticeList from "src/components/notice/NoticeList"
import PhotoList from "src/components/notice/PhotoList"
import VideoList from "src/components/notice/VideoList"
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddPost from "admin/src/component/AddPost"
import EditPost from "admin/src/component/EditPost"

const PostList = (props) => {
  const [pageList, setPageList] = useState([])
  const [warpPage, setWarpPage] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [folderName, setFolderName] = useState("")
  const [selectedPost, setSelectedPost] = useState("")

  useEffect(() => {
    setSelectedPost("")
    setFolderName(props.folderName)
    const fetchPage = async () => {
      let firstPage;
      let endPage
      let tempPageList = []
      let tempWarpPage = []
      await db.collection('postCount').doc(props.folderName).get().then((doc) => {
        let pageCount;
        if (doc.data()?.count % props.postPerPage !== 0)
          pageCount = Math.floor(doc.data()?.count/props.postPerPage + 1)
        else
          pageCount = Math.floor(doc.data()?.count / props.postPerPage)
        if (currentPage < 4 && pageCount<=7) {
          firstPage = 1
          endPage = pageCount
          tempWarpPage.push(0)
          tempWarpPage.push(0)
        } else if (currentPage < 4 && pageCount > 7) {
          firstPage = 1
          endPage = 7
          tempWarpPage.push(0)
          tempWarpPage.push(8)
        } else if (currentPage >= 4 && pageCount <= 7) {
          firstPage = 1
          endPage = pageCount
          tempWarpPage.push(0)
          tempWarpPage.push(0)
        } else if (currentPage >= 4 && pageCount > 7 && pageCount > currentPage + 3) {
          firstPage = currentPage-3
          endPage = currentPage + 3
          tempWarpPage.push(currentPage-4)
          tempWarpPage.push(currentPage+4)
        } else if (currentPage >= 4 && pageCount > 7 && pageCount <= currentPage + 3) {
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
    }
    fetchPage();
  }, [currentPage])

  // const onGotoPageChange = (event) => {
  //   if (event.target.value > lastPage)
  //   {
  //     alert(`${lastPage}가 마지막 페이지입니다.`)
  //     setGotoPage(lastPage)
  //   }
  //   else
  //     setGotoPage(event.target.value)
  // }

  // const onButtonClick = (page) => {
  //   setCurrentPage(page)
  // }

  const onAddPostButtonClick = () => {
    setSelectedPost("new")
  }

  //하위 컴포넌트에서 상위(여기)로 데이터전달
  // const getPostName = () => {
  //   console.log("hi")
  // }

  return (
    <div className={style.mainContainer}>
      {selectedPost === "" ? (
        <>
          <div className={style.addPostContainer}>
            <div className={style.addPostButton} onClick={onAddPostButtonClick}>글 작성</div>
          </div>
          {props.folderName === "photo" ?
            <PhotoList page={currentPage} folderName={props.folderName} mode="admin" getPostName={(pn) => setSelectedPost(pn)} />
            :
            props.folderName === "video" ?
            <VideoList page={currentPage} folderName={props.folderName} mode="admin" getPostName={(pn) => setSelectedPost(pn)} />
            :
              <NoticeList page={currentPage} folderName={props.folderName} mode="admin" getPostName={(pn) => setSelectedPost(pn)} />
          }
          <ul className={style.pagination}>
            {warpPage && (warpPage[0] !== 0 &&
              <li className={style.page} onClick={() => setCurrentPage(warpPage[0])}><ArrowLeftIcon /></li>
            )}
            {pageList.map((page, index) => {
              return (
                <>
                  {
                    page === currentPage ? (
                      <li key={index} className={`${style.currentPage} ${style.page}`}>{page}</li>
                    ) : (
                      <li className={style.page} onClick={() => setCurrentPage(page)}>{page}</li>
                    )}
                </>
              )
            })}
            {warpPage && (warpPage[1] !== 0 &&
              <li className={style.page} onClick={() => setCurrentPage(warpPage[1])}><ArrowRightIcon /></li>
            )}
          </ul>
        </>
        ) : (
          <>
            {selectedPost==="new" ? <AddPost folderName={folderName} postName={selectedPost}/> : <EditPost folderName={folderName} postName={selectedPost}/>}
        </>
      )
      }
    </div>
  )
}

export default PostList;