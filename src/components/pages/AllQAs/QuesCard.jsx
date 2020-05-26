import React from 'react';
import {mode} from '../../../utils/theme';
import { NavLink } from 'react-router-dom';

// const RR='/';
const QuesCard = ({ques}) =>{
    const bg=(ques.satisfied === true) ? "rgba(0,200,0,0.2)": (ques.answers.length===0)?"rgba(180,0,0,0.2)":"rgb(200,200,0,0.2)"
   
    return (
        <div className="card p-0 " style={mode} 
        // style={{background:`${ques.satisfied?"rgba(0,220,0,0.5)":"red"}`}} 
         >
             <div style={{background:bg}}>
                 
                <h5 className="card-header p-2" style={{background:bg}}>{ques.title}</h5>
                <div className="card-body p-2">
                    <h6 className="card-text text-muted p-0">{ques.tags.replace(/ /g,";")}</h6>
                    <p className="card-text p-0 text-truncate">{ques.body}</p>
                    <NavLink to='/' className='btn btn-info'>Read more...</NavLink>
                </div>
                {/* <img src={ques.photo} style={{height:"200px",width:"50%"}}  /> */}
                
             </div>
        </div>
    );
}

export default QuesCard;