import Modal from '../components/Modal'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { read, utils } from 'xlsx'
import Editor from './Editor'
import qs from 'qs'
import axiosInstance from '../utils/API_SERVICE'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const SendEmail = ({ isVisible, onClose, ref_id, id }) => {
  const { email, user_name } = useSelector((state) => state.user.user)

  // const [name, setName] = useState('')
  const [subj, setSubj] = useState('')
  const [adlink, setAdlink] = useState('')
  const [adcontent, setAdcontent] = useState('')
  const [myadvert, setMyAdvert] = useState('')
  const [reflink, setReflink] = useState('')
  const [file, setFile] = useState(null)

  const handleFileUpload = (event, setFieldValue) => {
    const uploadedFile = event.currentTarget.files[0]
    setFile(uploadedFile)
    setFieldValue('uploadfile', uploadedFile)
  }

  useEffect(() => {
    axiosInstance.get(`email_template_list?ref_id=${ref_id}`).then((res) => {
      if (res.data.result.length > 0) {
        setSubj(res.data.result[0].subj)
        setAdlink(res.data.result[0].adlink)
        setAdcontent(res.data.result[0].adcontent)
        setMyAdvert(res.data.result[0].myadvert)
        setReflink(res.data.result[0].reflink)
      }
    })
  }, [ref_id])

  const initialValues = {
    uploadfile: null,
    name: user_name,
    email: email,
    subj: subj,
    adlink: adlink,
    adcontent: adcontent,
    reflink: reflink,
    myadvert: myadvert,
  }

  const onSubmit = async (values, { resetForm }) => {
    try {
      if (!file) {
        toast.error('Please upload a file')
        return
      }

      // Read the file as text
      const fileContents = await readAsText(file)

      let emailAddresses = []

      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        const workbook = read(fileContents, { type: 'binary' })
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]

        // Iterate through all rows and get email addresses from the first column
        const range = utils.decode_range(sheet['!ref'])
        for (let row = range.s.r; row <= range.e.r; row++) {
          const cellAddress = { c: 0, r: row }
          const cellRef = utils.encode_cell(cellAddress)
          const cell = sheet[cellRef]
          if (cell && cell.t === 's') {
            emailAddresses.push(cell.v.trim())
          }
        }
      } else {
        emailAddresses = fileContents.split('\n')
      }

      for (let i = 0; i < emailAddresses.length; i++) {
        const emailAddress = emailAddresses[i].trim()
        const name = emailAddress.split('@')[0]
        console.log(emailAddress)
        const requestData = {
          name: name,
          subj: values.subj,
          adlink: values.adlink,
          adcontent: values.adcontent,
          myadvert: values.myadvert,
          reflink: values.reflink,
          email: emailAddress,
        }

        // console.log(requestData)
        // onClose()
        const response = await axiosInstance.post(
          'sending_email',
          qs.stringify(requestData)
        )
        console.log(response.data)
        if (response.data['status_code'] === '0') {
          toast.success('Bulk emails sent successfully!')
          onClose()
        }
      }
      resetForm()
    } catch (error) {
      console.error('Error sending bulk emails:', error)
    }
  }

  // Function to read the file as text
  const readAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)

      reader.readAsBinaryString(file)
    })
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Send Mail">
      <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(bulkEmailFormValues) => (
            <form onSubmit={bulkEmailFormValues.handleSubmit} className="">
              <div className="grid grid-cols-2 gap-3 pt-3">
                {/* <div className="flex flex-col col-span-1 gap-2">
                  <label htmlFor="">Template Name</label>
                  <input
                    type="text"
                    className="px-2 py-1 border rounded bg-gray-50 focus:outline-none"
                    name="name"
                    id="name"
                    value={bulkEmailFormValues.values.name}
                    onChange={bulkEmailFormValues.handleChange}
                  />
                </div> */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="uploadfile">Email File</label>
                  <input
                    type="file"
                    id="uploadfile"
                    name="uploadfile"
                    onChange={(event) =>
                      handleFileUpload(event, bulkEmailFormValues.setFieldValue)
                    }
                    className="w-full mb-5 text-md p-0.5 text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none "
                  />
                  {bulkEmailFormValues.errors.uploadfile &&
                    bulkEmailFormValues.touched.uploadfile && (
                      <div className="text-red-500">
                        {bulkEmailFormValues.errors.uploadfile}
                      </div>
                    )}
                </div>
                <div className="flex flex-col col-span-1 gap-2">
                  <label htmlFor="">Subject</label>
                  <input
                    type="text"
                    className="px-2 py-1 border rounded bg-gray-50 focus:outline-none"
                    name="subj"
                    id="subj"
                    value={bulkEmailFormValues.values.subj}
                    onChange={bulkEmailFormValues.handleChange}
                  />
                </div>
                <div className="flex flex-col col-span-1 gap-2">
                  <label htmlFor="">Advert Link</label>
                  <input
                    type="text"
                    className="px-2 py-1 border rounded bg-gray-50 focus:outline-none"
                    name="adlink"
                    id="adlink"
                    value={bulkEmailFormValues.values.adlink}
                    onChange={bulkEmailFormValues.handleChange}
                  />
                </div>
                <div className="flex flex-col col-span-1 gap-2">
                  <label htmlFor="">Referral Link</label>
                  <input
                    type="text"
                    className="px-2 py-1 border rounded bg-gray-50 focus:outline-none"
                    name="reflink"
                    id="reflink"
                    // value={bulkEmailFormValues.values.reflink}
                    value={reflink}
                    onChange={bulkEmailFormValues.handleChange}
                  />
                </div>
                <div className="flex flex-col col-span-2 gap-2">
                  <label htmlFor="">Advert Content</label>
                  <Editor
                    placeholder="Write anything you want."
                    value={adcontent}
                    // value={bulkEmailFormValues.values.adcontent}
                    onChange={(value) => setAdcontent(value)}
                    // onChange={(value) => {
                    //   bulkEmailFormValues.setFieldValue('adcontent', value)
                    // }}
                    id="adcontent"
                    name="adcontent"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="px-4 py-2 mt-5 text-white bg-blue-800 rounded"
                >
                  Send Email
                </button>
                {/* <button
                  type="button"
                  onClick={bulkEmailFormValues.handleReset}
                  className="px-4 py-2 mt-5 text-white rounded bg-rose-500"
                >
                  Clear
                </button> */}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  )
}

export default SendEmail
