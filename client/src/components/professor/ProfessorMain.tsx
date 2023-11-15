import React from "react";
import {ProfessorBrowseProposals} from './BrowseProposals'
const ProfessorMain= () => {

    return (
        <div className="App" style={{paddingTop: 200}}>
            <h1>Professors</h1>
            <ProfessorBrowseProposals />
        </div>
    );
}

export default ProfessorMain
