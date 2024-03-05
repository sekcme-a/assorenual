
import styles from "./Support.module.css"



const SupportCompo = () => {



  return(
    <div className={styles.main_container}>
      <h3>후원안내</h3>
      <div className={styles.line} />
      <p>대한생활체육회는 기획재정부 지정기부금단체로서 생활체육의 발전을 위해 기부해주신 기부금은 지정기부금에 해당되어 다음과 같은 세제상의 혜택을 받을 수 있습니다.</p>

      <h4>세제혜택절차</h4>
      <div className={styles.line_half} />
      <img src="/support_pc.png" alt="세제혜택절차" className={styles.support_pc}/>


      <h4>후원참여방법</h4>
      <div className={styles.line_half} />
      <img src="/support_howto_pc.png" alt="세제혜택절차" className={styles.support_pc}/>
    </div>
  )
}

export default SupportCompo