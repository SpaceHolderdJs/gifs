import React, { useContext } from "react";
import Icon from "@material-ui/core/Icon";

import { Context } from "../App";

const Preview = ({ gif }) => {
  const { dispatch } = useContext(Context);
  const { title, trending_datetime, images, id, user } = gif;

  const date = new Date();
  return (
    <div className="column centered prev-wrapper">
      <div className="row centered preview">
        <img src={images.original.url} alt="" className="gif-img" />
        <div className="column info">
          {user ? (
            <>
              <span
                className="icon  icon-close"
                onClick={() => dispatch({ type: "REMOVE_PREV_GIF" })}>
                <Icon fontSize="large">close</Icon>
              </span>
              <div className="row centered">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="" className="avatar" />
                ) : (
                  <Icon fontSize="large">person</Icon>
                )}
                <p>{user.display_name}</p>
              </div>
              <p>
                Profile: <a href={user.profile_url}>Link</a>
              </p>
              <p>
                Instagram: <a href={user.instagram_url}>Link</a>
              </p>
              <p>
                Date of creation:{" "}
                {trending_datetime.split(" ")[0].split("-").reverse().join(".")}
              </p>
            </>
          ) : (
            <>
              <span
                className="icon icon-close"
                onClick={() => dispatch({ type: "REMOVE_PREV_GIF" })}>
                <Icon fontSize="large">close</Icon>
              </span>
              <div className="row centered">
                <h1>No user info</h1>
                <Icon fontSize="large">mood_bad</Icon>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
