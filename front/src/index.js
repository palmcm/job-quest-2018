import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const Page = () => {
  const [state,setState] = useState({
    text:"This is text",
    jokes:[],
    firstname:"Chatchart",
    lastname: "Sittipunt",
    number: "2",
    error:null
  });
  const [count,setCount] = useState(0);
  const API_LINK ="https://api.icndb.com/jokes/random";
  useEffect(() =>
  {fetch(API_LINK + "/" + state.number +"?firstName="+state.firstname+"&lastName="+state.lastname)
  .then(res => res.json())
      .then(
          (result) =>
          {
            setState({...state, jokes: result.value});
          },
          (error) => 
          {
            setState({...state,error:error})
          }
      )}
  ,[count])
  const jokelist =state.jokes.map((joke)=>
  <li key={joke.id}>
    {joke.joke}
  </li>
);
  if(state.error){
    return <div>Error: {state.error.message}</div>;
  }
  return(
    <div id="joke">
      <p>you click button {count} times</p>
      <input type="text" value={state.number} onChange={(e) => setState({...state,number:e.target.value})}/>
      <button onClick={() => {setCount(count+1)}}>
        Click ME!!!
      </button>
        <h1>{state.number}</h1>
      <ul>
        {jokelist}
      </ul>
    </div>
  )
}
ReactDOM.render(<Page/>,document.getElementById('root'));