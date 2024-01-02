import { useEffect, useState } from "react";
import useBooks, { Book } from "../../hooks/useBooks";
import apiClient from "../../services/api-client";
import BookCard from "../BookCard";
import "./BooksGrid.css";
import SearchBar from "../SearchBar";

interface BooksGridProps {
  onEditClick: (id: number) => void;
}

const BooksGrid = ({ onEditClick }: BooksGridProps) => {
  const { books: fetchedBooks, error, isLoading } = useBooks();

  const [books, setBooks] = useState<Book[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<
    "title" | "author" | "genre" | "publicationYear"
  >("title");

  useEffect(() => {
    if (fetchedBooks.length === 0) return;
    setBooks(fetchedBooks);
  }, [fetchedBooks]);

  const onDeleteClick = (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;

    const originalBooks = [...books];
    apiClient
      .delete(`/books/${id}`)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      })
      .catch((error) => {
        console.error(error);
        setBooks(originalBooks);
      });
  };

  return (
    <>
      <div id="search-results-wrapper">
        {isLoading ? (
          <h1 className="loading-status">Loading...</h1>
        ) : error ? (
          <h1 className="error">{error}</h1>
        ) : (
          <>
            <SearchBar
              onCategoryChange={(category) => setCategory(category)}
              onSearchChange={(searchInput) => {
                setSearchTerm(searchInput);
              }}
            />
            <h2>{books.length > 0 ? "Books" : "No books were found."}</h2>
            <div id="search-results">
              {books
                .filter((book) => {
                  if (searchTerm === "") {
                    return true;
                  }
                  if (category === "title") {
                    return book.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                  } else if (category === "author") {
                    return book.author
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                  } else if (category === "genre") {
                    return book.genre
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
                  } else if (category === "publicationYear") {
                    return book.publicationYear
                      .toString()
                      .includes(searchTerm);
                  }
                })
                .map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BooksGrid;
