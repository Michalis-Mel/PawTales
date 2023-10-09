const Footer = () => {
  let currentYear = new Date().getFullYear();

  return (
    <footer>
      <span>&copy; Copyright {currentYear}, M² WebWorks</span>
    </footer>
  );
};

export default Footer;
