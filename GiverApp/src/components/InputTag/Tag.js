import React from 'react';
const tagStyle = {
    display: "inline-block",
    backgroundColor: "#F0EFE7",
    fontSize: "0.9em",
    margin: "5px",
    padding: "0.3rem 1rem 0.4rem",
    height: "39px",
    borderRadius: "40px",
    boxSizing:"border-box",	
    color: "rgba(0,0,0,0.4)"
}
export default class Tag extends React.Component{
    onDeleteTag = (e, value) => {
        this.props.onDeleteTag(value);
    }
    render (){
        var tag = (
            <div 
            onClick = {(e)=> this.onDeleteTag(e, this.props.value)}
            style={tagStyle}>
            &#x2716; {" "}
                {this.props.value}
            </div>
        )
        return(
            <React.Fragment>
                {tag}
            </React.Fragment>
        )
    }
}