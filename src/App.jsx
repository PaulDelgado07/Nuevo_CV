import { useEffect, useRef } from 'react'
import { LiquidGlass } from '@ybouane/liquidglass'
import './App.css'

function App() {
  const rootRef = useRef(null)
  const glassRef = useRef(null)
  const projectBtnRef = useRef(null)
  const contactBtnRef = useRef(null)
  const instanceRef = useRef(null)

  useEffect(() => {
    if (!rootRef.current || !glassRef.current || !projectBtnRef.current || !contactBtnRef.current) return

    let cancelled = false

    const initGlass = async () => {
      const instance = await LiquidGlass.init({
        root: rootRef.current,
        glassElements: [glassRef.current, projectBtnRef.current, contactBtnRef.current],
        defaults: {
          blurAmount: 0.18,
          refraction: 0.75,
          cornerRadius: 28,
          floating: true,
          opacity: 0.95,
        },
      })

      if (!cancelled) {
        instanceRef.current = instance
      }
    }

    initGlass()

    return () => {
      cancelled = true
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
  }, [])

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">Mi Portafolio</div>
        <nav className="nav-links">
          <a href="#about">Sobre mí</a>
          <a href="#projects">Proyectos</a>
          <a href="#contact">Experiencia</a>
          <a href="#habilidades">Habilidades</a>
        </nav>
      </header>

      <main className="app-main">
        <section className="hero-section">
          <div ref={rootRef} className="liquid-root">
            <div ref={glassRef} className="glass-panel">
              <div className="glass-copy">
                <h1>Paúl David Delgado Vergara</h1>
                <p>Estudiante de Ciencia de Datos y Desarrollo. Apasionado por crear soluciones útiles que unan tecnología, visión analítica y diseño.</p>
                <div className="hero-actions">
                  <a ref={projectBtnRef} href="#projects" className="glass-button" data-config={JSON.stringify({ button: true, cornerRadius: 24 })}>Proyectos</a>
                  <a ref={contactBtnRef} href="#contact" className="glass-button" data-config={JSON.stringify({ button: true, cornerRadius: 24 })}>Contacto</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2026 Mi Portafolio</p>
      </footer>
    </div>
  )
}

export default App
