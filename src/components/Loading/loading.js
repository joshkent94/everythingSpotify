import { useSelector } from "react-redux"
import { selectIsLoading } from "../../features/Search/SearchSlice"
import './loading.css';

export default function Loading() {
    const isLoading = useSelector(selectIsLoading);

    if(isLoading) {
        return (
            <div className="loading-screen">
                <div className="loading-overlay"></div>
                <h3>Loading...</h3>
            </div>
        )
    } else {
        return null;
    };
};