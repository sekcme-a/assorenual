import React, {useRef} from "react"
import styles from "styles/home/about.module.css"
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import FitbitIcon from '@mui/icons-material/Fitbit';
import GroupsIcon from '@mui/icons-material/Groups';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer"
import Link from "next/link"

const About = () => {
  const ref = useRef();

  const aniHead = useAnimation();
  const aniItem1 = useAnimation();
  const aniItem2 = useAnimation();
  const aniItem3 = useAnimation();
  const aniItem4 = useAnimation();
  
  const [inViewRef, inView] = useInView({ threshold: 0.5})
  const [inHideRef, outView] = useInView({ threshold: 0.5 })
  
  const aniSpeed = "30px";

  if (inView) {
    aniHead.start({
      opacity: 1, transition:{duration: 1}
    })
    aniItem1.start({
      opacity: 1, transition:{delay: .3, duration: .7 }
    })
    aniItem2.start({
      opacity: 1, transition:{delay: .5, duration: .7 }
    })
    aniItem3.start({
      opacity: 1, transition:{delay: .7, duration: .7 }
    })
    aniItem4.start({
      opacity: 1, transition:{delay: .9, duration: .7 }
    })
  }
  if (!outView) {
    aniHead.start({
      opacity: 0, transition:{duration: .3}
    })
    aniItem1.start({
      opacity: 0, transition: {duration: .3}
    })
    aniItem2.start({
      opacity: 0,  transition: {duration: .3}
    })
    aniItem3.start({
      opacity: 0, transition: {duration: .3}
    })
    aniItem4.start({
      opacity: 0, transition: {duration: .3}
    })
  }
  return (
    <div ref={inViewRef}>
      <div className={styles.container} ref={inHideRef}>
        
          <motion.div initial={{opacity:0}} animate={aniHead}>
            <h2>체육회 소개</h2>
            <div className={styles.border}></div>
            <h3>국민의 건강과 행복의 장을 여는 대한생활체육회를 소개합니다</h3>
          </motion.div>
        

        <div className={styles.content__container}>
          <Link passHref href="/info/greet">
            <a>
            <motion.div className={styles.item__container} initial={{ opacity: 0}} animate={aniItem1}>
              <PermIdentityIcon className={styles.icon}/>
              <h4 className={styles.title}>총재 인사말</h4>
              <p className={styles.subtitle}>어게인 필승 코리아!!<br/>대한생활체육회 총재 김균식 인사말</p>
              </motion.div>
            </a>
          </Link>

          <Link passHref href="/info/purpose">
            <a>
            <motion.div className={styles.item__container} initial={{ opacity: 0}} animate={aniItem2}>
              <EmojiFlagsIcon className={styles.icon}/>
              <h4 className={styles.title}>설립목적</h4>
              <p className={styles.subtitle}>스포츠가 최고의 국민건강 복지다. 대한생활체육회 설립목적을 소개합니다</p>
              </motion.div>
            </a>
          </Link>

          <Link passHref href="/info/chart">
            <a>
            <motion.div className={styles.item__container} initial={{ opacity: 0}} animate={aniItem3}>
              <FitbitIcon className={styles.icon}/>
              <h4 className={styles.title}>중앙조직도</h4>
              <p className={styles.subtitle}>대한생활체육회의 중앙조직도를 소개합니다</p>
              </motion.div>
              </a>
          </Link>

          <Link passHref href="/info/status">
            <a>
            <motion.div className={styles.item__container} initial={{ opacity: 0}} animate={aniItem4}>
              <GroupsIcon className={styles.icon}/>
              <h4 className={styles.title}>임원현황</h4>
              <p className={styles.subtitle}>대한생활체육회을 운영하는 임원단을 소개합니다</p>
              </motion.div>
              </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default About;