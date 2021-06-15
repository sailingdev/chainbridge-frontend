import React from 'react';
import ClickAwayListener from 'react-click-away-listener';
import style from './ModalMenu.module.scss';
import Close from 'components/assets/Close'
import { UserType } from 'interfaces/index';

export interface ModalMenuProps {
    modalMenuOpen: boolean;
    setModalMenuOpen: Function;
    user: UserType | null;
}

const ModalMenu: React.FC<ModalMenuProps> = ({ modalMenuOpen, setModalMenuOpen, user }) => {
    
    return(
        <>
            {modalMenuOpen && 
                <div className={style.ModalContainer}>
                    <div onClick={()=>setModalMenuOpen(false)}>
                        <Close className={style.CloseButton}/>
                    </div>
                </div>
            }
        </>
    )
}

export default ModalMenu;
 
