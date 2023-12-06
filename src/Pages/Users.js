import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/API_SERVICE'
import Pagination from '../components/Pagination/Pagination'

const Users = () => {
  const [userList, setUserList] = useState([])

  const [filteredData, setFilteredData] = useState([])

  const [currentPage, setCurrentPage] = useState(1) // Track the current page
  const usersPerPage = 10

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredData?.slice(indexOfFirstUser, indexOfLastUser)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('user_lists')
        // setUserList(res.data.result)
        setFilteredData(res.data.result)
        // console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])
  return (
    <>
      <div className="max-w-full overflow-x-auto bg-white border rounded-md border-stroke shadow-default">
        {' '}
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200"></th>
              <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200">
                USER NAME
              </th>
              <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200">
                EMAIL
              </th>
              <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200">
                USER TYPE
              </th>
              <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200">
                DATE CREATED
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((row, index) => (
              <tr
                key={row.id}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
                <td className="px-6 py-4 capitalize whitespace-no-wrap">
                  {row.user_name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">{row.email}</td>
                <td className="px-6 py-4 capitalize whitespace-no-wrap">
                  {row.user_type}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap">
                  {row.inserted_dt}
                </td>
              </tr>
            ))}
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
      {/* {userList.map((user) => (
        <div>{user.user_name}</div>
      ))} */}
    </>
  )
}

export default Users
