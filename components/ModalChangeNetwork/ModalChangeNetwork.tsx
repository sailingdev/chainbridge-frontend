import React from 'react';
import style from './ConfirmTransaction.module.scss';
import { useAppSelector } from 'redux/hooks';
import { ChainTypes } from 'interfaces';

export interface ModalChangeNetworkProps {
    open: boolean;
    setOpen: Function;
}


const ModalChangeNetwork: React.FC<ModalChangeNetworkProps> = ({ open, setOpen }) => {
    const userWallet = useAppSelector((state) => state.user.userWallet)
    return (
        <>
        {open && 
            <div className={style.wrapper}>
                <div className={style.confirmTransactionAlignBox}>
                    <div className={style.confirmTransactionContainer}>
                        <div className={"container p-2 p-md-3"}>
                            
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default ModalChangeNetwork;
