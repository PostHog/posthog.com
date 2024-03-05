import React from 'react'
import HalfDoughnut from 'components/Doughnut/HalfDoughnut'

export type teamMembersDataProps = {
    avatar: { url: string }
    companyRole: string
    country: string
    firstName: string
    lastName: string
    location: string
    pineappleOnPizza: boolean
    pronouns: string
    squeakId: number
}

export const pineappleOnPizzaStat = (teamMembersData: teamMembersDataProps[]): number[] => {
    const pineappleOnPizzaStatIsTrue = teamMembersData.filter((item) => item.pineappleOnPizza === true)
    const pineappleOnPizzaPercent = ((pineappleOnPizzaStatIsTrue.length / teamMembersData.length) * 100).toPrecision(2)
    return [Number(pineappleOnPizzaPercent), 100 - Number(pineappleOnPizzaPercent)]
}

interface Props {
    teamStatData: number[]
    caption: string
    icon: string
}

const TeamStat = ({ teamStatData, caption, icon }: Props): JSX.Element => {
    const bgColor =
        teamStatData[0] === 100
            ? '#B62AD9'
            : teamStatData[0] >= 75 && teamStatData[0] < 100
            ? '#2F80FA'
            : teamStatData[0] >= 50 && teamStatData[0] < 75
            ? '#EB9D2A'
            : '#F35454'
    const data = {
        datasets: [
            {
                data: teamStatData,
                backgroundColor: [bgColor, '#FFFFFF'],
                display: true,
                borderColor: 'transparent',
            },
        ],
    }
    return (
        <div className="flex flex-col text-center">
            <HalfDoughnut chartData={data} stats={teamStatData[0]} />
            <span className="mt-[-20px] px-7 md:px-0 lg:px-7 text-primary/75 text-sm dark:text-primary-dark/75 max-w-full md:max-w-[260px] lg:max-w-[230px] mx-auto">
                {caption}
            </span>
            <span className="mt-[9px] text-2xl">{icon}</span>
        </div>
    )
}

export default TeamStat
