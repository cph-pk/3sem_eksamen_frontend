//import { useState } from "react";
import React, { useState, useEffect } from "react";
import { FetchBooks } from "./settings";
import { Container, Row, Col, Table } from "react-bootstrap";

const MyBooks = () => {

    const [allBooks, setAllBooks] = useState([]);

    const fetchBooks = () => {
        fetch(FetchBooks)
            .then((res) => res.json())
            .then((data) => {
                setAllBooks(data);
                console.log(data);
            });
    };


    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div>
            <Container>
                <h1 className="display-1 text-center">Books</h1>
                <h1 className="display-4 text-center text-muted">List of all books</h1>
                <Row>
                    <Col>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
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
                                                <td>{element.id}</td>
                                                <td>{element.isbn}</td>
                                                <td>{element.title}</td>
                                                <td>{element.authors}</td>
                                                <td>{element.publisher}</td>
                                                <td>{element.publishYear}</td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}
export default MyBooks;