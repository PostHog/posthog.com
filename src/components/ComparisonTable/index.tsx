import React from 'react'

export const ComparisonTable = ({ column1, column2, children }) => {
    return (
        <div className="overflow-x-auto -mx-5 px-5 w-screen md:w-auto">
            <table className="w-full mt-4">
                <thead>
                    <tr>
                        <td className=""></td>
                        <td className="text-center">
                            <strong>{column1}</strong>
                        </td>
                        <td className="text-center">
                            <strong>{column2}</strong>
                        </td>
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    )
}
