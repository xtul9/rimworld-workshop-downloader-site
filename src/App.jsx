import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Downloads from './components/Downloads'
import Changelog from './components/Changelog'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Features />
        <Downloads />
        <Changelog />
      </main>
      <Footer />
    </div>
  )
}

export default App

