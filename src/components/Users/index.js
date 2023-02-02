import UserCard from "../UserCard";

export default function Users({ currentData, deleteSingleUser, selectedUser, editedUser}) {
    return (
        <>
            {currentData &&
                currentData.map((item) => (
                    <UserCard key={item.id} eachUser={item} deleteSingleUser={deleteSingleUser} selectedUser={selectedUser} editedUser={editedUser} />
                ))}
        </>
    );
}