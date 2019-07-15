import React, { Component } from 'react';
import {Link} from "react-router-dom"
import confirmed from '../assets/confirmed.png'
import confirmed2 from '../assets/confirmed2.png'
export default class Posted extends React.Component{
    render(){
        return(<>
        <Link to="/"><div>
        <img style={{width:"375px"}} src={confirmed} alt="top"></img>
        <img style={{width:"375px"}}src={confirmed2} alt="bottom"></img>
        </div></Link>
        </>)
        }
    }