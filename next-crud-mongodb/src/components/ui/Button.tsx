import React from 'react'

const Button = ({buttonName} : {buttonName : string}) => {
  return (

    <div className="group inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:ring-3 focus:outline-hidden">
        <span className="block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent">
                {buttonName}
        </span>
    </div>
  )
}

export default Button