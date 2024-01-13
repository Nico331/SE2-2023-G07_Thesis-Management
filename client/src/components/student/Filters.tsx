import React, {Dispatch, SetStateAction} from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../componentsStyle.css';
import {Modal} from 'react-bootstrap';
import Professor from "../../types/Professor";
import Proposal from "../../types/Proposal";
import FiltersForm from "./FiltersForm";

type FiltersSidebarProps = {
    proposals: Array<Proposal>;
    setPropsOnScreen: Dispatch<SetStateAction<Array<Proposal> | null>>;
    professors: Array<Professor>;
    resetFilters: boolean;
    setResetFilters: Dispatch<SetStateAction<boolean>>;
    refresh: boolean;
    setRefresh: Dispatch<SetStateAction<boolean>>;
    isScreenSmall: boolean;
    showFilterModal: boolean;
    setShowFilterModal: Dispatch<SetStateAction<boolean>>;
};

const Filters: React.FC<FiltersSidebarProps> = ({proposals, setPropsOnScreen, professors, resetFilters, setResetFilters, refresh, setRefresh, isScreenSmall, showFilterModal, setShowFilterModal}) => {
    return (
        isScreenSmall ?
            <Modal
                show={showFilterModal}
                onHide={() => setShowFilterModal(false)}
                size={'xl'}
                aria-labelledby='contained-modal-title-vcenter'
                centered
                scrollable={true}
                className="p-2"
            >
                <Modal.Header>
                    <Modal.Title>Filters</Modal.Title>
                </Modal.Header>

                <Modal.Body className="p-0">
                    <FiltersForm proposals={proposals} setPropsOnScreen={setPropsOnScreen} professors={professors} resetFilters={resetFilters} setResetFilters={setResetFilters}
                                 refresh={refresh} setRefresh={setRefresh} isScreenSmall={isScreenSmall} setShowFilterModal={setShowFilterModal}/>
                </Modal.Body>
            </Modal>
            :
            <FiltersForm proposals={proposals} setPropsOnScreen={setPropsOnScreen} professors={professors} resetFilters={resetFilters} setResetFilters={setResetFilters}
                         refresh={refresh} setRefresh={setRefresh} isScreenSmall={isScreenSmall} setShowFilterModal={setShowFilterModal}/>
    );
}
export default Filters;


