import { motion } from "framer-motion";
import { Trophy, Star, Sparkles, Crown, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LeaderboardPoster from "@/components/LeaderboardPoster";

const winners = [
  {
    rank: 1,
    title: "Between the Tides",
    author: "Maria Garcia",
    votes: 51,
    badge: "🏆 Director's Choice",
    description: "A masterful blend of emotion and storytelling",
  },
  {
    rank: 2,
    title: "The Last Spotlight",
    author: "Emma Stone",
    votes: 42,
    badge: "💡 Cinematic Visionary",
    description: "Stunning visual narrative and atmosphere",
  },
  {
    rank: 3,
    title: "Echoes of Tomorrow",
    author: "James Chen",
    votes: 38,
    badge: "🎲 Wildcard Genius",
    description: "Innovative concept with perfect execution",
  },
  {
    rank: 4,
    title: "The Memory Collector",
    author: "Alex Kim",
    votes: 29,
    badge: "⭐ Rising Star",
    description: "Compelling characters and unique premise",
  },
  {
    rank: 5,
    title: "Midnight Symphony",
    author: "Sophie Laurent",
    votes: 24,
    badge: "✨ Creative Excellence",
    description: "Beautiful prose and emotional depth",
  },
];

const Leaderboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("frameforge-user") || "Creator";

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden py-12">
      {/* Spotlight Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px] animate-pulse delay-500" />

      {/* Falling Confetti Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-accent rounded-full"
            initial={{
              top: "-10%",
              left: `${Math.random() * 100}%`,
              opacity: 0.8,
            }}
            animate={{
              top: "110%",
              opacity: 0,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Curtain Opening Animation */}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="fixed inset-0 bg-gradient-to-b from-card via-background to-card origin-top z-50 pointer-events-none"
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="flex items-center justify-center gap-4">
            <Crown className="w-12 h-12 text-accent animate-pulse" />
            <h1 className="text-6xl md:text-7xl font-title text-gradient-neon">
              Premiere Night
            </h1>
            <Crown className="w-12 h-12 text-accent animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground">
            Celebrating the finest cinematic stories
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground/70">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="uppercase tracking-widest">Top Creators</span>
            <div className="h-px w-32 bg-gradient-to-l from-transparent via-primary to-transparent" />
          </div>
        </motion.div>

        {/* Winners Display */}
        <div className="max-w-4xl mx-auto space-y-6 mb-12">
          {winners.map((winner, index) => (
            <motion.div
              key={winner.rank}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7 + index * 0.15 }}
            >
              <LeaderboardPoster winner={winner} />
            </motion.div>
          ))}
        </div>

        {/* User Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="holographic rounded-xl p-8 text-center space-y-4">
            <Star className="w-12 h-12 text-accent mx-auto" />
            <h3 className="text-2xl font-title text-foreground">
              Thank You, {userName}!
            </h3>
            <p className="text-muted-foreground">
              Your creative journey has contributed to the magic of FrameForge
            </p>
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="space-y-2">
                <div className="text-3xl font-title text-primary">1</div>
                <div className="text-xs text-muted-foreground uppercase">Stories Written</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-title text-secondary">500+</div>
                <div className="text-xs text-muted-foreground uppercase">XP Earned</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-title text-accent">3</div>
                <div className="text-xs text-muted-foreground uppercase">Badges Unlocked</div>
              </div>
            </div>

            <Button
              onClick={() => navigate("/")}
              className="mt-6 h-12 px-8 text-lg font-title bg-gradient-hero hover:shadow-neon transition-all duration-300"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Studio
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
