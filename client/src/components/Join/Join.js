//{useState} => This is a hooks for using state inside of the function for based components
import React, { useState } from 'react';

import { Link } from 'react-router-dom';//this link is used to link to our /chat path

import './Join.css';
import mac13 from '../../icons/mac13.png'; 

//name, setter function to pass name state
//room, setter function to pass room state
const Join = () => {
    //declare hooks inside of the function based components
    const [name, setName] = useState('');//pass the name state in the empty string
    const [room, setRoom] = useState('');
    return (
        <div className="container"> 
        <div className="loginRoomBox">
            <h2 id="introTitle">App name</h2>
            <h3 id="introSubtitle">subheader goes here</h3>
            {/* When user put something in the input, event will occur and we can get data from this event with event.target.value which holds our data */}
            <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
            <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>

            {/* link to chat application */}
            <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name} & room=${room}`}>
                <button className="button mt-20" type="submit">Join</button>
            </Link>            
            </div>
            <div className="loginImage">
              
          </div>   
          <div className="loginImage">
              {/* <img src = "https://i.picsum.photos/id/101/200/300.jpg"></img> */}
              <img className = "mac" src = {mac13}></img>
          </div>  
        </div>
    )
}
export default Join;