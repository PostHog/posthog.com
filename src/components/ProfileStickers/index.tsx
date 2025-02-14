import React from 'react'
import Tooltip from 'components/Tooltip'
import {
    StickerMayor,
    StickerFlagAR,
    StickerFlagAT,
    StickerFlagBE,
    StickerFlagBR,
    StickerFlagCA,
    StickerFlagCO,
    StickerFlagCY,
    StickerFlagDE,
    StickerFlagDO,
    StickerFlagIE,
    StickerFlagES,
    StickerFlagFI,
    StickerFlagFR,
    StickerFlagGB,
    StickerFlagHU,
    StickerFlagHR,
    StickerFlagNL,
    StickerFlagNO,
    StickerFlagPL,
    StickerFlagPR,
    StickerFlagUnknown,
    StickerFlagUS,
    StickerPineappleYes,
    StickerPineappleNo,
    StickerPineappleUnknown,
} from 'components/Stickers/Index'

const Stickers = ({ location, country, pineappleOnPizza, isTeamLead, editing, id, handleTeamLead }) => {
    const TeamLeadContainer = editing && handleTeamLead ? 'span' : 'button'

    const handleTeamLeadClick = (e) => {
        e.stopPropagation()
        handleTeamLead(id, isTeamLead)
    }

    return (
        <>
            <Tooltip content={`Lives in ${location}`}>
                {country === 'BE' ? (
                    <StickerFlagBE className="w-8 h-8" />
                ) : country === 'BR' ? (
                    <StickerFlagBR className="w-8 h-8" />
                ) : country === 'US' ? (
                    <StickerFlagUS className="w-8 h-8" />
                ) : country === 'GB' ? (
                    <StickerFlagGB className="w-8 h-8" />
                ) : country === 'DE' ? (
                    <StickerFlagDE className="w-8 h-8" />
                ) : country === 'DO' ? (
                    <StickerFlagDO className="w-8 h-8" />
                ) : country === 'ES' ? (
                    <StickerFlagES className="w-8 h-8" />
                ) : country === 'FI' ? (
                    <StickerFlagFI className="w-8 h-8" />
                ) : country === 'HU' ? (
                    <StickerFlagHU className="w-8 h-8" />
                ) : country === 'HR' ? (
                    <StickerFlagHR className="w-8 h-8" />
                ) : country === 'IE' ? (
                    <StickerFlagIE className="w-8 h-8" />
                ) : country === 'FR' ? (
                    <StickerFlagFR className="w-8 h-8" />
                ) : country === 'NL' ? (
                    <StickerFlagNL className="w-8 h-8" />
                ) : country === 'NO' ? (
                    <StickerFlagNO className="w-8 h-8" />
                ) : country === 'AR' ? (
                    <StickerFlagAR className="w-8 h-8" />
                ) : country === 'AT' ? (
                    <StickerFlagAT className="w-8 h-8" />
                ) : country === 'CA' ? (
                    <StickerFlagCA className="w-8 h-8" />
                ) : country === 'CO' ? (
                    <StickerFlagCO className="w-8 h-8" />
                ) : country === 'CY' ? (
                    <StickerFlagCY className="w-8 h-8" />
                ) : country === 'PL' ? (
                    <StickerFlagPL className="w-8 h-8" />
                ) : country === 'PR' ? (
                    <StickerFlagPR className="w-8 h-8" />
                ) : (
                    <StickerFlagUnknown className="w-8 h-8" />
                )}
            </Tooltip>
            <span>
                {pineappleOnPizza === null ? (
                    <Tooltip content="We're not sure if they like pineapple on pizza (yet)!">
                        <StickerPineappleUnknown className="w-8 h-8" />
                    </Tooltip>
                ) : pineappleOnPizza ? (
                    <Tooltip content="Prefers pineapple on pizza!">
                        <StickerPineappleYes className="w-8 h-8" />
                    </Tooltip>
                ) : (
                    <Tooltip content="Does not believe pineapple belongs on pizza">
                        <StickerPineappleNo className="w-8 h-8" />
                    </Tooltip>
                )}
            </span>
            {isTeamLead || editing ? (
                <TeamLeadContainer {...(editing && handleTeamLead ? { onClick: handleTeamLeadClick } : {})}>
                    <Tooltip content={isTeamLead ? 'Team lead' : 'Make team lead?'}>
                        <span>
                            <StickerMayor
                                active={isTeamLead}
                                className={`w-8 h-8 ${isTeamLead ? '' : 'opacity-40 hover:opacity-75'}`}
                            />
                        </span>
                    </Tooltip>
                </TeamLeadContainer>
            ) : (
                ''
            )}
        </>
    )
}

export default Stickers
