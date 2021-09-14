---
title: Bug prioritization
sidebar: Handbook
showTitle: true
---

## User experience degradation

When bugs are reported it's critical to properly gauge the extent and impact to be able to prioritize and respond accordingly. These are the priorities we use across the entire engineering org, along with the relevant labels to quickly identify them in GitHub.

> Please always remember to tag your issues with the relevant priority.

<span>
<table>
    <tr>
        <td>GitHub Label</td>
        <td>Description</td>
    </tr>
    <tr>
        <td><span class="tag-label" style="background:#ff0000; color: white;">P0</span></td>
        <td>Critical, breaking issue (page crash, missing functionality)</td>
    </tr>
    <tr>
        <td><span class="tag-label" style="background:#f0a000;">P1</span></td>
        <td>Urgent, non-breaking (no crash but low usability)</td>
    </tr>
    <tr>
        <td ><span class="tag-label"style="background:#ffe000;">P2</span></td>
        <td>Semi-urgent, non-breaking, affects UX but functional</td>
    </tr>
    <tr>
        <td><span class="tag-label" style="background:#1d76db; color: white;">P3</span></td>
        <td>Icebox, address when possible</td>
    </tr>
</table>
</span>




## Security issues

Security issues, due to their nature, have a different prioritization schema. This schema is also in line with our internal SOC 2 related policies (Vulnerability Management Policy). When filing security-related GitHub issues, remember to attach label `security` and the appropriate priority label. More details on filing can be found in the [README](https://github.com/PostHog/product-internal#README) of the `product-internal` repo.

<blockquote class="warning-note">
Security issue information should not be made public until a fix is live and sufficiently (ideally completely) adopted.
</blockquote>

PostHog security issues include a priority (severity) level. This level is based on our self-calculated CVSS score for each specific vulnerability. CVSS is an industry standard vulnerability metric. You can learn more about CVSS at [FIRST.org](https://www.first.org/cvss/user-guide) and calculate it using the FIRST.org [calculator](https://www.first.org/cvss/calculator/3.1).

| GitHub Label | Priority Level | CVSS V3 Score Range | Definition | Examples |
|---|---|---|---|---|
|**security-P0**|Critical|9.0 - 10.0|Vulnerabilities that cause a privilege escalation on the platform from unprivileged to admin, allows remote code execution, financial theft, unauthorized access to/extraction of sensitive data, etc.|Vulnerabilities that result in Remote Code Execution such as Vertical Authentication bypass, SSRF, XXE, SQL Injection, User authentication bypass|
|**security-P1**|High|7.0 - 8.9|Vulnerabilities that affect the security of the platform including the processes it supports.|Lateral authentication bypass, Stored XSS, some CSRF depending on impact|
|**security-P2**|Medium|4.0 - 6.9|Vulnerabilities that affect multiple users, and require little or no user interaction to trigger.|Reflective XSS, Direct object reference, URL Redirect, some CSRF depending on impact|
|**security-P3**|Low|0.1 - 3.9|Issues that affect singular users and require interaction or significant prerequisites (MitM) to trigger.|Common flaws, Debug information, Mixed Content|

