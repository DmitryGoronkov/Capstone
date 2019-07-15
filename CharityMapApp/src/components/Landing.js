import React, { Component } from 'react';
import logo from '../assets/logo.png';
import './landing.scss';
import vendor from '../assets/svg/icons8-small_business_2.svg'
import hands from '../assets/svg/icons8-connectivity_and_help.svg'
import {Link} from "react-router-dom"
export default class Landing extends React.Component{
    render(){
        return(<div className="landing">
            <div className="landing__logo">
                <img className="landing__image" src={logo} alt={"logo"}/>
            </div>
            <div className="landing__button--wrap">
                <a href="http://localhost:3001/"><button className="landing__button"><img src={vendor} alt="vendor"></img></button></a>
                <Link to="/receiver/"><button className="landing__button"><img src={hands} alt="hands"></img></button></Link>
            </div>
            <div className="landing__labels--wrap">
                <div className="landing__labels">Vendor</div>
                <div className="landing__labels">Charity</div>
            </div>
        
        </div>)
        }
    }