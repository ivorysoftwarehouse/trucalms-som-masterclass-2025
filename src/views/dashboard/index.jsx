import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.css'

import { logout, setupAuthListener } from '../../firebase'

import People from './People';
import FirstTimers from './FirstTimers';
import UpcomingBirthdays from './UpcomingBirthdays';

function Dashboard() {
  const navigate = useNavigate();

  const [signedIn, setSignedIn] = useState(false);

  const [showPeople, setShowPeople] = useState(true);
  const [showFirstTimers, setShowFirstTimers] = useState(false);
  const [showUpcomingBirthdays, setShowUpcomingBirthdays] = useState(false);

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

      <ul>
        <li>
          <button
            onClick={() => {
              setShowPeople(true);
              setShowFirstTimers(false);
              setShowUpcomingBirthdays(false);
            }}
          >
            People
          </button>
          {
            showPeople && <People />
          }
        </li>
        <li>
          <button
            onClick={() => {
              setShowPeople(false);
              setShowFirstTimers(true);
              setShowUpcomingBirthdays(false);
            }}
          >
            First Timers
          </button>
          {
            showFirstTimers && <FirstTimers />
          }
        </li>
        <li>
          <button
            onClick={() => {
              setShowPeople(false);
              setShowFirstTimers(false);
              setShowUpcomingBirthdays(true);
            }}
          >
            Upcoming Birthdays
          </button>
          {
            showUpcomingBirthdays && <UpcomingBirthdays />
          }
        </li>
      </ul>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  )

  return <div>Loading...</div>
}

export default Dashboard
