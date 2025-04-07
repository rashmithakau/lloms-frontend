import React from 'react'
import ReturnArrivalTable from '../../components/ReturnArrivalTable/ReturnArrivalTable'
import ReturnHistoryPopup from '../../components/ReturnHistoryPopup/ReturnHistoryPopup'
import { Button } from '@mui/material'

function Return() {
  const [showModal, setShowModal] = React.useState(false)
  return (
    <div>

<button class="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition duration-200" onClick={() => setShowModal(true)}>
  Return History
</button>



      <ReturnArrivalTable/>

      {showModal && (
          <ReturnHistoryPopup onClose={() => setShowModal(false)} />
        )}
    </div>
  )
}

export default Return