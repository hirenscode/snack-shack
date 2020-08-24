import React from "react";

const InstallationToast = () => {
    return <div aria-live="polite" aria-atomic="true" style={{position: "relative", minHeight: "200px"}}>
        <div className="toast" style={{position: "absolute", top: "0", right: "0"}}>
            <div className="toast-header">
                <img src="..." className="rounded mr-2" alt="..."/>
                    <strong className="mr-auto">Install the app?</strong>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>
            <div className="toast-body">
                <button type="button" className="btn btn-primary btn-sm"> Yes</button>
            </div>
        </div>
    </div>
}

export default InstallationToast;
