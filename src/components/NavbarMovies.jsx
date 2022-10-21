import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs'

import Jumbotron from './Jumbotron';
import Register from './Register';
import Login from './Login';

export default function NavbarMovies({movies, jumbotron}) {
    const [query, setQuery] = useState('');
    const [token, setToken] = useState(false)
    const navigate = useNavigate();

    const handleSubmitSearch = () => {
        navigate(`/search/${query}`)
    }

    const logOut = (e) => {
        e.preventDefault();
        setToken(false);
        localStorage.removeItem("user");
    }

    const user = localStorage.getItem('user');
    const userData = JSON.parse(user);

    useEffect(() => {
        if(userData) {
            setToken(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])


    return (
        <>  
            <Navbar className='__nav' collapseOnSelect expand="lg">
                <Container>
                    <Navbar.Brand onClick={() => navigate('/')}>
                        <img src='https://movielist-react-app.netlify.app/static/media/Logo.eeba5c17ddf85f2145e83dd963662921.svg' alt='logo'/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <form onSubmit={handleSubmitSearch}>
                                    <input
                                        type='Search'
                                        placeholder='Mau Nonton Apa?'
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <BsSearch className='icon__search' type='submit'/>
                            </form>
                            {
                                (token) ? 
                                <div className='d-flex align-items-center'>
                                    <p className='text-white mx-3 '>{userData.first_name}</p>
                                    {/* <img className='rounded border border-3 d-inline-block align-top' src={userData.image} width="40" height="40" alt=""/> */}
                                    <Button onClick={logOut} className='nav__button' variant='danger' style={{ borderRadius: '2rem' }} >LogOut</Button>
                                </div> 
                                : 
                                <div>
                                    <Login setToken={setToken} />
                                    <Register setToken={setToken} />
                                </div>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Jumbotron movies={jumbotron}/>
        </>
    )
}
