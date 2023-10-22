import React, { useState } from 'react'

const EmailExtractor = ({ onEmailsExtracted }) => {
  const [emails, setEmails] = useState([])
  const [otherValues, setOtherValues] = useState({})
  const [emailIndex, setEmailIndex] = useState(0)
  const [isExtracted, setIsExtracted] = useState(false)

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]

    if (file) {
      try {
        const text = await file.text()
        const emailRegex = /[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+/g
        const extractedEmails = text.match(emailRegex)

        if (extractedEmails && extractedEmails.length > 0) {
          setEmails(extractedEmails)
          // Set the initial values for other form fields
          setOtherValues({})
          setEmailIndex(0)
          setIsExtracted(true)
        } else {
          setEmails(['No emails found in the file.'])
        }
      } catch (error) {
        console.error('Error reading the file:', error)
        setEmails(['Error reading the file.'])
      }
    }
  }

  const handleOtherValuesChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    // Create a new object with the email and other form values
    const emailObject = {
      email: emails[emailIndex],
      [name]: value,
    }

    // Update the otherValues state with the new object
    setOtherValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))

    setEmailIndex(emailIndex + 1)

    if (emailIndex === emails.length - 1) {
      onEmailsExtracted(Object.values(otherValues))
    }
  }

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      {isExtracted && (
        <div>
          <h2>Extracted Emails:</h2>
          <ul>
            {emails.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        </div>
      )}
      {emailIndex < emails.length && (
        <div>
          <h2>Enter Values for Email {emailIndex + 1}:</h2>
          <div>
            <input
              type="text"
              name="templateName"
              placeholder="Template Name"
              onChange={handleOtherValuesChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              onChange={handleOtherValuesChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const YourForm = () => {
  const [emailObjects, setEmailObjects] = useState([])

  const handleEmailsExtracted = (extractedEmails) => {
    setEmailObjects(extractedEmails)
  }

  return (
    <form className="">
      <div className="grid grid-cols-2 gap-5 pt-3">
        <div className="flex flex-col col-span-1 gap-2">
          <label htmlFor="">Template Name</label>
          <input
            type="text"
            name="templateName"
            className="border border-gray-400 rounded"
          />
        </div>
        <div className="flex flex-col col-span-1 gap-2">
          <label htmlFor="">Subject</label>
          <input
            type="text"
            name="subject"
            className="border border-gray-400 rounded"
          />
        </div>
      </div>
      <div className="col-span-2">
        <EmailExtractor onEmailsExtracted={handleEmailsExtracted} />
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

export default YourForm
