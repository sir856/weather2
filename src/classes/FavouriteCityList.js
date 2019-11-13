import React from 'react'
import FavouriteCity from './FavouriteCity'
import {addCity} from '../store/action/actionCreator'
import {connect} from "react-redux";

class FavouriteCityList extends React.Component {
    addItem(event) {
        let name = event.target['city'].value;

        if (this.props.items.indexOf(name) === -1 && name !== '') {
            this.props.addCity(name);
            this.props.items.push(name);
            event.preventDefault();
        }
    }

    getItems() {
        let items = [];
        this.props.items.forEach(item => {
            items.push(<FavouriteCity key={item.name} name={item.name}/>);
        });
        return items;
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