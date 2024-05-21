import React from "react"
import { motion } from "framer-motion"

const SubMenuTitle = (props) => {
  return (
    <div className="subMenu__title__container">
      <motion.h1 initial={{opacity: 0, x: -20}} animate={{opacity:1, x:0, transition:{duration:1}}}>{props.title}</motion.h1>
      <motion.h3 initial={{opacity: 0, x: -20}} animate={{opacity:1, x:0, transition:{duration:1, delay:.5}}}>{props.subtitle}</motion.h3>
    </div>
  )
}
export default SubMenuTitle;