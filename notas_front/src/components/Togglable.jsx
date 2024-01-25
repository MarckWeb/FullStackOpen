/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { useState, forwardRef, useImperativeHandle } from 'react'
//La función que crea el componente está envuelta dentro de una llamada de función forwardRef. De esta forma el componente puede acceder a la referencia que le está asignada.
const Togglable = forwardRef((props, refs) => {
   const [visible, setVisible] = useState(false)

   const hideWhenVisible = { display: visible ? 'none' : '' }
   const showWhenVisible = { display: visible ? '' : 'none' }

   const toggleVisibility = () => {
      setVisible(!visible)
   }

   //la función useImperativeHandle es un hook de React, que se usa para definir funciones en un componente que se pueden invocar desde fuera del componente.
   //es decir que la funciond e su cuerpo se ejecute de cualquier componente
   useImperativeHandle(refs, () => {
      return {
         toggleVisibility
      }
   })

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
})

export default Togglable
