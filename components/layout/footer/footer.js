import React from 'react';

import styles from  './footer.module.css'

function Footer(){
    return (
        <div className={`${styles.positions}`}>
            <footer className={`footer mt-auto ${styles.footer}`}>
                <div className="container-fluid pt-3">
                    <div className="row">
                        <div className="col-5 col-md-2 order-1 order-md-1" style={{'color':'white'}}>
                            Prueba técnica
                        </div>
                        <div className={`d-flex col-12 col-md-6 order-3 order-md-2`}>
                            
                        </div>
                        <div className={`d-flex col-7 col-md-4 order-2 order-md-3 ${styles.footer_text}`}>
                            <span style={{fontSize:'12px',color:'white'}}>v 1.1.0</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
