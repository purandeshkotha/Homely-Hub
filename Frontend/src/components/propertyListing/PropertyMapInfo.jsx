import React from 'react'
import MapComponent from './MapComponent'


const PropertyMapInfo = ({address, checkIn, checkOut}) => {
  return (
      <div className='extra-info col-md-6 col-sm-12 col-12'>
        <h2 className='map-header'>Where you'll be</h2>
        <MapComponent address={address}/>
        <div className='extra-info-text'>
          <h2 className='extra-heading'>Extra Info</h2>
          <p className='extra-description'>
            Check-in time: <strong>{checkIn || '11:00'}</strong> &nbsp;|&nbsp; Check-out time: <strong>{checkOut || '13:00'}</strong><br/><br/>
            Early check-in or late checkout is permitted based on availability and prior intimation.
            If you wish to check-in before the scheduled time, an early check-in fee may be applicable.
            Late checkout is permitted based on availability and a fee may apply.
            Please contact the host regarding the same.
          </p>
        </div>
      </div>
  )
}

export default PropertyMapInfo