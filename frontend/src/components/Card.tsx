import { User } from '../types'

export const Card = ({ user }: { user: User }) => {
  return (
    <article className="flex flex-col min-h-[15rem] w-[20rem] sm:w-[12rem] justify-between rounded-xl bg-slate-900 shadow-lg">
      <header className="flex bg-slate-950 justify-center items-center rounded-t-xl py-5">
        <div className="rounded-full bg-black w-[80px] h-[80px] border-2 border-red-500">
          <img
            src={user.thumbnail}
            alt="Profile Img"
            className="rounded-full object-cover w-full h-full"
          />
        </div>
      </header>

      <section className="flex flex-col gap-1 justify-center items-center p-2">
        <h1 className="text-xl font-bold capitalize p-3">{user.name}</h1>
        <p className="text-sm">{user.profession}</p>
        <p className="text-sm">{user.nationality}</p>
      </section>

      <footer className="flex min-h-10 bg-slate-950 rounded-b-xl"></footer>
    </article>
  )
}
