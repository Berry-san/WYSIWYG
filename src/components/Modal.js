const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null

  const handleClose = (e) => {
    if (e.target.id === 'backdrop') onClose()
  }
  return (
    <div
      className="fixed inset-0 z-40 grid w-full bg-black bg-opacity-25 backdrop-blur-sm place-items-center "
      id="backdrop"
      onClick={handleClose}
    >
      <div className="relative flex flex-col w-full max-w-5xl max-h-full p-4 overflow-auto bg-white rounded">
        <div className="text-black px-2">{children}</div>
      </div>
    </div>
  )
}

export default Modal
