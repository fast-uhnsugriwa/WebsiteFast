import React from 'react';

interface CinematicLightBackgroundProps {
  /**
   * 'light': Optimized for white / light-stone backgrounds (Hero, Beranda)
   * 'dark': Optimized for dark obsidian / night banners (Sains Informasi)
   * 'ambient': Full page subtle ambient drift
   */
  variant?: 'light' | 'dark' | 'ambient';
  className?: string;
}

export const CinematicLightBackground: React.FC<CinematicLightBackgroundProps> = ({
  variant = 'light',
  className = ''
}) => {
  if (variant === 'dark') {
    return (
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
        aria-hidden="true"
      >
        {/* Pure Luminous White Specular Flare - Cinematic Core */}
        <div
          className="absolute -top-16 left-1/4 w-[460px] h-[460px] rounded-full blur-[100px] opacity-60 animate-cinematic-white"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.65) 25%, rgba(254, 240, 138, 0.3) 50%, transparent 70%)'
          }}
        />

        {/* Secondary Pulsing White Starlight Sparkle */}
        <div
          className="absolute top-1/2 right-1/4 w-[340px] h-[340px] rounded-full blur-[80px] opacity-50 animate-cinematic-white-spot"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(254, 249, 195, 0.5) 30%, transparent 65%)'
          }}
        />

        {/* Deep Glowing Orange Flare - Top Left to Center */}
        <div
          className="absolute -top-24 -left-20 w-[520px] h-[520px] rounded-full blur-[130px] opacity-40 animate-cinematic-orange"
          style={{
            background:
              'radial-gradient(circle, rgba(234, 88, 12, 0.95) 0%, rgba(249, 115, 22, 0.6) 40%, transparent 75%)'
          }}
        />

        {/* Luminous Golden Yellow Light - Top Right to Center */}
        <div
          className="absolute -top-32 right-[-10%] w-[580px] h-[580px] rounded-full blur-[140px] opacity-45 animate-cinematic-yellow"
          style={{
            background:
              'radial-gradient(circle, rgba(250, 204, 21, 0.9) 0%, rgba(245, 158, 11, 0.55) 45%, transparent 75%)'
          }}
        />

        {/* Warm Amber Center Spotlight - Breathing Pulse */}
        <div
          className="absolute top-1/3 left-1/3 w-[450px] h-[450px] rounded-full blur-[120px] opacity-35 animate-cinematic-amber"
          style={{
            background:
              'radial-gradient(circle, rgba(251, 191, 36, 0.85) 0%, rgba(217, 119, 6, 0.4) 50%, transparent 70%)'
          }}
        />

        {/* Cinematic Diagonally Drifting Sunbeam / Anamorphic Streak with Pure White Core */}
        <div
          className="absolute top-1/4 -left-1/4 w-[150%] h-36 blur-[80px] opacity-35 -rotate-12 animate-cinematic-beam"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(249, 115, 22, 0.5) 25%, rgba(255, 255, 255, 0.95) 48%, rgba(253, 224, 71, 0.85) 55%, rgba(245, 158, 11, 0.5) 75%, transparent 100%)'
          }}
        />

        {/* Soft Ambient Floating Core Light */}
        <div
          className="absolute bottom-[-15%] right-1/4 w-[420px] h-[420px] rounded-full blur-[110px] opacity-30 animate-cinematic-pulse"
          style={{
            background:
              'radial-gradient(circle, rgba(254, 215, 170, 0.7) 0%, rgba(249, 115, 22, 0.3) 60%, transparent 80%)'
          }}
        />
      </div>
    );
  }

  if (variant === 'ambient') {
    return (
      <div
        className={`fixed inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
        aria-hidden="true"
      >
        {/* Ambient Moving White Luminescence */}
        <div
          className="absolute top-10 left-1/3 w-[520px] h-[520px] rounded-full blur-[130px] opacity-35 animate-cinematic-white"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(254, 240, 138, 0.4) 35%, transparent 70%)'
          }}
        />

        {/* Soft Golden Yellow Drift - Top Right */}
        <div
          className="absolute -top-40 right-[-10%] w-[650px] h-[650px] rounded-full blur-[160px] opacity-25 animate-cinematic-yellow"
          style={{
            background:
              'radial-gradient(circle, rgba(253, 224, 71, 0.75) 0%, rgba(245, 158, 11, 0.4) 50%, transparent 75%)'
          }}
        />

        {/* Warm Orange Drift - Center Left */}
        <div
          className="absolute top-1/3 -left-36 w-[600px] h-[600px] rounded-full blur-[150px] opacity-20 animate-cinematic-orange"
          style={{
            background:
              'radial-gradient(circle, rgba(249, 115, 22, 0.7) 0%, rgba(251, 146, 60, 0.35) 55%, transparent 80%)'
          }}
        />

        {/* Subtle Golden Amber Pulse - Lower Middle */}
        <div
          className="absolute bottom-10 right-1/3 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 animate-cinematic-amber"
          style={{
            background:
              'radial-gradient(circle, rgba(251, 191, 36, 0.65) 0%, rgba(234, 88, 12, 0.25) 50%, transparent 75%)'
          }}
        />
      </div>
    );
  }

  // Default: 'light' (used in Hero and bright sections)
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Radiant Pure White Daylight Core - High Visibility Floating Spotlight */}
      <div
        className="absolute -top-28 left-1/3 w-[500px] h-[500px] rounded-full blur-[90px] opacity-65 sm:opacity-70 animate-cinematic-white"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.7) 25%, rgba(254, 240, 138, 0.4) 50%, transparent 72%)'
        }}
      />

      {/* Sparkling White Specular Light Glint */}
      <div
        className="absolute top-1/3 right-1/4 w-[380px] h-[380px] rounded-full blur-[85px] opacity-55 animate-cinematic-white-spot"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 251, 235, 0.6) 30%, transparent 68%)'
        }}
      />

      {/* Radiant Yellow Light Orb - Top Right drifting */}
      <div
        className="absolute -top-36 right-[-5%] sm:right-[10%] w-[560px] h-[560px] rounded-full blur-[120px] opacity-45 sm:opacity-50 animate-cinematic-yellow"
        style={{
          background:
            'radial-gradient(circle, rgba(253, 224, 71, 0.9) 0%, rgba(251, 191, 36, 0.6) 40%, rgba(245, 158, 11, 0.25) 65%, transparent 80%)'
        }}
      />

      {/* Cinematic Sunset Orange Orb - Top Left to Mid Left */}
      <div
        className="absolute top-[-5%] -left-28 sm:-left-16 w-[540px] h-[540px] rounded-full blur-[130px] opacity-40 sm:opacity-45 animate-cinematic-orange"
        style={{
          background:
            'radial-gradient(circle, rgba(249, 115, 22, 0.85) 0%, rgba(234, 88, 12, 0.5) 45%, rgba(251, 146, 60, 0.2) 65%, transparent 80%)'
        }}
      />

      {/* Warm Amber Center Glow - Subtle Breathing Elevation */}
      <div
        className="absolute top-1/3 left-1/4 sm:left-1/3 w-[460px] h-[460px] rounded-full blur-[110px] opacity-35 sm:opacity-40 animate-cinematic-amber"
        style={{
          background:
            'radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(245, 158, 11, 0.45) 45%, transparent 75%)'
        }}
      />

      {/* Cinematic Anamorphic Horizontal Light Stream with Pure White Center Core */}
      <div
        className="absolute top-1/4 -left-[20%] w-[140%] h-44 blur-[80px] opacity-35 sm:opacity-45 -rotate-6 animate-cinematic-beam"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(249, 115, 22, 0.4) 20%, rgba(255, 255, 255, 0.95) 48%, rgba(253, 224, 71, 0.8) 55%, rgba(251, 191, 36, 0.5) 75%, transparent 100%)'
        }}
      />

      {/* Floating Lower Glow Orb - Golden Sunlight Tone */}
      <div
        className="absolute -bottom-20 right-1/4 w-[480px] h-[480px] rounded-full blur-[125px] opacity-35 animate-cinematic-pulse"
        style={{
          background:
            'radial-gradient(circle, rgba(254, 215, 170, 0.8) 0%, rgba(251, 191, 36, 0.4) 50%, transparent 75%)'
        }}
      />
    </div>
  );
};
