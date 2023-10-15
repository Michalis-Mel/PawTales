import { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import {} from "react";
import { AuthContext } from "../../Context/AuthContext";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);

        navigate("/");
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/invalid-login-credentials":
            setErrorMsg("Μη έγκυρα στοιχεία σύνδεσης");
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
      });
  };

  return (
    <div className="logInForm">
      <h1>Συνδέσου στον Λογαριασμό σου</h1>

      <form onSubmit={handleLogIn}>
        {errorMsg.length > 0 && (
          <div className="errorMsg">
            <span className="errorText">{errorMsg}</span>
          </div>
        )}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="pawtales@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Κωδικός</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="PawTales123!"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Σύνδεση</button>
      </form>

      <p>
        Δεν έχεις ακόμα λογαριασμό?
        <NavLink to="/signup">Εγγραφή</NavLink>
      </p>
    </div>
  );
};

export default Login;
