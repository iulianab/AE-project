import React, { Component } from 'react';
import CartDetails from './CartDetails'

class ProductDetails extends Component {
  constructor() {
    super()
    this.state = {
      cartDetails: -1
    }
    this.selectCart = () => {
      this.setState({
        cartDetails: 1
      })
    }
    this.reset = () => {
      this.setState({
        cartDetails: -1
      })
    }
  }
  render() {
    if(this.state.cartDetails === 1) {
      return (<CartDetails onExit={this.reset}/>)
    } else {
    return (
      <div>
       <div className='menu'>
        <h1 className='margin-20 inline-block'>Detalii produs</h1>
        <input type="button" className = 'button float-right-1' value="Cos" onClick={() => this.selectCart()} />
        </div>
      <h3 className = 'title-product'>{this.props.item.name}</h3>
      <div className='div-description'>
       <div><img className='image-wrap' src={this.props.item.image_detail} alt="Unavailable"></img>
        <p className='p-details' >Brand: {this.props.item.brand}</p>
        <p className='p-details' >Varsta: {this.props.item.age_category} ani</p>
        <p className='p-details' >Pentru: {this.props.item.gender_category}</p>
        <p className='p-details' >Descriere: </p>
        <p>{this.props.item.description}</p>
      </div>
       {this.props.item.stock > 0 ?<input type="button float-right" className = 'button' value="Adauga in cos" onClick={() => this.props.onDelete(this.props.item.name)} />
        :          
        <input type="button"  disabled className = 'button float-right' value="Adauga in cos" onClick={() => this.props.onDelete(this.props.item.name)} />
       }
      </div>
      <input type="button" className='button' value="Inapoi" onClick={() => this.props.onExit()}/>
      </div>
    )
  }
  }
}

export default ProductDetails
