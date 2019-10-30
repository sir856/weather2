import React from 'react'
import axios from 'axios'
import Handlebars from 'handlebars'

class Items extends React.Component {
    addItem(event) {
        let name = event.target['city'].value;

        this.setData(name);

            if (this.props.items.indexOf(name) === -1 && name !== '') {
                this.props.onAdd(name);
                event.preventDefault();
            }
    }

    deleteItem(event) {
        let el = event.target.parentElement;

        this.props.onDelete(el.id);

        el.remove();
    }

    componentDidMount() {
        this.allItems();
    }

    allItems() {
        this.props.items.forEach(item => {
            this.setData(item.name);
        });
    }

    setData(name) {
        if (document.getElementById(name)) {
            return;
        }

        let node = document.getElementById("loading-template").content.cloneNode(true);
        let div =document.importNode(node, true).querySelector('div');
        div.id = name;

        let template = Handlebars.compile(div.outerHTML);
        let result = template({name: name});

        document.getElementsByClassName("items")[0].insertAdjacentHTML("afterbegin", result);

        axios.get("http://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: name,
                lang: "ru",
                units: "metric",
                appid: "0ac7d7dab1b739b93bac5463c7dcb79d",
                timeout: 1000
            }
        })
            .then(response => {

                let sourceItem = document.getElementById("item-template").innerHTML;
                let templateItem = Handlebars.compile(sourceItem);

                let item = document.getElementById(name);
                item.innerHTML = templateItem(response.data);
                document.getElementById(name).querySelector('button').addEventListener('click', this.deleteItem.bind(this));
            })
            .catch(error => {
                let tmp = document.getElementById(name);
                let container = tmp.querySelector("span");

                let errorStr = "Проблемы с интернет соединением";

                if (error.response) {
                    if (error.response.status === 404) {
                        errorStr = "Город не найден"
                    } else {
                        errorStr = "Проблемы с сервером"
                    }
                }

                let source = document.getElementById("error-template").innerHTML;
                let template = Handlebars.compile(source);
                let data = { "error": errorStr };

                container.innerHTML = template(data);
                tmp.querySelector('button').addEventListener('click', this.deleteItem.bind(this));
            });

    }

    render() {
        return (
            <div className="container">
                <div className="favourites">
                    <div className="weather">Избранное</div>

                    <form onSubmit={this.addItem.bind(this)}>
                        <input name="city" type="text" placeholder="Введите название города..."/>
                        <button className="itemsButton" type="submit">+</button>
                    </form>
                </div>

                <div className="items"></div>
            </div>
        );
    }
}

export default Items;