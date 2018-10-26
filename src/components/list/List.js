import React, { Component } from 'react'
import { handleResponse } from '../../helpers/Helper';
import { API_URL } from "../../helpers/Config";
import Loading from '../common/Loading'
import Table from '../list/Table'
import Pagination from '../list/Pagination'

export default class List extends Component {
    constructor(){
        super();
        
        this.state ={
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1,

        };

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount() {
      this.fetchCurrencies();
      }
      
      fetchCurrencies(){
        this.setState({ loading: true });

        const {page} = this.state;

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
          .then(handleResponse)
          .then((data) => {
            this.setState({
              currencies: data.currencies,
              totalPages: data.totalPages,
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

      handlePaginationClick(direction){
        let nextPage = this.state.page;

          // Increment nextPage if direction variable is next otherwise decrease
          nextPage = direction === 'next' ? nextPage + 1 : nextPage -1 ;

          this.setState({page: nextPage}, () => {
            this.fetchCurrencies()
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

    const {loading, error, currencies, page, totalPages} = this.state;

    // render while loading
      if (this.state.loading){
          return <div className="loading-container"><Loading/></div>
      }

      // renders error if error occurs while fetching data
      if (this.state.error){
        return <div className="error">{this.state.error}</div>
      }
      return (
        <div>
          <Table currencies = {currencies} renderChangePercent={this.renderChangePercent} />
          <Pagination page={page} totalPages={totalPages} handlePaginationClick={this.handlePaginationClick} />
        </div>
    
      );
  }
}
