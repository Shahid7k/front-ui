import React , {useEffect,useState} from 'react';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import axios from 'axios';
import { mode, condition } from '../../../utils/theme';

const initialQuesState={
    title:'',
    body:'',
    tags:'',
    answers:[],
    postedBy:'',
    created:'',
    satisfied:false,
    showAnswers:false
}

const SingleQues = () =>{

    let props = useParams();
    const { quesId } = props;
    const [quesState,fetchQues]=useState({...initialQuesState});
    // console.log("ID: ",quesId)
    // let photoURL="";

    useEffect(() => {
        async function getData() {
          fetchQues({ ...quesState, loading: true });
          const result = await axios.get('http://localhost:8080/qa/' + quesId);
        //   console.log(result.data)
          const {title,body,tags,answers,postedBy,created,satisfied,photo} =result.data
          fetchQues({ ...quesState, title,body,tags,answers,postedBy,created,satisfied,photoURL:"http://localhost:8080/qa/photo/"+quesId,loading: false });
        }
        getData()
      }, []);

      const toggleAnswers= () => {
        fetchQues({...quesState,showAnswers:!quesState.showAnswers})

      }

      const {title,tags,body,answers,postedBy,created,satisfied,photoURL} = quesState;
    return (
        <div className={`${condition?"bg-dark":"bg-mint-cream"}`}>
           <div className="mx-5 p-5 ">
               <h1 className=" p-2" style={mode}>{title}.</h1>
                <div className="d-flex">
                    <div 
                    className="  container p-5 m-5"
                    >
                           
                        <div className=" p-5" style={mode}>
                                <NavLink to={`/profile/${postedBy._id}`} className="h6 font-italic">asked by - {postedBy.userName} </NavLink>
                                <div className="text-muted p-3 h5" > {"Tags : "} {tags}</div>
                                <div className="h4">
                                    {body}
                                </div>
                               <a href={photoURL} target="_blank" className="figure text-wrap"  >  
                                    <img src={photoURL} className="figure-img rounded"
                                        onError={i=>( (i.target.src=""))}
                                        style={{height:"120px",width:"auto"}}    
                                    />
                                <p className="figure-caption">Click to open</p>
                                </a>
                                <hr />
                                <p className={` ${satisfied?"text-success":"text-danger"}`}>{satisfied?(<><i className='fa fa-check m-1' aria-hidden='true'></i>Solved</>):(<><i className='fa fa-times m-1' aria-hidden='true'></i>Not Solved</>)}</p>

                        </div>

                        <div className=" m-3 p-2 container" style={mode}  >
                            <div className="btn-link text-center" onClick={toggleAnswers}>
                                Show All Answers!
                            </div>
                            {quesState.showAnswers && (
                                
                                    quesState.answers.map((x,i) =>(<p key={i}> 
                                         <div key={i}   className="p-4 d-flex">
                                            <div className="comment-photo rounded-circle">	
                                            {(x!==null && x!==undefined)?(<NavLink to= {`/profile/${x.postedBy._id}`} >
                                                    <img src={`http://localhost:8080/user/photo/${x.postedBy._id}`} alt="Face"
                                                    onError={i=>(i.target.src="https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon-715x715.png")}
                                                    className="comment-photo rounded-circle"/>
                                                </NavLink>):(<p>Anonymous!</p>)}
                                            </div>
                                            <div className="be-comment-content p-1">
                                                
                                                    <span className=" p-1" style={{color:"red"}} >
                                                        <NavLink to= {`/profile/${x.postedBy._id}`} style={mode} >{x.postedBy.userName}</NavLink>
                                                        </span>
                                                    <span className="be-comment-time px-2" style={{background:"rgba(1,22,22,0.4)"}} >
                                                        <i className="fa fa-clock-o"></i>
                                                        {x.created.substring(0,10)}{" , "}{x.created.substring(11,19)} {" (GMT)"}
                                                    {/* { (isAuthenticated().user && isAuthenticated().user._id===x.postedBy._id &&
                                                            <div className="d-inline-block">
                                                                <img src="https://toppng.com/uploads/preview/delete-button-clipart-volume-icon-hapus-11563950527luvjbpuej2.png"
                                                                alt="delete" 
                                                                style={{height:"30px",width:"30px"}} 
                                                                onClick={()=>this.deleteAns(x)}
                                                                />
                                                            </div>
                                                        )}                  Here... Write the code for allowing only the person who answered to delete their answer.                              */}
                                                    </span>

                                                <p className="comment-text font12" style={mode}>
                                                    {x.text}
                                                </p>
                                            </div>
                                        </div>
                                    
                                    
                                     </p>))
                              
                            )}
                        </div>

                    </div>
                    
                    <div className=" text-center my-5 py-5">
                        Things <br />
                        Things <br />
                        Things <br />
                        Things <br />
                        Things <br />
                        Things <br />
                    </div>
                </div>
           </div>
        </div>
    );

}


export default SingleQues;
