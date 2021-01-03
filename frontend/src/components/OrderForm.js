import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstName : '',
      lastName : '',
      address : '',
      email : '',
      phone: ''
    }
    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name] : evt.target.value
      })
    }
  }
  render() {
    return (
      <div className='div-box-form'>
      <h2>Finalizare comanda</h2>
        <form>
        <div className='div-form'>
          <label>Nume: </label>
          <input type="text" id="firstName" name="firstName" onChange={this.handleChange} />
        </div>
        <div className='div-form'>
          <label>Prenume: </label>
          <input type="text" id="lastName" name="lastName" onChange={this.handleChange} />
        </div>
        <div className='div-form'>
          <label>Adresa: </label>
          <input type="text" id="address" name="address" onChange={this.handleChange} />
        </div>
        <div className='div-form'>
          <label>Email: </label>
          <input type="text" id="email" name="email" onChange={this.handleChange} />
        </div>
        <div className='div-form'>
          <label>Telefon: </label>
          <input type="text" id="phone" name="phone" onChange={this.handleChange} />
        </div>
        <div className='div-form'>
          <input type="button" value="Plaseaza comanda" className='button' onClick={() => this.props.onAdd({
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            address : this.state.address,
            email : this.state.email,
            phone: this.state.phone
          })} />
        </div>
        </form>
      </div>
    )
  }
}

export default OrderForm
