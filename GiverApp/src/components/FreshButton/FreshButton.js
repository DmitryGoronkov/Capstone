import React from 'react';
import './FreshButton.scss';
import posed from 'react-pose';
const Box = posed.button({
    visible: { opacity: 1 },
    hidden: { opacity: 0.5 }
});
export default class FreshButton extends React.Component {
    render(){
        let color=""
        if (this.props.item === 1){
            color="#69F0AE";
        }
        if (this.props.item === 2){
            color="#FFA000";
        }
        if (this.props.item === 3){
            color="#FF3D00";
        }
        let startAnim = false;
        if (this.props.freshness === this.props.item){
            startAnim = true;
        }
        return(<button onClick={()=>this.props.func(this.props.item)} className="freshbutton--top">
            <Box  className="animation" style={{backgroundColor:color}} pose={startAnim? 'visible' : 'hidden'}></Box> 
            <div className="freshbutton--wrapper" >
            <button  className="freshbutton" style={{backgroundColor:color}}></button>
            </div>
            <div className="freshbutton__title"> {this.props.title}</div>
        </button>
        )
    }
}



// export default class TopButton extends React.Component {
//     render(){
//         let btn_class = "greybutton";
//         if (this.props.sectionClicked === this.props.section) {
//             btn_class = "yellowbutton";
//         }
//         return(
//         <div className="button">
//             <Box className="anim" pose={this.props.populated ? 'visible' : 'hidden'}></Box> 
//             <button className={btn_class} onClick={this.props.func}><img className="button__icon" src={this.props.icon} alt="icon"></img></button>
            
//             <div className="button__title"> {this.props.title}</div>
//         </div>
//         )
//     }
// }