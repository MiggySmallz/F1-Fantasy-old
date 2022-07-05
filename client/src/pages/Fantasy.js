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
  // const [currentBudget, setCurrentBudget] = useState(budget / 100000000*100);

  const currentBudget = budget / 100000000*100;

  const [driverBtn, setDriverBtn] = useState("btnOn");
  const [constructorBtn, setConstructorBtn] = useState("btnOff");

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

  // const [drivers2, setDrivers2] = useState([
  //   {driver: 'Lewis Hamilton', driverImg: Hamilton, key:1, cost: 30000000},
  //   {driver: 'Alexander Albon', driverImg: Albon, key:2, cost: 7600000},
  //   {driver: 'Carlos Sainz', driverImg: Sainz, key:3, cost: 17200000},
  //   {driver: 'Charles Leclerc', driverImg: Leclerc, key:4, cost: 18800000},
  //   {driver: 'Daniel Ricciardo', driverImg: Ricciardo, key:5, cost: 13500000},
  //   {driver: 'Esteban Ocon', driverImg: Ocon, key:6, cost: 12300000},
  //   {driver: 'Fernado Alonso', driverImg: Alonso, key:7, cost: 12400000},
  //   {driver: 'George Russell', driverImg: Russell, key:8, cost: 23800000},
  //   {driver: 'Guanyu Zhou', driverImg: Zhou, key:9, cost: 8400000},
  //   {driver: 'Kevin Magnussen', driverImg: Magnussen, key:10, cost: 6100000},
  //   {driver: 'Lance Stroll', driverImg: Stroll, key:11, cost: 9100000},
  //   {driver: 'Lando Norris', driverImg: Norris, key:12, cost: 15700000},
  //   {driver: 'Max Verstappen', driverImg: Verstappen, key:13, cost: 30400000},
  //   {driver: 'Mick Schumacher', driverImg: Schumacher, key:14, cost: 6200000},
  //   {driver: 'Nicholas Latifi', driverImg: Latifi, key:15, cost: 6700000},
  //   {driver: 'Pierre Gasly', driverImg: Gasly, key:16, cost: 13000000},
  //   {driver: 'Sebastian Vettel', driverImg: Vettel, key:17, cost: 11600000},
  //   {driver: 'Sergio Perez', driverImg: Perez, key:18, cost: 18400000},
  //   {driver: 'Valtteri Bottas', driverImg: Bottas, key:19, cost: 9600000},
  //   {driver: 'Yuki Tsunoda', driverImg: Tsunoda, key:20, cost: 8300000}
  // ]);

  const [constructors, setConstructors] = useState([
    // {constructor: 'Red Bull', constructorImg: "https://f1-driver-images.s3.us-east-2.amazonaws.com/Lewis_Hamilton.png", id:1, cost: 30000000}
    
  ]);

  const [drivers, setDrivers] = useState([])

  const [teamList, setTeamList] = useState([])

  const [hasConstructor, setHasConstructor] = useState(false)

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

  const saveTeam = () => (
    console.log(teamList)
  )


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
  .then(data => {setDrivers(data["driverList"]); setConstructors(data["constructorList"])})
  .then(console.log(drivers));
  }

  useEffect(() => {
   
    getDrivers()
    
  }, [])


  return (
    <div className='container-fantasy'>
      <div className='budget'>Budget:<ProgressBar className='progressBar'  variant="success" now={currentBudget} /*label={`${budget}`}*//>${convertBudget(budget)}</div>
      <div className='break'></div>
      
      <div className='teamList'>
          { teamList.sort((a, b) => a.id > b.id ? 1 : -1).map((item) =>{
            if (item.driverImg != null){
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
            // return(
            //   <div onClick={() => removeDriver(item)} className='item-container'>
            //     <img className='driverImg' src={icon} width="500" height="600"></img>
            //     <div className='driverTitle'>
            //       {item.driver}
            //     </div>
            //   </div>
            // )
          })}
          <div className="selectorButtons">
            <button className="saveTeamButton" onClick={() => saveTeam()} >Save Team</button>
          </div>
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
    
    
    
  );

  

}


export default Fantasy