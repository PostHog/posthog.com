import React from 'react'
import Apply from 'components/Job/Apply'

const mockInfo = {
    applicationFormDefinition: {
        sections: [
            {
                fields: [
                    {
                        isRequired: true,
                        descriptionPlain: 'Select your favorite color',
                        field: {
                            type: 'DropDown',
                            title: 'Favorite Color',
                            path: 'color',
                            selectableValues: [
                                { label: 'Red', value: 'red' },
                                { label: 'Blue', value: 'blue' },
                            ],
                        },
                    },
                    {
                        isRequired: true,
                        descriptionPlain: 'Your email address',
                        field: {
                            type: 'Email',
                            title: 'Email',
                            path: 'email',
                            selectableValues: [],
                        },
                    },
                ],
            },
        ],
    },
}

export default function ApplyTestPage() {
    return (
        <div className="p-10 bg-gray-100 min-h-screen text-black dark:text-white dark:bg-black/20">
            <h1 className="text-3xl font-bold mb-6">Test Apply Component</h1>
            <Apply id="test-id" info={mockInfo} />
        </div>
    )
}
