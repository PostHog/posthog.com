const MAX_PR_COMMITS = 250
const MAX_LISTED_COMMITS = 20
const SIGNING_GUIDE = "https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits"
const KEY_GUIDE =
    "https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-new-ssh-key-to-your-github-account"
const TRANSIENT_REASONS = new Set(["gpgverify_error", "gpgverify_unavailable"])

function signatureResult(commits, expectedCount) {
    if (expectedCount > MAX_PR_COMMITS || expectedCount < 1 || commits.length !== expectedCount) {
        return {
            state: "error",
            description: "Could not check the complete commit list",
            body: `## Commit signature check incomplete\n\nGitHub's PR commits API returns at most ${MAX_PR_COMMITS} commits. This check could not read the complete commit list. A maintainer must investigate before review.`,
        }
    }

    const unverified = commits.filter((commit) => commit.commit.verification?.verified !== true)
    if (unverified.length === 0) {
        return {
            state: "success",
            description: "GitHub verified every commit signature",
            body: "## Commit signatures verified\n\nGitHub verified every commit signature in this PR. No further action is needed.",
        }
    }

    const verificationUnavailable = unverified.some((commit) =>
        TRANSIENT_REASONS.has(commit.commit.verification?.reason)
    )
    const list = unverified.slice(0, MAX_LISTED_COMMITS).map((commit) => {
        const sha = commit.sha
        if (!/^[a-f0-9]{40}$/.test(sha)) {
            throw new Error("GitHub returned an invalid commit SHA")
        }
        const reason = commit.commit.verification?.reason
        const detail =
            reason === "unsigned"
                ? "Unsigned"
                : TRANSIENT_REASONS.has(reason)
                ? "Verification unavailable"
                : "Signature not verified"
        return `- \`${sha.slice(0, 7)}\`: ${detail}`
    })
    if (unverified.length > MAX_LISTED_COMMITS) {
        list.push(`- ${unverified.length - MAX_LISTED_COMMITS} additional commits need attention.`)
    }

    return {
        state: verificationUnavailable ? "error" : "failure",
        description: verificationUnavailable
            ? "GitHub signature verification is temporarily unavailable"
            : `${unverified.length} commit signature(s) need attention`,
        body: [
            "## Commit signatures need attention",
            "",
            "PostHog requires commits with signatures that GitHub can verify. This PR cannot merge until the requirement is met.",
            "",
            ...list,
            "",
            ...(verificationUnavailable
                ? [
                      "GitHub could not verify some signatures. Re-run this workflow when the service recovers. Do not rewrite commits for a service error.",
                      "",
                  ]
                : []),
            `1. [Set up commit signing](${SIGNING_GUIDE}). Enable it for future commits with \`git config --local commit.gpgsign true\`.`,
            `2. If a signed commit is unverified, check that GitHub recognizes your signing key. An SSH key must be registered as a [Signing Key](${KEY_GUIDE}).`,
            "3. If a commit is unsigned, rewrite it with a signature. For the latest commit only:",
            "",
            "```bash",
            "git commit --amend --no-edit -S",
            "git push --force-with-lease",
            "```",
            "",
            "These commands sign only the latest commit. If earlier commits are unsigned, sign those commits too. Coordinate with other contributors before rewriting a shared branch.",
            "",
            "Enabling signing does not sign existing commits. A Signed-off-by line is not a cryptographic signature.",
            "",
            "This check runs after each push and base-branch change, including draft PRs. Fork PRs require workflow approval from a maintainer.",
        ].join("\n"),
    }
}

async function run({ github, context, core }) {
    const { owner, repo } = context.repo
    const pull_number = context.payload.pull_request.number
    const { data: pr } = await github.rest.pulls.get({ owner, repo, pull_number })
    const eventPr = context.payload.pull_request
    if (pr.state !== "open" || pr.head.sha !== eventPr.head.sha || pr.base.ref !== eventPr.base.ref) {
        core.info("The PR changed before the check started. Skipping outdated results.")
        return
    }

    const commits = await github.paginate(github.rest.pulls.listCommits, {
        owner,
        repo,
        pull_number,
        per_page: 100,
    })
    const result = signatureResult(commits, pr.commits)
    const { data: current } = await github.rest.pulls.get({ owner, repo, pull_number })
    if (current.state !== "open" || current.head.sha !== pr.head.sha || current.base.ref !== pr.base.ref) {
        core.info("The PR changed during the check. Skipping outdated results.")
        return
    }
    await core.summary.addRaw(result.body).write()
    if (result.state !== "success") {
        core.setFailed(result.description)
    }
}

module.exports = { run, signatureResult }
