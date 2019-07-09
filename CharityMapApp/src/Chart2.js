import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
export default class Chart2 extends React.Component{
   
    
    render(){
        let data = {
            labels: [
                'Lb',
                
            ],
            datasets: [
                {
                    label: 'Produce',
                   
                    backgroundColor: '#FFD100',
                    borderColor: '#FFD100',
                    data: [
                        { y: "", x: this.props.produceWeight },
                        
                        
                    ]
                },
                {
                    label: "Cooked",
                    backgroundColor: '#706021',
                    
                    borderColor: '#706021',
                    data: [
                        { y: "", x: this.props.cookedWeight },
                        
                       
                    ]
                },
                {
                    label: "Baked",
                    backgroundColor: '#262F63',
                    
                    borderColor: '#262F63',
                    data: [
                        { y: "", x: this.props.bakedWeight },
                        
                       
                    ]
                },
            ],
            
        }
        let  options =  {
            scales: {
                xAxes: [{
                    stacked: false
                }],
                yAxes: [{
                    stacked: false
                }]
            }
        }

    
        return(<>
            <HorizontalBar
                data={data}
                width={4}
                height={1}
                
                options={{ ...options, maintainAspectRatio: false }}
                />
        </>)
    }
}