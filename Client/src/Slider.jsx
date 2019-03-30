import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Slide from './Slide.jsx';
import RightArrow from './RightArrow.jsx';
import LeftArrow from './LeftArrow.jsx';
import Skull from './skull.jsx';


class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            listing: '',
            currentIndex: 0,
            translateValue: 0,
            view: false
        };
        this.goToNextSlide = this.goToNextSlide.bind(this);
        this.goToPrevSlide = this.goToPrevSlide.bind(this);
        this.loadPics = this.loadPics.bind(this);
        this.changeView = this.changeView.bind(this);

    }

    componentDidMount () {
        this.loadPics(25);
       setTimeout(console.log(this.state), 50000) 

    }
    
    loadPics (listingId) {

        axios.get(`/heroes/${listingId}`)
        .then( res => this.setState({images: res.data})
        

         )
        .catch(
         (err) => {console.log(err)}
        ) 
        


    }

    changeView (e) {
        this.setState(prevState => ({
            view: !prevState.view
        }))

    }
    
    goToPrevSlide () {
        
        if(this.state.currentIndex === 0) return;
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex - 1,
            translateValue: prevState.translateValue + this.slideWidth()
          }))

    }

    goToNextSlide () {

        if(this.state.currentIndex === this.state.images.length -1) {
            return this.setState({
                currentIndex: 0,
                translateValue: 0

            })
        }
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1,
            translateValue: prevState.translateValue + -(this.slideWidth())


        }))

    }

    slideWidth() {
        return document.querySelector('.slide').clientWidth
    }

    render () {
       if (this.state.view === true) { return (
            <div className="slider" >
              <div className="slider-wrapper"
              style={{
                transform: `translateX(${this.state.translateValue}px)`,
                transition: 'transform ease-out 0.45s'
              }}>
            {
                this.state.images.map((image, i) => (
                    <Slide key={i} image={image.url}/>

                ))
            
            }
            </div>
            <LeftArrow 
            goToPrevSlide={this.goToPrevSlide} 
            />

            <RightArrow 
            goToNextSlide={this.goToNextSlide} 
            />

            <Skull 
            changeView={this.changeView} 
            />

            </div>
        );
       } 
       if (this.state.view === false) {
           return (
            <div className="lander" onClick={this.changeView}>
            <div className="lander-wrapper">
            {
                this.state.images.map((image, i) => (
                    <Slide key={i} image={image.url}/>

                ))
            
            }
            
            
            {/* {this.state.images.map((i, image) => 
            
                <img className="main-photo" alt="Exterior Photo"  src={this.image}></img>
                // <img className="side-photo" alt="Side Photo" src={this.image}></img>
            )}
             */}
         
            </div>



          </div>
           )
       }
    }

    
    
}

export default Slider

/*"https://i.imgur.com/M4YeUei.jpg",
                     "https://i.imgur.com/BXWwCKd.jpg",
                     "https://i.imgur.com/zstzmyJ.jpg",
                     "https://i.imgur.com/xfNXg6a.jpg",
                     "https://i.imgur.com/cLpJWYR.jpg"
        
        */