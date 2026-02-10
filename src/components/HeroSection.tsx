import { motion } from 'framer-motion';
import { useState } from 'react';

const HeroSection = () => {
  const [isHugging, setIsHugging] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleHugClick = () => {
    setIsHugging(true);
    setTimeout(() => {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setIsHugging(false);
      }, 2000);
    }, 300);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teddy-pink/30 rounded-full blur-3xl animate-pulse-heart" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teddy-lavender/40 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teddy-peach/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Teddy Icon */}
        <motion.div
          className="text-8xl md:text-9xl mb-6"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🧸
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-pacifico text-gradient mb-6 leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          You Are My Favorite Teddy 🧸
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-xl md:text-2xl text-foreground/80 font-quicksand mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          On this Teddy Day, I want to hug you forever 💖
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="teddy-button text-foreground relative"
          onClick={handleHugClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85 }}
          animate={isHugging ? { scale: [1, 0.8, 1.1, 1] } : {}}
          transition={{ duration: 0.4 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Give Me a Hug 🤗
          </span>
          
          {/* Button Shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
        </motion.button>

        {/* Hug Message Popup */}
        {showMessage && (
          <motion.div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-8"
            initial={{ opacity: 0, scale: 0, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="bg-card px-8 py-4 rounded-3xl shadow-lg border border-primary/20">
              <span className="text-xl">🤗 *warm teddy hug* 🧸💕</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-foreground/50">
          <span className="text-sm font-quicksand"></span>
          <span className="text-2xl"></span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
