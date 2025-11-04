import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, PieChart, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";


const DataVisualization = () => {
  const navigate = useNavigate();
  const story = localStorage.getItem("frameforge-story") || "";
  const wordCount = story.trim().split(/\s+/).filter(Boolean).length;
  
  // Calculate dynamic AI analysis percentages based on story content
  const calculateEmotionData = () => {
    const emotionalWords = story.match(/\b(love|fear|joy|anger|sad|happy|excited|nervous|passionate|tender)\b/gi) || [];
    const actionWords = story.match(/\b(run|jump|fight|chase|grab|throw|catch|strike|push|pull)\b/gi) || [];
    const mysteryWords = story.match(/\b(mystery|secret|hidden|unknown|wonder|curious|strange|odd)\b/gi) || [];
    
    const total = emotionalWords.length + actionWords.length + mysteryWords.length || 1;
    const joy = Math.round((emotionalWords.length / total) * 100);
    const tension = Math.round((actionWords.length / total) * 100);
    const mystery = 100 - joy - tension;
    
    return [
      { name: "Joy", value: Math.max(15, joy), color: "hsl(45, 100%, 50%)" },
      { name: "Tension", value: Math.max(25, tension), color: "hsl(333, 100%, 65%)" },
      { name: "Mystery", value: Math.max(20, mystery), color: "hsl(185, 100%, 50%)" },
    ];
  };
  
  const calculateDialogueData = () => {
    const sentences = story.split(/[.!?]+/).filter(Boolean);
    const sections = 4;
    const sectionSize = Math.ceil(sentences.length / sections);
    
    return Array.from({ length: sections }, (_, i) => {
      const sectionStart = i * sectionSize;
      const sectionEnd = (i + 1) * sectionSize;
      const sectionText = sentences.slice(sectionStart, sectionEnd).join(" ");
      const dialogueMatches = sectionText.match(/["']/g) || [];
      const density = Math.min(100, Math.round((dialogueMatches.length / 2) * 8 + 20 + Math.random() * 15));
      
      const labels = ["Opening", "Rising", "Climax", "Resolution"];
      return { section: labels[i], density };
    });
  };
  
  // Calculate probability based on multiple factors
  const calculateProbability = () => {
    const lengthScore = Math.min(30, wordCount / 10);
    const varietyScore = new Set(story.toLowerCase().match(/\b\w+\b/g) || []).size / 10;
    const structureScore = story.split(/[.!?]+/).filter(Boolean).length > 5 ? 20 : 10;
    const dialogueScore = (story.match(/["']/g) || []).length > 4 ? 15 : 5;
    
    return Math.min(95, Math.max(45, Math.round(lengthScore + varietyScore + structureScore + dialogueScore + Math.random() * 10)));
  };
  
  const emotionData = calculateEmotionData();
  const dialogueData = calculateDialogueData();
  const probability = calculateProbability();

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden py-12">
      {/* Ambient Effects */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-[150px] animate-pulse delay-500" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-title text-gradient-neon">
            Data Roll
          </h1>
          <p className="text-lg text-muted-foreground">
            Visual analytics of your cinematic creation
          </p>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {/* Emotion Balance */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="holographic rounded-xl p-6 space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <PieChart className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-title text-foreground/90">
                Emotion vs Action Balance
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPie>
                <Pie
                  data={emotionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {emotionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(265, 44%, 20%)",
                    border: "1px solid hsl(265, 44%, 25%)",
                    borderRadius: "8px",
                    color: "hsl(40, 100%, 95%)",
                  }}
                />
                <Legend />
              </RechartsPie>
            </ResponsiveContainer>
          </motion.div>

          {/* Dialogue Density */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="holographic rounded-xl p-6 space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-6 h-6 text-secondary" />
              <h3 className="text-xl font-title text-foreground/90">
                Dialogue Density Over Time
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dialogueData}>
                <XAxis
                  dataKey="section"
                  stroke="hsl(40, 50%, 75%)"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="hsl(40, 50%, 75%)" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(265, 44%, 20%)",
                    border: "1px solid hsl(265, 44%, 25%)",
                    borderRadius: "8px",
                    color: "hsl(40, 100%, 95%)",
                  }}
                />
                <Bar dataKey="density" fill="hsl(185, 100%, 50%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Probability Wheel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="holographic rounded-xl p-8 space-y-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-title text-foreground/90">
                Cinematic Impact Probability
              </h3>
            </div>

            {/* Probability Ring */}
            <div className="relative w-64 h-64 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Circle */}
                <circle
                  cx="128"
                  cy="128"
                  r="100"
                  fill="none"
                  stroke="hsl(265, 44%, 25%)"
                  strokeWidth="20"
                />
                {/* Progress Circle */}
                <motion.circle
                  cx="128"
                  cy="128"
                  r="100"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 100}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 100 }}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 100 * (1 - probability / 100),
                  }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(333, 100%, 65%)" />
                    <stop offset="50%" stopColor="hsl(45, 100%, 50%)" />
                    <stop offset="100%" stopColor="hsl(185, 100%, 50%)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.5, type: "spring" }}
                  className="text-center"
                >
                  <div className="text-5xl font-title text-gradient-neon">
                    {Math.round(probability)}%
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Success Rate
                  </div>
                </motion.div>
              </div>
            </div>

            <p className="text-muted-foreground max-w-md mx-auto">
              Based on story structure, emotional depth, and creative uniqueness
            </p>

            <Button
              onClick={() => navigate("/voting-gallery")}
              className="h-12 px-8 text-lg font-title bg-gradient-hero hover:shadow-neon transition-all duration-300"
            >
              Continue to Voting
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DataVisualization;
