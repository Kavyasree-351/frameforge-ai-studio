import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoteReel from "@/components/VoteReel";

const mockStories = [
  {
    id: 1,
    title: "The Last Spotlight",
    author: "Emma Stone",
    genre: "thriller",
    excerpt: "In the shadows of an abandoned theater, a forgotten actress discovers that some performances never truly end...",
    votes: 42,
  },
  {
    id: 2,
    title: "Echoes of Tomorrow",
    author: "James Chen",
    genre: "scifi",
    excerpt: "When the quantum radio starts receiving messages from the future, Sarah realizes she's been chosen to prevent a catastrophe...",
    votes: 38,
  },
  {
    id: 3,
    title: "Between the Tides",
    author: "Maria Garcia",
    genre: "romance",
    excerpt: "Two lightkeepers, one island, and a love that defied the stormy seas between them...",
    votes: 51,
  },
  {
    id: 4,
    title: "The Memory Collector",
    author: "Alex Kim",
    genre: "thriller",
    excerpt: "He trades in memories, buying and selling fragments of lives. But some memories should stay buried...",
    votes: 29,
  },
];

const VotingGallery = () => {
  const [votedStories, setVotedStories] = useState<Set<number>>(new Set());
  const navigate = useNavigate();
  
  // Get user's story details
  const userName = localStorage.getItem("frameforge-user") || "You";
  const userStory = localStorage.getItem("frameforge-story") || "";
  const userTitle = localStorage.getItem("frameforge-title") || "Untitled Story";
  const userGenre = localStorage.getItem("frameforge-genre") || "story";
  
  // Create user story object if exists
  const userStoryObj = userStory ? {
    id: 0,
    title: userTitle,
    author: userName,
    genre: userGenre,
    excerpt: userStory.substring(0, 150) + (userStory.length > 150 ? "..." : ""),
    votes: 0,
  } : null;
  
  // Combine user story with mock stories
  const allStories = userStoryObj ? [userStoryObj, ...mockStories] : mockStories;

  const handleVote = (storyId: number) => {
    setVotedStories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(storyId)) {
        newSet.delete(storyId);
      } else {
        newSet.add(storyId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden py-12">
      {/* Ambient Effects */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] animate-pulse delay-500" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-title text-gradient-neon">
            Audience Hall
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover and vote for the stories that move you
          </p>
          <div className="flex items-center justify-center gap-4 text-muted-foreground/70">
            <Heart className="w-5 h-5" />
            <span className="text-sm">
              {votedStories.size} {votedStories.size === 1 ? "vote cast" : "votes cast"}
            </span>
          </div>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
          {allStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <VoteReel
                story={story}
                hasVoted={votedStories.has(story.id)}
                onVote={() => handleVote(story.id)}
                isUserStory={story.id === 0}
              />
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={() => navigate("/leaderboard")}
            className="h-14 px-8 text-lg font-title bg-gradient-hero hover:shadow-neon transition-all duration-300"
          >
            <Trophy className="w-5 h-5 mr-2" />
            View Leaderboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default VotingGallery;
