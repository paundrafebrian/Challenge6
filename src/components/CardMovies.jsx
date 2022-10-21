import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BsStar } from 'react-icons/bs'

import "swiper/css";
import "swiper/css/pagination";
import { Card, Container } from 'react-bootstrap'
import { Swiper, SwiperSlide } from "swiper/react";

export default function CardMovies({ movies, cardStatus }) {
    const navigate = useNavigate();

    return (
        <div className='movie__card'>
            <Container className='container'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                    }}
                    className="mySwiper"
                >
                    {
                        movies &&
                        movies.map(items => (
                            cardStatus ? 
                            <SwiperSlide key={items.id} onClick={() => navigate(`/${items.id}`)}>
                                <Card 
                                    border="light"
                                    style={{ width: '15rem', position: 'relative', cursor: 'pointer' }}
                                >
                                    <img 
                                        className='img__card'
                                        src={`https://image.tmdb.org/t/p/w500${items.profile_path}`} 
                                        alt='card'
                                    />
                                    <div className='description__1'>
                                        <h5>{items.name}</h5>
                                        <p>{items.character}</p>
                                    </div>
                                </Card>
                            </SwiperSlide>
                                :
                            <SwiperSlide key={items.id} onClick={() => navigate(`/${items.id}`)}>
                                <Card 
                                    border="light"
                                    style={{ width: '15rem', position: 'relative', cursor: 'pointer' }}
                                >
                                    <img 
                                        className='img__card'
                                        src={`https://image.tmdb.org/t/p/w500${items.poster_path}`} 
                                        alt='card'
                                    />
                                    <div className='description'>
                                        <h5>{items.title}</h5>
                                        <p><BsStar style={{ color: 'gold'}}/> {items.vote_average}/10</p>
                                    </div>
                                </Card>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Container>
        </div>
        
    )
}
