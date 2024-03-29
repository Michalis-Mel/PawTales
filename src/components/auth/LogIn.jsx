import { useState, useContext } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../../helpers/firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { HomeMsgContext } from '../../Context/HomeMsgContext';
import googleIcon from '../../assets/icons/google.png';
import facebookIcon from '../../assets/icons/facebook.png';
import { motion } from 'framer-motion';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const { setMessage } = useContext(HomeMsgContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleLogInWithEmailAndPassword = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setMessage(
          `Γεια σου, ${user.displayName
            .split(' ')
            .map(capitalizeFirstLetter)
            .join(' ')}`
        );
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
      setMessage(
        `Γεια σου, ${user.displayName
          .split(' ')
          .map(capitalizeFirstLetter)
          .join(' ')}`
      );

      navigate('/');
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleLogInWithFacebook = async () => {
    try {
      const userCredential = await signInWithPopup(auth, facebookProvider);
      const user = userCredential.user;
      setUser(user);
      setMessage(
        `Γεια σου, ${user.displayName
          .split(' ')
          .map(capitalizeFirstLetter)
          .join(' ')}`
      );

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
    <motion.div
      className='logInForm'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      viewport={{ once: true }}
    >
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
      <div className='providers'>
        <button className='googleIcon' onClick={handleLogInWithGoogle}>
          <img src={googleIcon} alt='Google' />
        </button>
        <button className='facebookIcon' onClick={handleLogInWithFacebook}>
          <img src={facebookIcon} alt='Facebook' />
        </button>
      </div>
      <p>
        Δεν έχεις ακόμα λογαριασμό?
        <NavLink to='/signup'>Εγγραφή</NavLink>
      </p>
    </motion.div>
  );
};

export default Login;
