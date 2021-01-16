import React, { useState, useEffect } from "react";
import { FetchBooks, AddBooks, GetBook, UpdateBooks, DeleteBooks } from "./settings";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form
} from "react-bootstrap";

function AdminCrud() {

  const initialValues = {
    isbn: "",
    title: "",
    authors: "",
    publisher: "",
    publishYear: ""
  };

  //const [allPerson, setAllPerson] = useState([]);
  //const [person, setPerson] = useState(initialValues);
  const [allBooks, setAllBooks] = useState([]);
  const [book, setBook] = useState(initialValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateForm(book);
    console.log("from submit " + book);
  };

  const handleChange = (event) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    setBook({ ...book, [id]: value });
    console.log("from change: " + id);
  };

  const fetchAllBooks = () => {
    fetch(FetchBooks)
      .then((res) => res.json())
      .then((data) => {
        setAllBooks(data);
      });
  };

  const deleteBook = (id) => {
    const options = makeOptions("DELETE");
console.log("Delete " + id)
    fetch(DeleteBooks + id, options)
      .then((res) => res.json())
      .then((data) => {
        setAllBooks(data);
        fetchAllBooks();
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };

  const updateForm = (b) => {
    const options = makeOptions("PUT", b);

    fetch(UpdateBooks + b.id, options)
      .then((res) => fetchAllBooks())
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error" + err);
        }
      });
  };

  const getBook = (id) => {
    fetch(GetBook + id)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        console.log(data);
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };

  const addPerson = () => {
    const options = makeOptions("POST", book);

    fetch(AddBooks, options)
      .then((res) => res.json())
      .then((res) => fetchAllBooks())
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        } else {
          console.log("Network error");
        }
      });
  };

  const userForm = () => {
    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="isbn">
            <Form.Label>Isbn</Form.Label>
            <Form.Control
              type="text"
              placeholder="Isbn"
              value={book.isbn}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              value={book.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="authors">
            <Form.Label>Authors</Form.Label>
            <Form.Control
              type="text"
              placeholder="Authors"
              value={book.authors}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="publisher">
            <Form.Label>Publisher</Form.Label>
            <Form.Control
              type="text"
              placeholder="Publisher"
              value={book.publisher}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="publishYear">
            <Form.Label>Publish Year</Form.Label>
            <Form.Control
              type="text"
              placeholder="Publish Year"
              value={book.publishYear}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="info" size="sm" type="submit">
            Update book
          </Button>
          &nbsp;
          {/* <Button onClick={() => initialValues}>Cancel</Button> */}
        </Form>
        <p>{JSON.stringify(book)}</p>
      </div>
    );
  };

  /*
  Function for POST, PUT and DELETE
  */
  function makeOptions(method, body) {
    const opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      }
    };
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }

  /* function fetchWithErrorCheck(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  } */

  useEffect(() => {
    fetchAllBooks();
  }, []);

  return (
    <div>
      <Container>
        <h1 className="display-4 text-center">CRUD for books</h1>
        <Row className="mt-4">
          <Col>
            <Table striped bordered hover size="sm">
              
                <thead>
                  <tr>
                    <th>Isbn</th>
                    <th>Title</th>
                    <th>Authors</th>
                    <th>Publisher</th>
                    <th>Publisher year</th>
                  </tr>
                </thead>
             
              <tbody>
                {allBooks.all &&
                  allBooks.all.map((element) => {
                    return (
                      <tr key={element.id}>
                        <td>{element.isbn}</td>
                        <td>{element.title}</td>
                        <td>{element.authors}</td>
                        <td>{element.publisher}</td>
                        <td>{element.publishYear}</td>
                        <td>
                          <Button variant="warning" size="sm" onClick={() => getBook(element.id)}>
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => deleteBook(element.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            <Button variant="info" size="sm" onClick={() => addPerson()}>Add book</Button>
          </Col>
        </Row>

        {userForm()}
      </Container>
    </div>
  );
}

export default AdminCrud;
