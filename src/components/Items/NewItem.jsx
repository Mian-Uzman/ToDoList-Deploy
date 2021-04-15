import React from 'react';
import "../style.css";
import { Link } from 'react-router-dom';

function NewItem({ handleAddText, handleSubmitButton }) {
    return (
        <React.Fragment>
            <div className="item-input">
                <h3>Add Item</h3>

                <div className="input-group mb-3" >
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="New Item"
                        onChange={handleAddText} />
                </div>

                <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={handleSubmitButton}>Create
                            </button>

                <Link to="/lists/">
                    <button className="ml-2 btn btn-outline-dark" variant="dark">Back</button>
                </Link>
            </div>
        </React.Fragment>
    )
}

export default NewItem;
