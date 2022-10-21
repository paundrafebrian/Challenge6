import React from 'react'
import { Carousel, Button } from 'react-bootstrap'
import {BsPlayCircle} from 'react-icons/bs'

export default function Jumbotron({movies}) {
    return (
            <Carousel className='jumbotron' controls={false}>
                {
                    movies &&
                    movies.slice(0,3).map(items => (
                        <Carousel.Item interval={2000} key={items.id}> 
                            <div 
                                style={{
                                    position: 'absolute', 
                                    width: "100%", 
                                    height: '100vh', 
                                    backgroundImage: 'linear(to top, rgba(0,0,0,1), rgba(0,0,0,0))'
                                }}>
                            </div>
                            <Carousel.Caption className='carousel__text' 
                                style={{ textAlign: 'left', left: '5rem', bottom: '6rem'}}>
                                <h3>{items.title}</h3>
                                <p>{items.overview}</p>
                                <a href={`https://www.youtube.com/results?search_query=${items.title}trailer`} target="_blank" rel="noreferrer">
                                    <Button style={{ backgroundColor: 'red', borderColor: 'red', borderRadius: '2rem', padding: '0.5rem 1rem' }} ><BsPlayCircle /><span> </span>WATCH TRAILLER</Button>
                                </a>
                            </Carousel.Caption>
                            <img
                                className=""
                                src={`https://image.tmdb.org/t/p/original${items.backdrop_path}`}
                                alt="First slide"
                                style={{
                                    backgroundSize: 'cover',
                                    width: '100vw',
                                    maxHeight: '100vh',
                                }}
                            />
                        </Carousel.Item>
                    ))
                }
            </Carousel>
    )
}
