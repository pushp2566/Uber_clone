import React from 'react';

const Home = () => {
  return (
     <div className='h-screen'>
        <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
       <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='bg-white'>
          <h2>Get Started with Uber</h2>
          <button>Continue</button>
        </div>
      </div>
    </div>
  )
}

export default Home