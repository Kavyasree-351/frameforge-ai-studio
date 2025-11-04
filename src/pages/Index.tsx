import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Film, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroStudio from "@/assets/hero-studio.jpg";

const Index = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleEnter = () => {
    if (name.trim()) {
      localStorage.setItem("frameforge-user", name);
      navigate("/genre-selection");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background Hero Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${heroStudio})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      {/* Animated Spotlight */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 max-w-3xl"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <Film className="w-16 h-16 text-primary animate-pulse" />
            <h1 className="text-7xl md:text-9xl font-title text-gradient-neon tracking-wider">
              FrameForge
            </h1>
            <Sparkles className="w-16 h-16 text-accent animate-pulse" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl md:text-3xl font-body text-foreground/80 italic"
          >
            The Probability of Imagination
          </motion.p>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-4"
          >
            <p className="text-lg md:text-xl text-muted-foreground font-light">
              Step into a cinematic universe where storytelling meets AI creativity.
            </p>
            <p className="text-md text-muted-foreground/70">
              Create stories • Get AI feedback • Compete on the leaderboard
            </p>
          </motion.div>

          {/* Name Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="w-full max-w-md mx-auto space-y-4"
          >
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter Your Name 🎬"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleEnter()}
                className="h-14 text-lg text-center bg-card/50 backdrop-blur-sm border-2 border-primary/30 focus:border-primary glow-neon transition-all duration-300 placeholder:text-muted-foreground/50"
              />
            </div>

            <Button
              onClick={handleEnter}
              disabled={!name.trim()}
              className="w-full h-14 text-xl font-title tracking-wider bg-gradient-hero hover:shadow-neon transition-all duration-300 disabled:opacity-50"
            >
              Step Into The Studio
            </Button>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex items-center justify-center gap-8 text-muted-foreground/50"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="text-sm font-body uppercase tracking-widest">Hackathon Project</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent via-primary to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
