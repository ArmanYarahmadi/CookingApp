import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./recipe.js";

const App = () => {
  const APP_ID = "67ce9fdb";
  const APP_KEY = "645c5157731402bb30e98f14b3c94ec4";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [quary, setQuary] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [quary]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuary(search);
    setSearch("");
  };

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${quary}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        ></input>
        <button className="search-button" type="submit">
          search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
