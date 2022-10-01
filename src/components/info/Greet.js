import React, { useRef, useState, useEffect } from "react"
import style from "styles/info/greet.module.css"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer"
import SubMenuTitle from "src/components/public/SubMenuTitle"
import { firestore as db } from "src/firebase/firebase"
import HeadMeta from "src/components/public/HeadMeta"

const Greet = (props) => {
  const ref = useRef();

  const ani1 = useAnimation();
  const ani2 = useAnimation();
  const ani3 = useAnimation();
  const ani4 = useAnimation();
  const ani5 = useAnimation();

  const [inViewRef, inView] = useInView({ threshold: .2 })
  const [inHideRef, outView] = useInView({ threshold: .1 })
  const [inViewRef1, inView1] = useInView({ threshold: .6 })
  const [inHideRef1, outView1] = useInView({ threshold: .1 })
  const [inViewRef2, inView2] = useInView({ threshold: .6 })
  const [inHideRef2, outView2] = useInView({ threshold: .1 })
  
  if (inView) {
    ani1.start({ opacity: 1, transition: { duration: 1 }})
  }
  // if (!outView) {
  //   ani1.start({opacity: 0, transition: { duration: .3 }})
  // }
  if (inView1) {
    ani2.start({ opacity: 1, transition: { duration: 1 }})
  }
  if (!outView1) {
    ani2.start({opacity: 0, transition: { duration: .3 }})
  }
  if (inView2) {
    ani3.start({ opacity: 1, transition: { duration: 1 }})
  }
  if (!outView2) {
    ani3.start({opacity: 0, transition: { duration: .3 }})
  }

  const [imgURL, setImgURL] = useState("")
  const [imgTitle, setImgTitle] = useState("")
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [context1, setContext1] = useState([""])
  const [context2, setContext2] = useState([])
  const [context3, setContext3] = useState([])

  useEffect(async () => {
    const fetchData = async () => {
      if (props.preview === "true") {
        await db.collection("preview").doc("greet").get().then((doc) => {
          setImgURL(doc.data().imgUrl)
          setImgTitle(doc.data().imgTitle)
          setTitle(doc.data().title)
          setSubtitle(doc.data().subtitle)
          //인사말의 <br/>부분에서 짤라 배열에 저장
          const contextData = doc.data().context.split('</>')
          const length = parseInt(contextData.length / 3)
          let temp1 = [];
          let temp2 = [];
          let temp3 = [];
          console.log(length)
          for (let i = 0; i < length; i++){
            // if(temp1.length<length)
              temp1.push(contextData[i])
          }
          setContext1(temp1)
          for (let i = length; i < length*2; i++){
            // if(temp2.length<length)
              temp2.push(contextData[i])
          }
          setContext2(temp2)
          for (let i = length*2; i < contextData.length; i++){
            // if(temp3.length<length)
              temp3.push(contextData[i])
          }
          setContext3(temp3)
        })
      }
      else {
        await db.collection("setting").doc("greet").get().then((doc) => {
          setImgURL(doc.data().imgUrl)
          setImgTitle(doc.data().imgTitle)
          setTitle(doc.data().title)
          setSubtitle(doc.data().subtitle)
          //인사말의 <br/>부분에서 짤라 배열에 저장
          const contextData = doc.data().context.split('</>')
          const length = parseInt(contextData.length / 3)
          let temp1 = [];
          let temp2 = [];
          let temp3 = [];
          console.log(length)
          for (let i = 0; i < length; i++){
            // if(temp1.length<length)
              temp1.push(contextData[i])
          }
          setContext1(temp1)
          for (let i = length; i < length*2; i++){
            // if(temp2.length<length)
              temp2.push(contextData[i])
          }
          setContext2(temp2)
          for (let i = length*2; i < contextData.length; i++){
            // if(temp3.length<length)
              temp3.push(contextData[i])
          }
          setContext3(temp3)
        })
      }
    }
    fetchData()
  },[])

  return (
    <>
       <HeadMeta
        title="대한생활체육회 - 총재 인사말"
        description="대한생활체육회 총재 김균식의 인사말입니다 - 국민의 건강과 행복의 장을 여는 대한생활체육회"
        url="https://xn--vk1by6xrzecngs4l6obxj.com/info/greet"
      />
      <div className={style.container}>
        <SubMenuTitle title="총재 인사말" subtitle="대한생활체육회 총재 김균식의 인사말입니다."/>
        <motion.div className={style.content__container}
          initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1, duration: 1 } }}>
          {/* <Image
            src={imgURL}
            height={180}
            width={150}
            alt="총재 김균식" /> */}
          <img src={imgURL} alt="총재" className={style.image}></img>
          <h6>{imgTitle}</h6>
            <h4>{title}</h4>
          <h5>{subtitle}</h5><br /><br />
          <div className={style.text__container}>
            <div ref={inViewRef}><div ref={inHideRef}>
              {context1.map((item, index) => (
                <motion.p initial={{opacity: 0}} animate={ani1} key={index}>{item} <br /></motion.p>
            ))}
            </div></div>
            <div ref={inViewRef1}><div ref={inHideRef1}>
              {context2.map((item, index) => (
                <motion.p initial={{opacity: 0}} animate={ani2} key={index}>{item} <br /></motion.p>
            ))}
            </div></div>
            <div ref={inViewRef2}><div ref={inHideRef2}>
              {context3.map((item, index) => (
                <motion.p initial={{opacity: 0}} animate={ani3} key={index} >{item} <br /></motion.p>
            ))}
              </div></div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Greet;




