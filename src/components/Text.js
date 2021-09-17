import React, { useContext, useState } from "react";

import Gif from "./Gif";

import { Context } from "../App";

const Text = () => {
  const { key } = useContext(Context);

  const getGifs = (q) => {
    setLoading(true);
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${key}&s=${q}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        setGif(data.data);
      });
  };

  const [gif, setGif] = useState();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="container column centered text">
      <h1>Gif from Text</h1>
      <div className="row centered">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button
          onClick={() => {
            setText("");
            getGifs(text);
          }}>
          Create
        </button>
      </div>
      {loading && <h1>Loading...</h1>}
      <div className="wrapper row">{gif && <Gif gif={gif} />}</div>
    </div>
  );
};

export default Text;
