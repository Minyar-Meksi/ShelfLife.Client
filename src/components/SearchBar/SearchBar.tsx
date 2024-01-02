import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

interface SearchBarProps {
    onCategoryChange: (category: "title" | "author" | "genre" | "publicationYear") => void;
    onSearchChange: (searchTerm: string) => void;
}

const SearchBar = ({ onCategoryChange, onSearchChange }: SearchBarProps) => {
  return (
    <div className="search-bar-container">
      <select
        onChange={(e) =>
          onCategoryChange(
            e.target.value as "title" | "author" | "genre" | "publicationYear"
          )
        }
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="genre">Genre</option>
        <option value="publicationYear">Year</option>
      </select>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            onSearchChange(e.target.value);
          }}
        />
        <FaSearch className="search-icon" />
      </div>
    </div>
  );
};

export default SearchBar;
