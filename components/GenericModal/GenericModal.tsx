import React from 'react';
import style from './GenericModal.module.scss';
import Close from 'components/assets/Close';
import Warning from 'components/assets/Warning';

export interface GenericModalProps {
    open: boolean;
    setOpen?: Function;
    isModalError: boolean;
    isClosable: boolean;
}


const GenericModal: React.FC<GenericModalProps> = ({ open, setOpen, isModalError, isClosable, children }) => {
    return (
        <>
        {open && 
            <div className={style.wrapper}>
                <div className={style.alignBox}>
                    <div className={style.container + " " + (isModalError ? style.containerError : "")}>
                        <div className={"container p-2 p-md-3"}>
                            {isClosable && setOpen && 
                                <div className={"row"}>
                                    <div onClick={() => setOpen(false)}><Close className={style.closeButton}/></div>
                                </div>
                            }
                            <div className={"row pt-2 pb-5"}>
                                <Warning/>
                            </div>
                            <div className={"row"}>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default GenericModal;
