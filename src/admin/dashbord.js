// import React, { Component } from "react";
// import sectiondata from "../data/sections.json";
// import parse from "html-react-parser";
// import Sidebar from "./sidebar";
// class Dashbord extends Component {
//     render() {
//         let publicUrl = process.env.REACT_APP_PUBLIC_URL ;;
//         let imagealt = "image";
//         let data = sectiondata.searchlist;
//         return (
//             <div>
//               <div className="Dcontainer">
//    <Sidebar/>


//     <section className="Dmain">
//       <div className="Dmain-top">
//         <h2 className="Dtitle">HomeRent</h2>
//         <i className="fas fa-user-cog"></i>
//       </div>
//       <div className="Dusers">
//         <div className="Dcard">
//           <img src="./pic/img1.jpg"/>
//           <h4>KIIT Recidency</h4>
//           <p>Patia</p>
//           <div className="per">
//             <table className="Dtble">
//               <tr>
//                 <td><span>85%</span></td>
//                 <td><span>87%</span></td>
//               </tr>
//               <tr>
//                 <td>Month</td>
//                 <td>Year</td>
//               </tr>
//             </table>
//           </div>
//           <button>Profile</button>
//         </div>
//         <div className="Dcard">
//           <img src="./pic/img2.jpg"/>
//           <h4>Falcon Resort</h4>
//           <p>IRC village</p>
//           <div className="per">
//             <table className="Dtble">
//               <tr>
//                 <td><span>82%</span></td>
//                 <td><span>85%</span></td>
//               </tr>
//               <tr>
//                 <td>Month</td>
//                 <td>Year</td>
//               </tr>
//             </table>
//           </div>
//           <button>Profile</button>
//         </div>
//         <div className="Dcard">
//           <img src="./pic/img3.jpg"/>
//           <h4>Richy Recidency</h4>
//           <p>Kalpana Square</p>
//           <div className="per">
//             <table className="Dtble">
//               <tr>
//                 <td><span>94%</span></td>
//                 <td><span>92%</span></td>
//               </tr>
//               <tr>
//                 <td>Month</td>
//                 <td>Year</td>
//               </tr>
//             </table>
//           </div>
//           <button>Profile</button>
//         </div>
//         <div className="Dcard">
//           <img src="./pic/img4.jpg"/>
//           <h4>Salina Homes</h4>
//           <p>Rasulgarh</p>
//           <div className="per">
//             <table className="Dtble">
//               <tr>
//                 <td><span>85%</span></td>
//                 <td><span>82%</span></td>
//               </tr>
//               <tr>
//                 <td>Month</td>
//                 <td>Year</td>
//               </tr>
//             </table>
//           </div>
//           <button>Profile</button>
//         </div>
//       </div>

//       <section className="attendance">
//         <div className="attendance-list">
//           <h2 className='Dtitle'>Property List</h2>
//           <table className="DDtable">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Depart</th>
//                 <th>Date</th>
//                 <th>Join Time</th>
//                 <th>Logout Time</th>
//                 <th>Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>01</td>
//                 <td>Sam David</td>
//                 <td>Design</td>
//                 <td>03-24-22</td>
//                 <td>8:00AM</td>
//                 <td>3:00PM</td>
//                 <td><button>View</button></td>
//               </tr>
//               <tr className="active">
//                 <td>02</td>
//                 <td>Balbina Kherr</td>
//                 <td>Coding</td>
//                 <td>03-24-22</td>
//                 <td>9:00AM</td>
//                 <td>4:00PM</td>
//                 <td><button>View</button></td>
//               </tr>
//               <tr>
//                 <td>03</td>
//                 <td>Badan John</td>
//                 <td>testing</td>
//                 <td>03-24-22</td>
//                 <td>8:00AM</td>
//                 <td>3:00PM</td>
//                 <td><button>View</button></td>
//               </tr>
//               <tr>
//                 <td>04</td>
//                 <td>Sara David</td>
//                 <td>Design</td>
//                 <td>03-24-22</td>
//                 <td>8:00AM</td>
//                 <td>3:00PM</td>
//                 <td><button>View</button></td>
//               </tr>
//              <tr >
//                 <td>05</td>
//                 <td>Salina</td>
//                 <td>Coding</td>
//                 <td>03-24-22</td>
//                 <td>9:00AM</td>
//                 <td>4:00PM</td>
//                 <td><button>View</button></td>
//               </tr>
//               <tr >
//                 <td>06</td>
//                 <td>Tara Smith</td>
//                 <td>Testing</td>
//                 <td>03-24-22</td>
//                 <td>9:00AM</td>
//                 <td>4:00PM</td>
//                 <td><button>View</button></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </section>
//     </section>
//   </div>
// </div>
// );
// }
// }
// export default Dashbord;