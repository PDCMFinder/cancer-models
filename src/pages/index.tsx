import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Button from "../components/Button/Button";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Patient Derived Cancer Models</title>
        <meta name="description" content="Patient Derived Cancer Models" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Patient Derived Cancer Models</h1>
        <Button label="Don't click me" />
      </main>

      <footer className={styles.footer}>
        <p>Patient Derived Cancer Models</p>
      </footer>
    </div>
  );
};

export default Home;
