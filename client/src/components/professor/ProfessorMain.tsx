import React from "react";
import {ProfessorBrowseProposals} from './BrowseProposals'
import Profile from "../loginwithauth0/Profile";
const ProfessorMain= () => {

    return (
        <>
            <h1>Professors</h1>
            <Profile/>
            <ProfessorBrowseProposals />
        </>
    );
}

export default ProfessorMain
