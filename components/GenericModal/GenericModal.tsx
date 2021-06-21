import React from 'react';
import style from './GenericModal.module.scss';
import Close from 'components/assets/Close';
import Warning from 'components/assets/Warning';
import ClickAwayListener from 'react-click-away-listener';

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
                <ClickAwayListener onClickAway={()=>setOpen && setOpen(false)}>
                    <div className={style.alignBox}>
                        <div className={style.container + " " + (isModalError ? style.containerError : "")}>
                            {isClosable && setOpen && 
                                <div className={"row d-flex justify-content-end"}>
                                    <div onClick={() => setOpen(false)} className={style.closeButtonContainer}>
                                        <Close className={style.closeButton}/>
                                    </div>
                                </div>
                            }
                            <div className={"container pt-2 pt-md-3"}>
                                {isModalError && 
                                    <div className={"row pt-2 pb-5"}>
                                        <Warning/>
                                    </div>
                                }
                                <div className={"row"}>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </ClickAwayListener>
            </div>
        }
        </>
    )
}

export default GenericModal;
