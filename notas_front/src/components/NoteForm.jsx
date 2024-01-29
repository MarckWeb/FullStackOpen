import { useState } from "react"
import { useDispatch } from "react-redux"
import { createNote } from "../reducer/notes/notesSlice"
import noteService from '../services/notes'

/* eslint-disable react/prop-types */
const NoteForm = () => {
   const [newNote, setNewNote] = useState('')
   const disptach = useDispatch()

   const handleChange = (event) => {
      setNewNote(event.target.value)
   }

   //cuando se trabaj con axios una vez que se guardo con exito a la db recien se actualiza el estado en redux

   const addNote = async (event) => {
      event.preventDefault()
      const noteSave = await noteService.create({
         content: newNote,
         important: true
      })
      disptach(createNote(noteSave))
      setNewNote('')
   }

   return (
      <div >
         <h2>Create a new note</h2>

         <form onSubmit={addNote}>
            <input
               name="note"
               value={newNote}
               onChange={handleChange}
            />
            <button type="submit">save</button>
         </form>
      </div>
   )
}

export default NoteForm
