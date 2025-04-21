import { Card, CardContent } from "@/components/ui/card";

interface EIScores {
  "self-awareness": number;
  "self-regulation": number;
  "motivation": number;
  "empathy": number;
  "social-skills": number;
}

interface EIRadarChartProps {
  scores: EIScores;
}

export default function EIRadarChart({ scores }: EIRadarChartProps) {
  // Convert scores to coordinates for the polygon
  const getPolygonPoints = () => {
    // These positions correspond to the data points on the radar chart
    const maxRadius = 40; // 0-100 score, 40% of chart radius
    
    // Calculate points based on scores (0-100)
    const selfAwarenessPoint = `50,${15 - (scores["self-awareness"] / 100 * maxRadius)}`;
    const selfRegulationPoint = `${80 - (scores["self-regulation"] / 100 * maxRadius)},38`;
    const motivationPoint = `${75 - (scores["motivation"] / 100 * maxRadius)},70`;
    const empathyPoint = `${25 + (scores["empathy"] / 100 * maxRadius)},70`;
    const socialSkillsPoint = `${20 + (scores["social-skills"] / 100 * maxRadius)},38`;
    
    return `${selfAwarenessPoint} ${selfRegulationPoint} ${motivationPoint} ${empathyPoint} ${socialSkillsPoint}`;
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-5">
        <h2 className="font-semibold mb-6">EI Skills Overview</h2>
        
        <div className="flex justify-center mb-8">
          <div className="relative h-64 w-64 rounded-full border border-neutral-200 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-3/4 w-3/4 rounded-full border border-neutral-200 flex items-center justify-center">
                <div className="h-2/4 w-2/4 rounded-full border border-neutral-200"></div>
              </div>
            </div>
            
            {/* Self-awareness data point */}
            <div className="absolute top-[15%] left-[50%] h-3 w-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[10%] left-[50%] text-xs text-neutral-600 transform -translate-x-1/2 -translate-y-1/2">
              Self-awareness
            </div>
            
            {/* Self-regulation data point */}
            <div className="absolute top-[38%] left-[80%] h-3 w-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[35%] left-[85%] text-xs text-neutral-600 transform -translate-x-1/2 -translate-y-1/2">
              Self-regulation
            </div>
            
            {/* Motivation data point */}
            <div className="absolute top-[70%] left-[75%] h-3 w-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[75%] left-[75%] text-xs text-neutral-600 transform -translate-x-1/2 -translate-y-1/2">
              Motivation
            </div>
            
            {/* Empathy data point */}
            <div className="absolute top-[70%] left-[25%] h-3 w-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[75%] left-[25%] text-xs text-neutral-600 transform -translate-x-1/2 -translate-y-1/2">
              Empathy
            </div>
            
            {/* Social Skills data point */}
            <div className="absolute top-[38%] left-[20%] h-3 w-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[35%] left-[15%] text-xs text-neutral-600 transform -translate-x-1/2 -translate-y-1/2">
              Social Skills
            </div>
            
            {/* Polygon shape connecting the data points */}
            <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              <polygon 
                points={getPolygonPoints()}
                fill="rgba(78, 106, 255, 0.2)" 
                stroke="rgba(78, 106, 255, 0.8)" 
                strokeWidth="1" 
              />
            </svg>
          </div>
        </div>
        
        <div className="flex justify-between text-center">
          <div>
            <div className="text-2xl font-semibold text-primary">{scores["self-awareness"]}</div>
            <div className="text-sm text-neutral-600">Self-awareness</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-primary">{scores["self-regulation"]}</div>
            <div className="text-sm text-neutral-600">Self-regulation</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-primary">{scores["motivation"]}</div>
            <div className="text-sm text-neutral-600">Motivation</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-primary">{scores["empathy"]}</div>
            <div className="text-sm text-neutral-600">Empathy</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-primary">{scores["social-skills"]}</div>
            <div className="text-sm text-neutral-600">Social Skills</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
