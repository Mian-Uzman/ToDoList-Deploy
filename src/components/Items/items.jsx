import { useState, useEffect } from 'react'
import axios from "axios";
import NewItem from "./NewItem";
import { InputGroup, FormControl } from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import { Dropdown, DropdownButton } from 'react-bootstrap';



function Items(props) {
    const listID = props.match.params.listID;
    const name = props.location.name;
    const [allItems, SetAllItems] = useState([{
        id: null,
        text: null,
        complete: null,
    }]);
    const [newItem, SetNewItem] = useState([{
        id: "",
        text: "",
        complete: false,
    }]);
    const [changeDetection, setChangeDetection] = useState(false);




    const getAllItems = () => {
        axios.get(`/api/get-items/${listID}`,
            { headers: { "authorization": `JWT ${localStorage.getItem('token')}` } })
            .then(response => {
                SetAllItems(response.data);
            })
            .catch(err => console.log(err));
    }


    const deleteItem = (item) => {
        const index = allItems.indexOf(item);
        axios.delete(`/api/delete-item/${allItems[index].id}`,
            { headers: { "authorization": `JWT ${localStorage.getItem('token')}` } })
            .catch(err => console.log(err));
        setChangeDetection(true);
    }

    const updateItem = (item) => {
        const index = allItems.indexOf(item);
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `JWT ${localStorage.getItem('token')}`
            },
        };
        axios.put(`/api/update-item/${allItems[index].id}`, {
            text: allItems[index].text,
            complete: allItems[index].complete,
            name: listID
        }, requestOptions).catch(err => console.log(err));
        setChangeDetection(true);

    }



    const showStatus = (item) => {
        const index = allItems.indexOf(item);
        if (allItems[index].complete === true) {
            return (<>Completed</>);
        }
        else {
            return (<>In-Complete</>);
        }
    }

    const handleUpdateComplete = (item, e) => {
        const index = allItems.indexOf(item);
        const array = [...allItems];
        array[index].complete = e.target.checked;
        SetAllItems(array);

    }
    const handleUpdateText = (item, e) => {
        const index = allItems.indexOf(item);
        const array = [...allItems];
        array[index].text = e.target.value;
        SetAllItems(array);
    }


    const renderDropdown = () => {
        return (
            <DropdownButton
                id="dropdown-basic-button"
                title="Show Items"
                variant='dark'>
                <Dropdown.Item eventKey='1' onSelect={(e) => showItems(e)}>All Items</Dropdown.Item>
                <Dropdown.Item eventKey='2' onSelect={(e) => showItems(e)}>Completed Items</Dropdown.Item>
                <Dropdown.Item eventKey='3' onSelect={(e) => showItems(e)}>In-Completed Items</Dropdown.Item>
            </DropdownButton >
        )
    }

    const showItems = (e) => {

        if (e === '1') {
            setChangeDetection(true);
        }
        else if (e === '2') {
            const array = [allItems.filter(item => item.complete === true)];
            SetAllItems(...array);
        }
        else if (e === '3') {
            const array = [allItems.filter(item => item.complete === false)];
            SetAllItems(...array);
        }
    }

    //Adding a new item
    const handleAddText = (e) => {
        const array = [...newItem];
        array.text = e.target.value;
        SetNewItem(array);
    }

    const handleSubmitButton = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `JWT ${localStorage.getItem('token')}`
            },

        };
        console.log(listID)
        axios.post("/api/add-item/", {
            text: newItem.text,
            complete: newItem.complete,
            name: listID,
        }, requestOptions).catch(err => console.log(err));
        setChangeDetection(true);

    }


    useEffect(() => {
        getAllItems();
        setChangeDetection(false);
    }, [changeDetection]);



    return (
        <div className="all-lists">
            <h3>Items in: {name} </h3>
            {renderDropdown()}
            <Table className="table table-bordered table-hover  mt-3">

                <thead className="thead-dark">
                    <tr>
                        <th >ID</th>
                        <th>Status</th>
                        <th>Item Name</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {allItems.map((item, index) => (
                        <tr key={item.id}>
                            <td className="table-active" style={{ width: '10%' }}>{index + 1}</td>
                            <td style={{ width: '15%' }}> {showStatus(item)}</td>
                            <td style={{ width: '45%' }}>
                                <InputGroup className="mb-1 mt-1">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox
                                            checked={item.complete}
                                            onChange={(e) => handleUpdateComplete(item, e)} />
                                    </InputGroup.Prepend>
                                    <FormControl
                                        aria-label="Text input with checkbox"
                                        placeholder={item.text}
                                        onChange={(e) => handleUpdateText(item, e)} />
                                </InputGroup>
                            </td>
                            <td style={{ width: '30%' }}>

                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-info mr-2"
                                    onClick={() => updateItem(item)}>Update
                            </button>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => deleteItem(item)}>Delete
                            </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <NewItem
                handleAddText={handleAddText}
                handleSubmitButton={handleSubmitButton} />
        </div>
    )
}

export default Items


