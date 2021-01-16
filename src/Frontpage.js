import { Container, Row, Col } from "react-bootstrap";
const Frontpage = () => {
    return (
        <div>
            <Container>
                <h1 className="display-1 text-center">Book Library</h1>
                <h1 className="display-4 text-center text-muted">Welcome to your own Library</h1>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <p className="mt-4">Login to see a list of all books and be able to 
                        search for a book title.</p>

                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}
export default Frontpage;