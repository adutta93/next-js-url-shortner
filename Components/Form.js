import { useState } from "react";
import { setUrl } from "../lib/redis";
const Form = () => {
  const [value, setValue] = useState("");
  const [shortStr, setshortStr] = useState("");
  const [shortUrl, setShortUrl] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/shorter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: value }),
    });
    const data = await response.json();
    console.log("Data from short", data);
    setshortStr(data.short);
    setShortUrl(
      `${document.location.protocol}//${document.location.host}/${data.short}`
    );
    console.log("Data short==> ", data.short);
  };
  console.log("Short url ==> ", shortUrl);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {shortUrl ? (
        <div>
          This is your url short <p>{shortStr}</p>
        </div>
      ) : (
        ""
      )}
      {/* <div>
        <a href={shortUrl} target="_blank" rel="noopener noreferrer">
          {shortUrl ? <div>something more</div> : ""}
        </a>
      </div> */}
    </div>
  );
};

export default Form;
