import './Search.css';
import {selectSearchTerm, setTerm, fetchResults, loadFavourites} from './SearchSlice';
import {useDispatch, useSelector} from 'react-redux';
import { selectAccessToken } from '../Authentication/AuthenticationSlice';
import { useEffect } from 'react';

export default function Search() {
    const dispatch = useDispatch();
    const searchTerm = useSelector(selectSearchTerm);
    const accessToken = useSelector(selectAccessToken);

    const handleSearch = e => {
        e.preventDefault();
        dispatch(setTerm({searchTerm: e.target.value}));
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(fetchResults({
            searchTerm: searchTerm,
            accessToken: accessToken
        }));
    };

    const fetchFavourites = () => {
        dispatch(loadFavourites({
            accessToken: accessToken
        }));
    };

    useEffect(() => {
        if(searchTerm === '') {
            fetchFavourites();
        };
    });

    return (
        <form className="d-flex" onSubmit={handleSubmit}>
            <input
                className="form-control me-2"
                type="search"
                placeholder="Search for a song..."
                aria-label="Search"
                onChange={handleSearch}
            />
        </form>
    );
};