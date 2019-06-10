import React from 'react';
// import './LeftoversList.scss';
export default class ItemSelected extends React.Component {
    state = {
        
    }
    render(){
        return(
            <>
            <h1>{this.props.item}</h1>
            <label>Weight:</label>
            <input></input>
            <label>Date:</label>
            <input></input>
            <label>Location:</label>
            <input></input>
            </>
        )
    }
}