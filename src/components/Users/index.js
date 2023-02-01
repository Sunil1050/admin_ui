import UserCard from "../UserCard";

export default function Users({ currentItems, deleteSingleUser, selectedUser, editedUser}) {
    return (
        <>
            {currentItems &&
                currentItems.map((item) => (
                    <UserCard eachUser={item} deleteSingleUser={deleteSingleUser} selectedUser={selectedUser} editedUser={editedUser} />
                ))}
        </>
    );
}