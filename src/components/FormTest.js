import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { read, utils } from 'xlsx'
import Editor from './Editor'
import qs from 'qs'
import axiosInstance from '../utils/API_SERVICE'
import { toast } from 'react-toastify'

function FormTest() {
  const [file, setFile] = useState(null)

  const handleFileUpload = (event, setFieldValue) => {
    const uploadedFile = event.currentTarget.files[0]
    setFile(uploadedFile)
    setFieldValue('uploadfile', uploadedFile)
  }

  const initialValues = {
    name: '',
    subj: '',
    uploadfile: null,
    adlink: '',
    adcontent: '',
    myadvert: '',
    reflink: '',
  }

  //   const validationSchema = Yup.object({
  //     tempName: Yup.string().required('Required'),
  //     subject: Yup.string().required('Required'),
  //     uploadfile: Yup.mixed().required('File required'),
  //     message: Yup.string().required('Required'),
  //     description: Yup.string().required('Required'),
  //   })

  const onSubmit = async (values, { resetForm }) => {
    try {
      if (!file) {
        console.log('Please upload a file')
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
        console.log(emailAddress)
        const requestData = {
          subj: values.subj,
          name: values.name,
          adlink: values.adlink,
          adcontent: values.adcontent,
          reflink: values.reflink,
          email: emailAddress,
        }

        // Log the data instead of sending it to an API
        console.log(requestData)
        // const response = await axiosInstance.post(
        //   'user_login',
        //   qs.stringify(requestData)
        // )
        // console.log(response.data)
        // if (response.data['status_code'] === '0') {
        //   console.log('Bulk emails sent successfully!')
        // }
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
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        // validationSchema={validationSchema}
      >
        {(bulkEmailFormValues) => (
          <form onSubmit={bulkEmailFormValues.handleSubmit} className="">
            <div className="grid grid-cols-2 gap-3 pt-3">
              <div className="flex flex-col col-span-1 gap-2">
                <label htmlFor="">Template Name</label>
                <input
                  type="text"
                  className="px-2 py-1 border rounded bg-gray-50 focus:outline-none"
                  name="name"
                  id="name"
                  value={bulkEmailFormValues.values.name}
                  onChange={bulkEmailFormValues.handleChange}
                />
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
              <div className="flex flex-col col-span-2 gap-2">
                <label htmlFor="">Advert Content</label>
                <Editor
                  placeholder="Write anything you want."
                  value={bulkEmailFormValues.values.adcontent}
                  onChange={(html) => {
                    bulkEmailFormValues.setFieldValue('adcontent', html)
                  }}
                  // onChange={(html) => {
                  //   // Get the text content of the HTML
                  //   const text = html.replace(/<\/?[^>]+(>|$)/g, '')
                  //   bulkEmailFormValues.setFieldValue('description', text)
                  // }}
                  id="adcontent"
                  name="adcontent"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="submit"
                className="px-4 py-2 mt-5 text-white bg-purple-500 rounded"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={bulkEmailFormValues.handleReset}
                className="px-4 py-2 mt-5 text-white rounded bg-rose-500"
              >
                Clear
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default FormTest
