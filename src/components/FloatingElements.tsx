import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingItem {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

const FloatingElements = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);
  
  const emojis = ['🧸', '💕', '☁️', '💖', '🤍', '💗', '🎀'];

  useEffect(() => {
    const generateItems = () => {
      const newItems: FloatingItem[] = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 10,
        size: 1 + Math.random() * 1.5,
      }));
      setItems(newItems);
    };
    
    generateItems();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            left: `${item.x}%`,
            fontSize: `${item.size}rem`,
          }}
        >
          <motion.span
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="inline-block"
          >
            {item.emoji}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
