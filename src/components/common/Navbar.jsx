import React from 'react'
import CustomButton from './customButton'

const Navbar = () => {
  return (
    <header className="flex items-center justify-between border border-purple-1200 py-4 px-20 ">
        {/*left side of the navbar*/}
        <div>

            <h1 className='text-4xl font-semibold text-emerald-700'> Wander-wise</h1>
        </div>
        
{/* right side of the navbar */}
<div className='flex items-center gap-8'>
    <nav className='space-x-8 text-lg font-semibold [&>a]:hover:text-gray-400'>
        <a href='/'>Home</a>
        <a href='/about'>About</a>
        <a href='/contact'>Contact</a>
    </nav>
   
</div>
<CustomButton text="Log in" link='/login' />

 </header>
  )
}

export default Navbar