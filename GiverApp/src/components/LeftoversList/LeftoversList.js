import React from 'react';
import './LeftoversList.scss';
export default class LedftoversList extends React.Component {
    state = {
        items: [
            'Baked Goods',
            'Cooked dishes',
            'Packed goods']
    }
    render(){
        return(
            <ul>
                {this.state.items.map((item) => <li>{item}</li>)}
            </ul>
        )
    }
}