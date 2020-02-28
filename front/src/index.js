import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const Page = () => {
  const [state,setState] = useState({
    text:"This is text",
    jokes:[],
    firstname:"Chatchart",
    lastname: "Sittipunt",
    number: "1",
    outputNumber:"1",
    outputName: "Chatchart",
    error:null,
    isLoaded:null
  });
  const [count,setCount] = useState(0);
  const API_LINK ="https://api.icndb.com/jokes/random";
  useEffect(() =>
  {fetch(API_LINK + "/" + state.number +"?firstName="+state.firstname+"&lastName="+state.lastname)
  .then(res => res.json())
      .then(
          (result) =>
          {
            setState({...state, jokes: result.value,isLoaded:true});
          },
          (error) => 
          {
            setState({...state,error:error,isLoaded:true})
          }
      )}
  ,[count])
  const jokelist =state.jokes.map((joke)=>
  <li key={joke.id}>
    {joke.joke.replace(/&quot;/g,'"')}
  </li>
);
  if(state.error){
    return <div>Error: {state.error.message}</div>;
  } else if (!state.isLoaded) {
    return <div>Loading...</div>;
  }return(
    <div id="joke">
      <p>you click button {count} times</p>
      Firstname: <input type="text" value={state.firstname} onChange={(e) => setState({...state,firstname:e.target.value})}/><br/>
      Lastname: <input type="text" value={state.lastname} onChange={(e) => setState({...state,lastname:e.target.value})}/><br/>
      Number of jokes: <input type="number" min="1" max="10" value={state.number} 
      onChange={(e) => {
        const num = e.target.value
        if(num<=10 && num>0){
          setState({...state,number:num});
        }else if(num>10){
          setState({...state,number:"10"});
        }else{
          setState({...state,number:"1"});
        }
      }
      }/>
      <button onClick={() => {
        setCount(count+1);
        setState({...state,isLoaded:null,outputNumber:state.number,outputName:state.firstname})
        }}>
        Click ME!!!
      </button>
  <h1>Here is your {state.outputNumber} {state.outputName} joke{state.outputNumber>1 && "s"}</h1>
      <ul>
        {jokelist}
      </ul>
    </div>
  )
}
ReactDOM.render(<Page/>,document.getElementById('root'));