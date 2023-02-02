import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./components/Pagination";
import Users from "./components/Users";
import { fetchAsyncUsers, deleteSelectedUsers, selectAllUsers, editUser, deleteUser, selectUser, searchUsers, changePage } from "./redux/users/userSlice";
import './App.css';


const App = () => {
  const perPage = 10;
  const [isChecked, setIsChecked] = useState(false);
  const currentPage = useSelector((state) => state.users.currentPage)
  const searchStr = useSelector((state) => state.users.searchTerm)
  let users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncUsers())
  }, [dispatch])

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchStr.toLowerCase()) ||
    user.email.toLowerCase().includes(searchStr.toLowerCase()) ||
    user.role.toLowerCase().includes(searchStr.toLowerCase()));

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const currentData = filteredUsers.slice(firstIndex, lastIndex);

  const handleChange = event => {
    dispatch(searchUsers(event.target.value))
    dispatch(changePage(1))
  };

  const handlePageChange = page => {
    dispatch(changePage(page))
  };

  const onDeleteSelectedUsers = () => {
    const deleteFilteredUsers = users.filter(item => item.isChecked !== true)
    dispatch(deleteSelectedUsers(deleteFilteredUsers))
    setIsChecked(false)
  }

  const onSelectAll = (event) => {
    const updatedUsers = users.map(item => {
      if (currentData.includes(item)) {
        return { ...item, isChecked: event.target.checked }
      }
      return item;
    })

    dispatch(selectAllUsers(updatedUsers))
    setIsChecked(event.target.checked);
  }

  const editedUser = (userId, name, email, role) => {
    const updatedUsers = users.map(item => {
      if (item.id === userId) {
        return { ...item, name, email, role }
      }
      return item;
    })
    dispatch(editUser(updatedUsers))
  }

  const deleteSingleUser = (userId) => {
    const updatedUsers = users.filter(item => item.id !== userId)
    dispatch(deleteUser(updatedUsers))
  }

  const selectedUser = (userId, boolean) => {
    const selectedUsersList = users.map(item => {
      if (item.id === userId) {
        return { ...item, isChecked: boolean }
      }
      return item
    })
    dispatch(selectUser(selectedUsersList))
  }

  return (
    <div className="container App">
      <h1 className="text-center">Admin UI</h1>
      <div>
        <h6>Search Filter</h6>
        <input type="search" placeholder="Enter something" className="form-control search-input" onChange={handleChange} value={searchStr} />
        <h6>Search by name,role and email</h6>
      </div>
      <div className="mt-3">
        <table class="table">
          <thead class="table-primary">
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
            <Users currentData={currentData} deleteSingleUser={deleteSingleUser} selectedUser={selectedUser} editedUser={editedUser} />
          </tbody>
        </table>
        <div className="d-flex flex-row justify-content-center mt-2">
          {users.length === 0 && <h1 className='error-grid'>No items to display at this moment</h1>}
        </div>
      </div>
      {users.length > 0 && (
        <div className='d-flex flex-row justify-content-around flex-wrap'>
          <button type="button" className="delete-selected" onClick={onDeleteSelectedUsers}>Delete Selected</button>
          <Pagination
            perPage={perPage}
            total={filteredUsers.length}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )

}
export default App;