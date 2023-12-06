import { useState } from 'react'

const SidebarLinkGroup = ({ activeCondition, children }) => {
  const [open, setOpen] = useState(activeCondition)

  const handleClick = () => {
    setOpen(!open)
  }

  return <li>{children(handleClick, open)}</li>
}

export default SidebarLinkGroup
// SidebarLinkGroup component
// import { useState, useEffect } from 'react'

// const SidebarLinkGroup = ({ activeCondition, children }) => {
//   const [open, setOpen] = useState(activeCondition)
//   console.log(activeCondition, open)

//   useEffect(() => {
//     // Set the initial state based on the activeCondition
//     setOpen(activeCondition)
//   }, [activeCondition])

//   const handleClick = () => {
//     setOpen(!open)
//   }

//   return <li>{children(handleClick, open)}</li>
// }

// export default SidebarLinkGroup
