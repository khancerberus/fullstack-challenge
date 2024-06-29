import { useRef, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { User } from './types'
import { UserService } from './services/users'
import { Card } from './components/Card'

function App() {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const inputFileRef = useRef<HTMLInputElement>(null)

  const onClickUpload = async () => {
    if (inputFileRef?.current?.files == null || inputFileRef.current.files.length === 0) {
      toast.error('No file selected')
      return
    }

    const file = inputFileRef.current.files[0]
    UserService.uploadFile({ file })
      .then((data) => {
        toast.success(data.message)
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  const fetchUsers = () => {
    UserService.fetchUsers({ search })
      .then((data) => {
        setUsers(data)
        toast.success('Users fetched')
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  return (
    <main className="flex flex-col w-screen items-center gap-5 py-5">
      <header className="flex flex-col md:flex-row p-2 gap-5 bg-slate-900 rounded-lg shadow-lg">
        <div className="flex flex-col justify-between gap-5 p-2">
          <input ref={inputFileRef} type="file" />
          <button onClick={onClickUpload}>Subir archivo</button>
        </div>

        <div className="flex flex-col justify-between gap-5 p-2">
          <input
            type="text"
            onChange={(event) => {
              setSearch(event.target.value)
            }}
          />
          <button onClick={fetchUsers}>Buscar</button>
        </div>
      </header>

      <section className="flex flex-wrap gap-5 justify-center px-2 lg:max-w-[70rem]">
        {users.map((user) => (
          <Card user={user} />
        ))}
      </section>

      <Toaster richColors />
    </main>
  )
}

export default App
