const users = [];

//add user function
const addUser = ({ id, name, room }) => {
    //using trim function to remove white spaces from a string
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    //check if there is an existing username has been taken
    const existingUser = user.find((user) => user.room === room && user.name === name);

    // user can't sign in with the name already exist.
    if(existingUser){
        return { error: 'Username is taken'};
    }

    //if there is no existing user, create a new user
    const user = { id, name, room };
    users.push(user);//push this new user to our new array
    return { user }; //return so we know which user was pushed
}

//remove user function
const removeUser = (id) =>{
    //find the user with id
    const index = users.findIndex((user) => user.id === id);

    //if there is user with that id, return the user from that index 1 field and remove it from users array
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

//get user function
//check if there is a user, return user with that id 
const getUser = (id) => users.find((user) => user.id === id);

//get users(all users) in a specific room using filter function, return all users from that room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };

