import React, { useState } from 'react'
import Pagination from '../components/Pagination/Pagination'
import axiosInstance from '../utils/API_SERVICE'
import { exportToExcel } from '../utils/exportUtils'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { CSVLink } from 'react-csv'

const EmailReport = () => {
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
      const res = await axiosInstance.get('email_detail')
      setFilteredData(res.data.result)
    } catch (error) {
      console.log(error)
    }
  }

  fetchData()

  const handleExportExcel = () => {
    exportToExcel(filteredData, 'Email Report')
  }

  const handleExportPDF = () => {
    const doc = new jsPDF()
    const tableData = filteredData.map((user) => [
      user.names,
      user.email,
      user.subjects,
      user.add_link,
      user.add_content,
      user.my_advert,
      user.inserted_dt,
    ])
    autoTable(doc, {
      head: [
        [
          'Name',
          'Email',
          'Subject',
          'Advert Link',
          'Advert Content',
          'My Advert',
          'Date',
        ],
      ],
      body: tableData,
    })
    doc.save('Email Report.pdf')
  }

  const csvData = filteredData.map((user) => ({
    Name: user.names,
    Email: user.email,
    subject: user.subjects,
    'Advert Link': user.add_link,
    'Advert Content': user.add_content,
    'My Advert': user.my_advert,
    Date: user.inserted_dt,
  }))

  const handlePrint = () => {
    // Create a new window and document
    const printWindow = window.open('', '_blank')
    printWindow.document.open()

    // Generate the HTML content for printing
    const htmlContent = `
      <html>
        <head>
          <title>Email Report</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.15/dist/tailwind.min.css" rel="stylesheet">
          <style>
            @media print {
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 1rem;
              }
              th, td {
                padding: 0.5rem;
                border-bottom: 1px solid #ddd;
              }
              th {
                text-align: left;
              }
            }
          </style>
        </head>
        <body>
          <p class="text-md font-bold text-center pb-10"> Users. </p>
          <table class="w-full text-sm text-left text-[#127EC8] bg-[#127EC830]">
            <thead>
              <tr>
                
                <th class="px-6">Name</th>
                <th class="px-6">Email</th>
                <th class="px-6">Subject</th>
                <th class="px-6">Advert Link</th>
                <th class="px-6">Advert Content</th>
                <th class="px-6">My Advert</th>
                <th class="px-6">Date</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData
                .map((user) => {
                  const htmlString = user.add_content
                  const tempDiv = document.createElement('div')
                  tempDiv.innerHTML = htmlString
                  const textContent = tempDiv.textContent || tempDiv.innerText
                  return `
                    <tr class="bg-white border-b text-black text-[13px]">
                      <td class="px-6 py-4 font-medium">
                        ${user.names}
                      </td>
                      <td class="px-6 py-4">
                        ${user.email}
                      </td>
                      <td class="px-6 py-4">
                       ${user.subjects}
                      </td>
                      <td class="px-6 py-4">
                       ${user.add_link}
                      </td>
                      <td class="px-6 py-4">
                       ${textContent}
                      </td>
                      <td class="px-6 py-4">
                       ${user.my_advert}
                      </td>
                      <td class="px-6 py-4">
                       ${user.inserted_dt}
                      </td>
                    </tr>
                  `
                })
                .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `

    printWindow.document.write(htmlContent)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <>
      <section className="px-4 py-4 space-y-4 bg-white rounded shadow-md">
        <div className="flex items-center justify-end mt-3 mr-5">
          <span
            className="px-2 font-semibold text-blue-800 cursor-pointer"
            onClick={handleExportPDF}
          >
            PDF
          </span>
          <CSVLink
            data={csvData}
            filename={'users.csv'}
            className="px-2 font-semibold text-blue-800 cursor-pointer"
          >
            CSV
          </CSVLink>
          <span
            className="pr-2 font-semibold text-blue-800 cursor-pointer"
            onClick={handleExportExcel}
          >
            Excel
          </span>
          <span
            className="pl-2 font-semibold text-blue-800 cursor-pointer"
            onClick={handlePrint}
          >
            Print
          </span>
        </div>
        <div className="max-w-full overflow-x-auto bg-white border rounded-md border-stroke shadow-default">
          <table className="w-full divide-y divide-gray-200 table-auto ">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200">
                  NAME
                </th>
                <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200">
                  EMAIL
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
                  MY ADVERT
                </th>
                <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200">
                  DATE
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((row, index) => {
                const htmlString = row.add_content
                const tempDiv = document.createElement('div')
                tempDiv.innerHTML = htmlString
                const textContent = tempDiv.textContent || tempDiv.innerText
                return (
                  <tr
                    key={row.id}
                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                  >
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {row.names}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {row.email}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {row.subjects}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {row.add_link}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {textContent}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {row.my_advert}
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                      {row.inserted_dt}
                    </td>
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
    </>
  )
}

export default EmailReport
