import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { reset } from "../../../store/ui/creators";

export const MainScreen = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <main className="px-3">
        <h1>Cover your page.</h1>
        <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
        <p className="lead">
            <Link className="btn btn-lg btn-secondary fw-bold border-white bg-white" to="/challenge">Go to the challenge!</Link>
        </p>
    </main>
    );
};
