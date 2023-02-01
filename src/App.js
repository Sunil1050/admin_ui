import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Pagination from "./components/Pagination";
import { getUsers, deleteUser, selectUser, getAllUsers, editUser} from "./redux/users/userSlice";
import './App.css';


const App = () => {
  let users = useSelector(getAllUsers);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
    dispatch(getUsers(data))
  }

  const handleInput = (event) => {
    setInput(event.target.value)
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

  // const editedUser = (userId, name, email, role) => {
  //   const updatedUsers = users.map(item => {
  //     if (item.id === userId) {
  //       return {...item, name, email, role}
  //     }
  //     return item;
  //   })
  //   dispatch(editUser(updatedUsers))
  // }

  const filteredUsers = users.filter(item => {
    return item.name.toLowerCase().includes(input.toLowerCase()) || item.email.toLowerCase().includes(input.toLowerCase()) || item.role.toLowerCase().includes(input.toLowerCase())
  })

  return (
    <div className="App">
      <h1 className="text-center">Admin UI</h1>
      <div>
        <h6>Search Filter</h6>
        <input type="search" placeholder="Enter something to search" className="form-control search-input" onChange={handleInput} value={input} />
        <h6>Search by name,role and email</h6>
      </div>
      <Pagination users={filteredUsers} itemsPerPage={10} filteredUsers={filteredUsers} deleteSingleUser={deleteSingleUser} selectedUser={selectedUser} />
    </div>
  )
}
export default App;