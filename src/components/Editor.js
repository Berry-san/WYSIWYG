import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function Editor({ value, onChange, id, name, placeholder }) {
  const [editorHtml, setEditorHtml] = useState('')
  const [theme, setTheme] = useState('snow')
  // console.log(value, onChange, id, name)

  // const handleChange = (html) => {
  //   setEditorHtml(html)
  // }

  return (
    <div>
      <ReactQuill
        theme={theme}
        onChange={onChange}
        value={value}
        id={id}
        name={name}
        modules={Editor.modules}
        formats={Editor.formats}
        bounds=".app"
        placeholder="Write any text"
      />
    </div>
  )
}

Editor.propTypes = {
  placeholder: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string, // Declare value as a prop
  onChange: PropTypes.func, // Declare onChange as a prop
}

Editor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
}

Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

export default Editor
