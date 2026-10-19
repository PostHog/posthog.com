import React from 'react'
import { cn } from '../../../../utils'
import { IconClaudeCode, IconOpenAI, LogomarkCursor } from 'components/OSIcons'

const RECOLOR = '[&_path]:!fill-current'

export const ClaudeMark = ({ className }: { className?: string }) => (
    <IconClaudeCode className={cn(RECOLOR, className)} aria-hidden="true" />
)
export const OpenAIMark = ({ className }: { className?: string }) => (
    <IconOpenAI className={className} aria-hidden="true" />
)
export const CursorMark = ({ className }: { className?: string }) => (
    <LogomarkCursor className={cn(RECOLOR, className)} aria-hidden="true" />
)

export const CLAUDE_CLAY = '#D97757'

const AppTile = ({ className, children }: { className: string; children: React.ReactNode }) => (
    <span
        className={cn(
            'relative flex size-full items-center justify-center overflow-hidden rounded-[22%] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.25),0_1px_2px_rgba(0,0,0,0.25)]',
            className
        )}
    >
        {children}
    </span>
)

const TerminalTile = ({ badge }: { badge: React.ReactNode }) => (
    <span className="relative block size-full">
        <AppTile className="items-start justify-start bg-gradient-to-b from-[#3A3A3C] to-[#1C1C1E] p-[16%]">
            <span className="font-code text-[0.5em] font-bold leading-none text-[#30D158]">&gt;_</span>
        </AppTile>
        <span className="absolute -bottom-[6%] -right-[6%] flex size-[52%] items-center justify-center rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
            {badge}
        </span>
    </span>
)

export const ClaudeCodeIcon = () => (
    <TerminalTile
        badge={
            <span className="flex size-full items-center justify-center rounded-full bg-[#D97757]">
                <ClaudeMark className="w-[66%] text-[#FAF9F5]" />
            </span>
        }
    />
)

export const CodexIcon = () => (
    <TerminalTile
        badge={
            <span className="flex size-full items-center justify-center rounded-full bg-white">
                <OpenAIMark className="w-[88%] text-black" />
            </span>
        }
    />
)

export const ClaudeAppIcon = () => (
    <AppTile className="bg-[#D97757]">
        <ClaudeMark className="w-[62%] text-[#FAF9F5]" />
    </AppTile>
)

export const ChatGPTIcon = () => (
    <AppTile className="bg-white">
        <OpenAIMark className="w-[82%] text-black" />
    </AppTile>
)

export const CursorIcon = () => (
    <AppTile className="bg-[#14120B]">
        <CursorMark className="w-[58%] text-[#EDECEC]" />
    </AppTile>
)
