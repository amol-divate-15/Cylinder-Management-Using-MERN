import React from 'react'

export default function Card({ img, title }) {
  return (
    <div className="w-[280px] bg-white rounded-2xl overflow-hidden shadow-lg 
    transition-all duration-300 
    hover:shadow-2xl hover:scale-105 hover:-translate-y-2 cursor-pointer">

      <div className="overflow-hidden">
        <img
          src={img}
          alt="feature"
          className="w-full h-[360px] object-cover transition duration-300 hover:scale-110"
        />
      </div>

      <div className="p-4 text-center">
        <h3 className="text-gray-900 font-semibold text-lg transition hover:text-red-600">
          {title}
        </h3>
      </div>

    </div>
  )
}
