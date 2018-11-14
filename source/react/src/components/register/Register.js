import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider,createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NavigationBar from '../common/NavigationBar';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {setLocal, getLocal} from '../../utils/util';
import FormHelperText from '@material-ui/core/FormHelperText';
import "./Register.css";
import Tooltip from '@material-ui/core/Tooltip';

const nameRegex = /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!#\$%&\?]).{8,20}/;

/* password condition */
const password_lower = /(?=.*[a-z])/;
const password_upper = /(?=.*[A-Z])/;
const password_number = /(?=.*\d)/;
const password_symbol = /(?=.*[!#\$%&\?])/;
const password_length = /.{8,20}/;

/**
 * TODO:
 * Forget password
 * Remember me
 *
 * DONE:
 * Input syntax validation by regex and red error status
 * Create account button is disabled until syntax validation passed
 * Username rule / password rule by tooltips
 * Error message by helper text
 * Send request, local storage and redirect to homepage (current routing)
 */

/* create theme */
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

  /** Material UI builtin theme used in Tooltip */
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    lightTooltip: {
        background: theme.palette.grey[200],
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
        fontSize: 9,
    },
    arrowPopper: {
        '&[x-placement*="right"] $arrowArrow': {
            left: 0,
            marginLeft: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent ${theme.palette.grey[200]} transparent transparent`,
            },
        }
    },
    arrowArrow: {
        position: 'absolute',
        fontSize: 7,
        width: '5em',
        height: '5em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
    }
});

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            nameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
            address: '',
            open: false,
            errorMsg: '',
            arrowRef: null
        };
    }

    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        });
    };

    handleNameInput = name => event => {
        this.setState({username: event.target.value});
        if(event.target.value.match(nameRegex)) {
            this.setState({username: event.target.value, nameError: false});
        }
        else {
            this.setState({nameError: true});
        }
    }

    handleEmailInput = email => event => {
        this.setState({email: event.target.value});
        if(event.target.value.match(emailRegex)) {
            this.setState({email: event.target.value, emailError: false});
        }
        else {
            this.setState({emailError: true});
        }
    }

    handlePasswordInput = password => event => {
        this.setState({password: event.target.value, passwordError: false});
        if(event.target.value.match(passwordRegex)) {
            console.log('here');
            this.setState({password: event.target.value, passwordError: false});
        }
        else {
            this.setState({passwordError: true});
        }
    }

    handlePasswordConfirm = confirmPassword => event => {
        this.setState({confirmPassword: event.target.value})
        if(event.target.value !== this.state.password){
            // console.log("not same");
            this.setState({confirmPasswordError: true});
        }
        else {
            this.setState({confirmPasswordError: false});
        }
    }

    handleAddressInput = address => event => {
        this.setState({address: event.target.value})
    }

    // returm true if any of inputs are invalid
    checkButtonStatus = () => {
        let emptyStatus = this.state.name === "" || this.state.email === "" || this.state.password === "" ||
            this.state.address === "" || this.state.confirmPassword === "";
        let errorStatus = this.state.nameError || this.state.passwordError || this.state.confirmPasswordError || this.state.emailError;

        return emptyStatus || errorStatus;
    }

    // close modal
    handleClose = () => {
        this.setState({
            open: false
        });
    }

    // Post request
    handleSubmit = (e) => {
        e.preventDefault();
        let reqData = {
            'username': this.state.username,
            'email': this.state.email,
            'address': this.state.address,
            'password': this.state.password,
        };
        console.log(reqData);
        axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/auth/register',
                // TODO: fix bug when change withCredentials to true
                withCredentials: false,
                crossdomain: true,
                data: reqData,
                responseType: 'json',
                headers: {
                    //"Content-Type": "application/x-www-form-urlencoded",
                    "Content-Type": "application/json",
                    "Cache-Control": "no-cache",
                }
            })
            // handle success
            .then((response) => {
                console.log(response.data);
                let code = response.data.status;
                if (code === 200) {
                    // successfully register and login
                    setLocal("username", reqData.username);
                    console.log("localStorgae", getLocal("username"));
                    // redirect to hompage
                    this.props.history.push("/");
                } else {
                    //    this.setState({errorMsg: response.data.msg, open: true});
                    if (code === 310 || code === 315) {
                        this.setState({
                            nameError: true,
                            emailError: false,
                            errorMsg: response.data.msg
                        });
                    } else if (code === 318) {
                        this.setState({
                            nameError: false,
                            emailError: true,
                            errorMsg: response.data.msg
                        });
                    }
                }
            })
            // handle error
            .catch((error) => {
                console.log("post error: " + error);
            });
    }

    render() {
        const {classes} = this.props;

        return (
            <div className="register-container">
                <MuiThemeProvider theme = {MainTheme}>

                {/* add NavigationBar to register page */}
                  <NavigationBar className="nav-bar"/>
                <div className="register-title">
                  <Typography variant = "display2" color = "inherit"> Create Your Furnitrade Account
                  </Typography>
                </div>
                <form className="register-form" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <Tooltip
                        title={
                            <React.Fragment>
                            4 characters minimum <br/>
                            No special characters
                            <span className={classes.arrowArrow} ref={this.handleArrowRef} />
                            </React.Fragment>
                        }
                        classes={{ popper: classes.arrowPopper ,tooltip: classes.lightTooltip}}
                        placement="right"
                        PopperProps={{
                            popperOptions: {
                            modifiers: {
                                arrow: {
                                enabled: Boolean(this.state.arrowRef),
                                element: this.state.arrowRef,
                                },
                            },
                            },
                        }}
                    >
                        <TextField
                            id="name-input"
                            label="Username"
                            className={classes.textField}
                            value={this.state.username}
                            onChange={this.handleNameInput('username')}
                            margin="normal"
                            variant="outlined"
                            required={true}
                            error={this.state.nameError}
                        />
                    </Tooltip>
                    {
                        this.state.nameError && this.state.errorMsg !== ""
                        ?
                        <FormHelperText error={true}>{this.state.errorMsg}</FormHelperText>
                        :
                        <div></div>
                    }
                    <TextField
                        id="email-input"
                        label="Email Address"
                        className={classes.textField}
                        type="email"
                        name="email"
                        // autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        required={true}
                        value={this.state.email}
                        onChange={this.handleEmailInput('email')}
                        error={this.state.emailError}
                    />
                    {
                        this.state.emailError && this.state.errorMsg !== ""
                        ?
                        <FormHelperText error={true}> {this.state.errorMsg} </FormHelperText>
                        :
                        <div></div>
                    }
                    <TextField
                        id="address-input"
                        label="Address"
                        className={classes.textField}
                        value={this.state.address}
                        onChange={this.handleAddressInput('address')}
                        margin="normal"
                        variant="outlined"
                        required={true}
                        error={this.state.addressError}
                    />
                     <Tooltip
                        title={
                            <React.Fragment>
                            8 characters minimum <br/>
                            Contains at least 1 capital letter <br/>
                            Contains at least 1 number
                            <span className={classes.arrowArrow} ref={this.handleArrowRef} />
                            </React.Fragment>
                        }
                        classes={{ popper: classes.arrowPopper ,tooltip: classes.lightTooltip}}
                        placement="right"
                        PopperProps={{
                            popperOptions: {
                            modifiers: {
                                arrow: {
                                enabled: Boolean(this.state.arrowRef),
                                element: this.state.arrowRef,
                                },
                            },
                            },
                        }}
                    >
                        <TextField
                            id="password-input"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            margin="normal"
                            variant="outlined"
                            required={true}
                            value={this.state.password}
                            onChange={this.handlePasswordInput('password')}
                            error={this.state.passwordError}
                        />
                    </Tooltip>
                    <TextField
                        id="confirm-password-input"
                        label="Confirm Password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="outlined"
                        required={true}
                        value={this.state.confirmPassword}
                        onChange={this.handlePasswordConfirm('confirmPassword')}
                        error={this.state.confirmPasswordError}
                    />
                    <Button className = "register-button" disabled={this.checkButtonStatus()} type="submit" variant="contained" color="inherit">
                        Create Account
                    </Button>
                </form>
                </MuiThemeProvider>
            </div>
        );
    }
}
Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
