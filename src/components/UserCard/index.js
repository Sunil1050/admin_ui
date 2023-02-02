import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'

const UserCard = ({ eachUser, deleteSingleUser, selectedUser, editedUser }) => {
    const { id, name, email, role, isChecked } = eachUser;
    const [userName, setUserName] = useState(name)
    const [userEmail, setUserEmail] = useState(email)
    const [userRole, setUserRole] = useState(role);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setUserName(name);
        setUserEmail(email);
        setUserRole(role);
    }, [eachUser]);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }

    const onEdit = () => {
        console.log('Each user: ', eachUser)
        console.log('Each user state: ', { userName, userEmail, userRole })
        handleShow()
    }

    const onDelete = () => {
        deleteSingleUser(id);
    }

    const onClickCheckbox = (event) => {
        const userId = event.target.id;
        const userStatus = event.target.checked;
        selectedUser(userId, userStatus)
    }

    const onChangeName = (event) => {
        setUserName(event.target.value)
    }

    const onChangeEmail = (event) => {
        setUserEmail(event.target.value)
    }

    const onChangeRole = (event) => {
        setUserRole(event.target.value)
    }

    const onSave = () => {
        editedUser(id, userName, userEmail, userRole)
        handleClose()
    }

    const renderForm = () => {
        return (
            <form>
                <div class="mb-3">
                    <label htmlFor="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" onChange={onChangeName} value={userName} />
                </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChangeEmail} value={userEmail} />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label htmlFor="role" class="form-label">Role</label>
                    <input type="text" class="form-control" id="role" aria-describedby="emailHelp" onChange={onChangeRole} value={userRole} />
                </div>
            </form>
        )

    }
    return (
        <tr className={`${isChecked && "table-success"}`}>
            <th scope="row">
                <input type="checkbox" className="checkbox" id={id} onChange={onClickCheckbox} checked={isChecked} />
            </th>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>
                <>
                    <button type="button" className="action-button" onClick={onEdit}>
                        <FiEdit className="action-icon" />
                    </button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit User Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {renderForm()}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={onSave}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
                <button type="button" className="action-button" onClick={onDelete}>
                    <MdDelete className="action-icon" color="#ff0000" />
                </button>
            </td>
        </tr>
    )
}
export default UserCard;