import CloudinaryImage from 'components/CloudinaryImage'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { ReactCompareSlider, ReactCompareSliderHandle } from 'react-compare-slider'
import factoBlurb from '../../images/facto-blurb.svg'
import outlinedChart from '../../images/outlined-chart.svg'
import AnimateIntoView from '../AnimateIntoView'
import Logo from '../Logo'
import { gradientWrapper, section } from './classes'
import CodeBlock from './CodeBlock'

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
            <div className={section('bg-primary rounded-lg p-4 pb-0 md:pt-16 lg:pb-0 lg:p-12 lg:pt-28')}>
                <div className="flex items-center flex-col md:flex-row space-x-4">
                    <div className="relative md:mt-12">
                        <AnimateIntoView className="absolute left-20">
                            <img src={factoBlurb} />
                        </AnimateIntoView>
                        <CloudinaryImage
                            alt="A cartoon hedgehog laying on their back"
                            className="max-w-[200px] md:max-w-[300px]"
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/facto-home.png"
                        />
                    </div>
                    <div>
                        <h2 className="text-white m-0 text-2xl sm:text-4xl md:text-5xl leading-none lg:text-7xl">
                            <span className="text-red">Quit writing SQL</span>
                            <br /> to answer product questions
                        </h2>
                        <h3 className="m-0 mt-2 md:mt-4 text-lg sm:text-lg md:text-xl xl:text-2xl text-gray">
                            PostHog can answer 90% of them, out of the box.
                        </h3>
                    </div>
                </div>

                <ReactCompareSlider
                    className="dark mt-12"
                    handle={
                        <ReactCompareSliderHandle
                            style={{
                                height: 'calc(100% - 67px)',
                                position: 'absolute',
                                bottom: 0,
                                left: '50%',
                                transform: 'translateX(-50%)',
                            }}
                            buttonStyle={{ background: 'black', backdropFilter: 'none', width: 36, height: 36 }}
                        />
                    }
                    itemOne={
                        <div className="bg-primary">
                            <h4 className="text-white text-sm sm:text-lg md:text-xl m-0 text-center w-1/2 h-[67px] flex items-center md:items-start justify-center">
                                Before PostHog
                            </h4>
                            <div className={`w-full text-sm md:text-lg ${gradientWrapper}`}>
                                <CodeBlock code={exampleCode} language="sql" />
                            </div>
                        </div>
                    }
                    itemTwo={
                        <div className="bg-primary">
                            <h4 className="text-white flex space-x-1 sm:space-x-4 justify-center text-sm sm:text-lg md:text-xl my-0 w-1/2 ml-auto bg-primary h-[67px] items-center md:items-start">
                                <span>With</span>{' '}
                                <Logo className="max-w-[25px] sm:max-w-[40px] md:w-auto" color="white" noText />{' '}
                                <span>PostHog</span>
                            </h4>
                            <div className="w-full">
                                <img width={1023} height={414} className="float-right" src={outlinedChart} />
                            </div>
                        </div>
                    }
                />
            </div>
        </section>
    )
}