// import React, { useRef } from "react"
// import style from "styles/info/greet.module.css"
// import Image from "next/image"
// import { motion, useAnimation } from "framer-motion";
// import { useInView } from "react-intersection-observer"
// import SubMenuTitle from "src/components/public/SubMenuTitle"

// const Greet = (props) => {
//   const ref = useRef();

//   const ani1 = useAnimation();
//   const ani2 = useAnimation();
//   const ani3 = useAnimation();
//   const ani4 = useAnimation();
//   const ani5 = useAnimation();

//   const [inViewRef, inView] = useInView({ threshold: .2 })
//   const [inHideRef, outView] = useInView({ threshold: .1 })
//   const [inViewRef1, inView1] = useInView({ threshold: .6 })
//   const [inHideRef1, outView1] = useInView({ threshold: .1 })
//   const [inViewRef2, inView2] = useInView({ threshold: .6 })
//   const [inHideRef2, outView2] = useInView({ threshold: .1 })
  
//   if (inView) {
//     ani1.start({ opacity: 1, transition: { duration: 1 }})
//   }
//   // if (!outView) {
//   //   ani1.start({opacity: 0, transition: { duration: .3 }})
//   // }
//   if (inView1) {
//     ani2.start({ opacity: 1, transition: { duration: 1 }})
//   }
//   if (!outView1) {
//     ani2.start({opacity: 0, transition: { duration: .3 }})
//   }
//   if (inView2) {
//     ani3.start({ opacity: 1, transition: { duration: 1 }})
//   }
//   if (!outView2) {
//     ani3.start({opacity: 0, transition: { duration: .3 }})
//   }
//   return (  
//     <div className={style.container}>
//       {props.preview==="true" && <div>미리보기중입니다.</div>}
//       <SubMenuTitle title="총재 인사말" subtitle="대한생활체육회 총재 김균식의 인사말입니다."/>
//       <motion.div className={style.content__container}
//         initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1, duration: 1 } }}>
//         <Image
//           src="/rlarbstlr.png"
//           height={180}
//           width={150}
//           alt="총재 김균식" />
//         <h6>대한생활체육회 총재 김균식</h6>
//           <h4>어게인 필승 코리아!!</h4>
//           <h5>대한민국 5천만 국민 여러분!</h5><br /><br />
          
