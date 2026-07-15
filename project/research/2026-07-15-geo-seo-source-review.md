# GEO/SEO source review for Mindwtr

Date: 2026-07-15  
Scope: source-backed guidance for `mindwtr.app` and `docs.mindwtr.app`  
Purpose: inform the live page audit and implementation plan; this document does not itself audit every deployed URL.

## Executive recommendation

Mindwtr should optimize for conventional search discovery, crawlability, useful source content, and accurate entity markup first. Those same foundations are what Google currently recommends for AI Overviews and AI Mode: pages must be indexed and snippet-eligible, important content should be available as text, internal links should be crawlable, page experience should be sound, and structured data must match visible content. Google says that no special AI schema, machine-readable AI file, or additional technical requirement is needed for its AI search features. ([Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features))

The low-risk part of “GEO” is therefore not a parallel discipline. It is clearer answer-first writing, stronger evidence and source attribution, explicit entity identity, navigable information architecture, and measurement of actual citations/referrals. Experimental conventions such as `llms.txt`, `/ai/*.json`, blanket FAQ schema, and vendor GEO scores should not displace those fundamentals.

The most important practical changes to consider are:

1. Keep every indexable page technically sound: unique title and description, one descriptive main heading, self-canonical URL, crawlable contextual links, correct sitemap membership, reciprocal `hreflang` for translated pages, useful alt text, and good real-user Core Web Vitals.
2. Add narrowly applicable JSON-LD that reflects visible facts: `Organization` and `WebSite` on the main site; `BreadcrumbList` and, where author/date/content support it, `TechArticle` on substantive documentation pages. Treat `SoftwareApplication` carefully because Google requires real offer and review/rating data for its software-app rich result.
3. Publish an explicit crawler policy that separates search/retrieval bots from model-training bots. Allowing AI search crawlers can improve eligibility for those products; allowing training crawlers is a separate product-policy decision.
4. Improve important landing and documentation pages with a direct summary near the top, descriptive headings, evidence for factual/comparative claims, and purposeful internal links. Do this for reader comprehension, not to satisfy an arbitrary word count or keyword formula.
5. Establish a before/after measurement loop in Google Search Console, Bing Webmaster Tools (including AI Performance), analytics, and verified bot logs. A vendor score is not evidence that Mindwtr is being indexed, ranked, cited, or visited.

## Evidence hierarchy

Recommendations below use this hierarchy:

- **Established:** documented by search platforms, web standards, or schema specifications, and directly connected to crawlability, indexability, presentation, or measured performance.
- **Supported but contextual:** backed by experiments or platform advice, but the effect depends on query, corpus, source rank, or implementation quality.
- **Experimental/speculative:** a proposal, third-party heuristic, or unvalidated proxy with no demonstrated causal effect on Mindwtr's search rankings or AI citations.

## Review of the supplied resources

