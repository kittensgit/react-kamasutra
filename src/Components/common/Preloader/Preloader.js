import React from "react";
import preloader from '../../../assets/images/preloader.gif';

export default function Preloader(props) {
    return (<div>
            <img src={preloader} alt='preloader'/>
        </div>
    )
}
