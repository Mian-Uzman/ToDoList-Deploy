import "../style.css"
import { Link } from 'react-router-dom';


function CreateList({ handleAddList, handleSubmitButton }) {
    return (
        <div className="item-input">
            <h3>Create New List</h3>
            <div className="input-group mb-3" >
                <input
                    type="text"
                    className="form-control"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="List Name"
                    onChange={handleAddList} />
            </div>
            <Link to="/lists/">
                <button
                    type="button"
                    className="btn btn-outline-info"
                    onClick={handleSubmitButton}>Create
        </button>
            </Link>
        </div>
    )
}

export default CreateList


