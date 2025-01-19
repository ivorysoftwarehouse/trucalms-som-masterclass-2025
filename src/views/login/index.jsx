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
      <main>
        <div className={styles['FormContainer']}>
          <h2>Login</h2>

          {
            message
          }

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              Email
              <input type="text" placeholder="Username*" name="email" required />
            </label>

            <label htmlFor="password">
              Password
              <input type="password" placeholder="Password*" name="password" required />
            </label>

            <button type="submit">Submit</button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default LoginPage
