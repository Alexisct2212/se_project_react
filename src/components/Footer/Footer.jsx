import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <p className="footer__developer">Developed by Alexis Castillo</p>
      <p className="footer__year">{year}</p>
    </footer>
  );
}

export default Footer;