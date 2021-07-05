import React,{useEffect , useState} from 'react';
import "./index.css"
import {Link} from "react-router-dom"

function Tablepage(props) {
    const [res,setRes] =useState();
    const [tab1,setTab1]=useState([]);
   const [comment,setComment] =useState([]);
    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/posts")
          .then(response => response.json())
          .then(res => setRes(res))
          
    },[])
    function Showpost(id){
        let arr =[];
        fetch(`https://jsonplaceholder.typicode.com/posts/`)
          .then(response => response.json())
          .then((res) => {
             arr = res.filter(ind => ind.userId == id )
           setTab1(arr)
           console.log(tab1)
            
          })
        
          
        
    }

    function Showcomment(id){
        let arr2 =[];
        fetch(`https://jsonplaceholder.typicode.com/comments/`)
          .then(response1 => response1.json())
          .then((res1) => {
              arr2= res1.filter(individual => individual.postId == id )
              setComment(arr2);
              
            
          })
          

          
        
          
        
    }
    function TD(){
        return(
            res && res.map(item =>{
                return (
                    <tr key={item.id}>
                        <td style={{cursor:'pointer'}} onClick={()=>Showpost(item.userId)}>{item.userId}</td>
                        <td style={{cursor:'pointer'}}  onClick={()=>Showcomment(item.id)}>{item.id}</td>
                        <td style={{cursor:'pointer'}}>{item.title}</td>
                        <td style={{cursor:'pointer'}}>{item.body}</td>
                    </tr>
                )
            })
        )
    }

    function clicker(){
        return(
            
               tab1 && tab1.map(tab =>{
                         return(
                             <tr>
                                 <td style={{cursor:'pointer'}}>{tab.userId}</td>
                                 <td style={{cursor:'pointer'}}>{tab.id}</td>
                                 <td style={{cursor:'pointer'}}>{tab.title}</td>
                                 <td style={{cursor:'pointer'}}>{tab.body}</td>
                             </tr>
                         )
                     })
            
        )
    }
  

    return (
        <>
        <Link to="/"><button style={{background:'black'}}>React Highchart page</button> </Link>
        
        <div style={{display:'flex'}}>

            <table style={{border:'2px solid black'}}>
            <caption>All post from https://jsonplaceholder.typicode.com/</caption>
                <thead>
                    <tr style={{cursor:'pointer',background:'black',color:'white'}}>
                        <td>UserId</td>
                        <td>Id</td>
                        {/* <td>Post</td> */}
                        <td>title</td>
                        <td>body</td>
                    </tr>
                </thead>
                <tbody>
                    {TD()}
                </tbody>
            </table>
            <div className='side-table'>
            <table style={{margin:'1em 2em 1em',border:'2px solid black'}}>
                <caption>specific User Posts</caption>
                <thead style={{background:'black',color:'white'}}>
                    <tr>
                    <td>UserId</td>
                    <td>id</td>
                    <td>title</td>
                    <td>body</td>
                    </tr>
                </thead>
                  {
                        clicker()       
                 }  
                </table>
                   

                  <table style={{margin:'1em 2em 1em',border:'2px solid black'}}>
                      <caption>Comments made by specific postId</caption>
                      <thead style={{background:'black',color:'white'}}>
                          <tr>
                              <td> postId</td>
                              <td> userId</td>
                              <td> body</td>
                              <td> email</td>
                              <td> name</td>
                          </tr>
                      </thead>
                      {
                          comment && comment.map(com =>{
                              return(
                                  <tr>
                                      <td>{com.postId}</td>
                                      <td>{com.id}</td>
                                      <td>{com.body}</td>
                                      <td>{com.email}</td>
                                      <td>{com.name}</td>
                                  </tr>
                              )
                          })
                      }
                  </table>
            
            </div>
        </div>
        </>
    );
}

export default Tablepage;