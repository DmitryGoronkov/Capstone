import React, { Component } from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import GoogleMapReact from 'google-map-react';
import './simplemap.scss';
import axios from 'axios';
import InfoCard from './InfoCard.js'
import ScrollMenu from 'react-horizontal-scrolling-menu';
import Triangle from './triangle';
import Chart2 from './Chart2';
import back from './assets/svg/icons8-back2.svg';
import {Link} from "react-router-dom";
const key = "AIzaSyC2DtGQafS7ey_uIJHawxlOx1QrsGF55qs"
const Marker = ({ text, onClick, imageId }) => <>

        <button  onClick={onClick} className="marker"><img className="marker__image" src={`${process.env.REACT_APP_BACKEND_SERVER || "http://localhost:8080"}/${imageId}.png`}></img><Triangle/></button>
        
        
      </>;
         
      



export const Menu = (list, selected, clickMe, onClickCard) =>





list.map(card => {
  const {name} = card;

  return <InfoCard text={name} key={name} selected={selected}
                    location = {card.location}
                    cardImage = {card.imageId}
                    date={card.date}
                    produce = {card.produce}
                    cooked = {card.cooked}
                    baked = {card.baked}
                    location = {card.location}
                    tags = {card.tags}
                    time = {card.time}
                    clickme={()=>(clickMe(card.coordinates.lat,card.coordinates.lng))}
                    onClickCard={onClickCard}/>
            
});
              // list.map(card => {
              //   const {name} = card;
              // return <InfoCard text={name} key={name} selected={selected}
                    


const Arrow = ({ text, className }) => {
                return (
                  <div
                    className={className}
                  >{text}</div>
                );
              };

              const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
              const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });
               
              const selected = 'item1';



