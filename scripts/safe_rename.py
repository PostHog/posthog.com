import re
import os

git_diff = os.environ['PR_DIFF']

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
    with open("./netlify.toml", "r") as netlify_config:
        netlify_config_text = netlify_config.read()
    
    new_redirects = ''

    for i in range(len(from_paths)-1):
        if from_paths[i] not in netlify_config_text:
            new_redirects += redirect_text.format(from_paths[i], to_paths[i])
    
    with open("./netlify.toml", "a") as netlify_config:
        netlify_config.write(new_redirects)