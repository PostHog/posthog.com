interface ResearchNode {
    node_id: string
}

export interface GetSiteContentResponseNode extends ResearchNode {
    kind: 'get_site_content'
    result: GetSiteContentCompetitorAnalysis
    website_url: string
}

export interface GetSummaryResponseNode extends ResearchNode {
    kind: 'get_summary'
    result: GetSummaryResponse
}

export type AnyResearchNode = GetSiteContentResponseNode | ResearchNode | GetSummaryResponseNode

export interface GetSiteContentSiteData {
    url: string
    title: string
    description: string
    keywords: string[]
    page_load_speed: number
    seo_score: number
}

export interface GetSiteContentMetadata {
    analysis_depth: string
    content_pages_analyzed: number
    social_links_found: number
    is_main_site: boolean
}

export interface GetSiteContentMarketingResearchResult {
    url: string
    title: string
    score: number | null
    published_date: string // ISO 8601
    author: string
    summary: string
}

export interface GetSiteContentMarketingResearchData {
    results: GetSiteContentMarketingResearchResult[]
}

export interface GetSiteContentCompetitorAnalysis {
    site_data: GetSiteContentSiteData
    competitors: string[]
    metadata: GetSiteContentMetadata
    marketing_research_data: GetSiteContentMarketingResearchData
}

export interface GetSummaryMarketAnalysis {
    position: string
    key_differentiators: string[]
    competitive_advantages: string[]
}

export interface GetSummaryExecutionStats {
    total_nodes_executed: number
    total_execution_time: number
    analysis_depth: string
}

export interface GetSummarySummary {
    analyzed_site: string
    main_competitors: number
    total_competitor_network: number
    market_analysis: GetSummaryMarketAnalysis
    recommendations: string[]
    execution_stats: GetSummaryExecutionStats
}

export interface GetSummaryResponse {
    summary: GetSummarySummary
}

export interface ResearchCompetitor {
    name: string
    marketing_research_data?: GetSiteContentMarketingResearchResult
}

export interface ResearchTree {
    rootSiteDate?: GetSiteContentSiteData
    competitors?: Record<string, ResearchCompetitor>
    summary?: GetSummarySummary
}
