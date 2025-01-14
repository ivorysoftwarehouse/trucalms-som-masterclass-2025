import { useState } from 'react';
import styles from './styles.module.css'

import { login } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const loginCalllback = (data, status) => {
    setLoading(false);

    if (status.success) {
      setMessage('Login successful.');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setMessage(status.message);
    }
  }

  const handleSubmit = (event) => {
    setLoading(true);
    setMessage('Loading...');
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    login(email, password, loginCalllback);
  }

  return (
    <div className={styles['LoginPage']}>
      <header>
        <img src="favicon.png" alt="logo" />
      </header>

      <main>
        <div className={styles['PageHeading']}>
          <h1>
            Login
          </h1>
          <p>
            Enter your details to login to your account.
          </p>
        </div>

        <div className={styles['FormContainer']}>
          {message}
          <hr />

          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Username" name="email" required />
            <input type="password" placeholder="Password" name="password" required />

            <button type="submit">Login</button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default LoginPage
