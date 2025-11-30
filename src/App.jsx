import BackgroundAnimation from './components/BackgroundAnimation'

function App() {
  return (
    <div className="relative min-h-screen text-white font-sans">
      <BackgroundAnimation />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mb-6 drop-shadow-2xl">
          Antigravity
        </h1>
        <p className="text-2xl text-slate-300 max-w-2xl font-light">
          Experience the weightless flow of digital innovation.
        </p>
        <button className="mt-10 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(8,145,178,0.5)] hover:shadow-[0_0_40px_rgba(8,145,178,0.7)]">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default App
