import './App.css';
import {AdminRoutes} from "./components/administrator/AdminRoutes";
import {ProposalList} from "./components/student/ProposalList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import {AdminMain} from "./components/administrator/AdminMain";
import ProposalForm from "./components/professor/ProposalForm";
import {ProfessorBrowseProposals} from "./components/professor/BrowseProposals";
import StudentApplyForm from "./components/student/StudentApplyForm";
import {useState} from "react";

function App() {

    const [studentproposalID, setStudentProposalID] = useState('');
    const [professorproposlID, setProfessorProposalID] = useState('');

  return (
      <BrowserRouter>
        <Container fluid className="App">
          <Routes>
            <Route path="/*" element={<Main />} />
            <Route path="/ProposalList" element={<ProposalList setStudentProposalID={setStudentProposalID}/>} />
          <Route path="/professor/addProposal" element={<ProposalForm />} />
            <Route path="/professor/browseproposals" element={<ProfessorBrowseProposals setProfessorProposalID={setProfessorProposalID}/>} />
          <Route path="/apply" element={<StudentApplyForm studentproposalID={studentproposalID} />} />
          </Routes>
        </Container>
      </BrowserRouter>
  );
}
function Main() {
    return(
        <div style={{paddingTop: "75px"}}>
            <AdminRoutes/>
        </div>
)
}
export default App;
