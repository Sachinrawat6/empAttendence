import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-gray-50 flex justify-evenly items-center md:py-4 py-4'>
        <h2>Record</h2>
        <ul className='flex gap-4'>
            <li className='cursor-pointer hover:text-blue-400 duration-75 ease-in'  ><Link to="/">Attendence</Link></li>
            <li className='cursor-pointer hover:text-blue-400 duration-75 ease-in'  ><Link to="/report">Report</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar