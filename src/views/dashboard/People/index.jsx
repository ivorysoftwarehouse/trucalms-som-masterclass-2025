import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { getAllPeople } from '../../../firebase';

function People() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getAllPeople().then((response) => {
      const sortedResonse = response.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })

      setPeople(sortedResonse);
    })
  }, []);

  return (
    <div className={styles['People']}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Department</th>
          </tr>
        </thead>

        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{(person.name)}</td>
              <td>{person.phoneNumber}</td>
              <td>{person.emailAddress}</td>
              <td>{person.department}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default People
