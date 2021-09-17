import React, { useContext } from "react";

import Icon from "@material-ui/core/Icon";

import Gif from "./Gif";

import { Context } from "../App";

const LikeList = () => {
  const { store, dispatch } = useContext(Context);

  return (
    <div className="likeList">
      <div className="column">
        <span
          className="icon-close"
          onClick={() => dispatch({ type: "SHOW_LL" })}>
          <Icon>close</Icon>
        </span>
      </div>
      <h1>LikeList</h1>
      {store.ll?.length > 0 ? (
        store.ll.map((item) => <Gif gif={item} />)
      ) : (
        <h1>No liked gifs yet</h1>
      )}
    </div>
  );
};

export default LikeList;
