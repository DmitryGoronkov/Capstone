import React, { Component } from 'react';
import './InfoCard.scss';
import apple from '../assets/svg/icons8-apple.svg';
import bread from '../assets/svg/icons8-bread.svg';
import porridge from '../assets/svg/icons8-porridge.svg';
import search from '../assets/icons8-human-research-program-64.png';
import open from '../assets/svg/open-book.svg'
const green = "rgba(105,240,174,0.5)";
const orange = "rgba(255,160,0,0.5)";
const red = "rgba(255,61,0,0.5)";
export default class InfoCard extends React.Component{
    render(){
        let list = '';
        for (let i=0; i<3; i++){
            if (this.props.tags[i]){
                if (i===0){
                    list=list+this.props.tags[0];
                } else{
                list=list+", "+this.props.tags[i];}

            } else break;
        }
        if (this.props.tags[3]){
            list=list+"...";
        }
        let weight = this.props.produce.weight+this.props.cooked.weight+this.props.baked.weight;
        weight=weight+" LB";
        let applecolor="white";
        let breadcolor="white";
        let porridgecolor="white";
        if (this.props.produce.weight>0){
            if (this.props.produce.freshness===1){
                applecolor=green;
            }
            if (this.props.produce.freshness===2){
                applecolor=orange;
            }
            if (this.props.produce.freshness===3){
                applecolor=red;
            }
        }
        if (this.props.cooked.weight>0){
            if (this.props.cooked.freshness===1){
                porridgecolor=green;
            }
            if (this.props.cooked.freshness===2){
                porridgecolor=orange;
            }
            if (this.props.cooked.freshness===3){
                porridgecolor=red;
            }
            
        }
        if (this.props.baked.weight>0){
            if (this.props.baked.freshness===1){
                breadcolor=green;
            }
            if (this.props.baked.freshness===2){
                breadcolor=orange;
            }
            if (this.props.baked.freshness===3){
                breadcolor=red;
            }
           
        }
        let date = new Date(this.props.date);
        let month = date.getUTCMonth() + 1;
        let day = date.getDate();
        
        let today = new Date();
        let todayday = today.getDate();
        console.log(`card: ${this.props.text}. Card's day is ${day}. Today's day is ${todayday}`)
        let newday = "";
        let newmonth = "";
        if (day === todayday){
            date="today";
        } else if ((day - todayday) === 1){
            date="tomorrow";
        } else {
            if (day<10){
                newday = `0${day}`;
            } else {newday = day}
            if (month<10){
                newmonth = `0${month}`;
            } else {newmonth = month}
            date=`${newday}/${newmonth}`
        }

        return(<div className={`menu-item ${this.props.selected ? 'active' : ''}`}>
            <div className="infoCard">
            <div className="infoCard__top">
                <img className="infoCard__image" alt="donationImage" src={`http://localhost:8080/${this.props.cardImage}.png`}></img>
                <button className="infoCard__button" onClick={this.props.clickme}><img className="infoCard__button__icon"  alt="icon" src={search}/></button>
                <button className="infoCard__button" onClick={this.props.onClickCard}><img className="infoCard__button__icon"  alt="icon" src={open}></img></button>
                
            </div>
            <div className="infoCard__tags">{list}</div>
            <div className="infoCard__weight">{weight}</div>
            <div className="infoCard__icons">
                <img className="infoCard__icons__item"  alt="ProduceImage" style={{backgroundColor: applecolor}} src={apple}></img>
                <img className="infoCard__icons__item"  alt="CookedImage" style={{backgroundColor: porridgecolor}} src={porridge}></img>
                <img className="infoCard__icons__item"  alt="BakedImage" style={{backgroundColor: breadcolor}} src={bread}></img>
            
            </div>
            <div className="infoCard__date">Pick up by <span className="bold">{date} </span></div>
            
        </div> </div>)
    }
}