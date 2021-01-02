import React, { Component } from 'react';

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name]: evt.target.value
      })
    }
  }
  render() {

    return (
      <div className = 'div-box'>
      <div onClick={() => this.props.onSelect(this.props.item.id)}>
        <img src={this.props.item.image_list} alt="Unavailable"></img>
          <p>{this.props.item.name}</p>
           <p className= 'p-price'>{this.props.item.price} Lei</p>
           <p>{this.props.item.stock > 0 ? 'In stoc' : 'Stoc epuizat'}</p>
        </div>
        {this.props.item.stock > 0 ?<input type="button" className = 'button' value="Adauga in cos" onClick={() => this.props.onDelete(this.props.item.name)} />
        :          
        <input type="button"  disabled className = 'button' value="Adauga in cos" onClick={() => this.props.onDelete(this.props.item.name)} />
}        </div>
    )
  }
}

export default Product