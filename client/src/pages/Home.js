import React, {useState, useEffect, useRef} from 'react'

function Home(){

  

  const [data, setData] = useState("")
  const [driverFN, setDriverFN] = useState([])
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      getApi()
      didMount.current = true;
      return;
    }

    // test()

    

    
  },[data])

  

  async function getApi(){
    await fetch("http://localhost:5000/drivers").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
      
    )
  }

  


  // async function test(){

  //   var driver = []

  //   for (const [key, value] of Object.entries(data.result.FirstName)) {
  //     console.log(`${key}: ${value}`);
  //     driver.push({
  //       key:   key,
  //       value: value
  //     });
  //   }

  //   setDriverFN(driver)

  //   console.log(driverFN)

  // }


  return(
    <div>
      {/* <button onClick={() => test()}>Click me</button> */}

      {(typeof data.Abbreviation === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        Object.entries(data.Abbreviation).map( ([key, value]) => <div>Key is:{key} Value is:{value}</div> )
      )}

      <div>

        <table className="table table-bordered" id="shopping-cart">
          <thead>
            <tr>
              <th><b>Driver</b></th>
              <th><b>Abbreviation</b></th>
              <th><b>#</b></th>
            </tr>
          </thead>
          <tbody>
            {/* {this.state.items.map((item, index) => (
              
                <tr key={item.id}>
                  <td>{item.item_name}</td>
                  <td>{item.item_price}</td>
                  <td>{item.item_quantity}</td>
                  <td class="btnCell">
                  <button onClick={()=>this.itemInc(item.item_id)} type="button" class="btn btn-success">Add 1</button>
                  <button onClick={()=>this.itemDec(item.item_id)} type="button" class="btn btn-danger">Remove 1</button>
                  </td>
                </tr>
            ))} */}
            {Object.entries(data).map( ([key, value]) => 
              <tr key={key}>
                <td>{value.Abbreviation}</td>
                <td>{value.Abbreviation}</td>
                <td>{value.Abbreviation}</td>
              </tr> 
            )}

          </tbody>
        </table>
      </div>




    </div>

    

  )
}

export default Home