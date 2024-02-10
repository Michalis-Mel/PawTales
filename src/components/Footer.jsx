import instagram from '../assets/icons/instagram.png';
const Footer = () => {
  let currentYear = new Date().getFullYear();

  return (
    <footer>
      <a
        href='https://www.instagram.com/paw___tales/'
        target='_blank'
        rel='noopener noreferrer'
        className='social'
      >
        Βρείτε μας στο Ιnstagram
        <img src={instagram} alt='Instagram' />
      </a>
      <span>&copy; Copyright {currentYear}, M² WebWorks</span>
    </footer>
  );
};

export default Footer;
