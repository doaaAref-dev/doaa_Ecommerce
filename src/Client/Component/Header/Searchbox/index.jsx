import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Searchbox({ placeholder }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`); // نرسل النص في URL
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="searchbox-wrapper">
      <input
        type="text"
        className="searchbox"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search_button" type="submit">
        <IoSearchOutline />
      </button>
    </form>
  );
}
