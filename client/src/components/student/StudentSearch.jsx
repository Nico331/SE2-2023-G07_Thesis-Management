import {Button, Modal} from "react-bootstrap";
import {useState} from "react";


function StudentSearch() {

    const [showModal, setShowModal] = useState(false);
    const [proposalData, setProposalData] = useState([{proposalid : '1', name: 'proposal1', teacher: 'Luigi'}, { proposalid: '2', name: 'proposal2', teacher: 'Mario'}]);
    const [proposalID, setProposalID] = useState('');

    const handelshow = (proid) => {
        setShowModal(true);
        setProposalID(proid);
    }
    return (
        <>
            <h2> Search proposals</h2>

            <Button onClick={() => handelshow('0')}> Modal Test</Button>

            {showModal ? <ModalOfProposal showModal={showModal} setShowModal={setShowModal} propsalData={proposalData} proposalID={proposalID}/> : null}

        </>
    )
}

function ModalOfProposal(props) {
    console.log(props.propsalData);

    return (
        <>
            <Modal
                show={props.showModal}
                onHide={() => props.setShowModal(false)}
                backdrop={'static'}
                size={'lg'}
                aria-labelledby = 'contained-modal-title-vcenter'
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title> Details of Proposal </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>Thesis Title: {props.propsalData[props.proposalID].title}</div>
                    <div>Supervisor: {props.propsalData[props.proposalID].supervisor}</div>
                    <div>Co-Supervisor: list of co-supervisors</div>
                    <div>Type: {props.propsalData[props.proposalID].type}</div>
                    <div>Description: {props.propsalData[props.proposalID].description}</div>
                    <div>Required Knowledge: {props.propsalData[props.proposalID].required_knowledge}</div>
                    <div>Notes: {props.propsalData[props.proposalID].notes}</div>
                    <div>Expiration Date: {props.propsalData[props.proposalID].expiration}</div>
                    <div>Level: {props.propsalData[props.proposalID].level}</div>
                    <div>Corso Di Studi: {props.propsalData[props.proposalID].cds}</div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant={'secondary'} onClick={() => props.setShowModal(false)}> Close </Button>
                    <Button variant={'primary'}> Apply </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export {StudentSearch, ModalOfProposal};