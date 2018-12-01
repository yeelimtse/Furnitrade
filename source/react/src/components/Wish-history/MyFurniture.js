import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './MyFurniture.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '../FurniCard/FurniCard';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },

});

/* Card component in MyFurniture has "fromMyFurniture" prop - render delete button */
class MyFurniture extends Component {
      	handledelete(e) {
	let reqData = {
        	'furniture_id': this.state.furniture_id,
	}
		axios({
              	method: 'get',
              	url: 'http://127.0.0.1:5000/user/delete_wishlist',
              	withCredentials: false,
              	crossdomain: true,
              	data: reqData,
              	responseType: 'json',
              	headers: {
                //"Content-Type": "application/x-www-form-urlencoded",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Authorization": `Bearer`
              }
      	})
	}

    render() {
        return (
            <div>
                {/* Part one - NavBar - logic needed*/}
                <NavBar/>
                <div className="my-furni">
                    <h2>My Furnitures</h2>
                    {/* Part 3 - fixed "add" button - post a new furniture */}
                    <button>+</button>
                    <Wave/>
                {/* end of furni-page tag */}
                </div>

                {/* cards of furnitures already added, now display 4 furnitures*/}
                <div className="Card-group">
                <Card
                    title="Furniture1"
                    text="First wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                    fromMyFurniture={true}
                />


                <Card
                    title="Furniture2"
                    text="Second wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                    fromMyFurniture={true}
                />

                <Card
                    title="Furniture3"
                    text="Third wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                    fromMyFurniture={true}
                />

                <Card
                    title="Furniture4"
                    text="Forth wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                    fromMyFurniture={true}
                />

                    {/* Should send request for wished furnitures */}
                </div>
            
            {/* end of  DIV */}
            </div>
        );
    }
}

export default MyFurniture;
