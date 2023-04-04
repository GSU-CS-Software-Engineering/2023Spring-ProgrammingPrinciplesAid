import React, { ReactNode } from 'react';
import Modal from 'react-modal';


type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
};

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    top: '50%',
    left: '50%',
    width: '25%',
    height: '25%',
    transform: 'translate(-50%, -50%)',
    padding: '2rem',
    borderRadius: '0.5rem'
  }
};

const ModalComponent: React.FC<Props> = ({ isOpen, onRequestClose, children }) => {
  return (
  
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
        
        {children}
        
    </Modal>
    
  );
};

export default ModalComponent;