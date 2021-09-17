import React, { useEffect, useState, useContext } from "react";

import { Context } from "../App";

import Icon from "@material-ui/core/Icon";
import Gif from "./Gif";

const Category = () => {
  const { store, dispatch, key } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [currentCat, setCurrentCat] = useState();
  const [value, setValue] = useState();
  const [gifsArray, setGifsArray] = useState([]);

  const [showAside, setShowAside] = useState(true);

  const getCategories = () => {
    fetch(`https://api.giphy.com/v1/gifs/categories?api_key=${key}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        setCategories(data.data);
      });
  };

  const getGifs = (q) => {
    if (q) {
      setLoading(true);
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${q}`)
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          console.log(data);
          setGifsArray(data.data);
        });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getGifs(currentCat);
  }, [currentCat]);

  return (
    <div className="container column centered">
      {!showAside && (
        <div className="show-side-btn-wrapper row centered">
          <button className="show-side-btn" onClick={() => setShowAside(true)}>
            <p>Categories</p>
          </button>
        </div>
      )}
      {!currentCat ? (
        <h1>Select category</h1>
      ) : (
        <h1>Category: {currentCat && currentCat}</h1>
      )}

      <div className="row centered">
        {showAside && (
          <aside className="column">
            <span className="icon-close" onClick={() => setShowAside(false)}>
              <Icon>close</Icon>
            </span>
            <div className="row centered inp-wrapper">
              <Icon>search</Icon>
              <input type="text" onChange={(e) => setValue(e.target.value)} />
            </div>
            {categories.length > 0 && value
              ? categories
                  .filter((cat) => cat.name.includes(value))
                  .map((cat) => (
                    <div className="row centered category-title">
                      <h3 onClick={() => setCurrentCat(cat.name)}>
                        {cat.name}
                      </h3>
                      <div className="row centered">
                        {store.lc.find((item) => item === cat.name) ? (
                          <span
                            style={{ color: "purple" }}
                            className="icon"
                            onClick={() =>
                              dispatch({
                                type: "REMOVE_FROM_LC",
                                payload: cat.name,
                              })
                            }>
                            <Icon>favorite</Icon>
                          </span>
                        ) : (
                          <span
                            className="icon"
                            onClick={() =>
                              dispatch({ type: "ADD_TO_LC", payload: cat.name })
                            }>
                            <Icon>favorite</Icon>
                          </span>
                        )}

                        <img src={cat.gif.images.original.url} alt="gif" />
                      </div>
                    </div>
                  ))
              : categories.map((cat) => (
                  <div className="row centered category-title">
                    <h3 onClick={() => setCurrentCat(cat.name)}>{cat.name}</h3>
                    <div className="row centered">
                      {store.lc.find((item) => item === cat.name) ? (
                        <span
                          style={{ color: "purple" }}
                          className="icon"
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_LC",
                              payload: cat.name,
                            })
                          }>
                          <Icon>favorite</Icon>
                        </span>
                      ) : (
                        <span
                          className="icon"
                          onClick={() =>
                            dispatch({ type: "ADD_TO_LC", payload: cat.name })
                          }>
                          <Icon>favorite</Icon>
                        </span>
                      )}
                      <img src={cat.gif.images.original.url} alt="gif" />
                    </div>
                  </div>
                ))}
          </aside>
        )}
        <div className="wrapper row">
          {gifsArray.length > 0 && gifsArray.map((gif) => <Gif gif={gif} />)}
        </div>
      </div>
    </div>
  );
};

export default Category;
