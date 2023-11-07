import './App.css';
import {AdminRoutes} from "./components/administrator/AdminRoutes";
import {ProposalList} from "./components/student/proposalList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import {AdminMain} from "./components/administrator/AdminMain";
import ProposalForm from "./components/professor/ProposalForm";

function App() {
  return (
      <BrowserRouter>
        <Container fluid className="App">
          <Routes>
            <Route path="/*" element={<Main />} />
            <Route path="/ProposalList" element={<ProposalList />} />
              <Route path="/professor/addProposal" element={<ProposalForm />} />
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
