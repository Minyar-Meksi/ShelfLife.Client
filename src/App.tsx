import { useState } from "react";
import NavBar from "./components/NavBar";
import BooksGrid from "./components/BooksGrid";
import "./App.css";
import Form from "./components/Form";
import Input from "./components/Input";
import apiClient from "./services/api-client";
import { Book } from "./hooks/useBooks";
import Button from "./components/Button";

function App() {
  const [page, setPage] = useState<"home" | "add" | "update">("home");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [pages, setPages] = useState("");
  const [chapters, setChapters] = useState("");

  const [bookId, setBookId] = useState<number | undefined>(undefined);

  const handleHomeClick = () => {
    setPage("home");
  };

  const handleAddClick = () => {
    setPage("add");
  };

  const getBook = (id: number) => {
    return apiClient.get(`/books/${id}`);
  };

  function clearInputFields() {
    setTitle("");
    setAuthor("");
    setGenre("");
    setYear("");
    setPages("");
    setChapters("");
  }

  const addBook = () => {
    const newBook: Book = {
      title: title,
      author: author,
      genre: genre,
      publicationYear: parseInt(year),
      numberOfPages: parseInt(pages),
      numberOfChapters: parseInt(chapters),
    };

    const url = `https://hapi-books.p.rapidapi.com/search/${title}`;

    const headers = {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "ec2f8ccf8bmshbf1cf334816d19ep12966ejsnbf378abe0c43",
      "X-RapidAPI-Host": "hapi-books.p.rapidapi.com",
    };

    const options = {
      method: "GET",
      headers: headers,
      url: url,
    };

    apiClient(options)
      .then((response) => {
        if (response.data.length > 0) {
          if (response.data[0].cover)
            newBook.coverImage = response.data[0].cover;

          if (response.data[0].url) newBook.link = response.data[0].url;

        }
      })
      .then(() => {
        apiClient
        .post("/books", newBook)
        .then((response) => {
          console.log(response);
          alert("Book added successfully!");
          setPage("home");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
    
    clearInputFields();
  };

  const handleEditClick = (id: number) => {
    setPage("update");
    setBookId(id);
    getBook(id)
      .then((response) => {
        const bookToEdit = response.data;
        setTitle(bookToEdit.title);
        setAuthor(bookToEdit.author);
        setGenre(bookToEdit.genre);
        setYear(bookToEdit.publicationYear.toString());
        setPages(bookToEdit.numberOfPages.toString());
        setChapters(bookToEdit.numberOfChapters.toString());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateBook = () => {
    getBook(bookId!).then((response) => {
      const bookToUpdate = response.data;
      const updatedBook: Book = {
        ...bookToUpdate,
        title: title,
        author: author,
        genre: genre,
        publicationYear: parseInt(year),
        numberOfPages: parseInt(pages),
        numberOfChapters: parseInt(chapters),
      };

      apiClient
        .put("/books/", updatedBook)
        .then((response) => {
          console.log(response);
          setBookId(undefined);
        })
        .catch((error) => {
          console.error(error);
        });
    });

    clearInputFields();
    setTimeout(() => {
      setPage("home");
    }, 1000);
  };

  const handleOnSubmit = () => {
    if (page === "add") {
      addBook();
    } else if (page === "update") {
      updateBook();
    }
  };

  return (
    <>
      <NavBar
        onHomeClick={handleHomeClick}
        onAddClick={handleAddClick}
      />
      {page === "home" ? (
        <BooksGrid onEditClick={handleEditClick} />
      ) : page === "add" || page === "update" ? (
        <Form onSubmit={handleOnSubmit}>
          <Input
            label="Title"
            value={title}
            onChange={(value) => setTitle(value)}
          />
          <Input
            label="Author"
            value={author}
            onChange={(value) => setAuthor(value)}
          />
          <Input
            label="Genre"
            value={genre}
            onChange={(value) => setGenre(value)}
          />
          <Input
            label="Publication Year"
            type="number"
            min={1800}
            max={2024}
            value={year}
            onChange={(value) => setYear(value)}
          />
          <Input
            label="Number of Pages"
            type="number"
            min={10}
            value={pages}
            onChange={(value) => setPages(value)}
          />
          <Input
            label="Number of Chapters"
            type="number"
            min={1}
            value={chapters}
            onChange={(value) => setChapters(value)}
          />
          {page === "add" ? (
            <Button label="Submit" />
          ) : (
            <Button label="Update" />
          )}
        </Form>
      ) : (
        <h1>Search</h1>
      )}
    </>
  );
}

export default App;
