import React, { useState, useEffect } from 'react';
import axios from "axios";
import CreateList from "./CreateList";
import "../style.css";
import Table from 'react-bootstrap/Table';
import List from './List';


function ToDoList() {
    const [todolist, SetTodolist] = useState([{
        name: null, id: null
    }]);
    const [newList, SetNewList] = useState(null);
    const [changeDetection, setChangeDetection] = useState(false);


    const getAllList = () => {
        axios.get("/api/get-list/",
            { headers: { "authorization": `JWT ${localStorage.getItem('token')}` } })
            .then(response => {
                SetTodolist(response.data);
            })
            .catch(err => console.log(err));

    }

    const deleteList = (item) => {
        const index = todolist.indexOf(item);
        axios.delete(`/api/delete-list/${todolist[index].id}`,
            { headers: { "authorization": `JWT ${localStorage.getItem('token')}` } })
            .catch(err => console.log(err));
        setChangeDetection(true);
    }
    const handleAddList = (e) => {
        SetNewList(e.target.value);
    }
    const handleSubmitButton = () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `JWT ${localStorage.getItem('token')}`
            },

        };
        axios.post("/api/add-list/", {
            name: newList,
        }, requestOptions).catch(err => console.log(err));
        setChangeDetection(true);

    }

    useEffect(() => {
        getAllList();
        setChangeDetection(false);

    }, [changeDetection]);

    return (
        <div className='all-lists'>
            <h3>Total Lists: {todolist.length}</h3>
            <Table className="table table-bordered table-hover" >
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>List Name</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    <List todolist={todolist} deleteList={deleteList} />
                </tbody>
            </Table>
            <CreateList
                handleAddList={handleAddList}
                handleSubmitButton={handleSubmitButton} />
        </div >
    )
}






export default ToDoList


