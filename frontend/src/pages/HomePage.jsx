import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { toast } from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import NotesNotFound from '../components/NotesNotFound'

const HomePage = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes')
        setNotes(res.data)
      } catch (error) {
        console.error('Error fetching notes:', error)
        toast.error('Error fetching notes')
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [])

  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-6 p-4'>
        {loading && (
          <div className='text-center text-primary py-10'>Loading notes...</div>
        )}
        {notes.length === 0 && !loading && <NotesNotFound />}
        {!loading && notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
            </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
