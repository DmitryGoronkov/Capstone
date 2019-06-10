import React, { Component } from 'react';
import './triangle.scss'

export default class Triangle extends React.Component{
    render(){
        return(<>
        <div class="arrow-up"></div>
        <div class="arrow-down"></div>
        <div class="arrow-left"></div>
        <div class="arrow-right"></div>
        </>
    )
 }
}