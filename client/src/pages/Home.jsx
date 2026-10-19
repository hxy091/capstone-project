import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Hi, I'm Hao</h1>
        <p>A Full-Stack Web Developer building modern, responsive web applications.</p>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/projects" className="btn">View My Work</Link>
          <Link to="/contact" className="btn btn-outline">Get In Touch</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
