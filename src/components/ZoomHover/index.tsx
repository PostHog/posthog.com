import React from 'react';

interface ZoomHoverProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  width?: string
  className?: string;
  children: React.ReactNode;
}

const ZoomHover: React.FC<ZoomHoverProps> = ({ 
  size = "sm",
  width = 'inline-flex',
  className = "",
  children
}) => {
  const sizeClasses = {
    // note: these are sorta backwards. choose a button based on your button's size.
    // eg: if you have a extra large button, you want it to move less on hover/click so use 'lg'
    xs: "hover:top-[-.5px] hover:scale-[1.005] active:top-[.5px] active:scale-[.999]",
    sm: "hover:top-[-.5px] hover:scale-[1.02] active:top-[.5px] active:scale-[.995]",
    md: "hover:top-[-.5px] hover:scale-[1.01] active:top-[.5px] active:scale-[.997]",
    lg: "hover:-top-px hover:scale-[1.005] active:top-[.5px] active:scale-[.998]"
  };

  const classes = `${width} relative ${sizeClasses[size]} ${className}`;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default ZoomHover;
