import Link from "next/link"



const Banner = () => {


  return(
    <div style={{display:"flex", justifyContent:"flex-end", marginRight:"10vw", marginTop: "20px"}}>
      <Link passHref href="https://www.acrc.go.kr/">
        <a>
          <img src="/guanyik.png" alt="국민권익위원회" />
        </a>
      </Link>
      <Link passHref href="https://www.nts.go.kr/">
        <a>
          <img src="/guksay.png" alt="국세청" />
        </a>
      </Link>

    </div>
  )
}

export default Banner