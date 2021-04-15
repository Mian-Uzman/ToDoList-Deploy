import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function List({ todolist, deleteList }) {
    return (
        <>
            {
                todolist.map((item, index) => (
                    <tr key={item.id}>
                        <td style={{ width: '10%' }} className="table-active">{index + 1}</td>
                        <td style={{ width: '50%' }}>{item.name}</td>
                        <td style={{ width: '40%' }}>
                            <Link
                                to={{
                                    pathname: `/lists/${item.id}`,
                                    name: item.name,

                                }}>
                                <button className=" btn btn-outline-info" >Add Item</button>

                            </Link>
                            <button className="ml-3 btn btn-outline-danger" onClick={() => deleteList(item)}>Delete</button>


                        </td>
                    </tr>
                ))
            }
        </>
    )
}

export default List
