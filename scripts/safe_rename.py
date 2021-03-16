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

if len(from_paths) == len(to_paths):
    new_redirects = ''
    for i in range(len(from_paths)):
        new_redirects += redirect_text.format(from_paths[i], to_paths[i])
    
    with open("./netlify.toml", "a") as netlify_config:
        netlify_config.write(new_redirects)