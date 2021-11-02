import Head from "next/head";
import styles from "../styles/Home.module.css";

import Form from "../Components/Form";
import Footer from "../Components/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>Welcome to Next.js!</h3>

        <Form />
        <Footer />
      </main>
    </div>
  );
}
