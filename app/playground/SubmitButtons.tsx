
import React from 'react'

export default function SubmitButtons() {
  return (
    <div className='flex flex-row gap-2 mt-2'>
        <button type='submit' className='bg-sky-500 text-white p-1 px-2 rounded-sm'>Submit</button>
        <button type='reset' className='bg-sky-100 p-1 px-2 rounded-sm'>Reset</button>
    </div>
  )
}