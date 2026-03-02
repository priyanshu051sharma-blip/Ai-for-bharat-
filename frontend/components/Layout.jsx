import Nav from './Nav'
export default function Layout({ children }) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-[#fff7f7] to-[#fff5f5]'>
      <Nav />
      <main className='max-w-7xl mx-auto p-6'>{children}</main>
    </div>
  )
}