import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.css'

import { logout, setupAuthListener } from '../../firebase'

import People from './People';

function Dashboard() {
  const navigate = useNavigate();

  const [signedIn, setSignedIn] = useState(false);

  useMemo(() => {
    setupAuthListener((data, signedIn) => {
      if (signedIn) {
        setSignedIn(true);
      } else {
        navigate('/login')
      }
    })
  }, [navigate]);

  if (signedIn) return (
    <div className={styles['Dashboard']}>
      <header>
        <img src="favicon.png" alt="Logo" />
      </header>

      <main>
        <h2>People</h2>
        <People />
      </main>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  )

  return <div>Loading...</div>
}

export default Dashboard
