import React from 'react';
import './App.scss';
import TopButton from './components/TopButton/TopButton'
import InputRange from 'react-input-range';
import FreshButton from './components/FreshButton/FreshButton'
import DatePicker from 'react-date-picker'
import Tag from './components/InputTag/Tag';
import axios from 'axios';
import AlgoliaPlaces from 'algolia-places-react';
import shortId from 'shortid';
import produce from './assets/svg/icons8-apple.svg';
import baked from './assets/svg/icons8-bread.svg';
import cooked from './assets/svg/icons8-porridge.svg';
import backbutton from './assets/svg/icons8-back.svg';
import posed from 'react-pose';
import posted from './assets/Item_posted.png';
import data from './assets/data'
class App extends React.Component {


  state = {
    itemPosted: false,
    thirdpage: false,
      file: null,
      imageId: "",
      items: data,
      suggestions: [],
      tags: [],
      text: "",
    secondpage: false,
      date: new Date(),
      dateSelect: false,
      datePopulated: false,
      todayColor:"white",
      tomorrowColor: "white",
      customColor: "white",
      doubleValue: {min: 6, max: 23},
      location: "",
      coordinates: {},
    firstpage: true,
      name:"Mike",
      sectionClicked: 1,
      value: 0,
      change: false,
      produce: {
        populated: false,
        weight: 0,
        freshness: 0
      },
      cooked: {
        populated: false,
        weight: 0,
        freshness: 0
      },
      baked: {
        populated: false,
        weight: 0,
        freshness: 0
      },
      readyColor: "giveItButtonGrey"
  }

  fileSubmit = (event) => {
    let form = event.target
    var blob = form.files[0].slice(0, form.files[0].size, 'image/png'); 
    let newFile = null;
    let imageId = shortId.generate();
    newFile = new File([blob], `${imageId}.png`, {type: 'image/png'});
    this.setState({file: newFile, imageId: imageId})
  }

