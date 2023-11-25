import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/API_SERVICE'

const Users = () => {
  const [userList, setUserList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('user_lists')
        setUserList(res.data.result)
        // console.log(res)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])
  return (
    <>
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
              SUBJECT
            </th>
            <th className="px-6 py-3 text-xs font-bold leading-4 tracking-wider text-left text-gray-500 uppercase bg-gray-200">
              SUBJECT
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userList.map((row, index) => (
            <tr
              key={row.id}
              className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
            >
              <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-no-wrap capitalize">
                {row.user_name}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">{row.email}</td>
              <td className="px-6 py-4 whitespace-no-wrap capitalize">
                {row.user_type}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {row.inserted_dt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {userList.map((user) => (
        <div>{user.user_name}</div>
      ))} */}
    </>
  )
}

export default Users
