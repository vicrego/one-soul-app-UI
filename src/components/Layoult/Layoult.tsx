import React from 'react'
import NavBar from '../Head/navigation/NavBar'

const Layoult = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavBar props={props.props} />
      {children}
    </div>
  )
}

export default Layoult