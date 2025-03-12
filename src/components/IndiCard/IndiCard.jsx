import React from 'react';

const IndiCard = () => {
  return (
    <div>
        <div className='flex justify-center h-1/2'>
            <div className='flex flex-col justify-between items-center border-green-300 bg-red-400'>
            <img src="./images/CCTVFight4.png" className='w-1/2 h-1/2'/>
            <div className='flex flex-row justify-between items-center'>
                <div className='text-gray-300 bg-blue-900'>Get Location</div>
                <div className=''>Get Nearest Police Station Details</div>
            </div>
            </div>
        </div>
        <div className='flex flex-col justify-between items-center border-green-300 bg-red-400'>
            <div >Nearest Police Station</div>
            <div>
                Incharge Name : 
            </div>
            <div>
                Phone Name:
            </div>
            <div>
                Station No : 
            </div>
        </div>
    </div>
  )
}

export default IndiCard