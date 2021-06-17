import React from 'react';
import style from './ConfirmTransaction.module.scss';
import Close from 'components/assets/Close';
import { UserWallet } from 'interfaces';
import { formatCaps } from 'utils/strings';

export interface ConfirmTransactionProps {
    open: boolean;
    setOpen: Function;
    user: UserWallet;
    capsToSwap: number|string;
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
