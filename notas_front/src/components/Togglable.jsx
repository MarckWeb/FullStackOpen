/* eslint-disable react/prop-types */
import { useState } from 'react'

const Togglable = (props) => {
   const [visible, setVisible] = useState(false)

   const hideWhenVisible = { display: visible ? 'none' : '' }
   const showWhenVisible = { display: visible ? '' : 'none' }

   const toggleVisibility = () => {
      setVisible(!visible)
   }

   return (
      <div>
         <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>{props.buttonLabel}</button>
         </div>
         <div style={showWhenVisible}>
            {/* en esta parte se vera sus etiquetas o componentes hijos de este componente en este caso el form */}
            {props.children}
            <button onClick={toggleVisibility}>cancel</button>
         </div>
      </div>
   )
}

export default Togglable
