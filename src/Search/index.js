import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import Gallery from "./../Gallery";
import SearchQuery from "../searchQuery";

const Search = () => {
  const apiKey = "368d2bbffc30c0397568a5d4a232f7a1";
  const [images, setImages] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState("");
  async function handleChange() {
    setIsVisible(false);
    debouncedSearch(query);
  }
  const saveQuery = (e) => {
    setIsVisible(true);
    setQuery(e.target.value);
  };

  const debouncedSearch = React.useRef(
    debounce(async (criteria) => {
      setImages(await search(criteria));
    }, 100)
  ).current;
  async function search(criteria) {
    const prev = localStorage.getItem("searchQuery");
    localStorage.setItem("searchQuery", criteria + "," + prev);
    const response = await fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${criteria}&format=json&nojsoncallback=1`
    );
    const body = await response.json();
    return body.photos.photo;
  }

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <>
      <div className="search-bar">
        <input
          placeholder="search"
          className="searchBar"
          onChange={saveQuery}
        ></input>
        <button onClick={handleChange}>Search</button>
      </div>
      <Gallery images={images} />
      {isVisible ? 
      <div>
    <SearchQuery setIsVisible = {setIsVisible} /> 
    </div> : <></>}
    </>
  );
};
export default Search;
