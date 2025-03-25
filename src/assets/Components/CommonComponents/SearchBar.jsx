import React from "react";
import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

const SearchBar = () => {
  return (
    <div className="searchBar flex items-center bg-white rounded-xl px-4 py-2 shadow-md">
      <FaSearch className="text-gray-500 mr-2" />
      <input type="text" placeholder="Search..." className="flex-grow outline-none text-sm text-gray-700" />
      <BsThreeDotsVertical className="text-gray-500 ml-2" />
    </div>
  );
};

export default SearchBar;
