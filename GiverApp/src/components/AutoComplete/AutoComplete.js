import React from 'react';
import './AutoComplete.scss';
export default class AutoComplete extends React.Component {
    state = {
        items: [
            'Arrowroot',
'Artichoke',
'Arugula',
"Asparagus",
"Bamboo Shoots",
"Beans, Green",
"Beets",
"Belgian Endive",
"Bitter Melon",
"Bok Choy",
"Broccoli",
"Brussel Sprouts",
"Cabbage, Green",

        ],
        suggestions: [],
        text: ""
    }

    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.state.items.sort().filter(v => regex.test(v));
        }
        this.setState({suggestions, text: value });
    }
    suggestionSelected (value) {
        this.setState({text: value, suggestions: []})
    }
    renderSuggestions (){
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={()=> this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        )
    }
    render(){
        const { text } = this.state;
        return(
            <div className="AutoComplete">
                <input value = {text} onChange={this.onTextChanged} type="text" />
                {this.renderSuggestions()}
            </div>
        )
    }
}