import './App.css';
import {AdminRoutes} from "./components/administrator/AdminRoutes";
import {ProposalList} from "./components/student/proposalList";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import {AdminMain} from "./components/administrator/AdminMain";

function App() {
  return (
      <BrowserRouter>
        <Container fluid className="App">
          <Routes>
            <Route path="/*" element={<Main />} />
            <Route path="/ProposalList" element={<ProposalList />} />
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
