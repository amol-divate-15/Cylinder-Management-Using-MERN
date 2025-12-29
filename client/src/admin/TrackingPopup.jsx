export default function TrackingPopup({close,openHistory,openTimeline,openMap}) {
  return(
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-white w-[300px] rounded-xl p-4 text-center">
        <h3 className="font-bold mb-3">Tracking Options</h3>

        <button onClick={openHistory} className="block w-full border p-2 mb-2 bg-red-600 px-6 py-2 mt-4 rounded ">Cylinder History</button>
        {/* <button onClick={openTimeline} className="block w-full border p-2 mb-2 bg-red-600 px-6 py-2 mt-4 rounded ">Delivery Timeline</button>
        <button onClick={openMap} className="block w-full border p-2 mb-2 bg-red-600 px-6 py-2 mt-4 rounded ">Live QR Tracking</button> */}

        <button onClick={close} className="mt-3 text-red-600">Close</button>
      </div>
    </div>
  )
}
