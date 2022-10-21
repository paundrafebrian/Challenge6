import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CardMovies from '../components/CardMovies';
import NavbarMovies from '../components/NavbarMovies';
import JumbotronSearch from '../components/JumbotronSearch';
import ButtonCategories from '../components/ButtonCategories';

const key = 'b148673a01ff856c479b424ae5631a0d'; 


export default function CategoryPage() {
    const location = useParams();
    const genreId = location.genre;
    const name = location.name;
    const [movies, setMovies] = useState([]);

    const getDataCategory = async() => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${genreId}`);
            setMovies(res.data.results)
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getDataCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <NavbarMovies />
            <JumbotronSearch title='Genre' search={name}/>
            <ButtonCategories click={name}/>
            <CardMovies movies={movies}/>
        </div>
    )
}
