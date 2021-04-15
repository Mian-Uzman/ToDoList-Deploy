import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../style.css';


function Footer() {
    return (
        <div className='footer'>
            <Card bg="dark" text="light">
                <Card.Body>
                    <Card.Title >Get things done from today !</Card.Title>
                    <p>
                        About Me!
                </p>
                    <ul className='footer-list'>
                        <button
                            type="button"
                            className="btn btn-outline-light"
                            href='https://www.linkedin.com/in/mian-uzman-munib-b250501ba/'>LinkedIn
                        </button>
                        <button
                            type="button"
                            className="btn  btn-outline-light"
                            href='https://www.instagram.com/mian__uzman/'>Instagram
                        </button>
                        <button
                            type="button"
                            className="btn  btn-outline-light"
                            href='https://www.facebook.com/uzman.munib/'>Facebook
                        </button>

                    </ul>

                    <Card.Text className="mt-5" >
                        Contact Me!
                </Card.Text>
                    <button

                        type="button"
                        className="btn btn-light"
                        href='https://www.facebook.com/uzman.munib/'>uzmanA3@gmail.com
                        </button>
                </Card.Body>
                <Card.Footer style={{ textAlign: 'center' }} className="text-muted">Made By Uzman</Card.Footer>
            </Card>
        </div>
    )
}

export default Footer;

