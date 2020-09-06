import React from 'react'
import {StarshipList} from "../sw-components";
import {withRouter} from "react-router-dom";

const StarshipsPage = ({history}) => {
    return (
        <StarshipList onItemSelected={(itemId) => {
            const newPage = itemId;
            history.push(newPage);
        }}/>
    )
};
export default withRouter(StarshipsPage);