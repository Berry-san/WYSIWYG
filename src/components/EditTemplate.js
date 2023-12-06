import Modal from '../components/Modal'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Editor from './Editor'
import qs from 'qs'
import axiosInstance from '../utils/API_SERVICE'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

const EditTemplate = ({ isVisible, onClose, ref_id, id, fetchEmailList }) => {
  const { email, user_name } = useSelector((state) => state.user.user)
  const [subj, setSubj] = useState('')
  const [adlink, setAdlink] = useState('')
  const [adcontent, setAdcontent] = useState('')
  const [myadvert, setMyAdvert] = useState('')
  const [reflink, setReflink] = useState('')

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axiosInstance.get(
  //         `email_template_list?ref_id=${ref_id}`
  //       )
  //       console.log(res)

  //       if (res.data.result.length > 0) {
  //         const result = res.data.result[0]
  //         setSubj(result.subj)
  //         setAdlink(result.adlink)
  //         setAdcontent(result.adcontent)
  //         setMyAdvert(result.myadvert)
  //         setReflink(result.reflink)
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchData()
  // }, [ref_id])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true) // Set loading to true when starting data fetch
        const res = await axiosInstance.get(
          `email_template_list?ref_id=${ref_id}`
        )
        console.log(res)

        if (res.data.result.length > 0) {
          const result = res.data.result[0]
          setSubj(result.subj)
          setAdlink(result.adlink)
          setAdcontent(result.adcontent)
          setMyAdvert(result.myadvert)
          setReflink(result.reflink)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false) // Set loading to false regardless of success or failure
      }
    }

    fetchData()
  }, [ref_id])

  const initialValues = {
    name: user_name,
    email: email,
    subj: subj,
    adlink: adlink,
    adcontent: adcontent,
    reflink: reflink,
    myadvert: myadvert,
  }
  //   const validationSchema = Yup.object({
  //     tempName: Yup.string().required('Required'),
  //     subject: Yup.string().required('Required'),
  //     uploadfile: Yup.mixed().required('File required'),
  //     message: Yup.string().required('Required'),
  //     description: Yup.string().required('Required'),
  //   })

  const onSubmit = async () => {
    try {
      const requestData = {
        id,
        subj: subj,
        name: user_name,
        adlink: adlink,
        adcontent: adcontent,
        myadvert: myadvert,
        reflink: reflink,
        email: email,
      }

      // console.log(requestData)
      const response = await axiosInstance.post(
        `update_email_temps?id=${id}`,
        qs.stringify(requestData)
      )
      console.log(response)

      if (response.data['status_code'] === '0') {
        toast.success('Template editted successfully!')
        onClose()
        fetchEmailList()
        setSubj('')
        setAdcontent('')
        setAdlink('')
        setMyAdvert('')
        setReflink('')
      }
      // resetForm()
    } catch (error) {
      console.error('Error sending bulk emails:', error)
    }
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Edit Template">
      <div>
        {loading ? (
          // Show a loading indicator while data is being fetched
          <p>Loading...</p>
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            // validationSchema={validationSchema}
          >
            {(bulkEmailFormValues) => (
              <form onSubmit={bulkEmailFormValues.handleSubmit} className="">
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <div className="flex flex-col col-span-1 gap-2">
                    <label htmlFor="">Subject</label>
                    <input
                      type="text"
                      className="px-2 py-1 border rounded bg-gray-50 focus:outline-none"
                      name="subj"
                      id="subj"
                      // value={bulkEmailFormValues.values.subj}
                      value={subj}
                      onChange={(e) => {
                        // e.stopPropagation()
                        setSubj(e.target.value)
                      }}
                      // onChange={bulkEmailFormValues.handleChange}
                    />
                  </div>
                  <div className="flex flex-col col-span-1 gap-2">
                    <label htmlFor="">Advert Link</label>
                    <input
                      type="text"
                      className="px-2 py-1 border rounded bg-gray-50 focus:outline-none"
                      name="adlink"
                      id="adlink"
                      // value={bulkEmailFormValues.values.adlink}
                      value={adlink}
                      onChange={(e) => setAdlink(e.target.value)}
                      // onChange={bulkEmailFormValues.handleChange}
                    />
                  </div>
                  <div className="flex flex-col col-span-1 gap-2">
                    <label htmlFor="">My Advert</label>
                    <input
                      type="text"
                      className="px-2 py-1 border rounded bg-gray-50 focus:outline-none"
                      name="myadvert"
                      id="myadvert"
                      // value={bulkEmailFormValues.values.myadvert}
                      value={myadvert}
                      onChange={(e) => setMyAdvert(e.target.value)}
                      // onChange={bulkEmailFormValues.handleChange}
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
                      onChange={(e) => setReflink(e.target.value)}
                      // onChange={bulkEmailFormValues.handleChange}
                    />
                  </div>
                  <div className="flex flex-col col-span-2 gap-2">
                    <label htmlFor="">Advert Content</label>
                    <Editor
                      placeholder="Write anything you want."
                      // value={bulkEmailFormValues.values.adcontent}
                      value={adcontent}
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
                    className="px-4 py-2 mt-5 text-white bg-purple-500 rounded"
                  >
                    Submit
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
        )}
      </div>
    </Modal>
  )
}

export default EditTemplate
