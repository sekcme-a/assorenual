import React from "react"
import HomeIcon from '@mui/icons-material/Home';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Link from "next/link"

const LocNav = (props) => {
  return (
    <div className="location__container">
      <HomeIcon className="homeIcon"/>
      <Link href="/" passHref><a><h4> 홈</h4></a></Link>
      <ArrowRightIcon className="arrowRightIcon" /> <h4>{props.title}</h4> <ArrowRightIcon className="arrowRightIcon" /> <h4>{props.subtitle}</h4>
    </div>
  )
}

export default LocNav;