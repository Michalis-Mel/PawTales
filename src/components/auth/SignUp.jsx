import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
        }).catch((error) => {
          // Handle any errors related to setting the display name
          console.log(error);
        });
        navigate("/PawTales");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <div className="signUpForm">
      <h1> Δημιουργία Λογαριασμού </h1>
      <form>
        <label htmlFor="name">Όνομα Χρήστη</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Κωδικός</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" onClick={onSubmit}>
          Εγγραφή
        </button>
      </form>

      <p>
        Έχεις ήδη λογαριασμό?
        <NavLink to="/PawTales/login">Σύνδεση</NavLink>
      </p>
    </div>
  );
};

export default Signup;
