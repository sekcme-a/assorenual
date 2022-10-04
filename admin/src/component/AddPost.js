import React, { useState, useEffect, useContext } from "react"
import dynamic from 'next/dynamic'
import { Router, useRouter } from "next/router"
import { useLeavePageConfirm } from "src/hooks/useLeavePageConfirm"
import { compressImage } from "src/hooks/compressImage"
import CachedIcon from '@mui/icons-material/Cached';
import { FileUpload } from "src/firebase/FileUpload"
import { firestore as db } from "src/firebase/firebase"
// import { uploadToFirebase } from "src/firebase/uploadToFirebase"
// import { AddCommentOutlined } from "@mui/icons-material"
import { controlPostCount } from "src/firebase/controlPostCount"
// import { useBeforeunload } from "react-beforeunload"
import style from "admin/styles/addpost.module.css"
import 'react-quill/dist/quill.snow.css'
import { UserContext } from "src/data/context";

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>로딩중 ...</p>,
})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link'],
    ['clean'],
    ['video']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
const formats = [
  'header',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'align',
  'video',
]


const AddPost = (props) => {
  const [titleText, setTitleText] = useState("")
  const [imgHTML, setImgHTML] = useState("")
  const [imgList, setImgList] = useState([])
  const [fileList, setFileList] = useState([])
  const [textData, setTextData] = useState("")
  const [post, setPost] = useState("")
  const [fixed, setFixed] = useState(false)
  const [author, setAuthor] = useState("")
  const [videoThumbnail, setVideoThumbnail] = useState("")
  const router = useRouter();
  const { user, username, userrole } = useContext(UserContext);

  const onTitleChange = (e) => { setTitleText(e.target.value) }
  const onAuthorChange = (e) => { setAuthor(e.target.value) }
  
  useLeavePageConfirm()

  useEffect(() => {
    setAuthor(username)
  },[])
  const onChange = (notes) => {
    setTextData(notes)
  }

  const onFileChange = (e) => {
    if (e.target.files[0] !== undefined) {
      if (e) {
        setFileList([
          ...fileList,
          {
            file: e.target.files[0]
          }
        ])
      }
    }
  }

  const onFileListDeleteClick = (file) => {
    let FL = [...fileList]
    let i = 0;
    FL.forEach((item) => {
      if(item!==undefined)
        if (item.file.name === file)
          delete FL[i]
      i++
    })
    setFileList([...FL])
  }

  
  const onImgChange = async (e) => {
    const imgId = Math.floor(Math.random() * 100000000000000000000000000001)
    let CompressedFile;
    let imgCustomHTML
    if(e.target.files[0] !==undefined)
      imgCustomHTML = `image<${e.target.files[0].name}-${imgId}" width="400" height="300" alt="${e.target.files[0].name}">image`//여기
    setImgHTML(imgCustomHTML)
    if (e.target.files[0] !== undefined) {
      if (checkIsImage(e.target.files[0].name)) {
        if (!checkIsImageSize(e.target.files[0].size)) {
          CompressedFile = await compressImage(e.target.files[0])
        } else {
          CompressedFile = e.target.files[0]
        }
        const reader = new FileReader();
        reader.readAsDataURL(CompressedFile)
        reader.onloadend = () => {
          setImgList([
            ...imgList,
            {
              imgData: CompressedFile,
              imgHTML: imgCustomHTML,
              base64data: reader.result,
            }
          ])
        }
      }
    }
  }

  //업로드한게 이미지가 맞는지 확인
  const checkIsImage = (file) => {
    const pathpoint = file.lastIndexOf('.')
    const filepoint = file.substring(pathpoint+1,file.length)
    const filetype = filepoint.toLowerCase();
    if (filetype == 'jpg' || filetype == 'png' || filetype == 'git' || filetype == 'jpeg' || filetype == 'bmp') {
      return true;
    } else {
      alert("이미지 파일만 선택할 수 있습니다.\n (.jpg .gif .png .jpeg .bmp)")
      return false;
    }
  }
  //이미지의 크기가 2MB이하인지 확인 후, 아니라면 압축할지 물어본뒤 압축진행.
  const checkIsImageSize = (img) => {
    const maxSize = 2 * 1024 * 1024; //3MB
    if (img > maxSize) {
      return false;
    }
    else
      return true
  }

  const onPreviewClick = () => {
    let text = textData
    imgList.forEach((img) => {
      let newImgHTML = img.imgHTML
      const splitedHTML = newImgHTML.split("width")
      newImgHTML = splitedHTML[0]
      newImgHTML = newImgHTML.replace('image<', 'image&lt;')
      newImgHTML = newImgHTML.replace('>image', '&gt;image')
      while (text !== text.replace(newImgHTML, `<img src="${img.base64data}"`)) {
        text = text.replace(newImgHTML, `<img src="${img.base64data}"`)
        text = text.replace('&gt;image','>')
      }
    })
    setPost(text)
  }

  const onSubmit = async (event) => {
    //날짜 가져오기 2021/12/25 이렇게 (겁나중요)
    // const ts1 = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()
    event.preventDefault();
    let imgsURL = []
    let filesURL;
    let postText;
    let thumbnailURL = "";
    let temp;
    if (titleText) {
      imgsURL = await uploadImages();
      if (imgsURL[0]) {
        temp = imgsURL[0].split("URLSTARTPOINT")
        thumbnailURL = temp[1]
      }
      // filesURL = await uploadFiles();
      postText = changePostText(imgsURL)
      // uploadToFirebase([업로드collection경로],[업로드document경로(자동ID로할꺼면null)],업로드할 내용 hashmap)
      const resultOfUploadFiles = await uploadFiles()
      await db.collection('postCount').doc(props.folderName).get().then((doc) => {
        const postHashMap = {
          title: titleText,

          createdAt: new Date(),
          author: author,
          files: resultOfUploadFiles,
          uid: user.uid,
          post: postText,
          count: doc.data().count + 1,
          fixed: fixed,
        }
        const imageHashMap = {
          title: titleText,
          createdAt: new Date(),
          author: author,
          files: resultOfUploadFiles,
          uid: user.uid,
          post: postText,
          thumbnail: thumbnailURL,
          count: doc.data().count + 1,
          fixed: fixed,
        }
        const videoHashMap = {
          title: titleText,
          createdAt: new Date(),
          author: author,
          files: resultOfUploadFiles,
          uid: user.uid,
          post: postText,
          thumbnail: videoThumbnail,
          count: doc.data().count + 1,
          fixed: fixed,
        }

        if (props.folderName==="photo") {
          if (imageHashMap.thumbnail === "") {
            alert("포토갤러리에는 적어도 1개 이상의 사진이 업로드되어야합니다!")
            return;
          }
        }
        if (props.folderName === "video") {
          if (videoHashMap.thumbnail === "") {
            alert("동영상갤러리에는 썸네일이 될 메인 동영상이 필요합니다!")
            return;
          }
        }

        if (props.folderName === "photo") {
          db.collection("photo").add(imageHashMap)
          controlPostCount("photo","add")
        }
        else if (props.folderName === "video") {
          db.collection("video").add(videoHashMap)
          controlPostCount("video","add")
        }
        else {
          db.collection(props.folderName).add(postHashMap)
            .then((docRef) => {
              if (fixed)
                db.collection("fixed").doc(docRef.id).set({createdAt: new Date()})
          })
          controlPostCount(props.folderName,"add")
        }
        

        setTitleText("")
        setFileList([])
        setVideoThumbnail("")
        setPost([])
        setTextData("")
        setImgHTML("")
        alert("업로드가 완료됬습니다!")
        router.push(`/admin/home`)
      })
    }
    else
      alert("제목을 입력해주세요.")
  }

  const uploadImages = async () => {
    let text = textData
    let x;
    let imgsURL = []
    return new Promise(async function (resolve, reject) {
      for (let i = 0; i < imgList.length; i++) {
        let newImgHTML = imgList[i].imgHTML
        if (typeof (newImgHTML) === "string") {
          const splitedHTML = newImgHTML.split("width")
          newImgHTML = splitedHTML[0]
          newImgHTML = newImgHTML.replace('image<', 'image&lt;')
          newImgHTML = newImgHTML.replace('>image', '&gt;image')
          if (text.includes(newImgHTML)) {
            x = await FileUpload("images", imgList[i].imgData, user.uid)
            imgsURL.push(`${imgList[i].imgData.name}URLSTARTPOINT${x}`)
          }
        }
      }
      resolve(imgsURL)
    })
  }

  const changePostText = (imgsURL) => {
    let text = textData;
    imgList.forEach((img) => {
      let newImgHTML = img.imgHTML
      if (typeof (newImgHTML) === "string") {
        const splitedHTML = newImgHTML.split("width")
        newImgHTML = splitedHTML[0]
        newImgHTML = newImgHTML.replace('image<', 'image&lt;')
        newImgHTML = newImgHTML.replace('>image', '&gt;image')
        while (text.includes(newImgHTML)) {
          for (let i = 0; i < imgsURL.length; i++) {
            const imgsURLSplit = imgsURL[i].split("URLSTARTPOINT")
            if (newImgHTML.includes(imgsURLSplit[0])) {
              text = text.replace(newImgHTML, `<img src="${imgsURLSplit[1]} alt="${imgsURLSplit[0]}"`)
              text = text.replace('&gt;image', '>')
            }
          }
        }
      }
    })
    return text
  }

  const uploadFiles = async () => {
    let x;
    let filesURL="";
    return new Promise(async function (resolve, reject) {
      // fileList.forEach(async (file) => {
      //   if (file !== undefined) {
      //     x = await FileUpload("files", file.file, user.uid)
      //     filesURL = filesURL.concat( `${file.file.name}URLSTARTPOINT${x}URLENDPOINT`)
      //   }
      // })
      for (let i = 0; i < fileList.length; i++){
        if (fileList[i] !== undefined) {
          x = await FileUpload("files", fileList[i].file, user.uid)
          // filesURL = filesURL.concat(`${fileList[i].file.name}URLSTARTPOINT${x}URLENDPOINT`)
          filesURL += `${fileList[i].file.name}URLSTARTPOINT${x}URLENDPOINT`
        }
      }
      resolve(filesURL)
    })
  }

  const onCheckboxChange = (e) => {
    setFixed(e.currentTarget.checked)
  }

  const onVideoThumbnailChange = (e) => {
    setVideoThumbnail(e.target.value)
  }

  return (
    <form className={style.mainContainer}>
      <div className={`${style.container} ${style.container1}`}>
        <h4>제목</h4>
        <p>제목 문구 : <input type="text" value={titleText} onChange={onTitleChange} size="60" required/></p>
      </div>
      {props.folderName !== "photo" && props.folderName !== "video" &&
        <div className={`${style.container} ${style.container2}`}>
          <h4>상단고정</h4><input onChange={onCheckboxChange} type="checkbox"></input>
        </div>
      }
      {props.folderName === "video" &&
        <div className={`${style.container} ${style.container1}`}>
          <h4>동영상썸네일</h4>
          <p>메인동영상 주소 : <input type="text" value={videoThumbnail} onChange={onVideoThumbnailChange} size="60" required/></p>
        </div>
      }
      <div className={`${style.container} ${style.container1}`}>
        <h4>작성자</h4>
        <p>작성자 : <input type="text" value={author} onChange={onAuthorChange} size="60" required/></p>
      </div>
        <div className={`${style.container} ${style.addFile}`}>첨부파일 : <input type="file" name="selectedFile[]" onChange={onFileChange} />
          {fileList && fileList.map((item, index) => {
            if (item !== undefined) {
              return (
                <><h4 key={index} className={style.files}>{item.file.name}<h4 className={style.fileDelete} onClick={() => { onFileListDeleteClick(item.file.name) }}>X</h4></h4><br/></>
              )
            }
          })}
        </div>
        <div className={`${style.container} ${style.container3}`}>
        <h4>이미지 추가</h4>
        <p className={style.warning}>*이미지의 크기가 2MB보다 클 경우 자동으로 압축됩니다.</p>
        <p>이미지 선택 : <input type="file" name="selectedImg[]" onChange={onImgChange} accept="image/*"/></p>
        <textarea name="imgURL" value={imgHTML}cols="60" rows="5" readOnly ></textarea><br/>
      </div>
      <div className={`${style.quillContainer} ${style.container}`}>
        <QuillNoSSRWrapper className={style.quill}onChange={onChange} modules={modules} formats={formats} theme="snow" />
      </div>
        <input className={style.submitButton} type="submit" value="업로드" onClick={onSubmit}></input>
        <div className={`${style.quillContainer} ${style.container}`}>
          <div className={style.previewContainer}>
            <h4 className={style.preview}>미리보기</h4>
            <div className={style.reload} onClick={() => { onPreviewClick() }}><CachedIcon /></div>
          </div>
          <QuillNoSSRWrapper value={post} readOnly={true} theme="bubble" />
        </div>
      {/* <input type="submit" onClick={onSubmitClick} className={style.button2} value="적용"></input> */}
      <div className={style.blank}></div>
    </form>
  )
}
export default AddPost
