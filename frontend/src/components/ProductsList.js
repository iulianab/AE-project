import React, { Component } from 'react';
import Store from '../stores/Store'
import Product from './Product'
import CartDetails from './CartDetails'
import ProductDetails from './ProductDetails'

class ProductsList extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      detailsFor: -1,
      cartDetails: -1,
      selectedProduct: null
    }
    this.store = new Store()
    this.delete = (id) => {
      alert('Produsul a fost adaugat in cos!');
      var currentValue = localStorage.getItem('list');
      if (currentValue != undefined) {
        localStorage.setItem('list', currentValue + ',' + id);
      }
      else {
        localStorage.setItem('list', id);
      }
    }
    this.select = (id) => {
      let selected = this.state.products.find((e) => e.id === id)
      this.setState({
        detailsFor: id,
        selectedProduct: selected
      })
    }
    this.selectCart = () => {
      this.setState({
        cartDetails: 1
      })
    }
    this.reset = () => {
      this.setState({
        detailsFor: -1,
        selectedProduct: null,
        cartDetails: -1
      })
    }
  }
  componentDidMount() {
    this.store.getAll()
    this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        products: this.store.content
      })
    })
  }
  render() {
    if (this.state.detailsFor === -1 && this.state.cartDetails === -1) {
      return (
        <div>
        <div className='menu'>
        <h1 className='margin-20 inline-block'>Lista produse</h1>
        <input type="button" className = 'button float-right-1' value="Cos" onClick={() => this.selectCart()} />
        </div>
        <div className='align-content'>
          {this.state.products.map((e, i) => <Product item={e} key={i} onDelete={this.delete} onSelect={this.select} />)}  
        </div>
        </div>
      )
    } else if(this.state.cartDetails === 1) {
      return (<CartDetails onExit={this.reset}/>)
    }
    else {
      return (
        <ProductDetails item={this.state.selectedProduct} onExit={this.reset} onDelete={this.delete}/>
      )
    }
  }
}

export default ProductsList