class SimpleMap extends Component {
  // static defaultProps = {
    state = {
      alignCenter: true,
      clickWhenDrag: false,
      dragging: true,
      hideArrows: true,
      hideSingleArrow: true,
      clicked: false,
      translate: 0,
      transition: 0.4,
      wheel: true,
      selected:"item1",
      cards: [],
      filteredCards: [],
      center: {
        lat: 43.6442,
        lng: -79.4009
      },
      zoom: 11,
      menuItems: {},
      sortedBy: "all"
    };
    onSelect = key => {
      this.setState({ selected: key });
    }
  clickMe=(lat, lng)=>{
    let center = {lat: lat, lng: lng};
    this.setState({center:center, zoom: 15})
    document.documentElement.scrollTop = 0;
    console.log(this.state)
  }
  onClickCard=()=>{
    this.setState({clicked:true});
  }
  sortByDate=(array)=>{
    console.time();
    let newArray = array;
    newArray.sort(function(a, b) {
      var dateA = new Date(a.date), dateB = new Date(b.date);
      return dateA - dateB;
    });
    this.setState({filteredCards: newArray, menuItems: Menu(newArray, selected, this.clickMe, this.onClickCard)}, ()=> console.timeEnd());
    this.refs.all.focus();
  }
  async componentDidMount(){
    const {data:cards} = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER || "http://localhost:8080"}`);
    let cardsWItems = [];
    cards.map((card, index) => (
      cardsWItems[index]={name: `item${index+1}`, ...card  }))
    let selected="item1";
    this.setState({
      cards: cardsWItems,
      filteredCards: cardsWItems,
      menuItems: Menu(cardsWItems, selected, this.clickMe)
    })
    let arraySorted = this.state.cards;
    this.sortByDate(arraySorted);
    
  
      
  }
  onClickAll= () =>{
    let newArray = this.state.cards;
    this.sortByDate(newArray)
  }
  onClickProduce=(array)=>{
    let newArray = array;
    newArray.sort((a,b)=> {
        if(a.produce.weight > b.produce.weight){
          return 1
        } else return -1
    
      })
    let reversedArray = newArray.reverse();
    let filteredArray = reversedArray.filter(item=>(item.produce.weight>0))
    let selected = filteredArray[0].name;
    this.setState({filteredCards:filteredArray, selected:selected, menuItems: Menu(filteredArray, selected, this.clickMe, this.onClickCard)})
    
  }
  
  onClickCooked=(array)=>{
    let newArray = array;
    newArray.sort((a,b)=> {
        if(a.cooked.weight > b.cooked.weight){
          return 1
        } else return -1
    
      })
    let reversedArray = newArray.reverse();
    let filteredArray = reversedArray.filter(item=>(item.cooked.weight>0))
    let selected = filteredArray[0].name;
    this.setState({filteredCards:filteredArray, selected:selected, menuItems: Menu(filteredArray, selected, this.clickMe, this.onClickCard)})
  }
  onClickBaked=(array)=>{
    let newArray = array;
    newArray.sort((a,b)=> {
        if(a.baked.weight > b.baked.weight){
          return 1
        } else return -1
    
      })
    let reversedArray = newArray.reverse();
    let filteredArray = reversedArray.filter(item=>(item.baked.weight>0))
    let selected = filteredArray[0].name;
    this.setState({filteredCards:filteredArray, selected:selected, menuItems: Menu(filteredArray, selected, this.clickMe,this.onClickCard)})
  }
  onClickMarker = (name) => {
    this.setState({selected: String(name)})
  }
  onClickBack =() =>{
    this.setState({clicked:false})
  }
  render() {
    const {
      alignCenter,
      clickWhenDrag,
      hideArrows,
      dragging,
      hideSingleArrow,
      translate,
      transition,
      wheel
    } = this.state;
    const { selected } = this.state;
    const itemsCount = this.state.cards.length;
    const menu = this.state.menuItems;
    let currentCard = this.state.filteredCards.find(item=>(item.name===this.state.selected))
    let list = '';
    let date = '';
    let min = '';
    let max = '';
    if(currentCard && currentCard.hasOwnProperty('tags')){
    
        for (let i=0; i<currentCard.tags.length; i++){
            if (currentCard.tags[i]){
                if (i===0){
                    list=list+currentCard.tags[0];
                } else{
                list=list+", "+currentCard.tags[i];}

            } else break;
        }
        date = new Date(currentCard.date);
        let month = date.getUTCMonth() + 1;
        let day = date.getUTCDate();
        let today = new Date();
        let todayday = today.getUTCDate();
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
        min = `${currentCard.time.min}:00`
        max = `${currentCard.time.max}:00`
        
      }
      if (this.state.sortedBy === "all"){

      }
      let allb = "notfocusedb";
      let produceb = "notfocusedb"
      let cookedb = "notfocusedb";
      let bakedb = "focusedb"
    return (<>
      {!this.state.clicked && <div className="background">
          <div className="map">
            <GoogleMapReact
              bootstrapURLKeys={{ key:key}}
              defaultCenter={{
                lat: 43.6442,
                lng: -79.4009
              }}
              center={this.state.center}
              zoom={this.state.zoom}
              defaultZoom={13}
            >
              {this.state.filteredCards.map((card,index) => (

              <Marker 
                lat={card.coordinates.lat}
                lng={card.coordinates.lng}
                onClick={()=>{this.onClickMarker(card.name)}}
                text={index}
                imageId={card.imageId}
              /> ))}
            </GoogleMapReact>
          </div>
          {/* <button onClick={this.clickme}>ClickMe</button> */}
          <div className="sort-wrap">
          {/* <button className="sort" onClick={()=>{this.onClickDate(this.state.cards)}}>SORT BY DATE</button> */}
          <button ref="all" className={`${allb}, sort`} onClick={this.onClickAll}>View All</button>
          <button className={`${produceb}, sort`} onClick={()=>{this.onClickProduce(this.state.cards)}}>Produce</button>
          <button className={`${cookedb}, sort`} onClick={()=>{this.onClickCooked(this.state.cards)}}>Cooked</button>
          <button className={`${bakedb}, sort`} onClick={()=>{this.onClickBaked(this.state.cards)}}>Baked</button>
          </div>
          <div>
            <div></div>
          </div>
          <ScrollMenu
            // ref={el => (this.menu = el)}
            scrollBy={1}
            // hideArrows={hideArrows}
            hideSingleArrow={hideSingleArrow}
            transition={1}
            onUpdate={this.onUpdate}
            onSelect={this.onSelect}
            selected={selected}
            translate={translate}
            alignCenter={alignCenter}
            // scrollToSelected={true}
            dragging={false}
            clickWhenDrag={clickWhenDrag}
            wheel={false}
            data={menu}
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            selected={selected}
            scrollToSelected={true}
        />
      </div>}
      {this.state.clicked && <div className="clicked">
        <img onClick={this.onClickBack} src={back} className="clicked__back" alt="back"></img>
        <img className="clicked__image" src={`${process.env.REACT_APP_BACKEND_SERVER || "http://localhost:8080"}/${currentCard.imageId}.png`}></img>
        <div className="clicked__main">
                <div className="clicked__list">{list}</div>
                <div className="clicked__chart"><Chart2 produceWeight={currentCard.produce.weight}
                                            cookedWeight={currentCard.cooked.weight}
                                            bakedWeight={currentCard.baked.weight}
                                            
                                            
                                            ></Chart2></div>
                <div className="clicked--bottomwrap">
                    <div className="clicked__location">Get it at:<span style={{fontWeight:"bold"}}>{currentCard.location}</span></div>
                    <div className="clicked__time">Pick up by: <span style={{fontWeight:"bold"}}>{date}</span> from <span style={{fontWeight:"bold"}}>{min}</span> till <span style={{fontWeight:"bold"}}> {max}</span> </div>
                </div>
                <Link to="/posted" ><button className="clicked__button" >Confirm</button></Link>
        
        </div>



      </div>}
      
    </>
    );
  }
}
 
export default SimpleMap;