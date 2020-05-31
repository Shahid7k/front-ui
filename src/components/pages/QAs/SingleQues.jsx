import React , {useEffect,useState} from 'react';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { authContext } from '../../../context/AuthContext';
import { alertContext } from '../../../context/AlertContext';
import axios from 'axios';
import { mode, condition } from '../../../utils/theme';
import { answer } from '../../../requests/ques';

const initialQuesState={
    title:'',
    body:'',
    tags:'',
    answers:[],
    postedBy:'',
    created:'',
    satisfied:false,
    showAnswers:false,
    showAnsBox:false,
    answer:''
}

const SingleQues = () =>{
    const history=useHistory()
    let props = useParams();
    const userId = React.useContext(authContext).userAuth.user._id;
    
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
      const showAnswerBox = () =>{
          fetchQues({...quesState,showAnsBox:true})
      }

      const handleChange=(name)=>(e)=>{
        //   const name=e.target.name;
          const value=e.target.value
          fetchQues({...quesState,[name]:value})
      }
        const { addAlert } = React.useContext(alertContext);

      const submitAnswer= async (e)=>{
          e.preventDefault();
          
          const response = await answer(userId,quesId,{answer:quesState.answer})
          console.log("RESPONSE",response);
          if (response.data) {
             addAlert('Your answer is successfully submitted .', 'success');
                fetchQues({...quesState,answer:'',answers:response.data.answers})
          } else if (response.error) {
            addAlert(response.error.data.error, 'danger');
          }

      }
      const {title,tags,body,answers,postedBy,created,satisfied,photoURL} = quesState;
      
      console.log("ANSWERS ARRAY : ",answers)
    
      return (
        <div className={`${condition?"bg-dark":"bg-mint-cream"}`}>
            <div className='container'>
                <button className={`btn btn-raised btn-outline-primary m-1 `} 
                // onClick={goBack}
                onClick={() =>history.goBack()}
                style={mode}>
                    <i className='fas fa-angle-left mr-2' />
                    Back
                </button>
            </div>
           <div className="mx-5 p-5 container ">
               <h1 className=" font18 p-2 container mx-5 px-5" style={mode}>{title}.</h1>
                <div className="d-flex">
                    <div 
                    className="   container px-5 mx-5 my-0"
                    >
                           
                        <div className=" p-5" style={mode}>
                                <NavLink to={`/profile/${postedBy._id}`} className="h6 font-italic">asked by - {postedBy.userName} </NavLink>
                                <div className="text-muted p-3 h5" > {"Tags : "} {tags}</div>
                                <div className="font12">
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
                                <div>
                                    <div className={`btn  ${condition?"btn-dark": "btn-info"}`}  onClick={showAnswerBox}>Answer this Question</div>
                                </div>
                        </div>

                        <div className=" m-3 p-2 container" style={mode}  >
                            {quesState.showAnsBox && 
                                <div className="form">
                                    <textarea type="text" className="form-control" rows="4" style={mode} name="answer" value={quesState.answer} onChange={handleChange("answer")} placeholder="Start writing your answer here" />
                                    <button className="btn btn-primary m-2" onClick={submitAnswer}> Submit Answer!</button>
                                    <hr/>
                                </div>
                            }


                            <div className="btn-link text-center" onClick={toggleAnswers}>
                                Show All Answers!
                            </div>
                            {quesState.showAnswers && (quesState.answers.length!==0) && (
                                
                                    quesState.answers.map((x,i) =>(<div key={i} className="p"> 
                                         <div key={i}   className="p-4 d-flex">
                                            <div className="comment-photo rounded-circle">	
                                            {(x!==null && x!==undefined)?(<NavLink to= {`/profile/${x.postedBy._id}`} >
                                                    <img src={`http://localhost:8080/user/photo/${x.postedBy._id}`} alt="Face"
                                                    onError={i=>(i.target.src="https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon-715x715.png")}
                                                    className="comment-photo rounded-circle"/>
                                                </NavLink>):(<p> Anonymous!</p> )}
                                            </div>
                                            <div className="be-comment-content  m-1">
                                                
                                                    <div className=" mx-1 h6 font11 d-inline-block "  >
                                                        <NavLink to= {`/profile/${x.postedBy._id}`} style={mode} >{x.postedBy.firstName}</NavLink>
                                                        </div>
                                                    <div className="comment-time mx-5 d-inline-block"  >
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
                                                    </div>

                                                <p className="comment-text " style={mode}>
                                                    {x.text}
                                                </p> 
                                            </div>
                                        </div>
                                    
                                    
                                     </div> ))
                              
                            )}
                            {(quesState.showAnswers && quesState.answers.length===0 && <div className="h4 p-3"> No Answers Yet. Wanna be the first one to answer? Click <span  onClick={showAnswerBox} className="pointer underline ">here</span> </div>)}
                        </div>

                    </div>
                    
                    <div className=" text-center my-5 py-5 font11">
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
