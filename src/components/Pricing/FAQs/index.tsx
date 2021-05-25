import React from 'react'
import { Collapse } from 'antd'
import { Structure } from '../../Structure'
import { faqs } from '../../../pages-content/pricing-data'

const { Panel } = Collapse

export const FAQs = () => {
    return (
        <div className="pricing-hero text-white text-center relative">
            <Structure.Section width="4xl" className="py-12">
                <Structure.SectionHeader titleTag="h3" title="FAQ" />
                <Collapse bordered={false}>
                    {faqs.map((faq, i) => (
                        <Panel header={faq.q} key={i}>
                            {faq.a}
                        </Panel>
                    ))}
                </Collapse>
            </Structure.Section>
        </div>
    )
}
