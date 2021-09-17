import React, { useEffect, useState, useContext } from "react";

import { Context } from "../App";

import Gif from "./Gif";

const Search = () => {
  const { key } = useContext(Context);

  const [gifsArray, setGifsArray] = useState([]);
  const [req, setReq] = useState("");
  const [loading, setLoading] = useState(false);

  const getGifs = (q) => {
    setLoading(true);
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${q}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        setGifsArray(data.data);
      });
  };

  return (
    <div className=" container column centered">
      <h1>Search</h1>
      <div className="row centered">
        <input
          type="text"
          onChange={(e) => setReq(e.target.value)}
          value={req}
        />
        <button
          onClick={() => {
            setReq("");
            getGifs(req);
          }}>
          Search
        </button>
      </div>
      {loading && <h1>Loading...</h1>}
      <div className="wrapper row">
        {gifsArray.length > 0 && gifsArray.map((gif) => <Gif gif={gif} />)}
      </div>
    </div>
  );
};

export default Search;