//         <div ref={inViewRef}><div ref={inHideRef}>
//           <motion.p initial={{ opacity: 0 }} animate={ani1}>코로나19의 긴 터널이 끝을 보이고 있는 가운데 이제 새로운 미래를 개척하기 위한 준비운동을 마쳤습니다.<br /><br /></motion.p>
//           <motion.p initial={{opacity: 0}} animate={ani1}>지난 도쿄올림픽은 움츠렸던 인류의 체육이 질병의 곤경에도 여전히 살아있음을 보여주는 실 예가 되었습니다. 우리 대한민국은 전 세계 그 어떤 국가보다 강인한 정신력과 사회질서가 완벽한 도덕성을 자랑하는 동방예의지국으로서 전 국민의 완벽한 협조가 K-방역의 성공으로 이어졌습니다. <br /><br /></motion.p>
//           <motion.p initial={{ opacity: 0 }} animate={ani1}>긴 시간 참고 기다렸던 온 국민들의 활기찬 건강체조가 우렁찬 구호와 함께 전국 방방곡곡에 울려 퍼져야 할 때가 왔습니다. 건강을 위한 최고의 덕목은 건전한 체육활동이며 이는 각자의 취향과 특기에 따라 다양하게 펼쳐져야 할 것입니다. <br /><br /></motion.p>
//         </div></div>
//         <div ref={inViewRef1}><div ref={inHideRef1}>
//           <motion.p initial={{opacity: 0}} animate={ani2}>이에 (사)대한생활체육회는 지난 3월부터 구심점을 잃었던 모든 국민들의 생활체육의 활성화를 위해 꾸준한 준비를 해 왔습니다. 지역별, 종목별, 해외지부까지 꼼꼼히 조직을 구성하고 서울특별시에 비영리 사단법인을 신청하여 지난 8월 17일 정식 인가를 받았습니다. 이후 등기완성과 고유 번호증을 부여받아 2021년 9월 17일 첫 공식 활동에 착수했습니다.  <br /><br /></motion.p>
//           <motion.p initial={{opacity: 0}} animate={ani2}>이제 (사)대한생활체육회는 모든 국민들의 다양한 체육활동에 주최가 되어 체계적이고 안전한 대회개최는 물론, 종목별 지도자 양성, 각종국제대회 개최, 청소년과 노인체육복지 바우처 사업 등 국민건강에 도움 되는 부분에 일조할 것입니다.<br /><br /></motion.p>
//           <motion.p initial={{opacity: 0}} animate={ani2}>지구상 어떤 생물이든 살아움직일 때 생명력이 발전하는 것입니다. 하물며 인간에게 체육활동은 그 어떤 명약보다 소중하고 확실한 활력소가 되는 것이며 동호인들 간의 화합, 친목, 협동은 물론 평범한 아마추어에서 뛰어난 프로의 인재를 개발, 양성하는 통로가 될 것입니다. <br /><br /></motion.p>
//         </div></div>
//         <div ref={inViewRef2}><div ref={inHideRef2}>
//           <motion.p initial={{opacity: 0}} animate={ani3}>향후 전국대회 및 국제 대회가 개최되는 그날까지 온 국민의 응원과 힘찬 환호를 기대하며  모두가 하나 되는 건전하고 건강한 대장정을 기대합니다. <br /><br /></motion.p>
//           <motion.p initial={{opacity: 0}} animate={ani3}>아울러 본 협회는 정치, 종교, 상업적, 의미의 일체 배제된 순수 체육단체로서 오직 국민건강과 화기애애한 사회적 분위기를 도모하는데 목적을 두고 있습니다. 따라서 협회의 목적에 위배되는 요소는 강력하게 배재함은 물론 모든 경영의 투명화, 누구나 참여를 위해 모든 채널을 열어두고 있습니다. 특정 세력이나 유명인 보다는 국민모두를 가장 소중한 회원으로 모시는 (사)대한생활체육회는 함께 꾸려갈 훌륭한 인재를 모십니다. <br /><br /></motion.p>
//           <motion.p initial={{opacity: 0}} animate={ani3}>많은 관심과 참여를 기대하며 가내 두루 평안과 희망찬 미래가 항상 함께 하길 바랍니다. <br /><br /></motion.p>
//           <motion.p initial={{opacity: 0}} animate={ani3}>감사합니다.<br /><br /></motion.p>
//         </div></div>
//       </motion.div>
//     </div>
//   )
// }

// export default Greet;