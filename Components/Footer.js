import Image from "next/image";
import styles from "../styles/Home.module.css";
const Footer = () => {
  return (
    <div>
      <footer className={styles.footer}>
        Powered by{" "}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </footer>
    </div>
  );
};

export default Footer;
