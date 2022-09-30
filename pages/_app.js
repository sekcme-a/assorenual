import 'styles/globals.css'
import 'styles/navbar/navbar.css'
import 'styles/navbar/dropdownPc.css'
import 'styles/footer.css'
import 'styles/button.css'
import 'styles/banner.css'
import 'styles/container.css'
import 'styles/navbar/navbarVerticle.css'
import 'styles/navbar/locNav.css'
import 'styles/navbar/navbarMobile.css'
import 'styles/loader.css'
import 'styles/lazyItem.css'
import Navbar from "src/components/public/Navbar"
import Footer from "src/components/public/Footer"
import Head from "next/head"
import react, { useState, useEffect } from "react"
import NavbarMobile from "src/components/public/NavbarMobile"
import { UserContext } from "src/data/context"
import { useUserData } from "src/firebase/useUserData"
import Script from "next/script"
// import 'react-quill/dist/quill.snow.css'

function MyApp({ Component, pageProps }) {
  const [mobileMode, setMobileMode] = useState("false")

  const userData = useUserData();
  // PC/모바일 환경에 따라 navbar 바꾸기위함
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 870)
        setMobileMode(true)
      else
        setMobileMode(false)
    }
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [])
  
  return (
    <UserContext.Provider value={userData}>
      <Head>  
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
        <link rel="canonical" href="https://xn--vk1by6xrzecngs4l6obxj.com"></link>
        <meta name="robots" content="index,follow"></meta>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
      </Head>
            <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=10143b83ffc3b3f9b4dfefb69908cb81&libraries=services,clusterer&autoload=false`}
        strategy="beforeInteractive"
      />
      {mobileMode ? <NavbarMobile /> : <Navbar />}
      <Component {...pageProps} />
      <Footer />
    </UserContext.Provider>
  )
}

export default MyApp
