import React, { useContext } from "react";
import Icon from "@material-ui/core/Icon";

import { Context } from "../App";

const Gif = ({ gif }) => {
  const { dispatch, store } = useContext(Context);
  const { title, trending_datetime, images, id, user } = gif;

  return (
    <div className="gif" style={{ background: `url(${images.original.url})` }}>
      <div className="content column centered">
        <h2>{title}</h2>
        <div className="row centered">
          {store.ll.find((item) => item.id === id) ? (
            <span
              className="icon"
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_LL", payload: gif })
              }>
              <Icon fontSize="large">favorite</Icon>
            </span>
          ) : (
            <span
              className="icon"
              onClick={() => dispatch({ type: "ADD_TO_LL", payload: gif })}>
              <Icon fontSize="large">favorite_border</Icon>
            </span>
          )}
          <span
            className="icon"
            onClick={() => dispatch({ type: "ADD_PREV_GIF", payload: gif })}>
            <Icon fontSize="large">info</Icon>
          </span>
          <a href={images.original.url} className="icon" download>
            <Icon fontSize="large">download</Icon>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Gif;
