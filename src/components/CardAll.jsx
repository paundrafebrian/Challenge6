import React from 'react'
import { Card } from 'react-bootstrap'
import { BsStar } from 'react-icons/bs'

export default function CardAll({ movies }) {
    return (
        <div className='container movie__cardall'>
            {
                movies &&
                movies.map(items => (
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
                ))
            }
        </div>
    )
}
