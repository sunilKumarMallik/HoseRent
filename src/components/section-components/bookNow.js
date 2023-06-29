import React from 'react'
import { Link } from 'react-router-dom'

function BookNow() {
  return (
    <div>
            <div className="subscribe-area">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-9 text-center">
              <h2>Get Update</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean fringilla dui nibh, idhendrerit Suspendisse faucibus nulla accumsan. </p>
              <div className="rld-single-input">
                {/* <Link to={"/RentalAgreement"}>
                <button className="btn">Book Now</button>
                </Link> */}
                <Link to={""}>
                <button className="btn">Book Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default BookNow