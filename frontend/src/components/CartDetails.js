import React, { Component } from 'react';
import Store from '../stores/Store';
import CartProductDetails from './CartProductDetails';
import Product from './Product';
import OrderForm from './OrderForm'

class CartDetails extends Component {
    constructor() {
        super()
        this.state = {
            databaseProducts: [],
            products: [],
            productsForSave: [],
            total: 0
        }
        this.store = new Store()
        this.add = (client) => {
            if (client.firstName === '') {
                alert('Completati numele!');
            }
            else if (client.lastName === '') {
                alert('Completati prenumele');
            }
            else if (client.address === '') {
                alert('Completati adresa!')
            }
            else if (client.email === '') {
                alert('Completati adresa de email!')
            }
            else if (client.phone === '') {
                alert('Completati numarul de telefon!')
            }
            else {
                let currentDate = new Date();
                let currentTime = currentDate.toLocaleTimeString();
                this.store.addOne(client);
                this.store.emitter.addListener('ADD_SUCCESS_CLIENT', () => {
                    this.store.addOneOrder(client.firstName, client.lastName, currentDate.toDateString() + 'T' + currentTime);
                });
                this.store.emitter.addListener('ADD_SUCCESS_ORDER', () => {
                    console.log(this.state.productsForSave.length);
                    for (var i = 0; i < this.state.productsForSave.length; i++) {
                        this.store.addOneOrderRow(client.firstName, client.lastName, this.state.productsForSave[i].productId, currentDate.toDateString() + 'T' + currentTime, this.state.productsForSave[i].quantity);
                        if (i == this.state.productsForSave.length - 1) {
                            localStorage.removeItem('list');
                        }
                    }
                });
                alert('Comanda plasata cu succes!');
                var millisecondsToWait = 1000;
                setTimeout(function() {
                    window.location.reload(false);
                }, millisecondsToWait);
            }
        }
        this.delete = (name) => {
            var result = '';
            var currentValue = localStorage.getItem('list');
            if (currentValue != undefined) {
                let aux = localStorage.getItem('list').split(',');
                let deleted = []
                for (var i = 0; i <= aux.length; i++) {
                    if (aux[i] != name) {
                        deleted.push(aux[i]);
                    }
                }
                if (deleted.length !== 0 && deleted[0] !== undefined) {

                    result = deleted[0];
                    for (var i = 1; i <= deleted.length; i++) {
                        if (deleted[i] !== undefined) {
                            result = result + "," + deleted[i];
                        }
                    }
                    localStorage.setItem('list', result);
                }
                else {
                    localStorage.removeItem('list');
                }
            }
            this.componentDidMount();
        }
    }
    componentDidMount() {
        this.store.getAll()
        this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
            this.setState({
                databaseProducts: this.store.content
            })

            var localProducts = localStorage.getItem('list') !== null ? localStorage.getItem('list').split(',') : [];
            var unique = [...new Set(localProducts)];
            var aux = [];
            var result = [];
            var totalResult = 0;
            var ids = [];
            for (let i = 0; i < unique.length; i++) {
                let count = 0;
                for (let j = 0; j < localProducts.length; j++) {
                    if (unique[i] == localProducts[j]) {
                        count++;
                    }
                }
                aux.push({
                    'productName': unique[i],
                    'quantity': count
                })
            }

            for (let i = 0; i < aux.length; i++) {
                let selected = this.state.databaseProducts.find((e) => e.name === aux[i].productName)
                let image = selected.image_detail;
                totalResult = totalResult + selected.price * aux[i].quantity;
                result.push({
                    'productName': aux[i].productName,
                    'quantity': aux[i].quantity,
                    'image': selected.image_list
                })
                ids.push({
                    'productId': selected.id,
                    'quantity': aux[i].quantity
                })
            }
            this.setState({
                products: result,
                total: totalResult,
                productsForSave: ids
            });
        })

    }
    render() {
        return (
            <div>
            <div className='menu'>
            <h1 className='margin-20 inline-block'>Sumar cos</h1>
            <input type="button" className='button float-right-1' value="Inapoi" onClick={() => this.props.onExit()}/>
            </div>
            <div className='align-content'>
            {this.state.products.length === 0 ? <h2 className='margin-20'>Nu exista produse in cos!</h2> :  <div><div className='div-box-cart-details'>
              {this.state.products.map((e, i) => <CartProductDetails item={e} key={i} onDelete={this.delete} onSelect={this.select} />)}  
           <h2 className='block'>Total: {this.state.total} Lei</h2>
           </div>
           <OrderForm onAdd={this.add} />
           </div> 
            }
            </div>
           </div>
        )
    }
}

export default CartDetails
