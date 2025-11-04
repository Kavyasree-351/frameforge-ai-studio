import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Film } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden flex items-center justify-center">
      {/* Ambient Effects */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] animate-pulse delay-500" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center space-y-8 px-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <Film className="w-24 h-24 text-primary mx-auto mb-4 animate-pulse" />
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-title text-gradient-neon">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-title text-foreground/90">
            Scene Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            This scene doesn't exist in our cinematic universe. Let's get you back to the story.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={() => navigate("/")}
            className="h-14 px-8 text-lg font-title bg-gradient-hero hover:shadow-neon transition-all duration-300"
          >
            <Home className="w-5 h-5 mr-2" />
            Return to Studio
          </Button>
        </motion.div>

        <div className="flex items-center justify-center gap-8 text-muted-foreground/50 pt-8">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <span className="text-sm font-body uppercase tracking-widest">Error 404</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent via-primary to-transparent" />
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
