import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { deleteSelectedUsers, selectAllUsers } from "../../redux/users/userSlice"
import Users from '../Users';
import './index.css';

function Pagination({ itemsPerPage, users, filteredUsers, deleteSingleUser, selectedUser, editedUser }) {
    const [isChecked, setIsChecked] = useState(false);
    const dispatch = useDispatch();
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = users.slice(itemOffset, endOffset);
    // console.log('Current items are: ', currentItems)
    const pageCount = Math.ceil(users.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % users.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };

    const onDeleteSelectedUsers = () => {
        const filteredUsers = users.filter(item => item.isChecked !== true)
        dispatch(deleteSelectedUsers(filteredUsers))
        setIsChecked(false)
    }

    const onSelectAll = (event) => {
        const updatedUsers = users.map(item => {
            if (currentItems.includes(item)) {
                return { ...item, isChecked: event.target.checked }
            }
            return item;
        })

        dispatch(selectAllUsers(updatedUsers))
        setIsChecked(event.target.checked);
    }

    return (
        <>
            <div className="mt-5">
                <table class="table">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">
                                <input type="checkbox" className="checkbox" onChange={onSelectAll} checked={isChecked} />
                            </th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 &&
                            <Users currentItems={currentItems} filteredUsers={filteredUsers} deleteSingleUser={deleteSingleUser} selectedUser={selectedUser} editedUser={editedUser} />
                        }
                    </tbody>
                </table>
                <div className="d-flex flex-row justify-content-center mt-2">
                    {users.length === 0 && <h1 className='error-grid'>No items to display at this moment</h1>}
                </div>
            </div>
            {users.length > 0 && (
                <div className='d-flex flex-row justify-content-around'>
                    <button type="button" className="delete-selected" onClick={onDeleteSelectedUsers}>Delete Selected</button>
                    <ReactPaginate
                        activeClassName={'item active '}
                        breakClassName={'item break-me '}
                        breakLabel={'...'}
                        containerClassName={'pagination'}
                        disabledClassName={'disabled-page'}
                        marginPagesDisplayed={2}
                        nextClassName={"item next "}
                        nextLabel={<AiOutlineArrowRight style={{ fontSize: 18, width: 150, color: '#fff' }} />}
                        onPageChange={handlePageClick}
                        pageCount={pageCount}
                        pageClassName={'item pagination-page '}
                        pageRangeDisplayed={2}
                        previousClassName={"item previous"}
                        previousLabel={<AiOutlineArrowLeft style={{ fontSize: 18, width: 150, color: '#fff' }} />}
                    />
                </div>
            )}
        </>
    );
}
export default Pagination;