  formSubmission = event => {
    if(this.state.file){
    event.preventDefault();
    const form = new FormData();
    form.append('file', this.state.file)
    axios.post('http://localhost:8080/upload', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    this.thirdPageSubmit(this.state.file.name);
    }}

  onKeyUp=(e)=>{
    if (e.which === 32 || e.which === 13){
      let input = e.target.value;
        if (input.length === 0 || input[0] === "") return;
        if (input === " "){
          e.target.value="";
          return;
        }
        this.setState({
          tags: [...this.state.tags, input,], text: ""
        })
          e.target.value = "";
        }
  }

  onDeleteTag = (tag) => {
        var tags = this.state.tags.filter((t) => {
            return(t!==tag );
        })
        this.setState({tags:tags});
  }

  saveWeight = () => {
    if (this.state.sectionClicked === 1) {
        var produce = { ...this.state.produce };
        produce.weight = this.state.value;
        this.setState({ produce });
    }
    if (this.state.sectionClicked === 2) {
        var cooked = { ...this.state.cooked };
        cooked.weight = this.state.value;
        this.setState({ cooked });
    }
    if (this.state.sectionClicked === 3) {
        var baked = { ...this.state.baked };
        baked.weight = this.state.value;
        this.setState({ baked });
    }
  }

  onClickProduce = () => {
    this.saveWeight();
    this.setState({
      value: this.state.produce.weight,
      sectionClicked: 1,
    })
  }

  onClickCooked = () => {
    this.saveWeight();
    this.setState({
      sectionClicked: 2,
      value: this.state.cooked.weight
    })
  }

  onClickBaked = () => {
    this.saveWeight();
    this.setState({
      sectionClicked: 3,
      value: this.state.baked.weight
    })
  }

  onClickFreshness = (item) => {
    if (this.state.sectionClicked === 1){
      let produce = { ...this.state.produce };
      produce.freshness = item;
      this.setState({ produce})
    }
    if (this.state.sectionClicked === 2){
      let cooked = { ...this.state.cooked };
      cooked.freshness = item;
      this.setState({ cooked})
    }
    if (this.state.sectionClicked === 3){
      let baked = { ...this.state.baked };
      baked.freshness = item;
      this.setState({ baked})
    }
  }

  setPageFreshness = () => {
    let freshness = 0;
    if (this.state.sectionClicked === 1){
      freshness = this.state.produce.freshness;
    }
    if (this.state.sectionClicked === 2){
      freshness = this.state.cooked.freshness;
    }
    if (this.state.sectionClicked === 3){
      freshness = this.state.baked.freshness;
    }
    return (freshness)
  }

  componentDidUpdate(){
    if (this.state.change){
      if (this.state.sectionClicked === 1){
        let produce = { ...this.state.produce };
        produce.weight = this.state.value;
        this.setState({ produce, change: false})
      }
      if (this.state.sectionClicked === 2){
        let cooked = { ...this.state.cooked };
        cooked.weight = this.state.value;
        this.setState({ cooked, change: false})
      }
      if (this.state.sectionClicked === 3){
        let baked = { ...this.state.baked };
        baked.weight = this.state.value;
        this.setState({ baked, change: false})
      }
    }
    if (this.state.produce.weight > 0 && this.state.produce.freshness > 0 && !this.state.produce.populated){
      let produce = { ...this.state.produce };
      produce.populated = true;
      this.setState({produce})
    }
    if (this.state.produce.populated && this.state.produce.weight == 0 ){
      let produce = { ...this.state.produce };
      produce.populated = false;
      produce.freshness = 0;
      this.setState({produce})
    }
    if (this.state.cooked.weight > 0 && this.state.cooked.freshness > 0 && !this.state.cooked.populated){
      let cooked = { ...this.state.cooked };
      cooked.populated = true;
      this.setState({cooked})
    }
    if (this.state.cooked.populated && this.state.cooked.weight == 0 ){
      let cooked = { ...this.state.cooked };
      cooked.populated = false;
      cooked.freshness = 0;
      this.setState({cooked})
    }
    if (this.state.baked.weight > 0 && this.state.baked.freshness > 0 && !this.state.baked.populated){
      let baked = { ...this.state.baked };
      baked.populated = true;
      this.setState({baked})
    }
    if (this.state.baked.populated && this.state.baked.weight == 0 ){
      let baked = { ...this.state.baked };
      baked.populated = false;
      baked.freshness = 0;
      this.setState({baked})
    }
  }

  firstPageSubmit = () =>{
    if (this.state.produce.populated || this.state.cooked.populated || this.state.baked.populated){
      this.setState({firstpage: false, secondpage: true})
    }
  }

  secondPageSubmit = () =>{
    if (this.state.datePopulated && this.state.location){
      this.setState({secondpage: false, thirdpage: true})
    }
  }

  thirdPageSubmit = (filename) =>{
    if (this.state.file && this.state.tags){
          axios.post(`http://localhost:8080/`, {
            produce: this.state.produce,
            cooked: this.state.cooked,
            baked: this.state.baked,
            date: this.state.date,
            time: this.state.doubleValue,
            location: this.state.location,
            coordinates: this.state.coordinates,
            tags: this.state.tags,
            imageId: this.state.imageId
            })
                .then (response => {
                    this.setState({itemPosted:true, thirdpage:false})
                })
    }
  }

  onChange = date => this.setState({ date })

  onClickDate = () => {
    this.setState({dateSelect:true, customColor: "#FFD100", todayColor: "white", tomorrowColor: "white", datePopulated: true })
  }

  onClickToday = () => {
    this.setState({date: new Date(), customColor: "white", todayColor: "#FFD100", tomorrowColor: "white", dateSelect: false, datePopulated: true})
  }

  onClickTomorrow = () => {
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    this.setState({date: tomorrow , customColor: "white", tomorrowColor: "#FFD100", todayColor: "white", dateSelect: false, datePopulated: true})
  }

  onClickBack = () =>{
    if (this.state.secondpage){
      this.setState({secondpage: false, firstpage: true})
    }
    if (this.state.thirdpage){
      this.setState({thirdpage: false, secondpage: true})
    }
  }

  onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
        const regex = new RegExp(`^${value}`, 'i');
        suggestions = this.state.items.sort().filter(v => regex.test(v));
    }
    this.setState({suggestions, text: value });
  }

  suggestionSelected (value) {
    this.setState({text: value, suggestions: []})
    this.refs.inputText.focus();
  }

  renderSuggestions (){
    let { suggestions } = this.state;
    if (suggestions.length === 0) {
        return null;
    }
    if (suggestions.length > 8){
      let cutSuggest = [];
      for (let i=0; i<8; i++){
        cutSuggest[i]=suggestions[i];
      }
      suggestions=cutSuggest;
    }
    return (
        <ul>
            {suggestions.map((item) => <li onClick={()=> this.suggestionSelected(item)}>{item}</li>)}
        </ul>
    )
  }
  
  
  render() {
    const Checkmark = posed.div({
      visible: { opacity: 1 },
      hidden: { opacity: 0 }
    });
    let overlay = "initial";
    if (this.state.file && this.state.tags){
      overlay = "none";
    }
    var tags = this.state.tags.map((tag) => {
      return <Tag onDeleteTag = {this.onDeleteTag} key={tag} value={tag} />
    })
    let freshness = this.setPageFreshness();
    let btn_class = "giveItButton giveItButton--Grey"
    if (this.state.firstpage && this.state.produce.populated || this.state.cooked.populated || this.state.baked.populated){
      btn_class = "giveItButton giveItButton--Yellow"
    }
    if (this.state.secondpage && !this.state.datePopulated && this.state.location.length<1 ){
      btn_class = "giveItButton giveItButton--Grey"
    }
    if (this.state.secondpage && this.state.datePopulated && this.state.location.length<1 ){
      btn_class = "giveItButton giveItButton--Grey"
    }
    if (this.state.secondpage && !this.state.datePopulated && this.state.location.length>1 ){
      btn_class = "giveItButton giveItButton--Grey"
    }
    if (this.state.secondpage && this.state.datePopulated && this.state.location.length>1){
      btn_class = "giveItButton giveItButton--Yellow"
    }
    if (this.state.thirdpage && this.state.tags.length === 0 && !this.state.file){
      btn_class = "giveItButton giveItButton--Grey"
    }
    if (this.state.thirdpage && this.state.tags.length > 0 && !this.state.file){
      btn_class = "giveItButton giveItButton--Grey"
    }
    if (this.state.thirdpage && this.state.tags.length === 0 && this.state.file){
      btn_class = "giveItButton giveItButton--Grey"
    }
    if (this.state.thirdpage && this.state.tags.length > 0 && this.state.file){
      btn_class = "giveItButton giveItButton--Yellow"
    }
    return ( <>
      { this.state.firstpage && <div>
        <div className="navbar--wrap">
          <div className="navbar">
          <h3 className="navbar__greeting">Hello, {this.state.name}!</h3>
          <h4 className="navbar__title"> What do you have to give? </h4>
            <div className="navbar__tabs">
            <TopButton 
                  populated={this.state.produce.populated}
                  func={this.onClickProduce} 
                  sectionClicked={this.state.sectionClicked}
                  icon={produce}
                  section={1} 
                  title='Produce'>
            </TopButton>
            <TopButton 
                  populated={this.state.cooked.populated}
                  func={this.onClickCooked} 
                  sectionClicked={this.state.sectionClicked} 
                  section={2} 
                  icon={cooked}
                  title='Cooked'>
            </TopButton>
            <TopButton 
                  populated={this.state.baked.populated}
                  func={this.onClickBaked}
                  sectionClicked={this.state.sectionClicked} 
                  section={3} 
                  icon={baked}
                  title='Baked'>
            </TopButton>
            </div>
          </div>
        </div>
        <div className="weightRange">
          <h4 className="weightRange__title">How many pounds?</h4>
          <div className="weightRange__slider">
          <InputRange
            maxValue={99}
            minValue={0}
            value={this.state.value}
            onChange={value => this.setState({ value: value, change: true })} />
          </div>
        </div>
        <h1 className="freshness__title">How fresh is it?</h1>
          <div className="freshness__buttons">
          <FreshButton title="fresh" item={1} func={this.onClickFreshness} freshness={freshness} title="Fresh"></FreshButton>
          <FreshButton title="medium" item={2} func={this.onClickFreshness} freshness={freshness} title="Medium"></FreshButton>
          <FreshButton title="run!" item={3} func={this.onClickFreshness} freshness={freshness} title="Run!"></FreshButton>
          </div>
       <button className={btn_class} onClick={this.firstPageSubmit}> <span>Give it</span> </button>
      </div>}
      {this.state.secondpage && <div className="secondPage">
          <div className="secondPage__topBG--wrap">
            <div className="secondPage__topBG">
              <div onClick={this.onClickBack}><img className="backbutton" src={backbutton} alt="<" ></img></div>
              <h3 className="secondPage__title">When would you like it to be picked up by?</h3>
              <div className="secondPage__buttons">
                <div className="secondPage__buttons__dayButton--wrap">
                  <button className="secondPage__buttons__dayButton" style={{backgroundColor: this.state.todayColor}} onClick={this.onClickToday}>Today</button>
                  <button className="secondPage__buttons__dayButton" style={{backgroundColor: this.state.tomorrowColor}} onClick={this.onClickTomorrow}>Tomorrow</button>
                </div>
                <button className="secondPage__buttons__select" style={{backgroundColor: this.state.customColor}} onClick = {this.onClickDate}>{this.state.dateSelect ? <DatePicker onChange={this.onChange} isOpen={this.state.dateSelect} value={this.state.date}/> : <span>Select date </span> } </button>
              </div>
              <div className="secondPage__slider">
                <InputRange
                  maxValue={23}
                  minValue={6}
                  value={this.state.doubleValue}
                  onChange={value => this.setState({ doubleValue: value})} />
              </div>
              <div className="secondPage__time"><span className="secondPage__time--from">6:00</span><span className="secondPage__time--till">23:00</span></div>
            </div>
          </div>
          <div className="secondPage__places">
          <h3 className="secondPage__places__title">Pick up at</h3>
          <div><AlgoliaPlaces
                    placeholder={this.state.location}
                    options={{
                      appId: 'plLKFXVBBE2L',
                      apiKey: '4e56120d9529767425094ba6cf55d226',
                      language: 'en',
                      countries: ['ca'],
                    }}
                    onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => 
                      this.setState({location:suggestion.value, coordinates:suggestion.latlng})
                    }
                    onSuggestions={({ rawAnswer, query, suggestions }) => 
                          console.log('Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed.')}
                    onCursorChanged={({ rawAnswer, query, suggestion, suggestonIndex }) => 
                          console.log('Fired when arrows keys are used to navigate suggestions.')}
                    onClear={() => 
                          console.log('Fired when the input is cleared.')}
                    onLimit={({ message }) => 
                          console.log('Fired when you reached your current rate limit.')}
                    onError={({ message }) => 
                          console.log('Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit.')}
                  />
          </div>
        </div>
           <button className={btn_class} onClick={this.secondPageSubmit}>Confirm</button>
        </div>
        }
        {this.state.thirdpage && <div className="thirdpage">
            <div className="thirdpage__button" onClick={this.onClickBack}><img className="backbutton" src={backbutton} alt="<" ></img></div>
            <div className="thirdpage__list">
              <h1 className="thirdpage__list__title">Please list your items</h1>
              <div className="AutoComplete">
                  {tags}
                  <input ref="inputText" onKeyUp={(e)=>this.onKeyUp(e)} value = {this.state.text} onChange={this.onTextChanged}/>
                  {this.renderSuggestions()}
              </div>
            </div>
            <h3 className="thirdpage__title">Add a photo of your items</h3>
            <form ref='uploadForm' 
                  id='uploadForm' 
                  action='http://localhost:8080/upload' 
                  method='post' 
                  encType="multipart/form-data"
                  onSubmit={this.formSubmission}>
                  <input className="thirdpage__photo"  onChange={this.fileSubmit} id="file" type="file" name="sampleFile" />
                  <label className="thirdpage__label" for="file">
                      <figure className="thirdpage__figure">                  <Checkmark className="thirdpage__anim" pose={this.state.file ? 'visible' : 'hidden'}></Checkmark> 
                      <svg className="thirdpage__svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 2c1.654 0 3 1.346 3 3v14c0 1.654-1.346 3-3 3h-14c-1.654 0-3-1.346-3-3v-14c0-1.654 1.346-3 3-3h14zm0-2h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-7 6c-3.313 0-6 2.687-6 6s2.687 6 6 6 6-2.687 6-6-2.687-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4c2.205 0 4 1.794 4 4s-1.795 4-4 4zm7-10c-.553 0-1-.448-1-1s.447-1 1-1 1 .448 1 1-.447 1-1 1z"/></svg></figure>
                  </label>
                  <button style={{marginLeft: "0"}} type="submit" className={btn_class}>Post it</button>
            </form> 
            <div style={{display:overlay}} class="submit-overlay"></div>    
        </div>}
        {this.state.itemPosted &&  <div className="itemPosted"><a href="http://localhost:3000" ><img className="itemPosted__image" src={posted}/></a></div>}
    </>
    );
  }
}

export default App;
