import { useState } from 'react'
import Modal from '../components/Modal'
import Form from '../components/Form'
import EmailExtractor from '../components/EmailExtractor'
import YourForm from '../components/EmailExtractor'
import BulkEmailForm from '../components/Form'

const data = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Bob', age: 35 },
  { id: 4, name: 'Alice', age: 28 },
]

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <section className="px-4 py-4 space-y-4 bg-white rounded shadow-md">
        {/* <div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setShowModal(true)
            }}
          >
            open modal
          </div>
          <div></div>
        </div> */}
        <div className="cursor-pointer" onClick={() => setShowModal(true)}>
          Hello
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200"></th>
              <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200">
                TEMPLATE NAME
              </th>
              <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200">
                SUBJECT
              </th>
              <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{row.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{row.age}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{row.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="relative ">
          <div className="pb-3 border-b">
            <span>Edit Email Template</span>
            <span className="absolute"></span>
          </div>
          <BulkEmailForm />
        </div>
      </Modal>
      <YourForm />
    </>
  )
}

export default Dashboard
