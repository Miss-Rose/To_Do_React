import React, {Component} from 'react';

import './search-panel.css';

class SearchPanel extends Component {

    state = {
        term: ''
    };

    onSearchShange = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onSearchShange(term);
    };

    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   value={this.state.term}
                   onChange={this.onSearchShange}
            />
        );
    }
}

export default SearchPanel;
