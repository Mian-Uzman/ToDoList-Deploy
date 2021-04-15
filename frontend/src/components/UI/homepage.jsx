import React from 'react';
import "../style.css"
import { Card, Container } from "react-bootstrap";

function HomePage() {
    return (
        <React.Fragment>
            <Container style={{ marginTop: '50px' }}>
                <div className="heading">
                    <h1>ToDoList</h1>
                    <p>Made with | Django | React |</p>
                </div>
                <div className="home-card">
                    <Card>
                        <Card.Body>
                            <Card.Header>Create a List Now !</Card.Header>
                            <Card.Subtitle className="mb-2 mt-2 text-muted">Add your first list to start getting things done!</Card.Subtitle>
                            <Card.Text>
                                Each individual list can contain sub-items related to it.
                    </Card.Text>
                            <Card.Link href="/lists/">Add your first list...</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
                <div className="home-card">
                    <Card>
                        <Card.Body>
                            <Card.Header>Manage your Lists !</Card.Header>
                            <Card.Subtitle className="mb-2 mt-2 text-muted">Add ToDo-items in each list</Card.Subtitle>
                            <Card.Text>
                                Manage the items in your lists, mark them complete or delete them if you need !
                    </Card.Text>
                            <Card.Link href="/lists/">Show all Lists...</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </React.Fragment>
    )
}

export default HomePage;

