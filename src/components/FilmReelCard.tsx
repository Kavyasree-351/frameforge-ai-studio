import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Genre {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  glow: string;
}

interface FilmReelCardProps {
  genre: Genre;
  isSelected: boolean;
  onClick: () => void;
}

const FilmReelCard = ({ genre, isSelected, onClick }: FilmReelCardProps) => {
  const Icon = genre.icon;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative w-full h-80 rounded-2xl overflow-hidden
        border-2 transition-all duration-500
        ${isSelected 
          ? `border-primary ${genre.glow}` 
          : "border-card/30 hover:border-primary/50"
        }
      `}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-20`} />
      
      {/* Holographic Overlay */}
      <div className="absolute inset-0 holographic" />

      {/* Film Reel Decoration */}
      <div className="absolute -top-8 -right-8 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="animate-reel-spin">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="50" cy="20" r="5" fill="currentColor" />
          <circle cx="50" cy="80" r="5" fill="currentColor" />
          <circle cx="20" cy="50" r="5" fill="currentColor" />
          <circle cx="80" cy="50" r="5" fill="currentColor" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 space-y-6">
        <motion.div
          animate={isSelected ? { rotate: 360 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Icon className="w-20 h-20 text-foreground" strokeWidth={1.5} />
        </motion.div>

        <div className="text-center space-y-2">
          <h3 className="text-3xl font-title text-foreground tracking-wider">
            {genre.name}
          </h3>
          <p className="text-sm text-muted-foreground font-body">
            {genre.description}
          </p>
        </div>

        {isSelected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2"
          >
            <span className="text-xs font-title tracking-widest text-primary uppercase">
              ✓ Selected
            </span>
          </motion.div>
        )}
      </div>

      {/* Border Glow Effect */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 border-2 border-primary rounded-2xl animate-pulse"
        />
      )}
    </motion.button>
  );
};

export default FilmReelCard;
