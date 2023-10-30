import Homepage from './pages/Homepage'

function App() {
  const endDate = new Date().getTime() + 2*24*60*60*1000

  return (
    <div>
      <Homepage endDate={endDate} />
    </div>
  )
}

export default App
