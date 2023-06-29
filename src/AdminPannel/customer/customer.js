import React from 'react'
import Sidebar from '../sidebar'
import MaterialTable from 'material-table'
function CustomerDetails() {
  return (
    <div>

    <Sidebar/>
 
 
    <div className="admcontainer">
         <div className="admheader">
             <h2 data-text="HomeRent" className='Header'>HomeRent</h2>
         </div>
         <div className="admcontent">
             <div className="admcards">
                 <div className="admcard">
                     <div className="admbox">
                         <h3>2194</h3>
                         <h5>Houses</h5>
                     </div>
                     <div className="icon-case">
                         <img src="students.png" alt=""/>
                     </div>
                 </div>
                 <div className="admcard">
                     <div className="admbox">
                         <h3>53</h3>
                         <h5>Tenants</h5>
                     </div>
                     <div className="icon-case">
                         <img src="teachers.png" alt=""/>
                     </div>
                 </div>
                 <div className="admcard">
                     <div className="admbox">
                         <h3>5</h3>
                         <h5>Owners</h5>
                     </div>
                     <div className="icon-case">
                         <img src="schools.png" alt=""/>
                     </div>
                 </div>
                 <div className="admcard">
                     <div className="admbox">
                         <h3>350000</h3>
                         <h5>Income</h5>
                     </div>
                     <div className="icon-case">
                         <img src="income.png" alt=""/>
                     </div>
                 </div>
             </div>
             <div className="admcontent-2">
                 <div className="recent-payments">
                     <div className="admtitle">
                         <h3>Customer Details</h3>
                     </div>
                     <table>
                         <tr>
                             <th>Name</th>
                             <th>House Name</th>
                             <th>Monthly Rent</th>
                             <th>Option</th>
                         </tr>
                         <tr>
                             <td>John Doe</td>
                             <td>St. James College</td>
                             <td>$120</td>
                             <td><a href="#" className="admbtn">View</a></td>
                         </tr>
                         <tr>
                             <td>John Doe</td>
                             <td>St. James College</td>
                             <td>$120</td>
                             <td><a href="#" className="admbtn">View</a></td>
                         </tr>
                         <tr>
                             <td>John Doe</td>
                             <td>St. James College</td>
                             <td>$120</td>
                             <td><a href="#" className="admbtn">View</a></td>
                         </tr>
                         <tr>
                             <td>John Doe</td>
                             <td>St. James College</td>
                             <td>$120</td>
                             <td><a href="#" className="admbtn">View</a></td>
                         </tr>
                         <tr>
                             <td>John Doe</td>
                             <td>St. James College</td>
                             <td>$120</td>
                             <td><a href="#" className="admbtn">View</a></td>
                         </tr>
                         <tr>
                             <td>John Doe</td>
                             <td>St. James College</td>
                             <td>$120</td>
                             <td><a href="#" className="admbtn">View</a></td>
                         </tr>
                     </table>
                 </div>
             </div>
         </div>
     </div>
   
     </div>

  )
}

export default CustomerDetails