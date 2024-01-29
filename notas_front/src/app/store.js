import { configureStore } from '@reduxjs/toolkit'
import noteSlice from '../reducer/notes/notesSlice'

const store = configureStore({
   reducer: {
      notes: noteSlice,
      //  filter: filterReducer
   }
})

//ejecuta exios obtener datos y luego guarda al store de redux con setNotes, debe estar en app, por que queremos que se inicia cuando se inicia la app
// noteServicie.getAll().then(notes => {
//    store.dispatch(setNotes(notes))
// })

export default store