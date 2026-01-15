import {
  Cloud,
  Shield,
  Headphones,
  Award,
  Target,
  Lightbulb,
  Heart,
  Mail,
  Phone,
  Linkedin,
  MessageSquare,
  Clock,
  MapPin,
  Workflow,
  Bot,
  ShieldCheck,
  LineChart,
  Laptop,
  Activity,
  FileCheck,
  Users,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Wrench,
  TrendingDown,
  LucideIcon,
} from "lucide-react";

// Icon registry - maps string names to Lucide icon components
export const iconRegistry: Record<string, LucideIcon> = {
  Cloud,
  Shield,
  Headphones,
  Award,
  Target,
  Lightbulb,
  Heart,
  Mail,
  Phone,
  Linkedin,
  MessageSquare,
  Clock,
  MapPin,
  Workflow,
  Bot,
  ShieldCheck,
  LineChart,
  Laptop,
  Activity,
  FileCheck,
  Users,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Wrench,
  TrendingDown,
};

// Type for icon names
export type IconName = keyof typeof iconRegistry;

// Helper function to get icon component from name
export function getIcon(name: IconName | string): LucideIcon | undefined {
  return iconRegistry[name];
}
