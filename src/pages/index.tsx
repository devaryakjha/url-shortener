import type { NextPage } from "next";
import Head from "next/head";
import { FormEventHandler, useRef } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    await fetch("/api/create-link", {
      method: "POST",
      body: JSON.stringify({
        link: inputRef.current?.value,
      }),
    });
  };
  return (
    <div className={styles.container}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <Head>
          <title>Shortener</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <input
          className={styles.input}
          ref={inputRef}
          placeholder="Enter your link here"
        />
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
