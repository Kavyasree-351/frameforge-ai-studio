import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Prompt {
  id: number;
  pair: string;
  icon: LucideIcon;
}

interface PromptSelectorProps {
  prompts: Prompt[];
  selectedPrompt: number | null;
  onSelect: (id: number) => void;
}

const PromptSelector = ({ prompts, selectedPrompt, onSelect }: PromptSelectorProps) => {
  return (
    <div className="space-y-3">
      {prompts.map((prompt, index) => {
        const Icon = prompt.icon;
        const isSelected = selectedPrompt === prompt.id;

        return (
          <motion.button
            key={prompt.id}
            onClick={() => onSelect(prompt.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`
              w-full p-4 rounded-lg border-2 transition-all duration-300
              flex items-center gap-3 text-left
              ${isSelected
                ? "border-primary bg-primary/10 shadow-neon"
                : "border-card/30 bg-card/20 hover:border-primary/50"
              }
            `}
          >
            <Icon 
              className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
            />
            <span className={`font-body text-sm ${isSelected ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
              {prompt.pair}
            </span>
            {isSelected && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto text-primary text-xs"
              >
                ✓
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default PromptSelector;
