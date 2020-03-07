import React from 'react';
import config from '../../config';
import io from 'socket.io-client';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import BottomBar from '../BottomBar/BottomBar';
import './Chat.css';
import GiphyAPI from "../../utils/GiphyAPI";
import axios from "axios";

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import React, { useState } from 'react';



class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chat: [],
      content: '',
      name: '',
      gif: '',
    };
  }

  googleCall() {
    axios.get("/api/nlp/?chat=" + this.state.content)
      .then(res => {
        console.log(res);
        if (res.data.length >= 1) {
          this.GiphySearch(res.data[0].name);
        }
      })
  }

  GiphySearch = query => {
    GiphyAPI.search(query)
      .then(res => {
        console.log(res.data.data);
        const gif = res.data.data.image_original_url;
        this.setState({ gif })

        const gifObj = {
          name: "giphy",
          // content: gif
        };

        this.setState((state) => ({
          chat: [...state.chat, gifObj],
        }), this.scrollToBottom);

        console.log(gifObj);
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {

    this.socket = io(config[process.env.NODE_ENV].endpoint);

    // Load the last 10 messages in the window.
    this.socket.on('init', (msg) => {
      this.setState((state) => ({
        chat: [...state.chat, ...msg.reverse()],
      }), this.scrollToBottom);
    });

    // Update the chat if a new message is broadcasted.
    this.socket.on('push', (msg) => {
      this.setState((state) => ({
        chat: [...state.chat, msg],
      }), this.scrollToBottom);
      console.log(msg);
    });
  }

  // Save the message the user is typing in the input field.
  handleContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  //
  handleName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  // When the user is posting a new message.
  handleSubmit(event) {
    console.log(event);
    // Prevent the form to reload the current page.
    event.preventDefault();

    this.setState((state) => {
      console.log(state);
      console.log('this', this.socket);
      // Send the new message to the server.
      this.socket.emit('message', {
        name: state.name,
        content: state.content,
        gif: state.gif,
      });
      this.googleCall();

      // Update the chat with the user's message and remove the current message.
      return {
        chat: [...state.chat, {
          name: state.name,
          content: state.content,
          gif: state.gif,
        }],
        content: '',

      };
    }, this.scrollToBottom);
  }

  // Always make sure the window is scrolled down to the last message.
  scrollToBottom() {
    const chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight;
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div className="App">
        <Paper id="chat" elevation={3}>
          {this.state.chat.map((el, index) => {
              return (
                <div key={index}>
                  <Typography variant="caption" className="name">
                    {el.name}
                  </Typography>
                  <Typography variant="body1" className="content">
                    {el.content}
                  </Typography>
                  <img src={el.gif} alt="gif"></img>
                </div>
              )
          })}
        </Paper>
        {/* <img src={this.state.gif} alt="gif"></img> */}
        <BottomBar
          content={this.state.content}
          handleContent={this.handleContent.bind(this)}
          handleName={this.handleName.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          name={user.name.split(" ")[0]}
        />
      </div>
    );
  }
};

export default Chat;