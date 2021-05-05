---
title: Bug Prioritization
sidebar: Handbook
showTitle: true
---

When bugs are reported it's critical to properly gauge the extent and impact to be able to prioritize and respond accordingly. These are the priorities we use across the entire engineering org, along with the relevant labels to quickly identify them in GitHub.

> Please always remember to tag your issues with the relevant priority.

<span class="table-borders">
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




## Security vulnerabilities
Security vulnerabilities due to its nature, have a different prioritization schema. This schema is also inline with our internal SOC-2 related policies (Vulnerability Management Policy). When filing vulnerabilities issues, remember to label them correctly. More details on filing can be found in the [README](https://github.com/PostHog/product-internal#README) of the `product-internal` repo.


| Github Label | Priority Level | CVSS V3 Score Range | Definition | Examples |
|---|---|---|---|---|
|**security-critical**|Critical|9.0 - 10.0|Vulnerabilities that cause a privilege escalation on the platform from unprivileged to admin, allows remote code execution, financial theft, unauthorized access to/extraction of sensitive data, etc.|Vulnerabilities that result in Remote Code Execution such as Vertical Authentication bypass, SSRF, XXE, SQL Injection, User authentication bypass|
|**security-high**|High|7.0 - 8.9|Vulnerabilities that affect the security of the platform including the processes it supports.|Lateral authentication bypass, Stored XSS, some CSRF depending on impact|
|**security-med**|Medium|4.0 - 6.9|Vulnerabilities that affect multiple users, and require little or no user interaction to trigger.|Reflective XSS, Direct object reference, URL Redirect, some CSRF depending on impact|
|**security-low**|Low|0.1 - 3.9|Issues that affect singular users and require interaction or significant prerequisites (MitM) to trigger.|Common flaws, Debug information, Mixed Content|

