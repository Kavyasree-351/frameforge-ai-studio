import { motion } from "framer-motion";
import { Trophy, Star, Medal } from "lucide-react";

interface Winner {
  rank: number;
  title: string;
  author: string;
  votes: number;
  badge: string;
  description: string;
}

interface LeaderboardPosterProps {
  winner: Winner;
}

const LeaderboardPoster = ({ winner }: LeaderboardPosterProps) => {
  const isTopThree = winner.rank <= 3;
  
  const rankColors = {
    1: "from-amber-500 via-yellow-400 to-amber-500",
    2: "from-gray-300 via-gray-100 to-gray-300",
    3: "from-orange-600 via-orange-400 to-orange-600",
  };

  const rankIcons = {
    1: Trophy,
    2: Medal,
    3: Star,
  };

  const RankIcon = rankIcons[winner.rank as keyof typeof rankIcons] || Star;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className={`
        relative holographic rounded-xl p-6 
        border-2 transition-all duration-300
        ${isTopThree
          ? "border-primary shadow-cinematic"
          : "border-card/30"
        }
      `}
    >
      {/* Rank Badge */}
      <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-neon border-4 border-background">
        <span className="text-xl font-title text-foreground">#{winner.rank}</span>
      </div>

      {/* Top 3 Crown */}
      {isTopThree && (
        <motion.div
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="absolute -top-6 -right-6"
        >
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${rankColors[winner.rank as keyof typeof rankColors]} flex items-center justify-center shadow-gold`}>
            <RankIcon className="w-8 h-8 text-background" />
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="space-y-4 pl-8">
        <div>
          <h3 className="text-2xl font-title text-foreground mb-1">
            {winner.title}
          </h3>
          <p className="text-sm text-muted-foreground">by {winner.author}</p>
        </div>

        <p className="text-foreground/80 text-sm font-body italic">
          "{winner.description}"
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-title text-accent">{winner.votes}</span>
            <span className="text-sm text-muted-foreground">votes</span>
          </div>

          <div className="px-4 py-1 rounded-full bg-gradient-accent text-xs font-title uppercase tracking-wider text-background">
            {winner.badge}
          </div>
        </div>
      </div>

      {/* Spotlight Effect for Top 3 */}
      {isTopThree && (
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent rounded-xl pointer-events-none"
        />
      )}
    </motion.div>
  );
};

export default LeaderboardPoster;
