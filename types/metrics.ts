export interface Metrics {
  totalAgents: number;
  moralAgents: number;
  nonMoralAgents: number;
  averageHP: number;
  maxHP: number;
  minHP: number;
  averageReputation?: number;
  maxReputation?: number;
  minReputation?: number;
}

export interface MetricsPanelProps {
  metrics: Metrics | null;
} 