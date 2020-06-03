import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = ( ) => {
    return (
        <footer className="bg-dark  text-light footer">
            <div className="p-2 container d-flex">
            <div className="text-left flex-fill px-1font-weight-light"> <span className="megrim font-weight-bold"> DeVlog </span> <code className="font-weight-bold">version 1.0</code> </div>
            <div className="text-center flex-fill ">
                <div className="text-right  d-inline-block mx-1  text-capitalize">Contact us :</div>
                <a href="mailto:someone@example.com" className="text-center  d-inline-block mx-1 ">
                    <i className="fa fa-envelope" aria-hidden="false" data-toggle="tooltip" data-placement="top" title="OurMailID will show up here!" ></i>
                    {/* Mail     */}
                </a>
                <a href="#OurFaceBookPage" className="text-center  p-0 d-inline-block mx-1 ">
                    <i className="fa fa-facebook" aria-hidden="true"></i>    
                    {/* Facebook */}
                </a>
                <a href="#OurInstaPage" className="text-center  d-inline-block mx-1 ">
                    <i className="fa fa-instagram" aria-hidden="true"></i>   
                    {/* Instagram  */}
                </a>
            </div>
            {/* <div className="text-center p-0  flex-fill ">
                {"_ _ _"}
            </div> */}
            </div>
            <div>
            <button className="btn btn-link text-light"  type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                About Us or some Heading like that.
            </button>
            <div className="collapse" id="collapseExample">
            <div className="card card-body bg-dark text-light">
                Here... We will write who and what we are.. and why we did this project and what it means to us or something like that coz even you know that I wrote all this just to fill up some text in this region
            </div>
            </div>
            <div style={{background:"rgba(255,255,255,0.1)"}}>
                <code style={{color:"white"}}>Copyrights (c) 2020 @ projects.DeVlog</code>
            </div>
            </div>


        </footer>

    );
}

export default Footer;