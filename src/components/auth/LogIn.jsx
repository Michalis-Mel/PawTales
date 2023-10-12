import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/PawTales");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="logInForm">
      <h1>Συνδέσου στον Λογαριασμό σου</h1>

      <form onClick={handleLogIn}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Κωδικός</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Σύνδεση</button>
      </form>

      <p>
        Δεν έχεις ακόμα λογαριασμό?
        <NavLink to="/PawTales/signup">Εγγραφή</NavLink>
      </p>
    </div>
  );
};

export default Login;
