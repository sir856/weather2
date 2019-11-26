import React from 'react'
import FavouriteCity from '../favouriteCity/FavouriteCity'
import {addCity} from '../../store/action/actionCreator'
import {connect} from "react-redux";
import Error from '../error/Error';
import './FavouriteCityList.css'

class FavouriteCityList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notFoundItem: ""
        }

    }

    addItem(event) {
        let name = event.target['city'].value;
        name = name.charAt(0).toUpperCase() + name.slice(1);

        console.log(name);
        console.log(this.props.items);
        console.log(this.props.items.filter(item => {return item.name === name}));

        if (this.props.items.filter(item => {return item.name === name}).length === 0 && name !== '') {
            this.props.addCity(name);
            this.props.items.push({name : name});
            this.setState({notFoundItem: ""})
        }

        event.preventDefault();
    }

    getItems() {
        let items = [];
        this.props.items.forEach(item => {
            items.push(<FavouriteCity key={item.name} name={item.name} cityNotFound={this.cityNotFound.bind(this)}/>);
        });
        if (this.state.notFoundItem !== "") {
            items.push(<Error key={this.state.notFoundItem} message={"Город " + this.state.notFoundItem + " не найден"}/>);
        }
        return items;
    }

    cityNotFound(name) {
        this.setState({notFoundItem: name})
    }

    render() {
        return (
            <div className="container">
                <div className="header">
                    <div className="part">Избранное</div>

                    <form onSubmit={this.addItem.bind(this)}>
                        <input name="city" type="text" placeholder="Введите название города..."/>
                        <button className="itemsButton" type="submit">+</button>
                    </form>
                </div>

                <div className="items">{this.getItems()}</div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        items: state
    }
}, {addCity})(FavouriteCityList);