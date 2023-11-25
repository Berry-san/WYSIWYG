import { useState } from 'react'
import Editor from './Editor'
import { useFormik } from 'formik'
import axios from 'axios'
import * as XLSX from 'xlsx'
const BulkEmailForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const processEmailAddresses = async (emailAddresses) => {
    for (let i = 0; i < emailAddresses.length; i++) {
      const emailAddress = emailAddresses[i]

      // Send the email to the API
      try {
        const response = await sendEmailToApi(emailAddress)

        // Handle the response from the API
        if (response.status === 200) {
          console.log(`Email sent to: ${emailAddress}`)
        } else {
          console.error(`Error sending email to: ${emailAddress}`)
        }
      } catch (error) {
        console.error(`Error sending email to: ${emailAddress}`, error)
      }
    }
  }

  const sendEmailToApi = async (emailAddress) => {
    const data = {
      to: emailAddress,
      subject: bulkEmailFormValues.values.subject,
      message: bulkEmailFormValues.values.message,
      // Include any additional data you want to send to the API
    }

    // Send the email data to the API using your preferred HTTP client (e.g., axios, fetch)
    const response = await axios.post('your-api-endpoint', data)

    return response
  }

  const bulkEmailFormValues = useFormik({
    initialValues: {
      tempName: '',
      subject: '',
      message: '',
      description: '',
      uploadfile: null,
    },

    // onSubmit: async () => {
    //   console.log(bulkEmailFormValues.values)
    //   const file = bulkEmailFormValues.values.uploadfile
    //   const reader = new FileReader()

    //   // Define a promise for reading the file
    //   const fileReadPromise = new Promise((resolve, reject) => {
    //     reader.onload = () => resolve(reader.result)
    //     reader.onerror = (error) => reject(error)
    //   })

    //   // Start reading the file as text
    //   reader.readAsText(file)

    //   try {
    //     setIsLoading(true)
    //     const fileContents = await fileReadPromise
    //     const emailAddresses = fileContents
    //       .split('\n')
    //       .map((line) => line.trim())

    //     for (let i = 0; i < emailAddresses.length; i++) {
    //       const emailAddress = emailAddresses[i]

    //       // Here, you can implement your email sending logic
    //       // Send an email to emailAddress using values.subject and values.message

    //       // For demonstration purposes, we will log the email information
    //       console.log(`Sending email to: ${emailAddress}`)
    //       console.log(`Subject: ${bulkEmailFormValues.values.subject}`)
    //       console.log(`Message: ${bulkEmailFormValues.values.message}`)
    //       console.log(`Temp Name: ${bulkEmailFormValues.values.tempName}`)
    //       console.log(`Description: ${bulkEmailFormValues.values.description}`)
    //     }

    //     bulkEmailFormValues.resetForm()
    //     setIsLoading(false)
    //   } catch (error) {
    //     console.error('Error reading file:', error)
    //     setIsLoading(false)
    //   }
    // },
    // onSubmit: async () => {
    //   const file = bulkEmailFormValues.values.uploadfile
    //   const reader = new FileReader()

    //   reader.onload = (e) => {
    //     const data = new Uint8Array(e.target.result)

    //     // Check the file type to determine how to process it
    //     const fileType = file.name.endsWith('.csv') ? 'csv' : 'text'

    //     if (fileType === 'csv') {
    //       // Handle CSV files (Excel or plain text with comma-separated values)
    //       try {
    //         const text = new TextDecoder().decode(data)
    //         const emailAddresses = text.split('\n').map((line) => line.trim())

    //         // Process email addresses and send them to the API
    //         processEmailAddresses(emailAddresses)
    //       } catch (error) {
    //         console.error('Error reading file:', error)
    //         setIsLoading(false)
    //       }
    //     } else {
    //       // Handle Excel files
    //       try {
    //         const workbook = XLSX.read(data, { type: 'array' })
    //         const sheet = workbook.Sheets[workbook.SheetNames[0]]
    //         const emailAddresses = XLSX.utils.sheet_to_json(sheet, {
    //           header: 'A',
    //         })

    //         // Process email addresses and send them to the API
    //         processEmailAddresses(emailAddresses)
    //       } catch (error) {
    //         console.error('Error parsing Excel file:', error)
    //         setIsLoading(false)
    //       }
    //     }
    //   }

    //   // Start reading the file as an array buffer
    //   reader.readAsArrayBuffer(file)
    // },
    onSubmit: async () => {
      const file = bulkEmailFormValues.values.uploadfile
      const reader = new FileReader()

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)

        // Check the file type to determine how to process it
        const fileType = file.name.endsWith('.csv') ? 'csv' : 'text'

        if (fileType === 'csv') {
          // Handle CSV files (Excel or plain text with comma-separated values)
          try {
            const text = new TextDecoder().decode(data)
            const emailAddresses = text.split('\n').map((line) => line.trim())

            // Process email addresses and send them to the API
            // processEmailAddresses(emailAddresses);

            // For demonstration purposes, we will log the email addresses
            console.log('Email Addresses:', emailAddresses)
            const emailsToSend = emailAddresses.map((emailAddress) => ({
              to: emailAddress,
              subject: bulkEmailFormValues.values.subject,
              message: bulkEmailFormValues.values.message,
              tempName: bulkEmailFormValues.values.tempName,
              description: bulkEmailFormValues.values.description, // Add the description property
              // Add other properties here as needed
            }))
            console.log(emailsToSend)
          } catch (error) {
            console.error('Error reading file:', error)
            setIsLoading(false)
          }
        } else {
          // Handle Excel files
          try {
            const workbook = XLSX.read(data, { type: 'array' })
            const sheet = workbook.Sheets[workbook.SheetNames[0]]
            const emailAddresses = XLSX.utils.sheet_to_json(sheet, {
              header: 'A',
            })

            // Process email addresses and send them to the API
            // processEmailAddresses(emailAddresses);
            const emailsToSend = emailAddresses.map((emailAddress) => ({
              to: emailAddress,
              subject: bulkEmailFormValues.values.subject,
              message: bulkEmailFormValues.values.message,
              tempName: bulkEmailFormValues.values.tempName,
              // Add other properties here as needed
            }))
            console.log(emailsToSend)

            // For demonstration purposes, we will log the email addresses
            console.log('Email Addresses:', emailAddresses)
          } catch (error) {
            console.error('Error parsing Excel file:', error)
            setIsLoading(false)
          }
        }
      }

      // Start reading the file as an array buffer
      reader.readAsArrayBuffer(file)
    },
  })

  const handleFileUpload = (e) => {
    const uploadedFile = e.currentTarget.files[0]

    if (uploadedFile && uploadedFile instanceof Blob) {
      bulkEmailFormValues.setFieldValue('uploadfile', uploadedFile)
    } else {
      console.error('Invalid file selected')
    }
  }

  return (
    <form onSubmit={bulkEmailFormValues.handleSubmit} className="">
      <div className="grid grid-cols-2 gap-5 pt-3">
        <div className="flex flex-col col-span-1 gap-2">
          <label htmlFor="">Template Name</label>
          <input
            type="text"
            className="px-2 py-1 border rounded bg-gray-50 focus:outline-none"
            name="tempName"
            id="tempName"
            value={bulkEmailFormValues.values.tempName}
            onChange={bulkEmailFormValues.handleChange}
          />
        </div>
        <div className="flex flex-col col-span-1 gap-2">
          <label htmlFor="">Subject</label>
          <input
            type="text"
            className="px-2 py-1 border rounded bg-gray-50 focus:outline-none"
            name="subject"
            id="subject"
            value={bulkEmailFormValues.values.subject}
            onChange={bulkEmailFormValues.handleChange}
          />
        </div>
        <div className="flex flex-col col-span-1 gap-2">
          <label htmlFor="">Email</label>
          <input
            type="file"
            id="uploadfile"
            name="uploadfile"
            onChange={handleFileUpload}
            className="w-full mb-5 text-md p-0.5 text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none "
          />
        </div>
        <div className="flex flex-col col-span-1 gap-2">
          <label htmlFor="">Message</label>
          <input
            type="text"
            className="px-2 py-1 border rounded bg-gray-50 focus:outline-none"
            name="message"
            id="message"
            value={bulkEmailFormValues.values.message}
            onChange={bulkEmailFormValues.handleChange}
          />
        </div>
        <div className="flex flex-col col-span-2 gap-2">
          <Editor
            placeholder="Write anything you want."
            value={bulkEmailFormValues.values.description}
            onChange={(html) => {
              bulkEmailFormValues.setFieldValue('description', html)
            }}
            // onChange={(html) => {
            //   // Get the text content of the HTML
            //   const text = html.replace(/<\/?[^>]+(>|$)/g, '')
            //   bulkEmailFormValues.setFieldValue('description', text)
            // }}
            id="description"
            name="description"
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
        <button className="px-4 py-2 mt-5 text-white rounded bg-rose-500">
          Clear
        </button>
      </div>
    </form>
  )
}

export default BulkEmailForm
