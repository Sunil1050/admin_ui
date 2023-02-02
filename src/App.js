import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./components/Pagination";
import Users from "./components/Users";
import { fetchAsyncUsers, deleteSelectedUsers, selectAllUsers, editUser, deleteUser, selectUser, searchUsers, changePage } from "./redux/users/userSlice";
import './App.css';


const App = () => {
  const perPage = 10; //No of items to be displayed on each page
  const [isChecked, setIsChecked] = useState(false);

  //Access the data from store using useSelector hook
  const currentPage = useSelector((state) => state.users.currentPage)
  const searchStr = useSelector((state) => state.users.searchTerm)
  let users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  //API an API call to get the list of users

  useEffect(() => {
    dispatch(fetchAsyncUsers())
  }, [dispatch])

  //Filter users based on name, email and role

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchStr.toLowerCase()) ||
    user.email.toLowerCase().includes(searchStr.toLowerCase()) ||
    user.role.toLowerCase().includes(searchStr.toLowerCase()));

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const currentData = filteredUsers.slice(firstIndex, lastIndex);

  // This method is called when user changes the input. 
  // It will dispatch an action called 'searchUsers' which will update the input value 
  // and 'changePage' action will be dispatched so that search results will be displayed from page 1.

  const handleChange = event => {
    dispatch(searchUsers(event.target.value))
    dispatch(changePage(1))
  };

  //This method is used to dispatch an action called 'changePage' 
  // This will change the value of page whenever user clicks on new page

  const handlePageChange = page => {
    dispatch(changePage(page))
  };

  //This method will delete the selected users when 'DeleteSelected' button is clicked
  //This method useful for dispatch an action called 'deleteSelectedUsers' which will delete the selected users.

  const onDeleteSelectedUsers = () => {
    const deleteFilteredUsers = users.filter(item => item.isChecked !== true)
    dispatch(deleteSelectedUsers(deleteFilteredUsers))
    setIsChecked(false)
  }

  //This is called when user clicks on header checkbox used to select all users. This will change checkin status of users
  //An action 'selectAllUsers' will take an updated array and gets dispatched

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

  //This method is called when user clicks on edit button, 
  // This which will edit the specifc user and dispatch 'editUser' action to update the state.

  const editedUser = (userId, name, email, role) => {
    const updatedUsers = users.map(item => {
      if (item.id === userId) {
        return { ...item, name, email, role }
      }
      return item;
    })
    dispatch(editUser(updatedUsers))
  }

  //This method is called when user clicks on 'Delete' button in Actions tab
  //This will dispatch an action called 'deleteUser' and user will be removed from store.

  const deleteSingleUser = (userId) => {
    const updatedUsers = users.filter(item => item.id !== userId)
    dispatch(deleteUser(updatedUsers))
  }

  //This method will called when users clicks on checkbox in "UserCard" component.
  //This will dispatch an action called "selectUser" to change the user checkIn status.

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
          {filteredUsers.length === 0 && <h1 className='error-grid'>No items to display at this moment</h1>}
        </div>
      </div>
      {filteredUsers.length > 0 && (
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