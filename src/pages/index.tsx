import type { NextPage } from "next";
import Head from "next/head";
import Button from "../components/Button/Button";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Patient Derived Cancer Models</title>
        <meta name="description" content="Patient Derived Cancer Models" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Patient Derived Cancer Models</h1>
        <h2>Patient Derived Cancer Models</h2>
        <h3>Patient Derived Cancer Models</h3>
        <h4>Patient Derived Cancer Models</h4>
        <p>
          Lorem ipsum dolor <a href="https://google.com">asdf sf asdf as</a> sit
          amet
        </p>
        <a href="" className="link--text--light">
          asdf sf asdf as
        </a>
        <Button text="Don't click me" />
      </main>

      <footer>
        <p>Patient Derived Cancer Models</p>
      </footer>
    </div>
  );
};

export default Home;
