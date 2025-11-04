import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface TypewriterInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerateFeedback: () => void;
  isGenerating: boolean;
}

const TypewriterInput = ({ 
  value, 
  onChange, 
  onGenerateFeedback,
  isGenerating 
}: TypewriterInputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      {/* Paper Texture Background */}
      <div className="holographic rounded-xl p-6 space-y-4 shadow-cinematic">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-title text-foreground/90">
            Your Story
          </h3>
          <Button
            onClick={onGenerateFeedback}
            disabled={!value.trim() || isGenerating}
            variant="outline"
            size="sm"
            className="border-accent/30 hover:border-accent hover:shadow-gold transition-all duration-300"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Get AI Feedback
              </>
            )}
          </Button>
        </div>

        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Once upon a time, in a world where imagination knew no bounds..."
          className="min-h-[400px] resize-none bg-card/50 backdrop-blur-sm border-2 border-muted/30 focus:border-primary text-foreground font-body text-base leading-relaxed transition-all duration-300"
          style={{
            fontFamily: "var(--font-body)",
            lineHeight: "1.8",
          }}
        />

        {/* Word Count */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{value.length} characters</span>
          <span>{value.trim().split(/\s+/).filter(Boolean).length} words</span>
        </div>
      </div>

      {/* Decorative Film Strip */}
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-32 bg-gradient-to-b from-primary via-secondary to-accent opacity-30 rounded-full" />
    </motion.div>
  );
};

export default TypewriterInput;
