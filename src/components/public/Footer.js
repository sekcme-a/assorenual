import React from "react"
import MapIcon from '@mui/icons-material/Map';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3 className="footer-logo">대한생활체육회</h3>
        <div className="footer-info">
          <p>상호 : (사)대한생활체육회 | 대표자명 : 김균식</p>
          <p>고유번호 : 102-82-10135</p>
          <p>대표번호 : 02-2088-7508 | 팩스 : 02-2088-7509 | 이메일 : ksfaa21@naver.com</p>
          <p>주소 : 서울특별시 금천구 가산동 459-6 SH드림 307호</p>
        </div>
        <p className="footer-company-name">대한생활체육회 &copy; 2021</p>
      </div>
      <div className="footer-center">
        <div>
          <div className="icon"><MapIcon/></div>
          <p><span>서울특별시 금천구 가산동 459-6</span>SH드림 307호</p>
        </div>
        <div>
          <div className="icon"><PhoneIcon /></div>
          <p>02-2088-7508</p>
        </div>
        <div>
          <div className="icon"><EmailIcon/></div>
          <p><a href="mainto:ksfaa@naver.com">contact@ksfaa21@naver.com</a></p>
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-company-about">
          <span>About us</span>
          대한생활체육회는 순수 민간 비영리 법인단체로서 정치, 종교, 등 모든 분야와 무관한 국민생활체육의 권장, 발전을 목표로 하고 있습니다.
        </p>
      </div>
      
    </footer>
  )
}
export default Footer