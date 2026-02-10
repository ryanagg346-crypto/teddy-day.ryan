import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface HeartRain {
  id: number;
  x: number;
  delay: number;
}

const GiftBox = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [hearts, setHearts] = useState<HeartRain[]>([]);

  const handleOpen = () => {
    if (isOpened) return;
    
    setIsOpened(true);
    
    // Generate heart rain
    const newHearts: HeartRain[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setHearts(newHearts);

    setTimeout(() => {
      setShowFinalMessage(true);
    }, 1500);
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden min-h-[80vh] flex items-center justify-center">
      {/* Heart Rain */}
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-2xl md:text-3xl pointer-events-none z-30"
            initial={{ y: -50, x: `${heart.x}vw`, opacity: 0 }}
            animate={{
              y: '100vh',
              opacity: [0, 1, 1, 0],
              rotate: [0, 180, 360],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 4,
              delay: heart.delay,
              ease: 'linear',
            }}
          >
            {['💖', '💕', '💗', '🤍', '💓'][heart.id % 5]}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="max-w-xl mx-auto text-center relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-pacifico text-gradient mb-4">
            A Special Surprise 🎁
          </h2>
          <p className="text-foreground/70 font-quicksand text-lg">
            Click the gift to reveal your teddy surprise!
          </p>
        </motion.div>

        {/* Gift Box */}
        <motion.div
          className="relative inline-block cursor-pointer"
          onClick={handleOpen}
          whileHover={!isOpened ? { scale: 1.05 } : {}}
          whileTap={!isOpened ? { scale: 0.95 } : {}}
        >
          {/* Box Container */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
            {/* Gift Box Base */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-teddy-pink to-teddy-peach rounded-2xl shadow-xl"
              animate={isOpened ? { scale: 1.1 } : {}}
            >
              {/* Ribbon Vertical */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-teddy-rose/50 rounded-sm" />
              {/* Ribbon Horizontal */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-8 bg-teddy-rose/50 rounded-sm" />
              {/* Bow */}
              <motion.div
                className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl"
                animate={isOpened ? { y: -100, opacity: 0, rotate: 360 } : {}}
                transition={{ duration: 0.8 }}
              >
                🎀
              </motion.div>
            </motion.div>

            {/* Lid */}
            <motion.div
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-56 md:w-72 h-12 bg-gradient-to-br from-teddy-pink to-teddy-rose rounded-xl shadow-lg"
              animate={
                isOpened
                  ? { y: -80, rotateX: -90, opacity: 0 }
                  : { y: [0, -5, 0] }
              }
              transition={
                isOpened
                  ? { duration: 0.6, ease: 'easeOut' }
                  : { duration: 2, repeat: Infinity }
              }
            />

            {/* Teddy Pop Out */}
            <AnimatePresence>
              {isOpened && (
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 text-8xl md:text-9xl"
                  initial={{ y: 50, scale: 0, opacity: 0 }}
                  animate={{
                    y: -60,
                    scale: 1,
                    opacity: 1,
                    rotate: [0, -10, 10, -5, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease: 'backOut',
                  }}
                >
                  🧸
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Click Hint */}
          {!isOpened && (
            <motion.p
              className="mt-8 text-foreground/60 font-quicksand"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap to open! 👆
            </motion.p>
          )}
        </motion.div>

        {/* Final Love Message */}
        <AnimatePresence>
          {showFinalMessage && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="teddy-card p-8 max-w-md mx-auto"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <motion.div
                  className="text-5xl mb-4"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  💖
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-pacifico text-gradient mb-3">
                  Happy Teddy Day!
                </h3>
                <p className="text-foreground/80 font-quicksand text-lg">
                  You're the most huggable person in my life. Just like a teddy,
                  I want to hold you close forever! 🧸💕
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GiftBox;
