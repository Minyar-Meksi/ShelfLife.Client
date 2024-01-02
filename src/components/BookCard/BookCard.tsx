import { Book } from "../../hooks/useBooks";
import "./BookCard.css";

interface BookCardProps {
  book: Book;
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

const BookCard = ({book, onEditClick, onDeleteClick}: BookCardProps) => {
  return (
    <div className="book-card">
      <a href={book.link} target="_blank" className="book-link">
        <div className="book-card-content">
          <div className="book-card-text">
            <div className="book-title">{book.title}</div>
            <div className="book-info">Written by: {book.author}</div>
            <div className="book-info">Genre: {book.genre}</div>
            <div className="book-info">{book.publicationYear}</div>
            <div className="book-info">{book.numberOfPages} Pages</div>
            <div className="book-info">{book.numberOfChapters} Chapters</div>
          </div>
          <div className="book-card-image">
            <img className="book-cover" src={book.coverImage} />
          </div>
        </div>
      </a>
      <div className="book-card-buttons">
        <button className="edit-button" onClick={() => onEditClick(book.id!)}>
          Edit
        </button>
        <button
          className="delete-button"
          onClick={() => onDeleteClick(book.id!)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
