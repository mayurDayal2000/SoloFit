import { ArrowDownCircle, Target, TrendingUp, Trophy, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        aria-label="Hero section"
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image
            alt="Fitness background"
            className="object-cover"
            fill
            priority
            quality={85}
            sizes="100vw"
            src="/hero-fitness.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-secondary/80 to-accent/90" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg leading-tight">
            Level Up Your Body with SoloFit
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 drop-shadow-md max-w-3xl mx-auto leading-relaxed px-2">
            Transform into your strongest self with personalized daily challenges, tailored to your
            body and goals. Crush workouts, stay hydrated, and track your progress like a true
            Shadow Monarch.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto sm:max-w-none">
            <Link className="w-full sm:w-auto" href="/auth">
              <Button
                className="w-full sm:w-auto text-base sm:text-lg px-8 py-6 sm:py-7 min-h-[56px] shadow-elevated hover:scale-105 transition-all duration-300 focus:ring-4 focus:ring-primary/50 focus:outline-none"
                size="lg"
              >
                Start Your Journey
              </Button>
            </Link>
            <Link className="w-full sm:w-auto" href="/auth">
              <Button
                className="w-full sm:w-auto text-base sm:text-lg px-8 py-6 sm:py-7 min-h-[56px] bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50 shadow-elevated transition-all duration-300 focus:ring-4 focus:ring-white/50 focus:outline-none"
                size="lg"
                variant="outline"
              >
                Sign In
              </Button>
            </Link>
          </div>

          <div aria-hidden="true" className="mt-12 sm:mt-16 animate-bounce hidden sm:block">
            <ArrowDownCircle className="w-8 h-8 mx-auto text-white/60" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        aria-labelledby="features-heading"
        className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background"
      >
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 md:mb-20 animate-slide-up"
            id="features-heading"
          >
            Your Fitness, Gamified
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <FeatureCard
              description="Earn XP and level up as you complete workouts and hit your goals"
              icon={<Trophy className="w-10 h-10 sm:w-12 sm:h-12" />}
              title="Level Up System"
            />
            <FeatureCard
              description="Monitor your body measurements, weight, and fitness journey"
              icon={<TrendingUp className="w-10 h-10 sm:w-12 sm:h-12" />}
              title="Track Progress"
            />
            <FeatureCard
              description="Get personalized workouts that adapt to your fitness level"
              icon={<Zap className="w-10 h-10 sm:w-12 sm:h-12" />}
              title="Daily Challenges"
            />
            <FeatureCard
              description="Set and achieve your fitness goals with smart tracking"
              icon={<Target className="w-10 h-10 sm:w-12 sm:h-12" />}
              title="Goal Setting"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="bg-gradient-card border border-border rounded-xl p-6 sm:p-8 hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 focus-within:ring-2 focus-within:ring-primary/50 group">
      <div
        aria-hidden="true"
        className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300"
      >
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{description}</p>
    </article>
  );
}
