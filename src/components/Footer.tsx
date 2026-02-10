import { motion } from 'framer-motion';

const Footer = () => {
  const valentineWeek = [
    { day: 'Rose Day', date: 'Feb 7', emoji: '🌹', active: false },
    { day: 'Propose Day', date: 'Feb 8', emoji: '💍', active: false },
    { day: 'Chocolate Day', date: 'Feb 9', emoji: '🍫', active: false },
    { day: 'Teddy Day', date: 'Feb 10', emoji: '🧸', active: true },
    { day: 'Promise Day', date: 'Feb 11', emoji: '🤞', active: false },
    { day: 'Hug Day', date: 'Feb 12', emoji: '🤗', active: false },
    { day: 'Kiss Day', date: 'Feb 13', emoji: '💋', active: false },
    { day: "Valentine's", date: 'Feb 14', emoji: '💝', active: false },
  ];

  return (
    <footer className="py-16 px-4 relative bg-gradient-to-t from-teddy-pink/20 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Valentine's Week Indicator */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-pacifico text-center text-gradient mb-8">
            Valentine's Week 💕
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {valentineWeek.map((item, index) => (
              <motion.div
                key={item.day}
                className={`
                  flex flex-col items-center p-3 md:p-4 rounded-2xl transition-all
                  ${item.active 
                    ? 'bg-gradient-to-br from-teddy-pink to-teddy-peach shadow-lg scale-110' 
                    : 'bg-card/50 hover:bg-card'
                  }
                `}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: item.active ? 1.1 : 1.05 }}
              >
                <span className="text-2xl md:text-3xl mb-1">{item.emoji}</span>
                <span className={`text-xs md:text-sm font-quicksand font-semibold ${item.active ? 'text-foreground' : 'text-foreground/70'}`}>
                  {item.day}
                </span>
                <span className={`text-xs font-quicksand ${item.active ? 'text-foreground/80' : 'text-foreground/50'}`}>
                  {item.date}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Text */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-quicksand text-foreground/60 flex items-center justify-center gap-2">
            Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              💖
            </motion.span> 
            and lots of teddy hugs 🧸
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
