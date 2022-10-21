import React, { useState, useEffect } from 'react'
import axios from 'axios';

import NavbarMovies from '../components/NavbarMovies'
import CardMovies from '../components/CardMovies'
import CardInfo from '../components/CardInfo';   


import { Container } from 'react-bootstrap';
import FooterMovie from '../components/FooterMovie';

const key = 'b148673a01ff856c479b424ae5631a0d'; 


export default function HomeMovies() {
    const [ movies, setMovies ] = useState([]);

    const getData = async() => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`);
            setMovies(res.data.results)
        } catch(error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <NavbarMovies movies={movies} jumbotron={movies} />
            <div>
                <Container>
                    <CardInfo title='Popular Movie' />
                    <CardMovies movies={movies} />
                </Container>
            </div>
           
            <FooterMovie />
        </div>
    )
}
