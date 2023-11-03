import React from 'react'

export const ComparisonHeader = ({ category }) => {
    return (
        <tr>
            <td colSpan="3">
                <strong>{category}</strong>
            </td>
        </tr>
    )
}
