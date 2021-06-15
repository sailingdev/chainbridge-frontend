import React from 'react';
import style from './Footer.module.scss';
import Discord from 'components/assets/SocialMedias/Discord';
import Telegram from 'components/assets/SocialMedias/Telegram';
import Twitter from 'components/assets/SocialMedias/Twitter';
import Instagram from 'components/assets/SocialMedias/Instagram';

const Footer: React.FC<{}> = () => {
    return(
        <div className={style.Footer}>
            <div className={"row"}>
                <div className={"col-md-6 col-sm-12 col-12 mb-3 d-flex flex-row align-items-center justify-content-center justify-content-md-start"}>
                    <a
                        href="https://discord.gg/cNZTGtGJNR"
                        target="_blank"
                        rel="noopener"
                    >
                        <Discord className={style.SocialLogo}/>
                    </a>
                    <a
                        href="https://t.me/ternoadiscussions"
                        target="_blank"
                        rel="noopener"
                    >
                        <Telegram className={style.SocialLogo}/>
                    </a>
                    <a
                        href="https://twitter.com/ternoa_"
                        target="_blank"
                        rel="noopener"
                    >
                        <Twitter className={style.SocialLogo}/>
                    </a>
                    <a
                        href="https://www.instagram.com/ternoa_/"
                        target="_blank"
                        rel="noopener"
                    >
                        <Instagram className={style.SocialLogo}/>
                    </a>
                </div>
                <div className="col-md-6 col-sm-12 col-12 mb-3 d-flex flex-row align-items-center justify-content-center justify-content-md-end">
                    <a
                        href="https://intercom.help/ternoa/fr/collections/2774679-legal"
                        target="_blank"
                        rel="noopener"
                        className={style.FooterLink}
                    >
                        Terms
                    </a>
                    <a
                        href="https://intercom.help/ternoa/fr/collections/2774679-legal"
                        target="_blank"
                        rel="noopener"
                        className={style.FooterLink}
                    >
                        Privacy
                    </a>
                </div>
                <div className="d-none d-md-block col-md-6 mb-3 d-flex flex-row align-items-center justify-content-left">
                    <p className={style.FooterCopyright}>© 2021 Ternoa Bridge developed and designed by ternoa.com. All rights reserved.</p>
                </div>
                <div className="d-md-none col-sm-12 col-12 mb-3 d-flex flex-row align-items-center justify-content-center">
                    <p className={style.FooterCopyright}>© 2021 Ternoa Bridge. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;