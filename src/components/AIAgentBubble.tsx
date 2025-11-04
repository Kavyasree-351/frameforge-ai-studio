import { motion, AnimatePresence } from "framer-motion";
import { Brain, Loader2 } from "lucide-react";

interface AIAgentBubbleProps {
  feedback: string;
  isGenerating: boolean;
}

const AIAgentBubble = ({ feedback, isGenerating }: AIAgentBubbleProps) => {
  return (
    <div className="holographic rounded-xl p-6 space-y-4 h-full">
      {/* Agent Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-glow flex items-center justify-center shadow-cyan">
          <Brain className="w-6 h-6 text-background" />
        </div>
        <div>
          <h3 className="text-lg font-title text-foreground/90">
            AI Director
          </h3>
          <p className="text-xs text-muted-foreground">Creative Assistant</p>
        </div>
      </div>

      {/* Feedback Content */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm font-body">Analyzing your story...</span>
            </motion.div>
          ) : feedback ? (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {/* Sticky Note Style */}
              <div className="relative bg-accent/10 border-l-4 border-accent rounded-r-lg p-4 shadow-gold">
                <p className="text-sm font-handwritten text-foreground/90 leading-relaxed">
                  {feedback}
                </p>
                
                {/* Decorative Pin */}
                <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-accent shadow-lg" />
              </div>

              {/* Agent Modes */}
              <div className="grid grid-cols-1 gap-2 pt-2">
                <button className="p-2 rounded-lg bg-card/30 hover:bg-card/50 border border-muted/20 hover:border-primary/30 transition-all duration-300 text-left">
                  <span className="text-xs font-body text-foreground/80">
                    🎬 Director's Cut
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Structure & pacing advice
                  </p>
                </button>
                <button className="p-2 rounded-lg bg-card/30 hover:bg-card/50 border border-muted/20 hover:border-primary/30 transition-all duration-300 text-left">
                  <span className="text-xs font-body text-foreground/80">
                    ✍️ Writer's Room
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Dialogue enhancement
                  </p>
                </button>
                <button className="p-2 rounded-lg bg-card/30 hover:bg-card/50 border border-muted/20 hover:border-primary/30 transition-all duration-300 text-left">
                  <span className="text-xs font-body text-foreground/80">
                    ❤️ Emotion Lens
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Character emotion depth
                  </p>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 space-y-3"
            >
              <div className="text-6xl">🎭</div>
              <p className="text-sm text-muted-foreground font-body">
                Start writing to receive AI guidance
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIAgentBubble;
