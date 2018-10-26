import React from 'react';
import './Search.css'
import {API_URL} from '../../helpers/Config'
import { handleResponse, renderChangePercent } from '../../helpers/Helper';
import Loading from './Loading'

class Search extends React.Component {
    constructor() {
        super();

        this.state = {
            searchQuery: '',
            loading: false,
        }

        this.handleChange = this.handleChange.bind(this);
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
                console.log(result)
                this.setState({ loading: false});
            });
    }
    render(){
        const {loading} = this.state
        return(
            <div className="Search">
                <span className="Search-icon" />

                <input 
                    className="Search-input"
                    type="text"
                    placeholder="Currency name"
                    onChange={this.handleChange} 
                />

                {loading &&
                <div className="Search-loading">
                    <Loading width='12px' height='12px' />
                </div>}
            </div>
        )
    }
}

export default Search 