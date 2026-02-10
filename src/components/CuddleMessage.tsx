import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const CuddleMessage = () => {
  const fullMessage = "Even if the Sun refuses to shine, the words refuse to rhyme… You will always be my Valentine. Happy Teddy Day! 🧸💖";
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setIsTyping(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('cuddle-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!isTyping) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullMessage.length) {
        setDisplayedText(fullMessage.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [isTyping]);

  return (
    <section
      id="cuddle-section"
      className="py-24 px-4 relative overflow-hidden"
    >
      {/* Heartbeat Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-teddy-pink/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Large Quote */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Quote Mark */}
          <motion.span
            className="text-8xl text-teddy-pink/30 font-pacifico block mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            "
          </motion.span>

          {/* Typewriter Text */}
          <div className="min-h-[120px] flex items-center justify-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-pacifico text-foreground/90 leading-relaxed">
              {displayedText}
              {isTyping && displayedText.length < fullMessage.length && (
                <motion.span
                  className="inline-block w-1 h-8 md:h-12 bg-teddy-rose ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </h2>
          </div>

          {/* Decorative Hearts */}
          <motion.div
            className="flex justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {['💕', '🧸', '💖', '🧸', '💕'].map((emoji, index) => (
              <motion.span
                key={index}
                className="text-3xl md:text-4xl"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CuddleMessage;
