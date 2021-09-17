import React, { useEffect, useState, useContext } from "react";
import { Context } from "../App";

import Gif from "./Gif";

const Trends = () => {
  const { key } = useContext(Context);

  const [gifsArray, setGifsArray] = useState([]);

  const getGisf = () => {
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${key}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGifsArray(data.data);
      });
  };

  useEffect(() => {
    getGisf();
  }, []);

  return (
    <div className="container column centered">
      <h1>Trends</h1>
      <div className="wrapper row">
        {gifsArray.length > 0 ? (
          gifsArray.map((gif) => <Gif gif={gif} />)
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default Trends;
