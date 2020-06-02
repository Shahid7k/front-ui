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
                 
                <h5 className="card-header text-truncate p-2" style={{background:bg}}>{ques.title}</h5>
                <div className="card-body p-2">
                    <h6 className="card-text text-muted p-0">{ques.tags.trim().split(" ").map((x,i)=><div key={i} className="badge badge-dark my-0 mx-1 py-0 px-1 font08 arrow" >{x.trim()}</div>)}</h6>
                    <p className="card-text p-0 text-truncate">{ques.body}</p>
                    <NavLink to={`/question/${ques._id}`} className='btn btn-info'>Read more...</NavLink>
                </div>
                {/* <img src={ques.photo} style={{height:"200px",width:"50%"}}  /> */}
                
             </div>
        </div>
    );
}

export default QuesCard;