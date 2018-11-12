import React, { Component } from 'react';
import NavigationBar from '../common/NavigationBar';
import { Button, TextField } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import "./ProfilePage.css";
import Dialog from '../common/Dialog';

import jwt_decode from 'jwt_decode';
import axios from 'axios';
import {getLocal} from '../../utils/util';

// This is profile page - used to update and modify user info
// Goal & Requirements:
//      - Use container structure to divide page into a few parts
//      - Display should be "column"
//      - In each row, there could possibly be a new container, display can be
//        either "row" or "column"
//      - Use the theme colors provided in MainPage.js

// 2 major parts
//     - Part One: nav bar
//         - Nav bar should be the same
//         - title "furnitrade" and logo should redirect the user to MainPage
//         - drawer stays the same --(temporary) --(if you think you can update it, free
//           free to do so)

//     - Part Two: user info
//         - Sub-part One - Left-hand-side
//             - User Photo - include a Button for uploading new photo if user
//                 has no profile photo. Otherwise, the button is for changing
//                 profile photo
//             - User First and Last Name - Under the photo, include a "save" or
//                 "update" button
//             - (Optional) brief introduction - brief introduction of user filled by user
//                 himself or herself
//         - Sub-part Two - Right-hand-side
//             - Address information
//             - email information
//             - university information - should be a drop down menu which offers university List

// Note:
//     - feel free to redesign the layout. Keep dis shit good looking tho.
//     - feel free to use a new theme. Just make sure the color stays the same


const MainTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#42668f',
      main: '#134074',
      dark: '#0d2c51',
    },
    secondary: {
      light: '#61a5c5',
      main: '#3A8FB7',
      dark: '#286480',
    },
    inherit: {
      light: '#f7ca7f',
      main: '#F6BD60',
      dark: '#ac8443',
    },
  },
  typography: {
    fontFamily: '"Righteous", sans-serif',
  },
});

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: 'test-propic.jpg',
      username: 'Jack Ma',
      email: 'jackma@alibaba.com',
      address: 'Hangzhou, China',
      university: 'University of California, San Diego',
      readOnly: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  // send get request, get the user profile
 /* componentDidMount() {
    let username = getLocal("username");
    // change the logic later
    let reqData = {
      'username': username
    };
    if (username !== '') {
      axios({
        method: 'get',
        url: 'http://127.0.0.1:5000/profile/' + username,
        // withCredentials: false,
        // crossdomain: true,
        data: reqData,
        // responseType: 'json',
        // headers: {
        //   //"Content-Type": "application/x-www-form-urlencoded",
        //   "Content-Type": "application/json",
        //   "Cache-Control": "no-cache",
        // }
      }).then((response) => {
        console.log(response.data);
        let code = response.data.status;
        if (code === 200) {
          this.setState({
            username: response.data.username,
            email: response.data.email,
            address: response.data.address,
            university: response.data.univeristy,
          });
        } else if (code === 316) {
          console.log("user not logged in");
        }
      }).catch((error) => {
        console.log("get profile: " + error);
      });
    }
  }*/



    // need to change
    handleChange(event) {
      this.setState({
        username: event.target.username,
        email: event.target.email,
        address: event.target.address,
        univeristy: event.target.univeristy
      });

    }

    handleClick() {
      if (this.state.readOnly) {
        this.setState({
          readOnly: false
        });
      } else {
        this.setState({
          readOnly: true
        });
      }
    }

    onDrop(event) {
      this.setState({
        picture: event.target.picture
      });
    }


    render() {
      /* the save/edit button */
      let button;
      if (this.state.readOnly) {
          button = <Button type="submit" variant="contained" color="primary" onClick={this.handleClick}>
               Edit
          </Button>
      } else {
          button = <Button type="submit" variant="contained" color="primary" onClick={this.handleClick}>
               Save
          </Button>
      }

      return (

        <MuiThemeProvider theme = {MainTheme}>
        <div className="profile-page-container">
            {/* Major part one - nav bar */}
            <NavigationBar className="nav-bar"/>

            {/* Major part two - user info */}
            <div className="user-info-container">

              {/* left hand side of user info - photo & names */}
              <div className="info-lhs">

              <img title="user-photo"
              src={require("../../static/images/"+this.state.picture)}className="user-photo"
              alt = "used to store user info"
              // todo
              width="100" height="100"
              />
              <Button onClick={this.onDrop}>Update picture</Button>
                <br/>
                <TextField

                  label="Username"
                  defaultValue={this.state.username}
                  className="standard-read-only-input"
                  margin="normal"
                  InputProps={{
                      readOnly: this.state.readOnly,
                  }}
                  variant="filled"/>
                <TextField

                    label="E-mail"
                    defaultValue={this.state.email}
                    className="standard-read-only-input"
                    margin="normal"
                    InputProps={{readOnly: this.state.readOnly,}}
                    variant="filled"/>

                <TextField

                    label="Address"
                    defaultValue={this.state.address}
                    className="standard-read-only-input"
                    margin="normal"
                    InputProps={{readOnly: this.state.readOnly,}}
                    variant="filled"/>



              </div>

              {/* right hand side of user info - address */}
              <div className="info-rhs">

              <TextField

                  label="Address"
                  defaultValue={this.state.university}
                  className="standard-read-only-input"
                  margin="normal"
                  InputProps={{readOnly: this.state.readOnly,}}
                  variant="filled"/>
              <Dialog/>
              <br/>
              {/* Save/ Edit button */}
                {button}

              </div>

            </div>

        </div>
        </MuiThemeProvider>
      );
    }
  }

  export default ProfilePage;
