import React from 'react';
import style from './ConfirmTransaction.module.scss';
import Close from 'components/assets/Close';
import Metamask from 'components/assets/Providers/Metamask'
import WalletConnect from 'components/assets/Providers/WalletConnect'
import { UserType } from 'interfaces';
import { formatCaps } from 'utils/strings';

export interface ConfirmTransactionProps {
    open: boolean;
    setOpen: Function;
    user: UserType;
    capsToSwap: number;
}

const ConfirmTransaction: React.FC<ConfirmTransactionProps> = ({ open, setOpen, user, capsToSwap }) => {
    return (
        <>
        {open && 
            <div className={style.wrapper}>
                <div className={style.confirmTransactionContainer}>
                    <div className={"container py-2 px-2"}>
                        <div className={"row"}>
                            <div onClick={() => setOpen(false)}><Close className={style.closeButton}/></div>
                        </div>
                        <div className={"row d-flex justify-content-center text-center"}>
                            <span className={style.title}>Confirmation</span>
                            <hr className={style.divider}/>
                        </div>
                        <div className={"row d-flex text-center"}>
                            <div className={style.capsAmountContainer}>
                                <span className={style.capsAmount}>{`${formatCaps(capsToSwap)} CAPS`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default ConfirmTransaction;
