import { useReducer, createContext, useEffect } from "react";
import "./App.css";

import Trends from "./components/Trends";
import Text from "./components/Text";
import Search from "./components/Search";
import Category from "./components/Category";
import Main from "./components/Main";

import Preview from "./components/Preview";

import LikeList from "./components/LikeList";

export const Context = createContext(null);

const reducer = (store, action) => {
  switch (action.type) {
    case "CHANGE_TAB":
      return { ...store, tab: action.payload };

    case "SHOW_LL":
      return { ...store, showLL: !store.showLL };

    case "INIT_LL":
      return { ...store, ll: action.payload };

    case "ADD_TO_LL":
      return { ...store, ll: [...store.ll, action.payload] };

    case "REMOVE_FROM_LL":
      return {
        ...store,
        ll: store.ll.filter((item) => item.id !== action.payload.id),
      };

    case "ADD_PREV_GIF":
      return { ...store, prevGif: action.payload };

    case "REMOVE_PREV_GIF":
      return { ...store, prevGif: null };

    case "INIT_LC":
      return { ...store, lc: action.payload };

    case "ADD_TO_LC":
      return { ...store, lc: [...store.lc, action.payload] };

    case "REMOVE_FROM_LC":
      return {
        ...store,
        lc: store.lc.filter((item) => item !== action.payload),
      };

    default:
      return store;
  }
};

function App() {
  const [store, dispatch] = useReducer(reducer, {
    tab: "main",
    showLL: false,
    ll: [],
  });

  useEffect(() => {
    dispatch({
      type: "INIT_LL",
      payload: localStorage.getItem("ll")
        ? JSON.parse(localStorage.getItem("ll"))
        : [],
    });

    dispatch({
      type: "INIT_LC",
      payload: localStorage.getItem("lc")
        ? JSON.parse(localStorage.getItem("lc"))
        : [],
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("ll", JSON.stringify(store.ll));
  }, [store.ll]);

  useEffect(() => {
    localStorage.setItem("lc", JSON.stringify(store.lc));
  }, [store.lc]);

  return (
    <div className="App column centered">
      <header className="row centered">
        <button
          onClick={() => dispatch({ type: "CHANGE_TAB", payload: "main" })}>
          Main
        </button>
        <button
          onClick={() => dispatch({ type: "CHANGE_TAB", payload: "trends" })}>
          Trends
        </button>
        <button
          onClick={() => dispatch({ type: "CHANGE_TAB", payload: "text" })}>
          Create text
        </button>
        <button
          onClick={() => dispatch({ type: "CHANGE_TAB", payload: "search" })}>
          Search
        </button>
        <button
          onClick={() => dispatch({ type: "CHANGE_TAB", payload: "category" })}>
          Category
        </button>
        <button onClick={() => dispatch({ type: "SHOW_LL" })}>LikeList</button>
      </header>

      <Context.Provider
        value={{ dispatch, store, key: "lEvYbXlyviIwbqeJQAT2NzLLrxgzKxeS" }}>
        {store.tab === "main" && <Main />}
        {store.tab === "trends" && <Trends />}
        {store.tab === "text" && <Text />}
        {store.tab === "search" && <Search />}
        {store.tab === "category" && <Category />}
        {store.showLL && <LikeList />}
        {store.prevGif && <Preview gif={store.prevGif} />}
      </Context.Provider>
    </div>
  );
}

export default App;
