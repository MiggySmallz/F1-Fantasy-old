import React, {useState, useEffect, useRef} from 'react'
import {ProgressBar} from "react-bootstrap"
// import { StyleSheet, Text, View, TextInput} from 'react-native'
import "./Fantasy.css"
import Hamilton from '../images/Lewis_Hamilton.png'
import Albon from '../images/Alexander_Albon.png'
import Sainz from '../images/Carlos_Sainz.png'
import Leclerc from '../images/Charles_Leclerc.png'
import Ricciardo from '../images/Daniel_Ricciardo.png'
import Ocon from '../images/Esteban_Ocon.png'
import Alonso from '../images/Fernado_Alonso.png'
import Russell from '../images/George_Russell.png'
import Zhou from '../images/Guanyu_Zhou.png'
import Magnussen from '../images/Kevin_Magnussen.png'
import Stroll from '../images/Lance_Stroll.png'
import Norris from '../images/Lando_Norris.png'
import Verstappen from '../images/Max_Verstappen.png'
import Schumacher from '../images/Mick_Schumacher.png'
import Latifi from '../images/Nicholas_Latifi.png'
import Gasly from '../images/Pierre_Gasly.png'
import Vettel from '../images/Sebastian_Vettel.png'
import Perez from '../images/Sergio_Perez.png'
import Bottas from '../images/Valtteri_Bottas.png'
import Tsunoda from '../images/Yuki_Tsunoda.png'

