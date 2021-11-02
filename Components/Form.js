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
  const [inputFinalLink, setInputFinalLink] = useState("");
  const [finalLink, setFinalLink] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/shorter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: value }),
    });
    const data = await response.json();
    setshortStr({ value: data.short });
    setShortUrl(
      `${document.location.protocol}//${document.location.host}/${data.short}`
    );
  };

  //  * FINAL LINK
  const handleSubmitFinal = async (event) => {
    event.preventDefault();
    setFinalLink(
      `${document.location.protocol}//${document.location.host}/${inputFinalLink}`
    );
    console.log(finalLink);
  };
  console.log(finalLink);
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
          <div className={styles.shortMsg}>This is your url short (Copy): </div>
          <div className={styles.shortUrl}>
            <p>{shortStr.value}</p>
            <CopyToClipboard
              text={shortStr.value}
              onCopy={() => setshortStr({ copied: true })}
            >
              <p>
                <i className="fi fi-rr-copy-alt"></i>
              </p>
            </CopyToClipboard>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmitFinal} className={styles.submitForm}>
            <div className={styles.shortMsgForm}>
              Paste the short here to get your final link:{" "}
            </div>
            <input
              value={inputFinalLink}
              placeholder="Paste your link here"
              onChange={(event) => setInputFinalLink(event.target.value)}
            />
            <button type="submit">Get Link</button>
          </form>
        </div>
      </div>

      {finalLink ? (
        <div className={styles.finalLinkDiv}>
          <a href={finalLink} target="_blank" rel="noopener noreferrer">
            {" "}
            <div>{finalLink}</div>{" "}
            <div>
              {" "}
              <i
                className="fi fi-rr-arrow-right"
                style={{ marginTop: "5px" }}
              ></i>
            </div>
          </a>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Form;
