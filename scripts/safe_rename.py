import re
import requests

with open("./pr_diff", "r") as git_diff_file:
    git_diff = git_diff_file.read()

rename_from_regex = r'rename from contents(.*).md'
rename_to_regex = r'rename to contents(.*).md'


from_paths = re.findall(rename_from_regex, git_diff)
to_paths = re.findall(rename_to_regex, git_diff)

redirect_text = '''

[[redirects]]
    from = "{}"
    to = "{}"
'''

if len(from_paths) > 0 and len(from_paths) == len(to_paths):
    netlify_config_text = requests.get('https://raw.githubusercontent.com/PostHog/posthog.com/master/netlify.toml').text
    
    new_redirects = ''

    for i in range(len(from_paths)):
        if from_paths[i] not in netlify_config_text:
            new_redirects += redirect_text.format(from_paths[i], to_paths[i])
    
    with open("./netlify.toml", "a") as netlify_config:
        netlify_config.write(new_redirects)