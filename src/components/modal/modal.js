import React ,{useEffect, useState} from 'react';
export const ModalFooter = props => {
    return <div className="modal-footer">{props.children}</div>;
};
export const ModalHeader = props => {
    return <div className="modal-header">{props.children}</div>;
};
  
export const ModalBody = props => {
    return <div className="modal-body">{props.children}</div>;
};
const Modal = props => {
    const {visible,modalId,setModalVisible,setBacks} = props;
    const modalBody = props.children;
 
    useEffect(()=>{

        if(visible)
        {
            window.$("#modal"+modalId).modal('show');
            
        }else
        {
            window.$("#modal"+modalId).modal('hide');
        }
    },[visible])
    useEffect(()=>{
        return window.$("#modal"+modalId).on('hide.bs.modal',()=>{
                setModalVisible(false)
        })
    },[])
    return (
            <div className="modal fade" data-backdrop="static" data-keyboard="false" id={"modal"+modalId} tabindex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                         {modalBody} 
                    </div>
                </div>
            </div>);
};

 
export default Modal;