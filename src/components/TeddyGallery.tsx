import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface TeddyData {
  id: number;
  emoji: string;
  name: string;
  message: string;
  size: string;
  color: string;
}

const teddies: TeddyData[] = [
  {
    id: 1,
    emoji: '🧸',
    name: 'Cuddly Bear',
    message: "I'll always be here for you! 💕",
    size: 'text-6xl',
    color: 'from-teddy-pink to-teddy-peach',
  },
  {
    id: 2,
    emoji: '🐻',
    name: 'Honey Bear',
    message: "You're sweeter than honey! 🍯",
    size: 'text-7xl',
    color: 'from-teddy-peach to-teddy-brown',
  },
  {
    id: 3,
    emoji: '🧸',
    name: 'Sleepy Bear',
    message: 'Dream of me tonight... 🌙',
    size: 'text-5xl',
    color: 'from-teddy-lavender to-teddy-pink',
  },
  {
    id: 4,
    emoji: '🐻‍❄️',
    name: 'Polar Cuddles',
    message: 'My love for you is polar-sized! ❄️',
    size: 'text-6xl',
    color: 'from-white to-teddy-lavender',
  },
];

const TeddyGallery = () => {
  const [activeMessage, setActiveMessage] = useState<number | null>(null);
  const [huggedTeddy, setHuggedTeddy] = useState<number | null>(null);

  const handleTeddyClick = (id: number) => {
    setHuggedTeddy(id);
    setActiveMessage(id);
    setTimeout(() => {
      setHuggedTeddy(null);
    }, 600);
    setTimeout(() => {
      setActiveMessage(null);
    }, 3000);
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-pacifico text-gradient mb-4">
            Meet the Teddy Squad 🧸
          </h2>
          <p className="text-lg text-foreground/70 font-quicksand">
            Click on a teddy to receive a special hug!
          </p>
        </motion.div>

        {/* Teddy Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {teddies.map((teddy, index) => (
            <motion.div
              key={teddy.id}
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`teddy-card flex flex-col items-center justify-center aspect-square cursor-pointer bg-gradient-to-br ${teddy.color}/20`}
                whileHover={{ y: -10 }}
                animate={
                  huggedTeddy === teddy.id
                    ? {
                        scale: [1, 1.2, 0.9, 1.1, 1],
                        rotate: [0, -10, 10, -5, 0],
                      }
                    : {}
                }
                transition={{ duration: 0.6 }}
                onClick={() => handleTeddyClick(teddy.id)}
              >
                {/* Teddy */}
                <motion.span
                  className={`${teddy.size} mb-3`}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  {teddy.emoji}
                </motion.span>
                
                {/* Name */}
                <span className="font-quicksand font-semibold text-foreground/80 text-sm md:text-base">
                  {teddy.name}
                </span>

                {/* Sparkle on hover */}
                <motion.div
                  className="absolute top-2 right-2 text-xl"
                  initial={{ scale: 0, rotate: 0 }}
                  whileHover={{ scale: 1, rotate: 180 }}
                >
                  ✨
                </motion.div>
              </motion.div>

              {/* Message Popup */}
              <AnimatePresence>
                {activeMessage === teddy.id && (
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap"
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -10, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  >
                    <div className="bg-card px-4 py-2 rounded-2xl shadow-lg border border-primary/30">
                      <span className="text-sm md:text-base font-quicksand">
                        {teddy.message}
                      </span>
                    </div>
                    {/* Arrow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
                      <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-card" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeddyGallery;
