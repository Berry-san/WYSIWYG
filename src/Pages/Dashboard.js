import { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import Form from '../components/Form'
import EmailExtractor from '../components/EmailExtractor'
import YourForm from '../components/EmailExtractor'
import BulkEmailForm from '../components/Form'
import FormTest from '../components/FormTest'
import axiosInstance from '../utils/API_SERVICE'
import EditTemplate from '../components/EditTemplate'
import CreateTemplate from '../components/CreateTemplate'
import SendEmail from '../components/SendEmail'

const data = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Bob', age: 35 },
  { id: 4, name: 'Alice', age: 28 },
]

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [emailList, setEmailList] = useState([])
  const [refID, setRefID] = useState()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axiosInstance.get('email_lists')
  //       setEmailList(res.data.result)
  //       // console.log(res)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchData()
  // }, [])

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get('email_lists')
      setEmailList(res.data.result)
      // console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  fetchData()

  return (
    <>
      {/* <FormTest></FormTest> */}
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
        <div className="flex items-end justify-end ">
          <button
            className="px-3 py-2 text-left text-white capitalize bg-blue-800 rounded cursor-pointer"
            onClick={() => setCreateModal(true)}
          >
            create template
          </button>
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
                ADVERT LINK
              </th>
              <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200">
                ADVERT CONTENT
              </th>
              <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200">
                DATE
              </th>
              {/* <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200">
                SUBJECT
              </th> */}
              <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {emailList.map((row, index) => (
              <tr
                key={row.id}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{row.subj}</td>
                <td className="px-6 py-4 whitespace-no-wrap">{row.adlink}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {row.adcontent}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">{row.myadvert}</td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {row.inserted_dt.toLocaleString()}
                </td>
                <td className="flex flex-row gap-4 px-6 py-4 whitespace-no-wrap cursor-pointer">
                  <span
                    onClick={() => {
                      setRefID(row.id)
                      setEditModal(true)
                    }}
                  >
                    Edit
                  </span>
                  <span
                    onClick={() => {
                      setRefID(row.id)
                      setShowModal(true)
                    }}
                  >
                    {' '}
                    Send Mail
                  </span>
                </td>
                {/* <td
                  className="px-6 py-4 whitespace-no-wrap cursor-pointer"
                  onClick={() => {
                    setRefID(row.id)
                    setShowModal(true)
                  }}
                >
                  Send Mail
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <SendEmail
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        ref_id={refID}
      />
      <EditTemplate
        isVisible={editModal}
        onClose={() => setEditModal(false)}
        ref_id={refID}
        fetchEmailList={fetchData}
      />
      <CreateTemplate
        isVisible={createModal}
        onClose={() => setCreateModal(false)}
        fetchEmailList={fetchData}
      />
    </>
  )
}

export default Dashboard
