import requests
import sys
import os

# Generates copy-pasteable HTML with contributor avatars
# Used in our Team page and the PostHog/posthog README

image_size = sys.argv[1] if len(sys.argv) > 1 else 50
contributors_processed = set()
contributor_faces_html = ''
github_token = os.environ.get('GITHUB_PERSONAL_TOKEN', '') # Needed for rate limiting
auth_header = { 'Authorization': f'token {github_token}' }

repos = requests.get('https://api.github.com/orgs/PostHog/repos?type=all', headers=auth_header).json()

contributions_per_contributor = {}

i = 0
l = len(repos)
for repo in repos:
    if repo['fork']:
        continue
    print(f'Processing repo {i} of {l}')
    contributors = requests.get(repo['contributors_url'], headers=auth_header).json()
    for contributor in contributors:
        username = contributor['login']
        if username in contributions_per_contributor:
            contributions_per_contributor[username] += contributor['contributions']
        else:
            contributions_per_contributor[username] = contributor['contributions']
    i += 1
    
output = ''
for username, level in contributions_per_contributor.items():
    output += f"('{username}',{level}),\n"

print(output)



