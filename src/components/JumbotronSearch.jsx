import React from 'react'
import pic from "../KursiMovie.jpg"

export default function JumbotronSearch({ title, search }) {
    return (
        <div className='jumbotron__detail'>
            <div> 
                <div className='detail__text'>
                    <h1>{title} : "{search}"</h1>
                </div>
                <img
                    className="d-block w-100"
                    src={pic}
                    alt="Jumbotron"
                    style={{
                        backgroundSize: 'contain',
                        marginTop: '-20vh',
                        height: '70vh',
                    }}
                />
            </div>
        </div>
    )
}
