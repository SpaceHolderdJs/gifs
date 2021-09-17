import React, { useEffect, useContext } from "react";

import { Context } from "../App";

import Section from "./Section";

const Main = () => {
  const { store, dispatch } = useContext(Context);

  return (
    <div className="container column centered main">
      {store.lc?.length > 0 ? (
        store.lc.map((cat) => <Section category={cat} />)
      ) : (
        <h1>No liked categories</h1>
      )}
    </div>
  );
};

export default Main;
