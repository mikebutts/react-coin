import React, { Component } from 'react'
import { handleResponse } from '../../helpers/Helper';
import { API_URL } from "../../helpers/Config";
import Loading from '../common/Loading'
import Table from '../list/Table'

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
    
      renderChangePercent(percent) {
        if (percent > 0) {
          return <span className="percent-raised">{percent}% &uarr;</span>
        } else if (percent < 0) {
          return <span className="percent-fallen">{percent}% &darr;</span>
        } else {
          return <span>{percent}</span>
        }
      }
    

  render() {

    const {loading, error, currencies} = this.state;

    // render while loading
      if (this.state.loading){
          return <div className="loading-container"><Loading/></div>
      }

      // renders error if error occurs while fetching data
      if (this.state.error){
        return <div className="error">{this.state.error}</div>
      }
      return (
        <Table currencies = {currencies} renderChangePercent={this.renderChangePercent} />
      );
  }
}
