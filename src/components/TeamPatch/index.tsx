import React from 'react';

interface TeamPatchProps {
  name: string;
  imageUrl: string;
  color: string;
  textColor?: string;
  textShadow?: string;
  frame: string;
}

export default function TeamPatch({ name, imageUrl, color, textColor, textShadow, frame }: TeamPatchProps) {
  return (
    <div className="size-72 mx-auto flex items-end justify-center">
      <div className={`relative w-48 h-64 shadow-xl border-4 mx-auto flex items-center justify-center border-team-${color}-border bg-team-${color}-bg ${frame === 'half-round' ? 'rounded-tl-[100px] rounded-tr-[100px]' : frame === 'rounded' ? 'rounded-lg' : frame === 'square' ? '' : ''}`}>
        <div className={`left-round-behind w-4 h-1.5 border-l-2 border-b-2 border-team-${color}-border bg-team-${color}-plaque-shadow rounded-bl-full absolute left-[calc(-1rem_-_0px)] bottom-1.5 z-[-1]`} />
        <div className={`right-round-behind w-4 h-1.5 border-r-2 border-b-2 border-team-${color}-border bg-team-${color}-plaque-shadow rounded-br-full absolute right-[calc(-1rem_-_0px)] bottom-1.5 z-[-1]`} />
        <div className="banner-text-bg bg-white bg-opacity-80 border-2 border-team-${color}-border h-8 rounded-tl rounded-tr absolute bottom-4 -left-4 -right-4 z-10 flex items-center justify-center text-white uppercase font-lg font-bold" />
        <div className={`banner-text-bg bg-team-${color}-plaque-bg bg-opacity-80 border-2 border-team-${color}-border h-8 rounded-tl rounded-tr absolute bottom-4 -left-4 -right-4 z-20 flex items-center justify-center uppercase text-xl font-bold font-[Squeak] [font-variant:none] text-${textColor ? textColor : 'white [text-shadow:0_1px_0_rgba(0,0,0,.5)]'} ${textShadow === 'light' ? '0_1px_0_rgba(255,255,255,.5)' : textShadow === 'dark' ? '0_1px_0_rgba(0,0,0,.5)' : ''}`}>
          {name}
        </div>
        <div className="fake-corners absolute bottom-4 -left-3.5 -right-3.5">
          <div className="relative mt-[-2px]">
            <div className={`left-line bg-team-${color}-plaque-bg dark:team-${color}-plaque-bg-dark border-l-2 border-team-${color}-border w-2 h-3 absolute -left-0.5 -bottom-1 z-20 [clip-path:polygon(6px_8px,0px_6px,0px_12px,10px_12px)]`} />
            <div className={`left-rounded-corner bg-team-${color}-plaque-shadow border-l-2 border-t-2 rounded-tl-full border-team-${color}-border w-3 h-1.5 absolute -left-0.5 -bottom-1.5 z-20 `} />
            <div className={`right-line bg-team-${color}-plaque-bg dark:team-${color}-plaque-bg-dark border-r-2 border-team-${color}-border w-2 h-3 absolute -right-0.5 -bottom-1 z-20 [clip-path:polygon(4px_8px,10px_6px,10px_12px,0px_12px)]`} />
            <div className={`right-rounded-corner bg-team-${color}-plaque-shadow border-r-2 border-t-2 rounded-tr-full border-team-${color}-border w-3 h-1.5 absolute -right-0.5 -bottom-1.5 z-20`} />
          </div>
        </div>
      </div>
      <img src={imageUrl} className="w-56 absolute -translate-y-2 z-10" alt={name} />
    </div>
  );
}