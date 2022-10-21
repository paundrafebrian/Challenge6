import React from 'react'
import { Button } from 'react-bootstrap'

export default function JumbotronDetail({movies}) {
    return (
        <div className='jumbotron__detail'>
            <div key={movies.id}> 
                <div 
                    style={{
                        position: 'absolute', 
                        width: "100%", 
                        height: '600px', 
                        backgroundImage: 'linear(to top, rgba(0,0,0,1), rgba(0,0,0,0))'
                    }}>
                </div>
                <div className='detail__text'>
                    <h3>{movies.title}</h3>
                    <div style={{ display: 'flex' }}>
                        {   
                            movies.genres &&
                            movies.genres.map(item => (
                                <p key={item.id}>{item.name},&nbsp;</p>
                            ))
                        }
                    </div>
                    <p>{movies.overview}</p>
                    <Button>WATCH TRAILLER</Button>
                </div>
                <img
                    className="d-block w-100"
                    src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
                    alt="First slide"
                    style={{
                        backgroundSize: 'cover',
                        height: '600px',
                    }}
                />
            </div>
        </div>
    )
}
