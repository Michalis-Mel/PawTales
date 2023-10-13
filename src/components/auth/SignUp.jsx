import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";

const Signup = () => {
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        navigate("/PawTales");
        // ...
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMsg("Το email χρησιμοποιείται ήδη");
            break;
          case "auth/missing-password":
            setErrorMsg("Συμπληρώστε τον κωδικό σας");
            break;
          case "auth/invalid-email":
            setErrorMsg("Συμπληρώστε το email σας");
            break;
          case "auth/weak-password":
            setErrorMsg("Αδύναμος κωδικός");
            break;
          default:
            break;
        }
        // ..
      });
  };

  return (
    <div className="signUpForm">
      <h1> Δημιουργία Λογαριασμού </h1>
      <form onSubmit={handleSignUp}>
        {errorMsg.length > 0 && (
          <div className="errorMsg">
            <span className="errorText">{errorMsg}</span>
          </div>
        )}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="pawtales@gmail.com"
        />

        <label htmlFor="password">Κωδικός</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="PawTales123!"
        />

        <button type="submit">Εγγραφή</button>
      </form>

      <p>
        Έχεις ήδη λογαριασμό?
        <NavLink to="/PawTales/login">Σύνδεση</NavLink>
      </p>
    </div>
  );
};

export default Signup;
