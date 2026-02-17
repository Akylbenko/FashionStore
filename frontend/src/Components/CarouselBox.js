import React, { Component } from 'react'
import { Carousel, CarouselCaption, CarouselItem } from 'react-bootstrap'
import slider1Img from '../assets/slider1.jpg'
import slider2Img from '../assets/slider2.jpg'
import slider3Img from '../assets/slider3.jpg'

export default class CarouselBox extends Component {
  render() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    src={slider1Img}
                    className="d-block w-100"
                    alt="Slider1"
                />
                <CarouselCaption>
                    <h3>Indie-Sleaze Aesthetics</h3>
                    <p>2010</p>
                </CarouselCaption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src={slider2Img}
                    className="d-block w-100"
                    alt="Slider2"
                />
                <CarouselCaption>
                    <h3>Indie-Sleaze Aesthetics</h3>
                    <p>2010</p>
                </CarouselCaption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src={slider3Img}
                    className="d-block w-100"
                    alt="Slider3"
                />
                <CarouselCaption>
                    <h3>Indie-Sleaze Aesthetics</h3>
                    <p>2010</p>
                </CarouselCaption>
            </Carousel.Item>
        </Carousel>

    )
  }
}
