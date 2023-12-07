import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../helpers/firebase";
import { AuthContext } from "../../Context/AuthContext";

const Signup = () => {
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (name === "") {
      setErrorMsg("Παρακαλώ, πες μας το όνομά σου!");
      return;
    } else if (email === "") {
      setErrorMsg("Παρακαλώ, δώσε μας το email σου!");
      return;
    } else if (password === "") {
      setErrorMsg("Παρακαλώ, επέλεξε έναν κωδικό!");
      return;
    } else if (password.length < 8) {
      setErrorMsg("Ο κωδικός σου πρέπει να έχει τουλάχιστον 8 ψηφία.");
      return;
    } else if (confirmPassword === "") {
      setErrorMsg("Παρακαλώ, επιβεβαίωσε τον κωδικό σου!");
      return;
    } else if (password !== confirmPassword) {
      setErrorMsg("Οι κωδικοί δεν ταιριάζουν. Προσπάθησε ξανά!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
      });
      setUser(user);
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMsg(getErrorMessage(error.code));
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "Κρίμα! Κάποιος άλλος χρησιμοποιεί ήδη αυτό το email.";
      case "auth/missing-password":
        return "Ξέχασες να βάλεις τον κωδικό σου. Προσπάθησε ξανά!";
      case "auth/invalid-email":
        return "Το email που έβαλες δεν φαίνεται σωστό. Ξαναπροσπάθησε!";
      case "auth/weak-password":
        return "Ο κωδικός σου είναι λίγο αδύναμος. Διάλεξε έναν πιο ισχυρό!";
      default:
        return "Κάτι πήγε στραβά. Προσπάθησε ξανά αργότερα.";
    }
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

        <label htmlFor="name">Ονοματεπώνυμο</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Μάξ Λιονταρένιος"
        />

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

        <label htmlFor="password">Επιβεβαίωση Κωδικού</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="PawTales123!"
        />

        <button type="submit">Εγγραφή</button>
      </form>

      <p>
        Έχεις ήδη λογαριασμό?
        <NavLink to="/login">Σύνδεση</NavLink>
      </p>
    </div>
  );
};

export default Signup;
