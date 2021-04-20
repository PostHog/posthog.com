import re
import os

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
    with open("./netlify.toml", "r") as netlify_config:
        netlify_config_text = netlify_config.read()
    
    new_redirects = ''

    for i in range(len(from_paths)):
        md_to_mdx = '.mdx' not in from_paths[i] and '.mdx' in to_paths[i]
        if from_paths[i] not in netlify_config_text and not md_to_mdx:
            new_redirects += redirect_text.format(from_paths[i], to_paths[i])
    
    with open("./netlify.toml", "a") as netlify_config:
        netlify_config.write(new_redirects)