import {Button, Modal, Row, Col} from "react-bootstrap";
import {useState} from "react";


/*function StudentSearch() {

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
}*/

function ModalOfProposal(props) {

    return (
        <>
            <Modal
                show={props.showModal}
                onHide={() => props.setShowModal(false)}
                backdrop={'static'}
                size={'xl'}
                aria-labelledby = 'contained-modal-title-vcenter'
                centered
                scrollable={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title> Details of Proposal </Modal.Title>
                </Modal.Header>

                <Modal.Body style={{wordWrap: 'break-word'}} id={'Stu-Modal-Details'}>
                    <Row>
                        <Col md={6}>
                            <b>Thesis Title:</b> {props.propsalData[props.proposalID].title}
                        </Col>
                        <Col md={6}>
                            <b>Supervisor:</b> {props.propsalData[props.proposalID].supervisor}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <b>Co-Supervisor:</b> list of co-supervisors
                        </Col>
                        <Col md={6}>
                            <b>Type:</b> {props.propsalData[props.proposalID].type}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <b>Description:</b> {props.propsalData[props.proposalID].description}
                        </Col>
                        <Col md={6}>
                            <b>Level:</b> {props.propsalData[props.proposalID].level}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <b>Corso Di Studi:</b> {props.propsalData[props.proposalID].cds}
                        </Col>
                        <Col md={6}>
                            <b>Expiration Date:</b> {props.propsalData[props.proposalID].expiration}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Required Knowledge:</b> {props.propsalData[props.proposalID].required_knowledge}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Notes:</b> {props.propsalData[props.proposalID].notes}
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant={'secondary'} onClick={() => props.setShowModal(false)}> Close </Button>
                    <Button variant={'primary'}> Apply </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export {ModalOfProposal};