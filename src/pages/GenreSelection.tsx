import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Ghost, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilmReelCard from "@/components/FilmReelCard";

const genres = [
  {
    id: "romance",
    name: "Romance",
    description: "Love stories that warm the heart",
    icon: Heart,
    color: "from-pink-500 via-rose-500 to-red-500",
    glow: "shadow-[0_0_40px_rgba(236,72,153,0.6)]",
  },
  {
    id: "thriller",
    name: "Thriller",
    description: "Edge-of-your-seat suspense",
    icon: Ghost,
    color: "from-blue-600 via-indigo-600 to-purple-600",
    glow: "shadow-[0_0_40px_rgba(79,70,229,0.6)]",
  },
  {
    id: "scifi",
    name: "Sci-Fi",
    description: "Explore the infinite possibilities",
    icon: Rocket,
    color: "from-cyan-500 via-teal-500 to-emerald-500",
    glow: "shadow-[0_0_40px_rgba(6,182,212,0.6)]",
  },
];

const GenreSelection = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const navigate = useNavigate();
  const userName = localStorage.getItem("frameforge-user") || "Creator";

  const handleGenreSelect = (genreId: string) => {
    setSelectedGenre(genreId);
    setTimeout(() => {
      localStorage.setItem("frameforge-genre", genreId);
      navigate("/writer-studio");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-500" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-title text-gradient-neon">
            Choose Your Genre
          </h1>
          <p className="text-xl text-muted-foreground">
            Welcome, <span className="text-foreground font-semibold">{userName}</span> 🎬
          </p>
          <p className="text-lg text-muted-foreground/70">
            Select a cinematic world to begin your story
          </p>
        </motion.div>

        {/* Genre Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {genres.map((genre, index) => (
            <motion.div
              key={genre.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <FilmReelCard
                genre={genre}
                isSelected={selectedGenre === genre.id}
                onClick={() => handleGenreSelect(genre.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <p className="text-sm uppercase tracking-widest">Select to continue</p>
            <div className="h-px w-32 bg-gradient-to-l from-transparent via-primary to-transparent" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GenreSelection;
