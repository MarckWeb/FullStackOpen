import './App.css'
import { useState, useEffect, Ref, useRef } from 'react'
import Note from './components/Note'
import Notification from './components/Notifications'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import loginService from './services/login'
import noteService from './services/notes'
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from './reducer/notes/notesSlice'
import { initializeNotes } from './reducer/notes/notesSlice'

const App = () => {

  //const [notes, setNotes] = useState([])
  const [user, setUser] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const noteFormRef = useRef()
  const dispatch = useDispatch()
  const allNotes = useSelector(state => state.notes)

  //la obetncion de datos ya se hace en redux store
  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
    //CERRAR SESION
    //window.localStorage.removeItem('loggedNoteappUser')
  }, [])

  const handleLoginUser = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)

      setUser(user)

    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notesToShow = showAll
    ? allNotes
    : allNotes.filter(note => note.important)

  return (
    <div>
      <h1>Notes app</h1>
      <Notification message={errorMessage} />
      {!user &&
        //renderiza todo las etiquetas que esta envolviendo el componente 
        <Togglable buttonLabel="log in">
          {/* login form componenete hijo de togglable */}
          <LoginForm
            handleLoginUser={handleLoginUser} />
        </Togglable>
      }

      {user &&
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm />
          </Togglable>
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>

        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => dispatch(toggleImportanceOf(note.id))}
          />
        )}

      </ul>

      <Footer />
    </div>
  )

}
export default App

//NOTA-. ver que funciones se estan compartiendo en otros compoennetes y si, es mejor utilizarlo en su propio componente
