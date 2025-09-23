import React from 'react'
import { TABLE_CLASSES } from '../../constants'

export const ComparisonTable = ({ column1, column2, children }) => {
    return (
        <div className={TABLE_CLASSES}>
            <table className="w-full mt-4">
                <thead>
                    <tr>
                        <td className=""></td>
                        <td className="text-center">
                            <strong>{column1}</strong>
                        </td>
                        {column2 !== undefined && (
                            <td className="text-center">
                                <strong>{column2}</strong>
                            </td>
                        )}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    )
}
