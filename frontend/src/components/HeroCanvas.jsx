import { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 205;
const FPS = 24;

function pad(n) {
    return String(n).padStart(3, '0');
}

export default function HeroCanvas() {
    const canvasRef = useRef(null);
    const frameRef = useRef(1);
    const imagesRef = useRef([]);
    const rafRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Preload all frames
        let loaded = 0;
        const images = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
            const img = new Image();
            img.src = `/frames/ezgif-frame-${pad(i + 1)}.jpg`;
            img.onload = () => {
                loaded++;
                if (loaded === TOTAL_FRAMES) startAnimation();
            };
            return img;
        });
        imagesRef.current = images;

        // Resize canvas to fill container
        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        let last = 0;
        const interval = 1000 / FPS;

        function startAnimation() {
            function loop(ts) {
                rafRef.current = requestAnimationFrame(loop);
                if (ts - last < interval) return;
                last = ts;

                const img = imagesRef.current[frameRef.current - 1];
                if (img?.complete) {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                }

                frameRef.current = frameRef.current >= TOTAL_FRAMES ? 1 : frameRef.current + 1;
            }
            rafRef.current = requestAnimationFrame(loop);
        }

        // Draw frame 1 immediately while loading
        const firstImg = new Image();
        firstImg.src = '/frames/ezgif-frame-001.jpg';
        firstImg.onload = () => ctx.drawImage(firstImg, 0, 0, canvas.width, canvas.height);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
            }}
        />
    );
}
