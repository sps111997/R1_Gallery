const SearchQuery = ({setIsVisible}) => {
  const list = localStorage.getItem("searchQuery");
  const searchList = list.split(",");
  searchList.pop();
  const handleClear = () =>{
    localStorage.removeItem('searchQuery');
    setIsVisible(false);
  }
  return (
    <div className="searchQuery">
    {searchList.map((list,index) => {
      return (
        <li key={index}>{list}</li>
      );
    })}
      <button style={{color: "red"}} onClick={handleClear}>clear</button>
    </div>
  );
};
export default SearchQuery;
