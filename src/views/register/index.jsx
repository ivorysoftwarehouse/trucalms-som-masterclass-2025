import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getPeople, register, setPresent, verify } from '../../firebase'
import { toTitleCase } from '../../utils';

import styles from './styles.module.css'

function RegistrationPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [people, setPeople] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    const form = event.target;
    const data = {
      name: form.name.value,
      phoneNumber: form.phoneNumber.value,
      emailAddress: form.emailAddress.value,
      department: form.department.value,
    }

    register(data, (response, error) => {
      if (response.success) {
        navigate('/registered');
      } else {
        if (error.alreadyRegistered) {
          setMessage(error.message)
        } else {
          setMessage('An error occurred. Please try again.')
          setLoading(false);
        }
      }
    });
  }

  const handleVerification = (event) => {
    event.preventDefault();

    const code = event.target.accessCode.value;

    verify(code, (response) => {
      if (response.success) {
        setVerified(true);
      } else {
        if (response.invalidCode) {
          setMessage('Invalid access code. Please try again.')
        } else {
          setMessage('An error occurred. Please try again.')
        }
        setLoading(false);
      }
    });
  }

  const filterPeople = () => {
    if (searchValue === '') {
      return [];
    }

    return people.filter((person) => person.name?.toLowerCase()
      .includes(searchValue.toLowerCase()));
  }

  const markPresent = (person, checked) => {
    if (checked) {
      setLoading(true);

      setPresent(person.phoneNumber, () => {
        setLoading(false);
        navigate('/registered');
      });
    }
  }

  useEffect(() => {
    getPeople().then((people) => {
      setPeople(people);
    })
  }, [])

  if (verified) return (
    <div className={styles['RegistrationPage']}>
      {
        loading && (
          <div className={styles['Loader']}>
            <div className={styles['Spinner']} />
          </div>
        )
      }

      <main>
        <img src="/images/cover.png" />

        <div className={styles['PageHeading']}>
          <h1>
            Welcome To The School of Money Masterclass
          </h1>

          <div className={styles['PageHeadingGroup']}>
            <div className={styles['PageHeadingListHeading']}>
              Already Registered?
            </div>

            <div className={styles['PageHeadingSearch']}>
              <img src="images/search.svg" />
              <input
                type="text"
                placeholder="Search for your name..."
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </div>

            <ul>
              {
                filterPeople().map((person, index) => (
                  <li key={index}>
                    <img src="/images/person.svg" />
                    <div>{toTitleCase(person.name)}</div>
                    <button onClick={() => {markPresent(person, true)}}>Select</button>
                  </li>
                ))
              }
              {/* {
                filterPeople().length === 0 && (
                  <li>
                    <div>List Empty! Use the form below to register.</div>
                  </li>
                )
              } */}
            </ul>
          </div>
        </div>

        <div className={styles['FormContainer']}>
          <h2>First time here?</h2>
          <p>Fill out the form below to register</p>

          {
            message
          }

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              Name*
              <input type="text" placeholder="Name*" name="name" required />
            </label>
            <label htmlFor="phoneNumber">
              Phone Number*
              <input type="text" placeholder="Phone Number*" name="phoneNumber" required />
            </label>
            <label htmlFor="emailAddress">
              Email Address
              <input type="email" placeholder="Email Address" name="emailAddress" />
            </label>
            <label htmlFor="department">
              Department
              <select name="department" required>
                <option value="none">None (Member)</option>
                <option value="none">None (First Timer)</option>
                <option value="Amethyst Crew">Amethyst Crew</option>
                <option value="Audio Visual">Audio Visual</option>
                <option value="Beauty & Aesthetics (B&A)">Beauty & Aesthetics (B&A)</option>
                <option value="Calvary Leadership Academy (CLA)">Calvary Leadership Academy (CLA)</option>
                <option value="Calvary Marshal">Calvary Marshal</option>
                <option value="Click (Children Church)">Click (Children Church)</option>
                <option value="Counselling Team">Counselling Team</option>
                <option value="Church Shift">Church Shift</option>
                <option value="Caleb Generation">Caleb Generation</option>
                <option value="Deliverance Team">Deliverance Team</option>
                <option value="Evangelism & Follow up">Evangelism & Follow up</option>
                <option value="First Aid">First Aid</option>
                <option value="Finance">Finance</option>
                <option value="God Answers Prayer (GAP Team)">God Answers Prayer (GAP Team)</option>
                <option value="Greeters">Greeters</option>
                <option value="Graceful Hosts">Graceful Hosts</option>
                <option value="IT">IT</option>
                <option value="Lifeline Choir">Lifeline Choir</option>
                <option value="Legal Dept">Legal Dept</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Martha's Kitchen">Martha&apos;s Kitchen</option>
                <option value="Nu Media">Nu Media</option>
                <option value="NewLife Department">NewLife Department</option>
                <option value="Protocol">Protocol</option>
                <option value="Pastorate">Pastorate</option>
                <option value="Sound">Sound</option>
                <option value="Sound">Transport Unit</option>
                <option value="Ushering">Ushering</option>
              </select>
            </label>

            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </div>
  )

  return (
    <div className={styles['RegistrationPage']}>
      <main className={styles['RegistrationPageAccessChecker']}>
        <div className={styles['PageHeading']}>
          <img src="favicon.png" alt="logo" />
          <h1>
            The School of Money Masterclass
          </h1>
          <p>(200 Level)</p>
        </div>

        <div className={styles['FormContainer']}>
          <form onSubmit={handleVerification}>
            {message && <p className={styles['Error']}>{message}</p>}
            <label htmlFor="accessCode">
              <input placeholder="Access Code" name="accessCode" required />
            </label>

            <button type="submit">Continue</button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default RegistrationPage
