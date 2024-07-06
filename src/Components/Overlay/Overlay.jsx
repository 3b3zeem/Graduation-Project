import "./Overlay.css";
import React from "react";
import { MdOutlineClose } from "react-icons/md";

function Overlay({isOpen,onClose,children}){
    return(
        <>{isOpen ?(
        <div className="overlay">
            <div className="overlay-background" >
                <div className="overlay-container">
                <div className="cloase">
                    <div className="icon" id="closeoverlay" onClick={onClose}>
                        <MdOutlineClose className="img"/>
                    </div>
                </div>
                {children}
                </div>
            </div>
        </div>
        ):null}
    </>
    );
};
export default Overlay;
