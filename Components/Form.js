import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "../styles/Home.module.css";
// import { setUrl } from "../lib/redis";

const Form = () => {
  const [value, setValue] = useState("");
  const [shortStr, setshortStr] = useState({
    value: "",
    copied: false,
  });
  const [shortUrl, setShortUrl] = useState(null);
  const [finalLink, setFinalLink] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/shorter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: value }),
    });
    const data = await response.json();
    console.log("Data from short", data);
    setshortStr({ value: data.short });
    setShortUrl(
      `${document.location.protocol}//${document.location.host}/${data.short}`
    );
    console.log("Data short==> ", data.short);
  };
  console.log("Short url ==> ", shortUrl);

  //  * FINAL LINK
  const handleSubmitFinal = async (event) => {
    event.preventDefault();
    setFinalLink(shortUrl);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.submitForm}>
        <input
          value={value}
          placeholder="Paste your link here"
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>
      {/* {{shortStr.value}} */}
      <div>
        <div className={styles.shortUrlContainer}>
          <div className={styles.shortMsg}>This is your url short: </div>
          <div className={styles.shortUrl}>
            <p>{shortStr.value}</p>
            <CopyToClipboard
              text={shortStr.value}
              onCopy={() => setshortStr({ copied: true })}
            >
              <p>
                <i class="fi fi-rr-copy-alt"></i>
              </p>
            </CopyToClipboard>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmitFinal} className={styles.submitForm}>
            <div className={styles.shortMsgForm}>
              Pasete the short here to get your link:{" "}
            </div>
            <input
              value={finalLink}
              placeholder="Paste your link here"
              onChange={(event) => setFinalLink(event.target.value)}
            />
            <button type="submit">Get Link</button>
          </form>
        </div>
      </div>

      {/* <div>
        <a href={shortUrl} target="_blank" rel="noopener noreferrer">
          {finalLink ? <div>{shortUrl}</div> : ""}
        </a>
      </div> */}
    </div>
  );
};

export default Form;
