import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const IdeasForm = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    idea: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_3cg3cyi",
        "template_8jv5ude",
        {
          from_name: form.name,
          to_name: "PawTales",
          from_email: form.email,
          to_email: "mixalismeliop@gmail.com",
          message: form.idea,
        },
        "PT2cBtRUGgQLlI3DD"
      )
      .then(
        () => {
          setLoading(false);
          alert("Σε ευχαριστούμε πολύ για την ιδέα σου!");

          setForm({
            name: "",
            email: "",
            idea: "",
          });
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("Προσπαθήστε ξανά αργότερα...");
        }
      );
  };
  return (
    <div className="ideasForm">
      <h1>Μοιράσου τις ιδέες σου!</h1>
      <h3>
        Συμπλήρωσε την παρακάτω φόρμα με τις δικές σου ιδέες για μια νές
        φανταστική ιστορία, και εμείς θα την αναπτύξουμε όσο καλύτερα μπορούμε
        και θα την δημοσιεύσουμε με το όνομα σου!
      </h3>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            placeholder="Το Όνομα σου..."
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Το email σου...(π.χ. pawtales@gmail.com)"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <textarea
            rows={5}
            name="idea"
            value={form.idea}
            onChange={handleChange}
            placeholder="Η Ιδέα σου για την Ιστορία..."
            required
          />
        </label>
        <button type="submit">{loading ? "Αποστέλλεται" : "Αποστολή"}</button>
      </form>
    </div>
  );
};

export default IdeasForm;
