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

const EditTemplate = ({ isVisible, onClose, ref_id, fetchEmailList }) => {
  const { email, user_name } = useSelector((state) => state.user.user)
  const [subj, setSubj] = useState('')
  const [adlink, setAdlink] = useState('')
  const [adcontent, setAdcontent] = useState('')
  const [myadvert, setMyAdvert] = useState('')
  const [reflink, setReflink] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`email_template_list?${ref_id}`)

        if (res.data.result && res.data.result.length > 0) {
          setSubj(res.data.result[0].subj)
          setAdlink(res.data.result[0].adlink)
          setAdcontent(res.data.result[0].adcontent)
          setMyAdvert(res.data.result[0].myadvert)
          setReflink(res.data.result[0].reflink)
        } else {
          console.log('Data is empty or undefined')
        }
      } catch (error) {
        console.log(error)
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

  const onSubmit = async (values, { resetForm }) => {
    try {
      const requestData = {
        subj: values.subj,
        name: values.name,
        adlink: values.adlink,
        adcontent: values.adcontent,
        myadvert: values.myadvert,
        reflink: values.reflink,
        email: values.email,
      }

      // console.log(requestData)
      const response = await axiosInstance.post(
        'create_email_temps',
        qs.stringify(requestData)
      )

      if (response.data['status_code'] === '0') {
        toast.success('Template editted successfully!')
        onClose()
        fetchEmailList()
      }
      resetForm()
    } catch (error) {
      console.error('Error sending bulk emails:', error)
    }
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Edit Template">
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
                  <label htmlFor="">Subject</label>
                  <input
                    type="text"
                    className="px-2 py-1 border rounded bg-gray-50 focus:outline-none"
                    name="subj"
                    id="subj"
                    value={bulkEmailFormValues.values.subj}
                    // onChange={(e) => {
                    //   e.stopPropagation()
                    //   setSubj(e.target.value)
                    // }}
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
                    // onChange={(e) => setAdlink(e.target.value)}
                    onChange={bulkEmailFormValues.handleChange}
                  />
                </div>
                <div className="flex flex-col col-span-1 gap-2">
                  <label htmlFor="">Advert</label>
                  <input
                    type="text"
                    className="px-2 py-1 border rounded bg-gray-50 focus:outline-none"
                    name="myadvert"
                    id="myadvert"
                    value={bulkEmailFormValues.values.myadvert}
                    // onChange={(e) => setMyAdvert(e.target.value)}
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
                    value={bulkEmailFormValues.values.reflink}
                    // onChange={(e) => setReflink(e.target.value)}
                    onChange={bulkEmailFormValues.handleChange}
                  />
                </div>
                <div className="flex flex-col col-span-2 gap-2">
                  <label htmlFor="">Advert Content</label>
                  <Editor
                    placeholder="Write anything you want."
                    // value={adcontent}
                    value={bulkEmailFormValues.values.adcontent}
                    // onChange={(value) => setAdcontent(value)}
                    onChange={bulkEmailFormValues.handleChange}
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
    </Modal>
  )
}

export default EditTemplate
