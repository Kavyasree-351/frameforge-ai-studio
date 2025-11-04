import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Lightbulb, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import TypewriterInput from "@/components/TypewriterInput";
import PromptSelector from "@/components/PromptSelector";
import AIAgentBubble from "@/components/AIAgentBubble";

const prompts = [
  { id: 1, pair: "Shadow & Spotlight", icon: Lightbulb },
  { id: 2, pair: "Clock & Rain", icon: Heart },
  { id: 3, pair: "Mirror & Echo", icon: Users },
  { id: 4, pair: "Door & Key", icon: Lightbulb },
  { id: 5, pair: "Moon & Tide", icon: Heart },
];

const WriterStudio = () => {
  const [story, setStory] = useState("");
  const [title, setTitle] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);
  const [aiFeedback, setAiFeedback] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  
  const userName = localStorage.getItem("frameforge-user") || "Creator";
  const genre = localStorage.getItem("frameforge-genre") || "story";

  const handlePromptSelect = (promptId: number) => {
    setSelectedPrompt(promptId);
    const prompt = prompts.find(p => p.id === promptId);
    if (prompt) {
      setAiFeedback(`Great choice! "${prompt.pair}" can create powerful contrasts. Try exploring themes of duality and transformation.`);
    }
  };

  const generateAIFeedback = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const feedbacks = [
        "Strong opening! Consider adding more sensory details to immerse readers.",
        "Your dialogue feels natural. Try varying sentence length for better rhythm.",
        "The emotional arc is compelling. Add a surprising twist to elevate tension.",
        "Excellent character development! Layer in more internal conflict.",
        "The pacing works well. Consider a stronger hook in the first paragraph.",
      ];
      setAiFeedback(feedbacks[Math.floor(Math.random() * feedbacks.length)]);
      setIsGenerating(false);
    }, 1500);
  };

  const handleSubmit = () => {
    if (story.trim() && title.trim()) {
      localStorage.setItem("frameforge-story", story);
      localStorage.setItem("frameforge-title", title);
      navigate("/data-visualization");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2 mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-title text-gradient-neon">
            Writer's Studio
          </h1>
          <p className="text-lg text-muted-foreground">
            Crafting a <span className="text-accent capitalize">{genre}</span> masterpiece
          </p>
        </motion.div>

        {/* Main Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
          {/* Left: Prompt Selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="holographic rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-title text-foreground/90">
                Cinematic Prompts
              </h3>
              <PromptSelector
                prompts={prompts}
                selectedPrompt={selectedPrompt}
                onSelect={handlePromptSelect}
              />
            </div>
          </motion.div>

          {/* Center: Typewriter Input */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-6"
          >
            <div className="holographic rounded-xl p-4 mb-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your story title..."
                className="w-full bg-transparent border-none text-2xl font-title text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
            
            <TypewriterInput
              value={story}
              onChange={setStory}
              onGenerateFeedback={generateAIFeedback}
              isGenerating={isGenerating}
            />
            
            <Button
              onClick={handleSubmit}
              disabled={!story.trim() || !title.trim()}
              className="w-full mt-4 h-12 text-lg font-title bg-gradient-hero hover:shadow-neon transition-all duration-300"
            >
              <Send className="w-5 h-5 mr-2" />
              Submit Story
            </Button>
          </motion.div>

          {/* Right: AI Director */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            <AIAgentBubble
              feedback={aiFeedback}
              isGenerating={isGenerating}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WriterStudio;
