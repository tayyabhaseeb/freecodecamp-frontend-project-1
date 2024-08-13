import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons"; // Import the specific icon

function App() {
  const [quotation, setQuotation] = useState("");
  const [author, setAuthor] = useState("");

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
  }

  return (
    <div
      id="quote-box"
      className="w-[600px] border border-gray-300 p-4 box-border overflow-hidden text-center h-[300px] flex flex-col justify-center "
    >
      <div
        id="text"
        className="border-solid border-2 border-blue-500 px-6 py-4 text-center"
      >
        <h1>{quotation}</h1>
      </div>
      <div className="bg-red-400 p-2 flex flex-col mt-4 ">
        <div id="author" className="ml-auto mb-2">
          <h2>{author}</h2>
        </div>

        <div className="flex items-center justify-between border-solid border-4 border-red-500 py-2">
          <a
            id="tweet-quote"
            href="https://twitter.com/intent/tweet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 ml-2 text-3xl"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>

          <button
            id="new-quote"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 "
            onClick={fetchQuote}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
