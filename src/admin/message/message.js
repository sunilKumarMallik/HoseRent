import MaterialTable from 'material-table'
import React from 'react'
import { Button } from 'react-bootstrap'
import Sidebar from '../sidebar'
import HouseListform from './houseListform'

function HouseDetails() {
  const openForm = () => {
    // <HouseListform/>
    alert("How are you");
    console.log("Hello");
  }

  return (    
    <div>
     <div className="Dcontainer">
      <Sidebar/>
      <section className="Dmain">
      <div className="Dmain-top">
        <h2 className="Dtitle">House list</h2>
        <i className="fas fa-user-cog"></i>
      </div>
      <div className='row justify-content-end mb-5'>  
      <button  style={{width:"200px",float:'right'}} onClick={{openForm}}> Add</button>
      </div>

   <MaterialTable 
   title={'House List'}
   columns={[
    { title: 'Houese Name', field: 'name' },
    { title: 'Tenant Name', field: 'Tenant' },
    { title: 'Date Of Rent', field: 'dateOfRent', type: 'datetime' },
    {
      title: 'Payment Details',field: 'payment' , type: 'numeric',
      // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    },
  ]}
  data={[
    { name: 'Falcon Recidency', Tenant: 'Bibhudutta', dateOfRent: 2019, payment: 6300 },
    { name: 'Ahalya hill resort', Tenant: 'Rohit', dateOfRent: 2017, payment: 3400 },
    { name: 'Kiit resort', Tenant: 'Triguna', dateOfRent: 2022, payment: 3400 },
  ]}        
  actions={[
    {
      icon: 'save',
      tooltip: 'Save User',
      onClick: (event, rowData) => alert("You saved " + rowData.name)
    }
  ]}
   /> 
   
    </section>
    </div>
    </div>
  )
}

export default HouseDetails



