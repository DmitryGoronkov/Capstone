




import React, { Component } from 'react';


export default class MenuItem extends React.Component{
    render(){
        return(<div
            className={`menu-item ${selected ? 'active' : ''}`}
            >{text}</div>)}
        }