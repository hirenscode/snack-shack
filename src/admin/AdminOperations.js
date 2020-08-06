import Header from "../shared/Header";
import AdminMainHeader from "./AdminMainHeader";
import {Link} from "react-router-dom";
import Footer from "../shared/Footer";
import React from "react";

const AdminOperations = ({match}) => {

    return <>
        <Header/>
        <main role="main" style={{position: "relative"}}>
            <AdminMainHeader/>
            <div className="container">
                <h2> Operations </h2>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"> Orders </h5>
                                <p className="card-text"> Maintain and Lookup Orders, an update will also notify users through their tracking medium. </p>
                                <Link to={`${match.url}/orders`} className="btn btn-primary">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-card-checklist"
                                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                              d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                        <path fill-rule="evenodd"
                                              d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                                    </svg> Go to Orders
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"> Add Menu </h5>
                                <p className="card-text"> Add New Menu Items with various parameters reflected to consumers.</p>
                                <Link to={`${match.url}/add-new-menu`} className="btn btn-primary">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-plus-square-fill"
                                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                              d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"/>
                                    </svg> Add Menu Item
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer/>
    </>
}

export default AdminOperations;
