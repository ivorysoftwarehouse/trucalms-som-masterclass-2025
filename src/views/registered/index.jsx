import styles from './styles.module.css'

function RegisteredPage() {
  return (
    <div className={styles['Registered']}>
      <img src="/images/check.png" alt="" />
      <h2>Registration Successful!</h2>

      <div className={styles['Attribution']}>
        <a target="_blank" href="https://icons8.com/icon/63262/checkmark">Checkmark</a>
        icon by
        <a target="_blank" href="https://icons8.com">Icons8</a>
      </div>
    </div>
  )
}

export default RegisteredPage
