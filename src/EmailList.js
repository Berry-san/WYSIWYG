import { useEffect, useState } from 'react'
import Pagination from './components/Pagination/Pagination'
import axiosInstance from './utils/API_SERVICE'
import EditTemplate from './components/EditTemplate'
import CreateTemplate from './components/CreateTemplate'
import SendEmail from './components/SendEmail'
import XLSXSample from '../src/email template.xlsx'
import TXTSample from '../src/text template.txt'
const Dashboard = () => {
  const [showModal, setShowModal] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  //   const [emailList, setEmailList] = useState([])
  const [refID, setRefID] = useState()
  const [ID, setID] = useState()

  const [filteredData, setFilteredData] = useState([])

  const [currentPage, setCurrentPage] = useState(1) // Track the current page
  const usersPerPage = 10

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredData?.slice(indexOfFirstUser, indexOfLastUser)

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
      const res = await axiosInstance.get('email_template_list')
      setFilteredData(res.data.result)
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
        <div className="flex items-center justify-between mt-3 mr-5">
          <div className="flex">
            <div className="px-2 font-medium text-gray-600 hover:text-blue-800 cursor-pointer">
              <a
                href={TXTSample}
                download="TXT Template"
                target="_blank"
                rel="noreferrer"
              >
                TXT Template
              </a>
            </div>
            <div className="px-2 font-medium text-gray-600 hover:text-blue-800 cursor-pointer">
              <a
                href={XLSXSample}
                download="XLSX Template"
                target="_blank"
                rel="noreferrer"
              >
                XLSX Template
              </a>
            </div>
          </div>

          <button
            className="px-3 py-2 text-left text-white capitalize bg-blue-800 rounded cursor-pointer"
            onClick={() => setCreateModal(true)}
          >
            create template
          </button>
        </div>
        <div className="max-w-full overflow-x-auto bg-white border rounded-md border-stroke shadow-default">
          <table className="w-full divide-y divide-gray-200 table-auto ">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200"></th>
                {/* <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200">
                TEMPLATE NAME
              </th> */}
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
                  MY ADVERT
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
              {currentUsers.map((row, index) => {
                const htmlString = row.adcontent
                const tempDiv = document.createElement('div')

                // Set the HTML content of the div to your string
                tempDiv.innerHTML = htmlString

                // Extract the text content inside the div
                const textContent = tempDiv.textContent || tempDiv.innerText
                return (
                  <tr
                    key={row.id}
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">{row.subj}</td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {row.adlink}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {textContent}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {row.myadvert}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {row.inserted_dt.toLocaleString()}
                    </td>
                    <td className="flex flex-row items-center justify-center gap-4 px-6 py-4 underline whitespace-no-wrap cursor-pointer">
                      <span
                        onClick={() => {
                          setRefID(row.ref_id)
                          setID(row.id)
                          console.log(row)
                          setEditModal(true)
                        }}
                      >
                        Edit
                      </span>
                      <span
                        onClick={() => {
                          setRefID(row.ref_id)
                          setID(row.id)
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
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end">
          <Pagination
            currentPage={currentPage}
            onPageChange={paginate}
            totalCount={filteredData?.length}
            pageSize={usersPerPage}
            siblingCount={1}
            className="my-3"
          />
        </div>
      </section>
      <SendEmail
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        ref_id={refID}
        id={ID}
      />
      <EditTemplate
        isVisible={editModal}
        onClose={() => setEditModal(false)}
        ref_id={refID}
        id={ID}
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
