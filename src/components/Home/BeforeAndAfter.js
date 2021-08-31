import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider'
import AnimateIntoView from '../AnimateIntoView'
import Logo from '../Logo'
import CodeBlock from './CodeBlock'
import { section, gradientWrapper } from './classes'
import factoBlurb from '../../images/facto-blurb.svg'
import outlinedChart from '../../images/outlined-chart.svg'

const exampleCode = `SELECT entrance_period_start,
       reached_from_step_count,
       reached_to_step_count,
       if(reached_from_step_count > 0, round(reached_to_step_count / reached_from_step_count * 100, 2), 0) AS conversion_rate
  FROM (
        SELECT entrance_period_start,
               countIf(steps_completed >= 1) AS reached_from_step_count,
               countIf(steps_completed >= 2) AS reached_to_step_count
          FROM (
                SELECT person_id,
                       toStartOfDay(timestamp) AS entrance_period_start,
                       max(steps) AS steps_completed
                  FROM (
                        SELECT *,
                               if(latest_0 < latest_1 AND latest_1 <= latest_0 + INTERVAL 14 DAY, 2, 1) AS steps ,
                               if(isNotNull(latest_1) AND latest_1 <= latest_0 + INTERVAL 14 DAY, dateDiff('second', toDateTime(latest_0), toDateTime(latest_1)), NULL) step_1_conversion_time
                          FROM (
                                SELECT person_id,
                                       timestamp,
`

export default function BeforeAndAfter() {
    return (
        <section className="px-4">
            <div className={section('bg-primary rounded-lg p-4 pb-0 lg:pb-0 lg:p-12 lg:pt-32')}>
                <div className="flex items-center flex-col md:flex-row space-x-4">
                    <div className="relative">
                        <AnimateIntoView className="absolute -right-16">
                            <img src={factoBlurb} />
                        </AnimateIntoView>
                        <StaticImage className="max-w-[200px] md:max-w-full" src="../../images/facto-home.png" />
                    </div>
                    <div>
                        <h2 className="text-white m-0 text-2xl sm:text-4xl md:text-3xl leading-none xl:text-6xl">
                            <span className="text-red">Quit writing SQL</span>
                            <br /> to answer product questions
                        </h2>
                        <h3 className="m-0 mt-2 md:mt-4 text-base sm:text-lg  xl:text-2xl text-gray">
                            PostHog can answer 90% of them, out of the box.
                        </h3>
                    </div>
                </div>
                <div className="grid grid-cols-2 text-center dark mb-4 md:mb-8 mt-12 md:mt-24 items-center">
                    <h4 className="text-white text-xs sm:text-base md:text-xl m-0">Before PostHog</h4>
                    <h4 className="text-white flex items-center space-x-1 sm:space-x-4 justify-center text-xs sm:text-base md:text-xl m-0">
                        <span>With</span> <Logo className="max-w-[25px] sm:max-w-[40px] md:w-auto" allWhite noText />{' '}
                        <span>PostHog</span>
                    </h4>
                </div>
                <div className={gradientWrapper}>
                    <ReactCompareSlider
                        handle={
                            <ReactCompareSliderHandle
                                buttonStyle={{ background: 'black', backdropFilter: 'none', width: 36, height: 36 }}
                            />
                        }
                        itemOne={
                            <div className="w-full">
                                <CodeBlock code={exampleCode} language="sql" />
                            </div>
                        }
                        itemTwo={
                            <div className="w-full">
                                <img className="float-right" src={outlinedChart} />
                            </div>
                        }
                    />
                </div>
            </div>
        </section>
    )
}
