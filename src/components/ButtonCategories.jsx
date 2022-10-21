import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { Button, Container } from 'react-bootstrap'
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from 'react-router-dom';

export default function ButtonCategories({click}) {
    const navigate = useNavigate();
    const [ categories, setCategories ] = useState('');
    const key = 'b148673a01ff856c479b424ae5631a0d'; 


    const getDataCategory = async() => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`);
            setCategories(res.data.genres)
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getDataCategory();
    }, [])

    return (
        <Container>
            <div style={{ marginBottom: '2rem' }}>
                <Swiper
                    slidesPerView={6}
                    spaceBetween={5}
                    className="mySwiper"
                >
                {
                    categories &&
                    categories.map(genre => (
                        <SwiperSlide key={genre.id} >
                            <Button 
                                className='btn__category'
                                variant={click === genre.name ? 'danger' : 'outline-danger'} 
                                onClick={() => navigate(`/genre/${genre.name}/${genre.id}`)}
                            >
                                {genre.name}
                            </Button>
                        </SwiperSlide>
                    ))
                }
                </Swiper>
            </div>
        </Container>
    )
}
