import styles from "../styles/Home.module.css";
const Footer = () => {
  return (
    <div>
      <footer className={styles.footer}>
        Developed by{" "}
        <span className={styles.logo}>
          <a
            href="https://github.com/akash-dutta-au7"
            target="_blank"
            rel="noopener noreferrer"
          >
            Akash Dutta
          </a>
        </span>
      </footer>
    </div>
  );
};

export default Footer;
