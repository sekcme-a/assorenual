import React, {useEffect, useState, useContext} from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import style from "styles/article/article.module.css"
import { firestore as db } from "src/firebase/firebase"
import Link from "next/link"
import dynamic from 'next/dynamic'
import DownloadIcon from '@mui/icons-material/Download';
import Banner from "src/components/public/Banner"
import NavbarVerticle from "src/components/public/NavbarVerticle"
import { MenuItems } from "src/data/menuItems"
import LocNav from "src/components/public/LocNav"
import SubMenuTitle from "src/components/public/SubMenuTitle"
import { saveAs } from 'file-saver'
import HeadMeta from "src/components/public/HeadMeta"

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>로딩중 ...</p>,
})

const ShowArticle = () => {
  const router = useRouter();
  const { ...data } = router.query
  const [bannerRandom, setBannerRandom] = useState()
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [postTitle, setPostTitle] = useState("")
  const [postFilesData, setPostFilesData] = useState([])
  const [postContent, setPostContent] = useState("")
  const [hasPostFile, setHasPostFile] = useState(false)
  const [author, setAuthor] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [authorUid, setAuthorUid] = useState("")
  const [isPreview, setIsPreview] = useState(false)

  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

  //banner에 랜덤한 자연수를 props로 넘겨 몇가지 banner사진중 랜덤으로 보여줌
  useEffect(() => {
    setBannerRandom(getRandom(1, 5))
    MenuItems.forEach((item) => {
      if (item.path === `/notice/${data.filename}`) {
        setTitle(item.title)
        setSubtitle(item.subtitle)
        return;
      }
    })
  }, [data])
  


  useEffect(async () => {
    setHasPostFile(false)
    // MenuItems.forEach((item) => {
    //   if (item.path === `/notice/${data.filename}`) {
    //     setTitle(item.title)
    //     setSubtitle(item.subtitle)
    //     return;
    //   }
    // })
    if (data.filename) {
      db.collection(data.filename).doc(data.id).get().then((doc) => {
        let tempFilesListData = []
        setPostFilesData(tempFilesListData)
        let tempData;
        const tempFileData = doc.data().files.split("URLENDPOINT")
        const d = new Date(doc.data().createdAt.toMillis())
        const date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
        setCreatedAt(date)
        setAuthor(doc.data().author)
        for (let i = 0; i < tempFileData.length; i++) {
          tempData = tempFileData[i].split("URLSTARTPOINT")
          tempFilesListData = [
            ...tempFilesListData,
            {
              name: tempData[0],
              url: tempData[1],
            }
          ]
        }
        setPostFilesData(tempFilesListData)
        // if (postFilesData !== undefined) {
        //   postFilesData.forEach((data) => {
        //     if(data.name!=="")
        //       setHasPostFile(true)
        //   })
        // }
        setPostTitle(doc.data().title)
        setPostContent(doc.data().post)
        setAuthorUid(doc.data().uid)
      })
    }
  }, [data.filename])

  useEffect(() => {
    if (postFilesData !== undefined) {
      postFilesData.forEach((data) => {
        if(data.name!=="")
          setHasPostFile(true)
      })
    }
  }, [postFilesData])
  
  const downloadFile = (url, name) => {
    saveAs(url, name)
  }
  
  return (
    <>
      <HeadMeta
        title="대한생활체육회 Article"
        description="대한생활체육회의 포스팅을 확인하세요."
        url="https://xn--vk1by6xrzecngs4l6obxj.com"
      />
      {isPreview && <div className="preview">미리보기중입니다.</div>}
      <Banner bannerNumber={bannerRandom}/>
      <div className="subpage__container">
        <LocNav title={title} subtitle={subtitle} />
        <NavbarVerticle loc={title}/>
        <div className="content__container">
          <SubMenuTitle title={`${subtitle}`} subtitle={`대한생활체육회의 ${subtitle} 전해드립니다.`} />
          <div className={style.mainContainer}>
            <div className={style.infoContainer}>
              <div className={style.title}><p>제목</p><h4>{postTitle}</h4></div>
              <div className={style.author}><p>작성자</p><h4>{author}</h4></div>
              <div className={style.createdAt}><p>등록일</p><h4>{createdAt}</h4></div>
            </div>
              {hasPostFile && (
                <ul className={style.fileContainer}>
                  <h4>첨부파일</h4>
                  <div className={style.fileList}>
                    {postFilesData.map((data, index) => {
                      if (data.url !== undefined) {
                        // if (data.url.includes(".jpg"))
                        return (
                            <li key={index} className={style.fileName} onClick={()=>downloadFile(data.url, data.name)}>
                              <h6>{data.name}</h6>
                            </li>
                        )
                      }
                    })}
                  </div>
                </ul>
              )}
          <QuillNoSSRWrapper className={style.quillContainer} value={postContent} readOnly={true} theme="bubble" />
            <div className={style.buttonContainer}>
              <Link href="/notice/[subtitle]/[page]"as={`/notice/${data.filename}/${data.page}`}>
                <div className={style.button} >돌아가기</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <Header nav={`${title}`} />
      <div className="body">
        <div className="body-container">
          <div className="content-container"> */}

          {/* </div>
          <NavbarVertical loc={title} />
        </div>
      </div> */}
    </>
  )
}
export default ShowArticle