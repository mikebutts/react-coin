import React from 'react';
import {withRouter} from 'react-router-dom'
import './Search.css'
import {API_URL} from '../../helpers/Config'
import { handleResponse, renderChangePercent } from '../../helpers/Helper';
import Loading from './Loading'

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            searchResults: [],
            searchQuery: '',
            loading: false,
        }
        
        this.handlerRedirect = this.handlerRedirect.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    
    handlerRedirect(currencyId){
        // clear input value and close autocomplete container
    
        this.setState({
            searchQuery: "",
            searchResults: []
        })

        this.props.history.push(`/currency/${currencyId}`)
    }
    
    handleChange(evt){
        const inputValue = evt.target.value;

        this.setState({ searchQuery: inputValue});

        // if searchQuery not preset, don't send fetch
        if(!inputValue) {
            return '';
        }
        this.setState({ loading: true});

        fetch(`${API_URL}/autocomplete?searchQuery=${inputValue}`)
            .then(handleResponse)
            .then((result) => {        
                this.setState({ 
                    loading: false,
                    searchResults: result
                });
            });
    }

    renderSearchResults() {
        const {searchResults, searchQuery, loading} =this.state;
        
        if (!searchQuery){
            return '';
        }

        if (searchResults.length > 0 ){
        return (
        <div className="Search-result-container">
            {searchResults.map(result => (
                <div 
                    key={result.id}
                    className="Search-result"
                    onClick={() => this.handlerRedirect(result.id)}>


                    {result.name} ({result.symbol})
                </div>
                
             ))}
        </div>
        );}
        if (!loading) {
            return (
              <div className="Search-result-container">
                <div className="Search-no-result">
                  No results found.
                </div>
              </div>
            );
          }
    }
    
    render(){
        const {loading, searchQuery} = this.state
        return(
            <div className="Search">
                <span className="Search-icon" />

                <input 
                    className="Search-input"
                    type="text"
                    placeholder="Currency name"
                    onChange={this.handleChange} 
                    value={searchQuery}
                />

                {loading &&
                <div className="Search-loading">
                    <Loading width='12px' height='12px' />
                </div>}

                {this.renderSearchResults()}
            </div>
        )
    }
}

export default withRouter(Search)