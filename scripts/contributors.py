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

for repo in repos:
    if repo['fork']:
        continue
    contributors = requests.get(repo['contributors_url'], headers=auth_header).json()
    for contributor in contributors:
        username = contributor['login']
        if username not in contributors_processed:
            contributors_processed.add(username)
            avatar_url = contributor['avatar_url']
            contributor_faces_html += f'<a href="https://github.com/{username}"><img src="{avatar_url}" title="{username}" width="{image_size}" height="{image_size}"></a>\n'


print(contributor_faces_html)



