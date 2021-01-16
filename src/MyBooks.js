//import { useState } from "react";
import React, { useState, useEffect } from "react";
import { FetchBooks } from "./settings";
import { Container, Row, Col, Table } from "react-bootstrap";

const MyBooks = () => {

    const [allBooks, setAllBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState([]);
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

    useEffect(() => {
        if (allBooks.all !== undefined) {
            setFiltered(
                Object.values(allBooks.all).filter(book => {

                    console.log("search " + book.title)
                    return book.title.toLowerCase().includes(search.toLowerCase())

                })
            )
        }
    }, [search, allBooks])
    /* 
        const handleChange = (e) => {
            e.preventDefault();
            setSearch(e.target.value);
        };
    
        if(search.length > 0) {
            allBooks.all = Object.values(allBooks.all).filter((i) => {
                console.log("i: " + i.title);
                return i.title.toLowerCase().includes(search.toLowerCase());
            });      
        } */


    return (
        <div>
            <Container>
                <h1 className="display-1 text-center">Books</h1>
                <h1 className="display-4 text-center text-muted">List of all books</h1>
                <Row>
                    <Col>
                        <div className="form-group">
                            <label htmlFor="search">Search by book title her</label>
                            <input
                                type="text"
                                className="form-control"
                                id="search"
                                placeholder="search"
                                onChange={e => setSearch(e.target.value)}
                                value={search} />
                        </div>
                    </Col>
                </Row>
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
                                {filtered &&
                                    filtered.map((element) => {
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