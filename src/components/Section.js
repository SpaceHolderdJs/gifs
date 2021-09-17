import React, { useEffect, useState, useContext } from "react";

import { Context } from "../App";

import Icon from "@material-ui/core/Icon";

import Gif from "./Gif";

const Section = ({ category }) => {
  const { key, dispatch, store } = useContext(Context);

  const [gifsArray, setGifsArray] = useState([]);
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

  useEffect(() => {
    getGifs(category);
  }, []);

  return (
    <section className="column section">
      <div className="row centered header-wrapper">
        <h2>{category}</h2>
        <span
          className="icon"
          onClick={() =>
            dispatch({ type: "REMOVE_FROM_LC", payload: category })
          }>
          <Icon>close</Icon>
        </span>
      </div>
      <div className="row gif-wrapper">
        {loading && <h1>Loading...</h1>}
        {gifsArray.length > 0 &&
          gifsArray.slice(0, 7).map((gif) => <Gif gif={gif} />)}
      </div>
    </section>
  );
};

export default Section;
