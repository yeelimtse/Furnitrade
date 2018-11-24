import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Wave from '../common/Wave';
import './MyFurniture.css';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Card from '../FurniCard/FurniCard';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  fab: {
      position: 'absolute',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },

});
class MyFurniture extends Component {

    render() {
        return (
            <div>
                {/* Part one - NavBar - logic needed*/}
                <NavBar/>
                <div className="my-furni">
                    <h2>My Furnitures</h2>
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
                />


                <Card
                    title="Furniture2"
                    text="Second wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                />

                <Card
                    title="Furniture3"
                    text="Third wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                />

                <Card
                    title="Furniture4"
                    text="Forth wished furniture"
                    image={require('../../static/images/wallpaper1.png')}
                    link="http://localhost:3000/Furniture"
                />

                    {/* Should send request for wished furnitures */}
                </div>
                <Button variant="fab" color="secondary" aria-label="Add" className={this.props.button} >
                         <p>+</p>
                       </Button>
                {/* Part 3 - fixed "add" button - post a new furniture */}
            {/* end of  DIV */}
            </div>
        );
    }
}

export default MyFurniture;
