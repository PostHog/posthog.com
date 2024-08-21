import React from 'react'

export const ComparisonTable = ({ column1, column2, children }) => {
    return (
        <div className="min-w-full overflow-x-auto -mx-5 px-5 lg:-mx-6 lg:px-6 xl:-mx-12 xl:px-12">
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
