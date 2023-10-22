import { useState } from 'react'
import Editor from './Editor'
import { useFormik } from 'formik'

const BulkEmailForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const bulkEmailFormValues = useFormik({
    initialValues: {
      tempName: '',
      subject: '',
      message: '',
      description: '',
      uploadfile: null,
    },

    onSubmit: async () => {
      console.log(bulkEmailFormValues.values)
      const file = bulkEmailFormValues.values.uploadfile
      const reader = new FileReader()

      // Define a promise for reading the file
      const fileReadPromise = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })

      // Start reading the file as text
      reader.readAsText(file)

      try {
        setIsLoading(true)
        const fileContents = await fileReadPromise
        const emailAddresses = fileContents
          .split('\n')
          .map((line) => line.trim())

        for (let i = 0; i < emailAddresses.length; i++) {
          const emailAddress = emailAddresses[i]

          // Here, you can implement your email sending logic
          // Send an email to emailAddress using values.subject and values.message

          // For demonstration purposes, we will log the email information
          console.log(`Sending email to: ${emailAddress}`)
          console.log(`Subject: ${bulkEmailFormValues.values.subject}`)
          console.log(`Message: ${bulkEmailFormValues.values.message}`)
          console.log(`Temp Name: ${bulkEmailFormValues.values.tempName}`)
          console.log(`Description: ${bulkEmailFormValues.values.description}`)
        }

        bulkEmailFormValues.resetForm()
        setIsLoading(false)
      } catch (error) {
        console.error('Error reading file:', error)
        setIsLoading(false)
      }
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
            className="border bg-gray-50 focus:outline-none rounded  px-2 py-1"
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
            className="border bg-gray-50 focus:outline-none rounded px-2 py-1"
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
            className="border bg-gray-50 focus:outline-none rounded px-2 py-1"
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
            onChange={bulkEmailFormValues.handleChange}
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
