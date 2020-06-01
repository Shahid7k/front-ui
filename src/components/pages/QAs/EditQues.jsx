import React , {useEffect,useState} from 'react';
import { useParams, useHistory, NavLink, Redirect } from 'react-router-dom';
import { authContext } from '../../../context/AuthContext';
import { alertContext } from '../../../context/AlertContext';
import { mode, condition } from '../../../utils/theme';
import {getQuesClient,editQuestion} from '../../../requests/ques';
import axios from 'axios';
import no_image from '../../../images/no_image.jpg'



  
const validatorInititalState = {
    title: {
      error: false,
      hasError: (title) => ( (title.trim().length < 4 || title.trim().length >150)   ),
      message: 'Please write a title of your question with 7-150 characters',
    },
  
    body: {
      error: false,
      hasError: str => ((str.trim().length < 10) || (str.trim().length >2000)   ),
      message: 'Problem description must have 10-2000 characters',
    },
  
    tags: {
        error: false,
        hasError: str => ((str.trim().length < 3) || (str.trim().length >150)   ),
        message: 'Please add Tags within 3-150 characters',
    }
  };


const EditQues =()=>{
    let props = useParams();
    
    const { quesId } = props;
    const initialQuesState={
        title:'',
        body:'',
        tags:'',
        answers:[],
        postedBy:'',
        created:'',
        satisfied:false,
        photo:'',
        photoURL:("http://localhost:8080/qa/photo/"+quesId)||"https://lh3.googleusercontent.com/-Y2yb7fEEWGk/XtN3xsDvReI/AAAAAAAACyE/BSPh9_T_ow411IOXpKWMcgBP4DbAyJL3ACK8BGAsYHg/s0/2020-05-31.png"
    }
    const history=useHistory()
    const { addAlert } = React.useContext(alertContext);
    const [quesState,fetchQues]=useState({...initialQuesState});
    const userId = React.useContext(authContext).userAuth.user._id;
    const [formDataValidator, setFormDataValidator] = useState({
        ...validatorInititalState,
      });
    const [edited,setEditState] = useState(false);

    useEffect(() => {
        try{
            async function getData() {
                console.log("RESULT OFF ")
                fetchQues({ ...quesState, loading: true });
                const result = await getQuesClient(quesId);
                console.log("RESULT ",result)
                const {title,body,tags,answers,postedBy,created,satisfied} =result.data
                fetchQues({ ...quesState, title,body,tags,answers,postedBy,created,satisfied,photo,loading: false });
              }
              getData()
        }
        catch(err){
            console.log("ERROR : ",err)
        }
      }, []);

    const handleValidatorChange = e => {
        console.log("REACHED!")
        const value = quesState[e.target.name];
        const currValidator = { ...formDataValidator[e.target.name] };
        console.log('val', value," currVal ",currValidator);
        currValidator.error = currValidator.hasError(value);
        console.log('val', value," currVal ",currValidator);
        setFormDataValidator({
            ...formDataValidator,
            [e.target.name]: currValidator,
        });
    };



      const handleChange  = (e) =>{
        
        const name=e.target.name
        if(name==="photo" && e.target.files[0]===undefined) return; 
        const value= name==="photo"?e.target.files[0]:e.target.value
        const fileSize= name==="photo"?e.target.files[0].size:0;
        console.log("Name : -",name,"-VALUE",value)
        fetchQues({...quesState,[name]:value,fileSize})
      
        if(name==="photo"){
            let reader = new FileReader();
            let file= e.target.files[0];
            reader.onloadend = () => {
                fetchQues({...quesState,
                    "photo": file,
                    photoURL: reader.result
                });
            }
            reader.readAsDataURL(file)
        }
    }
      
      const {title,body,tags,photoURL,photo,fileSize,satisfied} = quesState;

      const submit = async (e)=>{
        e.preventDefault();
        if(fileSize>3000092){
            alert("Image size cannot be more than 3 MB");
            return;
        }
        const question=new FormData();
        question.append("title",title);
        question.append("body",body);
        question.append("tags",tags);
        question.append("photo",photo);
        question.append("satisfied",satisfied)
        console.log("title:",title)
        console.log("tags:",tags)
        console.log("body:",body)
        console.log("photo:",photo)

        console.log("FORMDATA : ",JSON.stringify(question))
        const response = await editQuestion(quesId,question);
        console.log("RESPONSE-EDIT",response);
        if (response.data) {
            addAlert('Question edit changes applied!', 'success');
            setTimeout(() => {
                setEditState(true)
            }, 1000); 
          
        } else if (response.error) {
          addAlert(response.error.data.error, 'danger');
        }


      }
      const toggleSatisfied=()=>{
            fetchQues({...quesState,"satisfied":!quesState.satisfied})
      }
    
    if(edited) return <Redirect to='/allqa'  />
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
            <form onSubmit={submit} encType="multipart/form-data" >
                <div className="mx-5">
                <button className="btn mr-3 btn-info mx-5" data-toggle="tooltip" onClick={toggleSatisfied} data-placement="bottom" title="To mark as Solved..Go to Edit and check on Solved!">
                Mark as {satisfied? " Unsolved":" Solved."}
                </button> 
                </div>
            <div className="p-2 container mx-5 px-5" >
           <label >Title</label>
           <input type="text" className={`${formDataValidator.title.error?"border-danger":""} font18 text-justify ${condition?"bg-darker text-white":""} `}  name="title" onChange={handleChange} onBlur={handleValidatorChange} value={title}/>
            {formDataValidator.title.error && (
                <span className="errorMsg font09 font-weight-light ">
                    {formDataValidator.title.message}
                </span>
            )}   
           </div>
            <div className="d-flex">
            <div 
            className="   container px-5 mx-5 my-0"
            >
                    
                <div className=" p-5" style={mode}>
                        <div className="text-muted p-3 h5" > 
                            <label>Tags : </label>
                            <input type="text"  className={`${formDataValidator.tags.error?"border-danger":""}`}  name="tags" onChange={handleChange} onBlur={handleValidatorChange}  value={tags}/>
                            {formDataValidator.tags.error && (
                                <span className="errorMsg font09 font-weight-light ">
                                    {formDataValidator.tags.message}
                                </span>
                            )}  
                        </div>
                        <textarea  className="font12 my-4" rows="5"   name="body" onChange={handleChange} onBlur={handleValidatorChange} value={body}/>
                        {formDataValidator.body.error && (
                            <span className="errorMsg font09 my-0 font-weight-light">
                                {formDataValidator.body.message}
                            </span>
                        )}
                        <br/>
                        {/* <a href={photoURL} target="_blank" className="figure text-wrap"  >   */}
                            { quesState.photoURL  && <img src={photoURL} className="figure-img rounded"
                                onError={i=>( (i.target.src=no_image))}
                                style={{height:"120px",width:"auto"}}    
                            />}
                            <input 
                            type="file" 
                            name="photo"
                            onChange={handleChange} 
                            className="form-control w-50"
                            accept="image/*"
                            />
                        {/* </a> */}
                        
                        <hr />
                        
                         
                        <div className="container m-4">
                            <input type="submit" className="btn btn-raised btn-warning" value="Save Changes"/>
                        </div>
                        
                       
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
           
            </form>   
        </div>
        </div>
    );
}


export default EditQues;