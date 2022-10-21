import React, { useState, useEffect } from 'react'
import ReactPaginate from "react-paginate";
import axios from 'axios';
import CardAll from '../components/CardAll';
import NavbarMovies from '../components/NavbarMovies';
import JumbotronSearch from '../components/JumbotronSearch';
import FooterMovie from '../components/FooterMovie';

const key = 'b148673a01ff856c479b424ae5631a0d'; 

export default function AllMovie() {
    const [ data, setData ] = useState([]);
    const [page, setPage] = useState(1);
    const pageCount = 6;

    const getData = async() => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=b148673a01ff856c479b424ae5631a0d&language=en-US&page=1`);
            setData(res.data.results)
        } catch(error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
    };

    return (
        <div>
            <NavbarMovies />
            <JumbotronSearch title='All Movies' search='Movies' />
            <CardAll movies={data} />
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
            <FooterMovie />
        </div>
    )
}
