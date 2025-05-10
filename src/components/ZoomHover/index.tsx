import React from 'react';

interface ZoomHoverProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

const ZoomHover: React.FC<ZoomHoverProps> = ({ 
  size = "sm",
  className = "",
  children
}) => {
  const sizeClasses = {
    sm: "hover:top-[-.5px] hover:scale-[1.02] active:top-[.5px] active:scale-[.995]",
    md: "hover:top-[-.5px] hover:scale-[1.01] active:top-[.5px] active:scale-[.997]",
    lg: "hover:-top-px hover:scale-[1.005] active:top-[.5px] active:scale-[.998]"
  };

  const classes = `inline-flex relative ${sizeClasses[size]} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default ZoomHover;
