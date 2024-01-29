import { createSlice } from '@reduxjs/toolkit'
import noteService from '../../services/notes'

const noteSlice = createSlice({
   name: 'notes',
   initialState: [],
   reducers: {
      // createNote(state, action) {
      //    console.log(action)
      //    const content = action.payload
      //    state.push(content)
      // },
      toggleImportanceOf(state, action) {
         const id = action.payload
         const noteToChange = state.find(n => n.id === id)

         const changedNote = {
            ...noteToChange,
            important: !noteToChange.important
         }

         return state.map(note =>
            note.id !== id ? note : changedNote
         )
      },

      //appendNote para añadir un objeto de una nota:
      appendNote(state, action) {
         state.push(action.payload)
      },

      //enves de usar apennNotes con forech y mostrar objetos uno por uno y no es la forma. y pro eso usamos setNotes

      //setNotes que se puede usar para reemplazar directamente el array de notas
      setNotes(state, action) {
         return action.payload
      }
   }

})

const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export {
   toggleImportanceOf,
   appendNote,
   setNotes
}

//Acciones asincrónicas y redux thunk-. no es genial que la comunicación con el servidor suceda dentro de las funciones de los componentes. Sería mejor si la comunicación pudiera abstraerse de los componentes para que no tengan que hacer nada más que llamar al creador de acciones apropiado.

//con redux thunk las acciones son funciones y no objetos

// Acción asíncrona que inicializa las notas
export const initializeNotes = () => {
   return async dispatch => {
      // Realiza la operación asíncrona para obtener las notas
      const notes = await noteService.getAll()
      // Despacha la acción síncrona para establecer las notas en el store
      dispatch(setNotes(notes))
   }
}

export const createNote = content => {
   return async dispatch => {
      const newNote = await noteService.createNew(content)
      dispatch(appendNote(newNote))
   }
}

export default noteSlice.reducer

