import React, { Component } from 'react'
import { handleResponse } from '../../helpers/Helper';
import { API_URL } from "../../helpers/Config";

export default class List extends Component {
    constructor(){
        super();
        
        this.state ={
            loading: false,
            currencies: [],
            error: null,

        };
    }

    componentDidMount() {
        this.setState({ loading: true });
    
        fetch(`${API_URL}/cryptocurrencies?page=1&perPage=20`)
          .then(handleResponse)
          .then((data) => {
            this.setState({
              currencies: data.currencies,
              loading: false,
            });
          })
          .catch((error) => {
            this.setState({
      
              error: error.errorMessage,
              loading: false,
            });
          });
      }
    

  render() {
      if (this.state.loading){
          return <div> Loading....</div>
      }
    return (
      <div>
          {this.state.currencies.map((currency) => (
            <div key={currency.id}>{currency.id} </div>
          ))}
      </div>
    )
  }
}
