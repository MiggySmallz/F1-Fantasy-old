import React, {useState, useEffect, useRef} from 'react'

function Stats(){

  const [data, setData] = useState("")
  const didMount = useRef(false);
  const [img, setImg] = useState();
  const [selected, setSelected] = React.useState("Race");
  const [selectedRaces, setSelectedRaces] = useState([]);
  const [selectedRaceType, setSelectedRaceType] = useState("Race");
  const [selectedYear, setSelectedYear] = useState();

  const year = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"];


  let type = null;
  let options = null;
  let yearOptions = null;

  useEffect(() => {
    if (!didMount.current) {
      // getApi();
      // getPic();
      // getRaces();
      didMount.current = true;
      return;
    }
  },[img])

  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  };

  const changeSelectYearOptionHandler = (event) => {
    setSelectedYear(event.target.value);
    postData(event.target.value);
  };

  const changeSelectEventTypeOptionHandler = (event) => {
    setSelectedRaceType(event.target.value);
    getRaceResult(selectedYear,event.target.value)
  };

  async function postData(year) {
      const response = await fetch("http://localhost:5000/sendYear", {
      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
        // 'Access-Control-Allow-Origin': 'http://localhost:5000/'
      },
      body: JSON.stringify({year:year, raceType:selectedRaceType}) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(data => setSelectedRaces(data["races"]));
    return response; // parses JSON response into native JavaScript objects
  }

  async function getPic(){
    const response = await fetch("http://localhost:5000/get_image");
    const imageBlob = await response.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  }

  async function getRaceResult(year,race) {
    const response = await fetch("http://localhost:5000/getRaceResults", {
    method: 'POST', 
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': 'http://localhost:5000/'
    },
    body: JSON.stringify({year:year, race:race}) // body data type must match "Content-Type" header
  })
  .then(response => response.json())
  .then(data => setData(data), console.log(data.position))

  return response; // parses JSON response into native JavaScript objects
}

  async function getApi(){
    await fetch("http://localhost:5000/drivers").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data.result[0])
      }
    )
  }

  if (selected === "Race") {
    type = selectedRaces;

  } else if (selected === "Year") {
    type = year;
  }

  if (type) {
    options = type.map((el) => <option key={el}>{el}</option>);
  }
  if (type) {
    yearOptions = year.map((el) => <option key={el}>{el}</option>);
  }

  

  return (
    <div
      style={{
        padding: "16px",
        margin: "16px",
        textAlign: 'center',
      }}
    >
      <form>
        <div>
          <select>
            <option value="none" selected disabled hidden>Select Event Type</option>
            <option>Race</option>
            <option>Qualifier</option>
          </select>
          
          <select onChange={changeSelectYearOptionHandler}>
            <option value="none" selected disabled hidden>Select a Year</option>
            {yearOptions}
          </select>

          <select onChange={changeSelectEventTypeOptionHandler}>
            {
              options
            }
          </select>
        </div>
      </form>

      <div>
            
      <div>
        <table className="table table-bordered" id="shopping-cart">
          <thead>
            <tr>
              <th><b>Pos</b></th>
              <th><b>No</b></th>
              <th><b>Driver</b></th>
              <th><b>Car</b></th>
              <th><b>Time</b></th>
            </tr>
          </thead>
          <tbody>

            {(typeof data.result === 'undefined') ? (
              <tr>Waiting for selection...</tr>
            ) : (

              Object.entries(data.position).map(([key, value1]) => {
                
                return (
                    <tr>
                        <td>{key}</td>
                        <td>{data.result[0].DriverNumber[value1]}</td>
                        <td>{data.result[0].FullName[value1]}</td>
                        <td>{data.result[0].TeamName[value1]}</td>
                        <td>{data.result[0].Time[value1]}</td>
                    </tr>
                )
              })
            )}

          </tbody>
        </table>
      </div>
    </div>

    </div>
  );

}

export default Stats