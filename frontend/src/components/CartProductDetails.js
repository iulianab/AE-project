import React, { Component } from 'react';

class CartProductDetails extends Component {
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
    return (
      <div>
     <div>
      <input type="button" className = 'small-button inline-block float-right' value="Sterge" onClick={() => this.props.onDelete(this.props.item.productName)}/>
     <div className='div-box-cart'>
     <img className='small-image' src={this.props.item.image}></img>
     </div>
     <p className='inline-block float-right'>{this.props.item.productName + ' : ' + this.props.item.quantity + ' buc'}</p>
     </div>
    </div>
    )
  }
}

export default CartProductDetails
