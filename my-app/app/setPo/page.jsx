import React from 'react'
// import Header2 from '../components/Header2'
import Header from '../components/Header'
import EnterCancel from '../components/EnterCancel'

const setPo = () => {
  return (
    <>
    <Header/>
    <div className="bg-white m-5 rounded-lg">
      <div className="pt-4">
        <h1 className="text-center text-2xl text-black font-bold">Temperature</h1>
        <form action="" className="flex flex-col px-4">
          <label htmlFor="" className="text-black font-semibold text-base">Maximal Value</label>
          <input 
            type="number" 
            className="bg-slate-200 mb-3 border-solid border-black rounded px-2 py-1 text-black border-2" 
            placeholder="Input Here"
          />
        </form>
        <form action="" className="flex flex-col px-4">
          <label htmlFor="" className="text-black font-semibold text-base">Manimal Value</label>
          <input 
            type="number" 
            className="bg-slate-200 mb-3 border-solid border-black rounded px-2 py-1 text-black border-2" 
            placeholder="Input Here"
          />
        </form>
      </div>
      <div>
      <h1 className="text-center text-2xl text-black font-bold">Humidity</h1>
        <form action="" className="flex flex-col px-4">
          <label htmlFor="" className="text-black font-semibold text-base">Maximal Value</label>
          <input 
            type="number" 
            className="bg-slate-300 mb-3 border-solid border-black rounded px-2 py-1 text-black border-2" 
            placeholder="Input Here"
          />
        </form>
        <form action="" className="flex flex-col px-4">
          <label htmlFor="" className="text-black font-semibold text-base">Manimal Value</label>
          <input 
            type="number" 
            className="bg-slate-300 mb-3 border-solid border-black rounded px-2 py-1 text-black border-2" 
            placeholder="Input Here"
          />
        </form>
      </div>
      {/* <div className="flex items-center justify-center gap-4 py-7">
        <button className = "bg-red-500 hover:bg-red-600 w-1/5 p-2 rounded-lg text-center font-semibold">
          <h1>Cancel</h1>
        </button>
        <button className = "bg-green-500 hover:bg-green-600 w-1/5 p-2 rounded-lg text-center font-semibold">
          <h1>Enter</h1>
        </button>
      </div> */}
      <EnterCancel/>
    </div>

    </>
  )
}

export default setPo