function Fantasy(){

  
  const [budget, setBudget] = useState(100000000);
  const [constructors, setConstructors] = useState([]);
  const [constructorsNoChange, setConstructorsNoChange] = useState([]);
  const [constructorBtn, setConstructorBtn] = useState("btnOff")
  const [drivers, setDrivers] = useState([])
  const [driversNoChange, setDriversNoChange] = useState([])
  const [driverBtn, setDriverBtn] = useState("btnOn")
  const [hasConstructor, setHasConstructor] = useState(false)
  const [teamList, setTeamList] = useState([])
  const [teamName, setTeamName] = useState("")
  const[teamSaved, setTeamSaved] = useState(1)
  const[usersTeams, setUsersTeams] = useState([])

  const currentBudget = budget / 100000000*100;

  function convertBudget(value)
  {
    if(value>=1000000)
    {
        value=(value/1000000)+"M"
    }
    else if(value>=1000)
    {
        value=(value/1000)+"K";
    }
    return value;
  }

  const addDriver = (info) =>{
    if (((teamList.length<5 && hasConstructor===false) || (teamList.length<6 && hasConstructor===true)) && budget-info.cost>0){
      return(
        setTeamList([...teamList, info]),
        setDrivers(drivers.filter(item => item.driver !== info.driver)),
        setBudget(budget-info.cost)
        // console.log(teamList)
        )
      }     
  }

  const addConstructor = (info) =>{
    if (teamList.length<6 && budget-info.cost>0 && hasConstructor===false){
      return(
        setTeamList([...teamList, info]),
        setConstructors(constructors.filter(item => item.constructor !== info.constructor)),
        setBudget(budget-info.cost),
        setHasConstructor(true)
        // console.log(teamList)
        )
      }     
  }

  const removeDriver = (info) => (
    setTeamList(teamList.filter(item => item.driver !== info.driver)),
    setDrivers([...drivers, info]),
    setBudget(budget+info.cost)
  )

  const removeConstructor = (info) => (
    setTeamList(teamList.filter(item => item.constructor !== info.constructor)),
    setConstructors([...constructors, info]),
    setBudget(budget+info.cost),
    setHasConstructor(false)
  )

  async function saveTeam() {
    console.log(teamList)
    const response = await fetch("http://localhost:5000/saveTeam", {
    method: 'POST', 
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': 'http://localhost:5000/'
    },
    body: JSON.stringify({team:teamList, budget:budget, token:localStorage.getItem('token'), teamName: teamName}) // body data type must match "Content-Type" header
  })
  .then(response => {response.json(); setTeamSaved(true)})
  // .then(data => setTeamList(data))
  // console.log(teamList)
  }


  async function getDrivers() {
    const response = await fetch("http://localhost:5000/driversInfo", {
    method: 'POST', 
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': 'http://localhost:5000/'
    },
    body: JSON.stringify({}) // body data type must match "Content-Type" header
  })
  .then(response => response.json())
  .then(data => {setDrivers(data["driverList"]); setConstructors(data["constructorList"]); setDriversNoChange(data["driverList"]); setConstructorsNoChange(data["constructorList"]);})
  // .then(console.log(drivers));
  }

  async function getUsersTeams() {
    const response = await fetch("http://localhost:5000/getUsersTeams", {
    method: 'POST', 
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': 'http://localhost:5000/'
    },
    body: JSON.stringify({token:localStorage.getItem('token')}) // body data type must match "Content-Type" header
  })
  .then(response => response.json())
  .then(data => {setUsersTeams(data["teamList"]); console.log(usersTeams)})
  }



  useEffect(() => {
   
    getDrivers();
    getUsersTeams();
    setTeamSaved(false);
  }, [teamSaved])
  
  const handleOnClick = () =>{
    if (teamName == ""){
      alert("Team Name is Empty")
    }
    else{
      saveTeam()
    }
    
  }

  const addToTeamList = (team) => {
    setTeamList(team)

    setDrivers(driversNoChange)
    setConstructors(constructorsNoChange)
    
    let newDriversList = driversNoChange;
    let newConstructorsList = constructorsNoChange;
    let newDriversListFiltered = [];
    let newConstructorsListFiltered = [];
    let isConstructor = false

    // console.log(newDriversList.driver)
    // console.log(newConstructorsList[0].constructor)

    for (let i = 0; i < team.length; i++){
      if (team[i]["driver"] != undefined){
        // console.log(driversListNoChange)
        // console.log(newDriversList)
        newDriversListFiltered = newDriversList.filter(item => item.driver !== team[i]["driver"])
      }
      else{
        // console.log(constructors)
        // console.log(newConstructorsList)
        newConstructorsListFiltered = newConstructorsList.filter(items => items.constructor !== team[i]["constructor"])
        isConstructor = true
      }
      newDriversList = newDriversListFiltered
    }
    newConstructorsList = newConstructorsListFiltered
    
    if (isConstructor == true){
      setConstructors(newConstructorsList)
    }

    setDrivers(newDriversList)
    

    

  }

  return (
    <div className="container-fantasy">
      <div className="teams">
        <p className="teamTitle">
          Team
        </p>
        <div>
          {
            Object.keys(usersTeams).map(function(key, index) {
              return(
                <div onClick={() => addToTeamList(usersTeams[key])} className='item-container'>{key}</div>
              )
            })
          }
        </div>
      </div>
      <div className='container-team-select'>
        <div className='budget'>Budget:<ProgressBar className='progressBar'  variant="success" now={currentBudget} /*label={`${budget}`}*//>${convertBudget(budget)}</div>
        <div className='break'></div>
        <div className='teamList'>
            <div className="teamNameInput">
              <input onChange={e => setTeamName(e.target.value)} placeholder="Enter team name:"></input>
              <button  onClick={() => handleOnClick()} >Save Team</button>
            </div>
            { teamList.sort((a, b) => a.id > b.id ? 1 : -1).map((item) =>{
              if (item.driver != null){
                return(
                  <div onClick={() => removeDriver(item)} className='item-container'>
                    <img className='driverImg' src={item.driverImg} width="500" height="600"></img>
                    <div className='driverTitle'>
                      {item.driver}
                    </div>
                    <div className='priceLabelDiv'>
                      <p className='priceLabel'>${convertBudget(item.cost)}</p>
                    </div>
                  </div>                
                )
              }
              else{
                return(
                  <div onClick={() => removeConstructor(item)} className='item-container'>
                    <img className='constructorImg' src={item.constructorImg} width="500" height="600"></img>
                    <div className='driverTitle'>
                      {item.constructor}
                    </div>
                    <div className='priceLabelDiv'>
                      <p className='priceLabel'>${convertBudget(item.cost)}</p>
                    </div>
                  </div>
                )
              }
            })}

        </div>
        <div className='break-column'></div>
        <div className='teamList'>
        <div className="selectorButtons">
          <button id={driverBtn} className="selectorButton" onClick={() => {setDriverBtn((driverBtn) => (driverBtn === "btnOff" ? "btnOn" : "btnOff")); setConstructorBtn((constructorBtn) => (constructorBtn === "btnOn" ? "btnOff" : "btnOn"))}} >Drivers</button>
          <button id={constructorBtn} className="selectorButton" onClick={() => {setConstructorBtn((constructorBtn) => (constructorBtn === "btnOff" ? "btnOn" : "btnOff")); setDriverBtn((driverBtn) => (driverBtn === "btnOn" ? "btnOff" : "btnOn"))}} >Constructors</button>
        </div>
            
            { (driverBtn === "btnOn")?
            (drivers.sort((a, b) => a.cost < b.cost ? 1 : -1).map((item) =>{

              return(
                <div onClick={() => addDriver(item)} className='item-container'>
                  
                  <img className='driverImg' src={item.driverImg} width="500" height="600"></img>
                  
                  <div className='driverTitle'>
                    {item.driver}
                  </div>

                  <div className='priceLabelDiv'>
                    <p className='priceLabel'>${convertBudget(item.cost)}</p>
                  </div>
                  
                </div>
              )
            }))
            :
            (constructors.sort((a, b) => a.cost < b.cost ? 1 : -1).map((item) =>{
              return(
                <div onClick={() => {addConstructor(item); console.log(item)}} className='item-container'>
                  
                  <img className='constructorImg' src={item.constructorImg} width="500" height="600"></img>
                  
                  <div className='driverTitle'>
                    {item.constructor}
                  </div>

                  <div className='priceLabelDiv'>
                    <p className='priceLabel'>${convertBudget(item.cost)}</p>
                  </div>
                  
                </div>
              )
            }))
            }
        </div>
        
      </div>
    </div>
    
    
    
  );

  

}


export default Fantasy