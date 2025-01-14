import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom'

import { setupAuthListener } from '../../firebase';

import styles from './styles.module.css'

function Home() {
  const [signedIn, setSignedIn] = useState(false);

  // const upload = () => {
  //   uploadData(attendance, () => {
  //     alert('Upload complete!');
  //   })
  // }

  useMemo(() => {
    setupAuthListener((data, signedIn) => {
      if (signedIn) {
        setSignedIn(true);
      }
    })
  }, []);

  return (
    <div className={styles['Home']}>
      <div className={styles['HomeHeader']}>
        <img src="favicon.png" alt="Logo" />
        <h1>The School Of Money Masterclass (200 Level)</h1>
      </div>

      <div className={styles['HomeLinks']}>
        <Link to="/register">Register</Link>
        {
          signedIn ?
            <Link to="/dashboard">Dashboard</Link>
            :
            <Link to="/login">Login</Link>
        }

        {/* <button onClick={upload}>
          Upload data
        </button> */}
      </div>
    </div>
  )
}

export default Home
