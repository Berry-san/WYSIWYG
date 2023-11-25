import Modal from './Modal'
import qs from 'qs'
import axiosInstance from '../utils/API_SERVICE'
import { toast } from 'react-toastify'
import { Formik } from 'formik'
import Editor from './Editor'
import { useSelector } from 'react-redux'

const CreateTemplate = ({ isVisible, onClose, fetchEmailList }) => {
  const { email } = useSelector((state) => state.user.user)
  const initialValues = {
    name: '',
    subj: '',
    adlink: '',
    adcontent: '',
    myadvert: '',
    reflink: '',
  }

  const onSubmit = async (values, { resetForm }) => {
    try {
      const requestData = {
        subj: values.subj,
        name: values.name,
        adlink: values.adlink,
        adcontent: values.adcontent,
        reflink: values.reflink,
        myadvert: values.myadvert,
        email: email,
      }

      // Log the data instead of sending it to an API
      console.log(requestData)
      const response = await axiosInstance.post(
        'create_email_temps',
        qs.stringify(requestData)
      )
      console.log(response.data)
      if (response.data['status_code'] === '0') {
        toast.success('Template created successfully!')
        fetchEmailList()
      }

      resetForm()
    } catch (error) {
      console.error('Error sending bulk emails:', error)
      toast.error(error.message)
    }
    onClose()
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose} title="Create Template">
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
                    value={bulkEmailFormValues.values.reflink}
                    onChange={bulkEmailFormValues.handleChange}
                  />
                </div>
                <div className="flex flex-col col-span-1 gap-2">
                  <label htmlFor="">My Advert</label>
                  <input
                    type="text"
                    className="px-2 py-1 border rounded bg-gray-50 focus:outline-none"
                    name="myadvert"
                    id="myadvert"
                    value={bulkEmailFormValues.values.myadvert}
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
    </Modal>
  )
}
export default CreateTemplate
