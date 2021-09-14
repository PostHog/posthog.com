import React from 'react'
import { useValues } from 'kea'
import { libraryStatsLogic, Library } from './libraryStatsLogic'
import { Spin } from 'antd'

export const LibraryStats = () => {
    const { libraries, librariesLoading } = useValues(libraryStatsLogic)

    return (
        <>
            {librariesLoading ? (
                <Spin className="center" />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Library</th>
                            <th>Stars</th>
                            <th>Open Issues</th>
                            <th>Open PRs</th>
                            <th>Last Commit Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {libraries.map((library: Library) => (
                            <tr key={library.name}>
                                <td>
                                    <a href={`https://github.com/${library.path}`} target="_blank" rel="noreferrer">
                                        {library.name}
                                    </a>
                                </td>
                                <td>{library.stars}</td>
                                <td>{library.openIssues}</td>
                                <td>{library.pullRequests}</td>
                                <td>{library.lastCommit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <br />
        </>
    )
}
