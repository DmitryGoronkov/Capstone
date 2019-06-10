import React from 'react';
import './TopButton.scss';
import posed from 'react-pose';
const Box = posed.div({
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
});
export default class TopButton extends React.Component {
    render(){
        let btn_class = "greybutton";
        if (this.props.sectionClicked === this.props.section) {
            btn_class = "yellowbutton";
        }
        return(
        <div className="button">
            <Box className="anim" pose={this.props.populated ? 'visible' : 'hidden'}></Box> 
            <button className={btn_class} onClick={this.props.func}><img className="button__icon" src={this.props.icon} alt="icon"></img></button>
            
            <div className="button__title"> {this.props.title}</div>
        </div>
        )
    }
}



