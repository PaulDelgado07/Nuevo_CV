import { useEffect, useRef } from 'react'
import { LiquidGlass } from '@ybouane/liquidglass'
import './App.css'

function App() {
  const rootRef = useRef(null)
  const glassRef = useRef(null)
  const instanceRef = useRef(null)

  useEffect(() => {
    if (!rootRef.current || !glassRef.current) return

    let cancelled = false

    const initGlass = async () => {
      const instance = await LiquidGlass.init({
        root: rootRef.current,
        glassElements: [glassRef.current],
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
        <div ref={rootRef} className="liquid-root">
          <div className="liquid-background">
            <section id="about" className="hero-section">
              <h1>Hola, soy Paul</h1>
              <p>Desarrollador web en formación y apasionado por crear experiencias digitales.</p>
              <button type="button" className="cta-button">
                Ver proyectos
              </button>
            </section>

            <section id="projects" className="content-section">
              <h2>Proyectos</h2>
              <p>Aquí irá una lista de tus proyectos destacados.</p>
            </section>
          </div>

          <div
            ref={glassRef}
            className="liquid-glass-card"
            data-config={JSON.stringify({
              blurAmount: 0.2,
              refraction: 0.8,
              cornerRadius: 28,
              floating: true,
            })}
          >
            <p className="glass-label">Liquid Glass</p>
            <h3>Panel de ejemplo</h3>
            <p>Este bloque usa el efecto de vidrio líquido sobre el fondo.</p>
          </div>

        </div>

        <section id="contact" className="content-section">
          <h2>Contacto</h2>
          <p>Puedes escribirme si quieres trabajar juntos o conversar sobre ideas.</p>
        </section>
      </main>

      <footer className="app-footer">
        <p>© 2026 Mi Portafolio</p>
      </footer>
    </div>
  )
}

export default App
