import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

const FEATURES = [
    {
        icon: '◈',
        title: 'Discover Events',
        desc: 'Browse the full calendar of campus workshops, seminars, cultural nights, and tech talks — all in one place.',
    },
    {
        icon: '◉',
        title: 'Register Instantly',
        desc: 'Claim your spot in seconds. No account needed — just your name and email and you\'re in.',
    },
    {
        icon: '◎',
        title: 'Admin Control',
        desc: 'Event organizers get a clean dashboard to create, update, and track registrations in real time.',
    },
];

const STEPS = [
    { num: '01', label: 'Browse', desc: 'Explore upcoming campus events by date, category, or venue.' },
    { num: '02', label: 'Reserve', desc: 'Fill out a quick registration form and lock in your seat.' },
    { num: '03', label: 'Attend', desc: 'Show up. Learn something. Connect with people who care.' },
];

export default function Landing() {
    return (
        <>
            <Nav />

            {/* ── Hero ── */}
            <section style={{
                minHeight: 'calc(100vh - 61px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '4rem 1.5rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Fixed video background — stays put while page scrolls */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        position: 'fixed',
                        top: 0, left: 0,
                        width: '100vw',
                        height: '100vh',
                        objectFit: 'cover',
                        zIndex: -2,
                    }}
                >
                    <source src="/hero.mp4" type="video/mp4" />
                </video>

                {/* Fixed dark overlay — also stays put */}
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'linear-gradient(to bottom, rgba(13,15,20,0.65) 0%, rgba(13,15,20,0.45) 50%, rgba(13,15,20,0.80) 100%)',
                    zIndex: -1,
                }} />

                {/* Hero content above the overlay */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <p className="eyebrow" style={{ animationDelay: '0s', animation: 'fadeUp 0.5s ease both' }}>
                        Campus Event Platform
                    </p>

                    <h1 style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        fontWeight: 900,
                        lineHeight: 1.05,
                        letterSpacing: '-0.03em',
                        marginTop: '0.5rem',
                        maxWidth: 800,
                        margin: '0.5rem auto 0',
                        animation: 'fadeUp 0.55s ease both',
                        animationDelay: '0.06s',
                    }}>
                        Every great event<br />
                        <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>starts with a seat.</em>
                    </h1>

                    <div className="gold-rule" style={{ margin: '1.5rem auto', animation: 'fadeUp 0.55s ease both', animationDelay: '0.12s' }} />

                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                        maxWidth: 480,
                        margin: '0 auto',
                        lineHeight: 1.8,
                        animation: 'fadeUp 0.55s ease both',
                        animationDelay: '0.18s',
                    }}>
                        EventSphere is a centralized registration platform for campus events —
                        built for students, managed by organizers.
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginTop: '2.5rem',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        animation: 'fadeUp 0.55s ease both',
                        animationDelay: '0.24s',
                    }}>
                        <Link to="/events" className="btn btn-primary" style={{ fontSize: '0.78rem' }}>
                            Browse Events →
                        </Link>
                        <Link to="/signup" className="btn btn-outline" style={{ fontSize: '0.78rem' }}>
                            Create an Event
                        </Link>
                    </div>
                </div>

                {/* Scroll hint */}
                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--text-dim)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    animation: 'fadeUp 0.55s ease both',
                    animationDelay: '0.5s',
                    zIndex: 2,
                }}>
                    <div style={{
                        width: '1px',
                        height: '40px',
                        background: 'linear-gradient(to bottom, var(--gold-dim), transparent)',
                    }} />
                    Scroll
                </div>
            </section>


            {/* ── Features ── */}
            <section style={{ padding: '6rem 1.5rem', borderTop: '1px solid var(--border)', background: 'var(--bg)', position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <p className="eyebrow" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>What we offer</p>
                    <h2 style={{ textAlign: 'center', marginBottom: '3.5rem' }}>Built for campus life</h2>

                    <div className="grid">
                        {FEATURES.map((f, i) => (
                            <div key={f.title} className={`card stagger-${i + 1}`} style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '1.8rem',
                                    color: 'var(--gold)',
                                    marginBottom: '1rem',
                                    fontFamily: 'monospace',
                                }}>
                                    {f.icon}
                                </div>
                                <h3 style={{
                                    fontFamily: 'Playfair Display, serif',
                                    fontSize: '1.1rem',
                                    marginBottom: '0.75rem',
                                    color: 'var(--text)',
                                }}>
                                    {f.title}
                                </h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.7 }}>
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How it works ── */}
            <section style={{ padding: '6rem 1.5rem', borderTop: '1px solid var(--border)', background: 'var(--bg-card)', position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Simple by design</p>
                    <h2 style={{ marginBottom: '3rem' }}>How it works</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {STEPS.map((step, i) => (
                            <div key={step.num} style={{
                                display: 'grid',
                                gridTemplateColumns: '80px 1fr',
                                gap: '2rem',
                                padding: '2rem 0',
                                borderBottom: i < STEPS.length - 1 ? '1px solid var(--border)' : 'none',
                                animation: 'fadeUp 0.5s ease both',
                                animationDelay: `${i * 0.1}s`,
                            }}>
                                <div style={{
                                    fontFamily: 'Playfair Display, serif',
                                    fontSize: '2.5rem',
                                    fontWeight: 900,
                                    color: 'var(--border)',
                                    lineHeight: 1,
                                    paddingTop: '0.2rem',
                                }}>
                                    {step.num}
                                </div>
                                <div>
                                    <h3 style={{
                                        fontFamily: 'Playfair Display, serif',
                                        fontSize: '1.3rem',
                                        fontWeight: 700,
                                        color: 'var(--gold)',
                                        marginBottom: '0.5rem',
                                    }}>
                                        {step.label}
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{
                padding: '7rem 1.5rem',
                borderTop: '1px solid var(--border)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--bg)',
                zIndex: 1,
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px', height: '300px',
                    background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '1rem' }}>
                    Ready to find your next event?
                </h2>
                <div className="gold-rule" style={{ margin: '1rem auto 1.5rem' }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2.5rem', maxWidth: 400, margin: '0 auto 2rem' }}>
                    Join hundreds of students already using EventSphere to stay engaged on campus.
                </p>
                <Link to="/events" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.9rem 2.5rem' }}>
                    Explore Events →
                </Link>
            </section>

            {/* ── Footer ── */}
            <footer style={{
                borderTop: '1px solid var(--border)',
                padding: '2rem 1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                maxWidth: '100%',
                background: 'var(--bg)',
                position: 'relative',
                zIndex: 1,
            }}>
                <span style={{ fontFamily: 'Playfair Display, serif', color: 'var(--gold)', fontSize: '0.9rem' }}>
                    EventSphere
                </span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                    Campus Event Registration Platform — Production Deployment Project
                </span>
            </footer>
        </>
    );
}
