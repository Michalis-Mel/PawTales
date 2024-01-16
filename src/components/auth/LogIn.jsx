import { useState, useContext } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../helpers/firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import googleIcon from '../../assets/icons/google.png';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogInWithEmailAndPassword = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        navigate('/');
      })
      .catch((error) => {
        handleAuthError(error);
      });
  };

  const handleLogInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      setUser(user);
      navigate('/');
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error) => {
    console.log(error.code);
    switch (error.code) {
      case 'auth/invalid-login-credentials':
        setErrorMsg('Μη έγκυρα στοιχεία σύνδεσης');
        break;
      case 'auth/missing-password':
        setErrorMsg('Συμπληρώστε τον κωδικό σας');
        break;
      case 'auth/invalid-email':
        setErrorMsg('Συμπληρώστε το email σας');
        break;
      case 'auth/weak-password':
        setErrorMsg('Αδύναμος κωδικός');
        break;
      default:
        break;
    }
  };

  return (
    <div className='logInForm'>
      <h1>Συνδέσου στον Λογαριασμό σου</h1>

      <form onSubmit={handleLogInWithEmailAndPassword}>
        {errorMsg.length > 0 && (
          <div className='errorMsg'>
            <span className='errorText'>{errorMsg}</span>
          </div>
        )}
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          name='email'
          type='email'
          placeholder='pawtales@gmail.com'
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor='password'>Κωδικός</label>
        <input
          id='password'
          name='password'
          type='password'
          placeholder='PawTales123!'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type='submit'>Σύνδεση</button>
      </form>
      <button className='google' onClick={handleLogInWithGoogle}>
        <img src={googleIcon} alt='Google' />
      </button>
      <p>
        Δεν έχεις ακόμα λογαριασμό?
        <NavLink to='/signup'>Εγγραφή</NavLink>
      </p>
    </div>
  );
};

export default Login;
