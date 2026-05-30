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

export interface FindCompetitorsResponseNode extends ResearchNode {
    kind: 'find_competitors'
    result: GetCompetitorsResponse
}

export interface EnrichCompetitorsResponseNode extends ResearchNode {
    kind: 'enrich_competitors'
    result: EnrichCompetitorsResponse
}

export type AnyResearchNode =
    | GetSiteContentResponseNode
    | ResearchNode
    | GetSummaryResponseNode
    | FindCompetitorsResponseNode
    | EnrichCompetitorsResponseNode

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

export interface GetCompetitorsCompetitor {
    id: string
    url: string
    title: string
    score: number | null
    published_date: string // ISO 8601
    author: string
    favicon: string | null
    summary: string
}

export interface GetCompetitorsTargetCompany {
    url: string
    description: string
}

export interface GetCompetitorsResponse {
    competitors_found: number
    competitors: GetCompetitorsCompetitor[]
    query_processed: string
    target_company: GetCompetitorsTargetCompany
    status: string
}

export interface EnrichCompetitorsSeoMetadata {
    [key: string]: string
}

export interface EnrichCompetitorsSocialChannels {
    [key: string]: string
}

export interface EnrichCompetitorsSeoData {
    url: string
    seo_metadata: EnrichCompetitorsSeoMetadata
    social_channels: EnrichCompetitorsSocialChannels
    error: string | null
    content_type: string
    server: string
}

export interface EnrichCompetitorsEnrichedCompetitor {
    id: string
    url: string
    title: string
    score: number | null
    published_date: string // ISO 8601
    author: string
    favicon: string | null
    summary: string
    seo_data?: EnrichCompetitorsSeoData
}

export interface EnrichCompetitorsResponse {
    enriched_competitors: EnrichCompetitorsEnrichedCompetitor[]
    enrichment_count: number
    progressive_enrichment: boolean
    status: string
}

export interface ResearchCompetitor {
    name: string
    find_competitors_data?: GetCompetitorsCompetitor
    enrich_competitors_data?: EnrichCompetitorsEnrichedCompetitor
}

export interface ResearchTree {
    rootSiteDate?: GetSiteContentSiteData
    competitors?: Record<string, ResearchCompetitor>
    summary?: GetSummarySummary
}
