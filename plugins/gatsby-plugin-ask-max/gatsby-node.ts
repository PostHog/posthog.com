import { GatsbyNode } from 'gatsby'

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ reporter }) => {
    reporter.info('Hello from onPostBuild')
}
