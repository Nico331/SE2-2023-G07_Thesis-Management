import {Button, Modal, Row, Col} from "react-bootstrap";


function ProfessorModalOfProposal(props) {

    return (
            <Modal
                show={props.showModal}
                onHide={() => props.setShowModal(false)}
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
                            <b>Required Knowledge:</b> {props.propsalData[props.proposalID].required_knowledge}
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
                            <b>Description:</b> {props.propsalData[props.proposalID].description}
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
                </Modal.Footer>
            </Modal>
    )
};

export default ProfessorModalOfProposal;