import { motion } from "framer-motion";
import { Heart, User, Film } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Story {
  id: number;
  title: string;
  author: string;
  genre: string;
  excerpt: string;
  votes: number;
}

interface VoteReelProps {
  story: Story;
  hasVoted: boolean;
  onVote: () => void;
  isUserStory?: boolean;
}

const VoteReel = ({ story, hasVoted, onVote, isUserStory = false }: VoteReelProps) => {
  const genreColors = {
    romance: "from-pink-500 to-rose-500",
    thriller: "from-blue-600 to-indigo-600",
    scifi: "from-cyan-500 to-teal-500",
  };

  const gradient = genreColors[story.genre as keyof typeof genreColors] || "from-primary to-secondary";

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className={`
        holographic rounded-xl p-6 space-y-4 
        border-2 transition-all duration-300
        ${hasVoted ? "border-primary shadow-neon" : "border-card/30"}
        ${isUserStory ? "ring-2 ring-accent/50" : ""}
      `}
    >
      {isUserStory && (
        <div className="mb-2 inline-block px-3 py-1 rounded-full bg-accent/20 border border-accent/50 text-xs font-title text-accent uppercase tracking-wider">
          Your Story ⭐
        </div>
      )}
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-2xl font-title text-foreground mb-2">
            {story.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{story.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Film className="w-4 h-4" />
              <span className="capitalize">{story.genre}</span>
            </div>
          </div>
        </div>
        
        {/* Genre Badge */}
        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-xs font-title uppercase tracking-wider`}>
          {story.genre}
        </div>
      </div>

      {/* Excerpt */}
      <p className="text-foreground/80 leading-relaxed font-body text-sm">
        {story.excerpt}
      </p>

      {/* Vote Section */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Heart
            className={`w-5 h-5 ${hasVoted ? "fill-primary text-primary" : "text-muted-foreground"}`}
          />
          <span className={`text-sm font-body ${hasVoted ? "text-primary font-semibold" : "text-muted-foreground"}`}>
            {story.votes + (hasVoted ? 1 : 0)} votes
          </span>
        </div>

        <Button
          onClick={onVote}
          variant={hasVoted ? "default" : "outline"}
          size="sm"
          className={`
            font-title tracking-wider transition-all duration-300
            ${hasVoted
              ? "bg-gradient-hero hover:shadow-neon"
              : "border-primary/30 hover:border-primary hover:shadow-neon"
            }
          `}
        >
          {hasVoted ? "Voted ✓" : "Vote 🎬"}
        </Button>
      </div>

      {/* Film Strip Decoration */}
      {hasVoted && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          className="h-1 bg-gradient-accent rounded-full"
        />
      )}
    </motion.div>
  );
};

export default VoteReel;
