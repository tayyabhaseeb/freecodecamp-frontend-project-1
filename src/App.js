import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons"; // Import the specific icon

function App() {
  const [quotation, setQuotation] = useState("");
  const [author, setAuthor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#8B8");

  useEffect(() => {
    fetchQuote();
  }, []);

  async function fetchQuote() {
    const res = await fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    );

    const data = await res.json();
    const randomNumber = Math.floor(Math.random() * data.quotes.length);
    setQuotation(data.quotes[randomNumber].quote);
    setAuthor(data.quotes[randomNumber].author);

    setBackgroundColor(getRandomColor());
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div
      className="min-h-screen m-0 p-0 flex items-center justify-center p-4"
      style={{ backgroundColor: backgroundColor }}
    >
      <div
        id="quote-box"
        className="w-[600px] border border-gray-300 p-4 box-border overflow-hidden text-center h-[300px] flex flex-col justify-center rounded bg-white"
      >
        <div id="text" className=" px-6 py-4 text-2xl text-center">
          <h1 style={{ color: backgroundColor }}>{quotation}</h1>
        </div>
        <div className="p-2 flex flex-col mt-4 ">
          <div id="author" className="ml-auto mb-2">
            <h2 style={{ color: backgroundColor }}>{author}</h2>
          </div>

          <div className="flex items-center justify-between  py-2">
            <a
              id="tweet-quote"
              href="https://twitter.com/intent/tweet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 ml-2 text-3xl"
              style={{ color: backgroundColor }}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>

            <button
              id="new-quote"
              className=" text-white px-4 py-2 rounded mr-2 "
              onClick={fetchQuote}
              style={{ backgroundColor: backgroundColor }}
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
