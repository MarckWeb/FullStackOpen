import { createSlice } from '@reduxjs/toolkit'

const noteSlice = createSlice({
   name: 'notes',
   initialState: [],
   reducers: {
      createNote(state, action) {
         const content = action.payload
         state.push(content)
      },
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



const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export {
   createNote,
   toggleImportanceOf,
   appendNote,
   setNotes
}

export default noteSlice.reducer