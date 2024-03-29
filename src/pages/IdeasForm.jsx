import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

const IdeasForm = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    idea: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
        'service_3cg3cyi',
        'template_8jv5ude',
        {
          from_name: form.name,
          to_name: 'PawTales',
          from_email: form.email,
          to_email: 'mixalismeliop@gmail.com',
          message: form.idea,
        },
        'PT2cBtRUGgQLlI3DD'
      )
      .then(
        (response) => {
          setLoading(false);
          // Check the response to determine success or error
          if (response.status === 200) {
            setMessage('Σε ευχαριστούμε πολύ για την ιδέα σου!');
            setForm({
              name: '',
              email: '',
              idea: '',
            });
          } else {
            setMessage('Προσπαθήστε ξανά αργότερα...');
          }
        },
        (error) => {
          setLoading(false);
          console.log(error);
          setMessage('Προσπαθήστε ξανά αργότερα...');
        }
      );
  };
  return (
    <motion.div
      className='ideasForm'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      viewport={{ once: true }}
    >
      {' '}
      <h1>Μοιράσου τις ιδέες σου!</h1>
      <h3>
        Συμπλήρωσε την παρακάτω φόρμα με τις δικές σου ιδέες για μια νέα
        φανταστική ιστορία, και εμείς θα την αναπτύξουμε όσο καλύτερα μπορούμε
        και θα την δημοσιεύσουμε με το όνομα σου!
      </h3>
      <form ref={formRef} onSubmit={handleSubmit}>
        {message && (
          <div className='message'>
            <span>{message}</span>
          </div>
        )}

        <label htmlFor='name'>Όνομα</label>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='Το Όνομα σου...'
          value={form.name}
          onChange={handleChange}
          required
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          id='email'
          value={form.email}
          placeholder='Το email σου...'
          onChange={handleChange}
          required
        />
        <label htmlFor='idea'>Ιδέα</label>
        <textarea
          rows={5}
          id='idea'
          name='idea'
          value={form.idea}
          onChange={handleChange}
          placeholder='Η Ιδέα σου...'
          required
        />
        <button type='submit'>{loading ? 'Αποστέλλεται' : 'Αποστολή'}</button>
      </form>
    </motion.div>
  );
};

export default IdeasForm;
