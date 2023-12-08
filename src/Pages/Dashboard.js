import { useEffect, useState } from 'react'
import Pagination from '../components/Pagination/Pagination'
import axiosInstance from '../utils/API_SERVICE'
import EditTemplate from '../components/EditTemplate'
import CreateTemplate from '../components/CreateTemplate'
import SendEmail from '../components/SendEmail'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [emailSent, setEmailSent] = useState('')
  const [users, setUsers] = useState('')
  const [templates, setTemplates] = useState('')

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
      const res = await axiosInstance.get('get_lists')
      console.log(res.data.total_email_sent[0].txn_cont)
      // setFilteredData(res.data.total_email_sent)
      setEmailSent(res.data.total_email_sent[0].txn_cont)
      setUsers(res.data.total_user[0].txn_cont)
      setTemplates(res.data.total_template_create[0].txn_cont)
    } catch (error) {
      console.log(error)
    }
  }

  fetchData()

  return (
    <div className="container mb-5 h-fit ">
      <div className="mt-2">
        <p className="text-2xl text-center">Analytics</p>
        <div className="flex flex-col p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-y-6 md:gap-x-6 xl:grid-cols-4 2xl:gap-x-8">
            <div className="px-8 py-6 bg-white border rounded-md shadow-md border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
              <Link to="/layout/emailReport">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="bg-green-200 rounded-full">
                    {/* <img
                      src={questionMark}
                      alt="questions"
                      className="w-10 h-10 p-2 rounded-full"
                    /> */}
                  </div>
                  <div className="w-full text-5xl font-bold text-black dark:text-white">
                    <span className="block w-full text-center text-green-900 truncate">
                      {emailSent}
                    </span>
                  </div>
                  <h2 className="text-base text-center text-slate-500">
                    Total Email Sent
                  </h2>
                </div>
              </Link>
            </div>
            <div className="px-8 py-6 bg-white border rounded-md shadow-md border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
              <Link to="/layout/users">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="bg-green-200 rounded-full">
                    {/* <img
                      src={User}
                      alt="questions"
                      className="w-10 h-10 p-1 rounded-full"
                    /> */}
                  </div>
                  <div className="w-full text-5xl font-bold text-black dark:text-white">
                    <span className="block w-full text-center text-green-900 truncate">
                      {users}
                    </span>
                  </div>
                  <h2 className="text-base text-center text-slate-500">
                    Total Users
                  </h2>
                </div>
                {/* <h2 className="text-center ">Needy Category</h2>
                <div className="w-full ">
                  <span className="block w-full p-2 mt-12 text-center text-white bg-green-900 rounded-md ">
                    {needy}
                  </span>
                </div> */}
              </Link>
            </div>
            <div className="px-8 py-6 bg-white border rounded-md shadow-md border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
              <Link to="/layout/emailList">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="bg-green-200 rounded-full">
                    {/* <img
                      src={sheikhSvg}
                      alt="questions"
                      className="p-1 rounded-full w-11 h-11"
                    /> */}
                  </div>
                  <div className="w-full text-5xl font-bold text-black dark:text-white">
                    <span className="block w-full text-center text-green-900 ">
                      {templates}
                    </span>
                  </div>
                  <h2 className="text-base text-center text-slate-500">
                    Total Templates
                  </h2>
                </div>
                {/* <h2 className="text-center ">Sheikh</h2>
                <div className="w-full ">
                  <span className="block w-full p-2 mt-12 text-center text-white bg-green-900 rounded-md ">
                    {sheikh}
                  </span>
                </div> */}
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-12 mt-4 gap-y-4 gap-x-4 md:mt-6 md:gap-x-6 2xl:mt-8 2xl:gap-x-8">
            {/* <div className="col-span-12 px-5 pt-8 pb-5 bg-white border rounded-md shadow-md border-stroke shadow-default dark:border-strokedark dark:bg-boxdark sm:px-8 xl:col-span-8">
              <Link to="/user">
                <div className="bg-white ">
                  <div className="object-contain max-h-full min-w-full">
                    <UserChart />
                  </div>
                </div>
              </Link>
            </div> */}
            {/* <div className="flex flex-col items-center justify-center col-span-12 p-8 bg-white border rounded-md shadow-md border-stroke shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
              <Link to="/campaign">
                <div>
                  <CampaignChart />
                </div>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
