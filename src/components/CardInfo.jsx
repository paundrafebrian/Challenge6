import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CardInfo({ title, check }) {
    const navigate = useNavigate();
    return (
        <div className='container card__info'>
            <h2 style={{marginBottom: '2rem'}}>{title}</h2>
            {
                check ? '':<h5 className='all__movies' onClick={() => navigate('/allmovie')}>See All Movies</h5>
            }
        </div>
    )
}
