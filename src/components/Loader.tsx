import React from "react";
import './Loader.css';

export function Loader(): JSX.Element{
    return <React.Fragment>
        <div className="loading-overlay">
            <div className="loader"></div>
        </div>
    </React.Fragment>
}