import React from 'react';

const themes = {
  rainbow: 'rainbow',
  blues: 'blues',
  superhero: 'superhero',
  radial: 'radial',
  tilt: 'tilt',
  purple: 'purple',
  horizon: 'horizon',
  italicOutline: 'italicOutline',
  slate: 'slate'
} as const;

type Theme = keyof typeof themes;

interface WordArtProps {
  text: string;
  theme?: Theme;
  fontSize?: number;
  className?: string;
}

const WordArt: React.FC<WordArtProps> = ({
  text,
  theme = 'rainbow',
  fontSize = 50,
  className = ''
}) => {
  const themeClass = themes[theme];
  const wordArtClasses = `wordart ${themeClass} ${className}`.trim();

  return (
    <div className={wordArtClasses} style={{ fontSize }}>
      <span className="text" data-text={text}>
        {text}
      </span>
    </div>
  );
};

// Export themes separately
export const wordArtThemes = Object.keys(themes) as Theme[];

export default WordArt;
export type { Theme, WordArtProps }; 