| Resource | Useful contribution | What not to treat as evidence |
| --- | --- | --- |
| [Aaron Marketing Skills](https://github.com/aaron-he-zhu/aaron-marketing-skills) | A sensible workflow: research the query landscape, implement page/content/markup improvements, then audit technical and structural quality. Its [GEO content optimizer](https://github.com/aaron-he-zhu/aaron-marketing-skills/blob/main/seo-geo/implement/geo-content-optimizer/SKILL.md) usefully separates a page's *citability proxy* from actual unprompted surfacing and recommends explicit metric labels, sourcing, concise definitions, and human-readable structure. Its [SERP markup builder](https://github.com/aaron-he-zhu/aaron-marketing-skills/blob/main/seo-geo/implement/serp-markup-builder/SKILL.md) correctly requires JSON-LD to map to visible content. | Internal quality scores and preferred formats are house rubrics, not Google, Bing, or AI-platform ranking standards. A score improvement is not a measured visibility improvement. |
| [Auriti GEO Optimizer](https://github.com/Auriti-Labs/geo-optimizer-skill) | An advisory linter for conventional issues such as robots directives, raw-HTML visibility, metadata, structured-data presence, and crawler access. It can emit SARIF and compare results over time. | Its [scoring implementation](https://github.com/Auriti-Labs/geo-optimizer-skill/blob/main/src/geo_optimizer/core/scoring.py) assigns substantial points to `llms.txt`, FAQ schema, AI discovery endpoints, and other vendor-selected signals. The resulting 0–100 score is not a ranking or citation metric. |
| [GEO Optimizer Audit marketplace action](https://github.com/marketplace/actions/geo-optimizer-audit) | A CI wrapper around the Auriti tool, useful only if its findings are treated as advisory or as an intentionally configured regression baseline. | It is not independent corroboration: it is the same Auriti project. The inspected [composite action](https://github.com/Auriti-Labs/geo-optimizer-skill/blob/main/action.yml) installs `geo-optimizer-skill` from PyPI without pinning the Python package version, so pinning only the action tag or commit does not make the executed auditor reproducible. A hard `min-score` gate would encode the vendor rubric as policy. |
| [Awesome Generative Engine Optimization](https://github.com/amplifying-ai/awesome-generative-engine-optimization) | A useful bibliography that points to both supportive and contradictory research. | A curated link list is not primary evidence. Claims should be checked against the linked papers and platform documentation. |
| [Codex SEO](https://github.com/AgriciDaniel/codex-seo) | The strongest transferable idea is its evidence-led audit workflow: inspect technical, content, schema, sitemap, rendering, performance, image, and page-level signals; preserve evidence; detect drift; and report missing setup rather than inventing results. | Installing the toolkit is not required to adopt the workflow. Its GEO checks remain heuristics unless validated against first-party measurements. |
| [geo-team-red/geo-optimizer](https://github.com/geo-team-red/geo-optimizer) | Human-beneficial prompts to use a clear hierarchy, answer the reader's main question, show genuine authority, and include FAQs only where actual questions exist. | Its implementation is too mechanical for production decisions: the [answer-first strategy](https://github.com/geo-team-red/geo-optimizer/blob/main/pkg/optimizer/strategies/answer_first.go) searches the first characters for literal phrases; the [schema strategy](https://github.com/geo-team-red/geo-optimizer/blob/main/pkg/optimizer/strategies/schema.go) infers types from substrings and can fall back to `Article`; and the [structure strategy](https://github.com/geo-team-red/geo-optimizer/blob/main/pkg/optimizer/strategies/structure.go) rewards Markdown syntax. Do not auto-inject its generated schema or FAQs into Mindwtr pages. |

### Tooling conclusion

Use the supplied repositories as checklists and sources of test ideas, not as competing authorities. If an automated GEO audit is added later, make it informational first, suppress nonstandard checks that Mindwtr intentionally rejects, record a baseline, and alert only on regressions. If a third-party GitHub Action is used, pin the action to a full commit SHA; GitHub documents a full-length commit SHA as the only immutable release reference for actions. ([GitHub Actions security guidance](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)) Because Auriti's composite action separately installs an unpinned package, a reproducible job would need to pin or vendor that dependency too.

## Established SEO and platform controls

### 1. Crawlability, indexing, canonicalization, and sitemaps

- A canonical URL is a consolidation signal, not a substitute for consistent internal links and sitemap URLs. Google recommends using the canonical URL consistently in internal links and including canonical URLs in the sitemap. ([Google: canonical URL consolidation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls))
- XML sitemaps should contain the canonical URLs Mindwtr wants indexed. A `lastmod` value should describe a significant page modification, not the sitemap generation time. Google may use accurate `lastmod`; Bing says it relies heavily on accurate timestamps and ignores `priority` and `changefreq`. ([Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Bing sitemap guidance](https://blogs.bing.com/webmaster/July-2025/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search), [sitemaps.org protocol](https://www.sitemaps.org/protocol.html))
- `robots.txt` controls compliant crawling; it is not access control and is not a reliable mechanism for keeping a URL out of search results. Sensitive or private resources require authentication or another actual access control. ([Robots Exclusion Protocol, RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html), [Google robots.txt introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro))
- The landing site's translated alternates should remain reciprocal and include themselves. `x-default` is useful for a language-selector or default page. ([Google localized-version guidance](https://developers.google.com/search/docs/specialty/international/localized-versions))

Implementation implication: retain the repository's existing generated sitemap and distribution checks, then extend them only where the live audit identifies a gap—for example, reliable source-derived `lastmod`, reciprocal emitted `hreflang`, metadata uniqueness, and indexability consistency. Never stamp every build date into `lastmod` if the underlying page did not materially change.

### 2. Page metadata, visible content, and performance

- Titles and main headings should accurately describe each page. Meta descriptions should be page-specific, but Google primarily constructs snippets from page content and may choose a different snippet. Google does not impose a fixed meta-description character limit. ([Google snippet and meta-description guidance](https://developers.google.com/search/docs/appearance/snippet))
- Important explanatory content should be present in rendered text, not available only in images, videos, or client-side interactions. This is part of Google's own AI-search guidance as well as ordinary crawlability. ([Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features))
- “People-first” content should be original and substantial, make sourcing clear, show relevant expertise or background, and leave the visitor feeling that the page achieved its purpose. Google describes E-E-A-T as a useful evaluative concept rather than a single ranking factor. ([Google helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content))
- Real-user Core Web Vitals should be assessed at the 75th percentile. The current “good” thresholds are LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1. ([web.dev: Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds))

Implementation implication: use concise, page-specific copy rather than manufacturing long articles. Put a direct description of the page's value near the beginning where it reads naturally; follow it with descriptive sections, lists, or tables when those formats improve comprehension. Link from marketing claims to the documentation or project evidence that substantiates them.

### 3. Structured data and entity identity

Google recommends JSON-LD, but structured data must describe the page it appears on, be visible to users, be accurate, and avoid misleading or irrelevant markup. Valid markup does not guarantee a rich result. ([Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies))

A conservative Mindwtr model would be:

- `mindwtr.app` homepage: one stable Mindwtr `Organization` entity plus `WebSite`. Include only visible, verifiable properties such as name, canonical URL, logo, and genuine official profiles or source-code links. Google specifically supports organization markup as a way to disambiguate an organization. ([Google organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization), [schema.org Organization](https://schema.org/Organization))
- Product description: a `SoftwareApplication` node can express supported facts, but Google rich-result eligibility requires a real `Offer` price and either a real aggregate rating or review. Do not invent or repurpose review text simply to satisfy the rich-result requirements. ([Google software-app markup](https://developers.google.com/search/docs/appearance/structured-data/software-app), [schema.org SoftwareApplication](https://schema.org/SoftwareApplication))
- Documentation: `BreadcrumbList` where the visible/navigation hierarchy supports it; `TechArticle` or `Article` only on substantive guides with truthful visible author, publication, and modification information. ([schema.org BreadcrumbList](https://schema.org/BreadcrumbList), [schema.org TechArticle](https://schema.org/TechArticle))
- Support, donation, privacy, and brand pages: choose a type that actually describes the page, or add no page-specific schema. Do not default every page to `Article`.

Connecting nodes across both hosts with stable `@id` values is a reasonable implementation pattern, but it is an architectural inference—not a ranking guarantee. Validate all emitted markup with schema.org tooling and, for Google-supported features, the Rich Results Test.

FAQ markup is not a general Mindwtr growth tactic. Google now regularly shows FAQ rich results only for authoritative government and health sites. Genuine visible FAQs may still help visitors and content structure, but markup should not be generated merely to earn a GEO-tool score. ([Google FAQ rich-result change](https://developers.google.com/search/blog/2023/08/howto-faq-changes))

### 4. Explicit search-crawler versus training-crawler policy

AI services expose bots with different purposes. Mindwtr should make a deliberate policy instead of “allowing AI” as one undifferentiated choice:

| Purpose | Relevant crawler/control | Recommendation |
| --- | --- | --- |
| Google Search, including AI Overviews and AI Mode | Googlebot and ordinary Search controls | Keep crawlable/indexable pages accessible. `Google-Extended` does **not** control Google Search inclusion or ranking. ([Google common crawlers](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)) |
| ChatGPT search | `OAI-SearchBot` | Allow if Mindwtr wants eligibility for ChatGPT search. This is independent of `GPTBot`, which controls potential training use. ([OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)) |
| Claude search | `Claude-SearchBot` | Allow if Mindwtr wants Claude search retrieval. Decide separately on `ClaudeBot` for training. ([Anthropic crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)) |
| Perplexity search | `PerplexityBot` | Allow if Mindwtr wants Perplexity search retrieval. Verify published IP ranges if a CDN/WAF challenge would otherwise block it. ([Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)) |
| Model training or non-Search grounding | `GPTBot`, `ClaudeBot`, `Google-Extended` | Make a separate maintainer policy decision based on licensing, privacy, and project values. Allowing these is not required for ordinary Google Search or the corresponding search-specific bots. |

User-initiated fetch agents such as `ChatGPT-User`, `Claude-User`, or `Perplexity-User` are not equivalent to autonomous indexing crawlers, and some may not follow robots directives in the same way. Robots rules should therefore not be represented as a security boundary. Also check CDN/WAF logs: a permissive `robots.txt` cannot help if infrastructure blocks or challenges the verified crawler.

### 5. Measurement and change control

Measure outcomes on each host separately:

- Google Search Console: indexing/crawl issues, queries, impressions, clicks, landing pages, country/device, and rich-result reports where applicable.
- Bing Webmaster Tools: indexing and search performance plus AI Performance. Bing's AI report includes citations, cited pages, grounding queries, and trends, but Bing explicitly warns that citation count is not a ranking or authority score. ([Bing AI Performance announcement](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview))
- Analytics: organic landing sessions and identifiable referrals from AI/search products, tied to useful downstream actions rather than raw traffic alone.
- Server/CDN logs: verified bot crawl frequency, response status, blocking/challenge rates, and sitemap fetches.
- Deployment regression checks: canonical/robots/sitemap consistency, unique metadata and H1s, hreflang reciprocity, structured-data parsing, visible-content agreement, internal link/fragment integrity, and performance budgets.

IndexNow is a reasonable optional freshness mechanism for changed, added, or deleted URLs, especially for Bing. A successful request confirms receipt, not indexing. ([IndexNow protocol](https://www.indexnow.org/documentation)) It should be triggered from a real changed-URL set, not used to resubmit the entire site on every deployment.

## Supported but contextual content practices

The original Generative Engine Optimization paper tested citations, quotations, statistics, readability, authority signals, and related content modifications. It reported meaningful visibility gains in its experimental setup. ([GEO paper, KDD 2024](https://arxiv.org/abs/2311.09735)) The result should be interpreted narrowly: the main experiment retrieved the top five Google results and asked GPT-3.5 to synthesize an answer, while its Perplexity experiment uploaded selected files. These tests principally measure which already-selected sources receive more representation, not whether a public crawler discovers or ranks a previously absent Mindwtr page. ([GEO paper full text](https://ar5iv.labs.arxiv.org/html/2311.09735v3))

Later benchmark evidence is more skeptical. C-SEO Bench found most tested content-level search-engine-optimization methods largely ineffective or sometimes negative and found source rank/context more important; it also observed diminishing benefit as more sources adopt the same tactics. ([C-SEO Bench, NeurIPS 2025](https://proceedings.neurips.cc/paper_files/paper/2025/hash/27aa3aeff0f8460a7b43d30fa6c5c032-Abstract-Datasets_and_Benchmarks_Track.html))

The defensible synthesis for Mindwtr is:

- Write a short, self-contained definition or answer where a page genuinely has a definitional question, such as what Mindwtr is, what local-first means in the product, or how a sync/import method works.
- Prefer factual density over length: state supported platforms, licensing, storage/sync behavior, and limitations precisely; link to source code, release pages, policy pages, or relevant docs.
- Use quotations, statistics, and comparisons only when a trustworthy source improves the reader's decision. Cite it and keep it current. Never invent a statistic or attribution for “GEO.”
- Use tables, lists, and genuine question/answer sections when they are the clearest representation—not because a scanner awards points for them.
- Build topic coverage from real user jobs and query data: installation by platform, local-first/privacy model, GTD workflow, sync choices, import/export, backup and recovery, and troubleshooting. Avoid thin programmatic variations targeting every keyword.

## Experimental or speculative items

### `llms.txt`

[`llms.txt`](https://llmstxt.org/) describes itself as a proposal for a root-level Markdown index intended to help language models find preferred content. It is not a robots control, a standardized ranking signal, or a Google requirement. Google explicitly says no new AI text file is needed for its AI search features. ([Google Search Central: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features))

Recommendation: do not prioritize it for visibility. If Mindwtr later offers one as a convenience for coding/research agents, generate it from the canonical docs navigation, keep it small, link to canonical URLs, and test it for drift. Do not maintain a duplicate hand-written content corpus and do not report its presence as an SEO win.

### Nonstandard AI endpoints

Files such as `/.well-known/ai.txt`, `/ai/summary.json`, `/ai/faq.json`, and `/ai/service.json` are rewarded by the Auriti rubric but are not established cross-platform discovery standards in the primary documentation reviewed. They create another public contract and drift surface.

Recommendation: defer them unless a named consumer documents support and Mindwtr can measure usage. Existing HTML, sitemap, structured data, and public documentation remain the canonical interfaces.

### Prompt testing and “AI visibility” scores

Manually or automatically prompting a model with a set of queries can be useful exploratory research, but output varies by model, geography, session, corpus, and time. A small prompt panel should be labeled as sampled observation, not rank tracking. Likewise, a tool's weighted checklist score is only a coverage proxy.

Recommendation: if prompt sampling is used, freeze the query set, model/product, date, geography/account context, and scoring rubric; retain source/citation outputs; compare with observed referrals, Bing citations, bot logs, and search-console data. Do not claim causality from a before/after prompt sample.

## Prioritized implementation checklist

### P0 — verify and protect foundations

- Crawl the complete emitted URL set for both hosts; reconcile it with sitemaps, canonicals, redirects, status codes, robots rules, and internal links.
- Verify unique, descriptive title/description/H1 combinations and meaningful visible introductions.
- Verify reciprocal self-including `hreflang` and `x-default` on localized landing pages.
- Decide and document search-crawler versus training-crawler policy; verify CDN/WAF access for allowed bots.
- Establish Google Search Console and Bing Webmaster Tools baselines for both hosts.
- Measure field Core Web Vitals where sufficient data exists; use lab tests only as diagnostic evidence.

### P1 — accurate entities and stronger content paths

- Add minimal homepage `Organization`/`WebSite` JSON-LD with stable entity identifiers and visible, verifiable facts.
- Add documentation breadcrumbs and article markup only where the visible page supports every property.
- Strengthen contextual links between landing claims and the exact docs that explain installation, privacy/local-first behavior, sync, import/export, and platform support.
- Add direct summaries, evidence, and current limitations to high-intent pages identified from live audit and search data.
- Show an honest “last reviewed” or `dateModified` only when substantive documentation maintenance supports it.

### P2 — regression automation and freshness

- Extend the existing distribution verifier with checks surfaced by the audit: structured-data JSON parsing and invariants, metadata/H1 uniqueness, hreflang reciprocity, allowed-crawler responses, and accurate sitemap modification timestamps.
- Consider deployment-driven IndexNow notifications for the actual changed URL set.
- Optionally run a third-party GEO scanner as a non-blocking artifact. Do not gate on its absolute score; pin all executable dependencies or vendor the rules being adopted.

### P3 — bounded experiments

- Consider auto-generated `llms.txt` only as an agent-navigation convenience with an explicit “no demonstrated ranking benefit” expectation.
- Run repeatable prompt/citation samples only after first-party baselines exist, and treat them as exploratory telemetry.

## Explicitly reject or defer

- Keyword stuffing, artificial length, templated “answer phrases,” and near-duplicate keyword pages.
- Invented author bios, statistics, awards, customer claims, ratings, reviews, or citations.
- Hidden content or structured data that users cannot see and verify.
- Automatically inferred `Article`, `FAQPage`, or `SoftwareApplication` markup based on substring matching.
- FAQ sections created solely to trigger schema or tool points.
- Build-time `lastmod` dates for unchanged pages.
- Blanket training-crawler access represented as necessary for search visibility.
- A release gate based on Auriti's 0–100 score or another vendor rubric.
- Nonstandard AI endpoint proliferation without a documented consumer and usage evidence.

## Suggested success criteria

Use a mix of binary quality gates and measured trends:

- 100% of intended indexable URLs return a successful response, self-canonicalize, appear in the correct sitemap, and are internally reachable.
- No unintended indexable duplicates, broken internal links/fragments, contradictory robots/canonical directives, or invalid emitted JSON-LD.
- Every localized cluster has complete reciprocal language annotations.
- Allowed verified search crawlers receive successful, unchallenged responses.
- No regression in field Core Web Vitals; all three metrics target the “good” threshold at the 75th percentile.
- Search Console and Bing Webmaster Tools coverage errors are triaged; impressions, clicks, indexed pages, Bing citations, and useful organic/AI referrals are tracked against a dated baseline.
- Content changes are evaluated page by page against the query/user need they were intended to serve—not against total word count or a GEO score.

This approach captures the credible, non-duplicative guidance in the supplied resources while keeping Mindwtr aligned with current platform documentation and avoiding speculative markup debt.
