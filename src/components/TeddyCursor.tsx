import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'sparkle';
}

interface ClickBurst {
  id: number;
  x: number;
  y: number;
}

const TeddyCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [clickBursts, setClickBursts] = useState<ClickBurst[]>([]);

  const addParticle = useCallback((x: number, y: number) => {
    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x,
      y,
      type: 'heart',
    };
    setParticles((prev) => [...prev.slice(-15), newParticle]);
  }, []);

  const addClickBurst = useCallback((x: number, y: number) => {
    const bursts = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
    }));
    setClickBursts((prev) => [...prev, ...bursts]);
    setTimeout(() => {
      setClickBursts((prev) => prev.filter((b) => !bursts.find((nb) => nb.id === b.id)));
    }, 800);
  }, []);

  useEffect(() => {
    let frameCount = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      frameCount++;
      if (frameCount % 4 === 0) {
        addParticle(e.clientX, e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      addClickBurst(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [addParticle, addClickBurst]);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) => prev.slice(-10));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Particle Trail */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed pointer-events-none z-[9998]"
            style={{ left: particle.x - 8, top: particle.y - 8 }}
          >
            <span className="text-teddy-rose text-lg">💕</span>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Click Burst */}
      <AnimatePresence>
        {clickBursts.map((burst, index) => (
          <motion.div
            key={burst.id}
            initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
            animate={{
              scale: 1.5,
              opacity: 0,
              x: Math.cos((index * 60 * Math.PI) / 180) * 50,
              y: Math.sin((index * 60 * Math.PI) / 180) * 50,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed pointer-events-none z-[9999]"
            style={{ left: burst.x - 10, top: burst.y - 10 }}
          >
            <span className="text-xl">{index % 2 === 0 ? '💖' : '✨'}</span>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Cursor (Teddy Paw) */}
      <motion.div
        className="fixed pointer-events-none z-[10000] flex items-center justify-center"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isClicking ? 0.8 : isHovering ? 1.3 : 1,
          rotate: isHovering ? [0, -5, 5, -5, 5, 0] : 0,
        }}
        transition={{
          x: { type: 'spring', stiffness: 500, damping: 28 },
          y: { type: 'spring', stiffness: 500, damping: 28 },
          scale: { type: 'spring', stiffness: 300, damping: 20 },
          rotate: { duration: 0.5 },
        }}
      >
        <div className={`text-3xl transition-all duration-150 ${isHovering ? 'glow-cursor rounded-full' : ''}`}>
          🧸
        </div>
      </motion.div>

      {/* Cursor Glow */}
      <motion.div
        className="fixed pointer-events-none z-[9997] w-16 h-16 rounded-full"
        animate={{
          x: position.x - 32,
          y: position.y - 32,
          opacity: isHovering ? 0.4 : 0.2,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 30,
        }}
        style={{
          background: 'radial-gradient(circle, hsl(350 100% 91% / 0.6) 0%, transparent 70%)',
        }}
      />
    </>
  );
};

export default TeddyCursor;
