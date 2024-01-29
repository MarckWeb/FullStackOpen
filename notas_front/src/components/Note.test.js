/* eslint-disable no-undef */
import React from 'react'
//import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom';
import {render} from '@testing-library/react'
import Note from './Note'

test('renderizar contenidos', ()=> {
   const note = {
      content: 'Mi primera prueba con jest',
      important: true
   }
//render devuelve un objeto que tiene varias propiedades. Una de las propiedades se llama container y contiene todo el HTML renderizado por el componente.
   const component = render(
      <Note note={note} />
   )

   expect(component.container).toHaveTextContent('Mi primera prueba con jest')
})