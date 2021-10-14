import React from 'react'

const responsive = {
    wrapper: {
        1: '',
        2: 'grid-cols-1 sm:grid-cols-2 sm:divide-x',
        3: 'grid-cols-1 md:grid-cols-3 md:divide-x',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x',
        5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:divide-x',
    },
}

export const Section = ({ children, cols = 1 }: { children: JSX.Element[]; cols: number }): JSX.Element => {
    return (
        <div className={`grid divide-dashed divide-gray-accent-light template-section ${responsive.wrapper[cols]}`}>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, {
                    className: `${child.props.className || ''} px-0 sm:px-7`,
                })
            )}
        </div>
    )
}
