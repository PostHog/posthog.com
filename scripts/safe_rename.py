import re
import requests
from datetime import date

redirect_text = '''
[[redirects]]
    from = "{}"
    to = "{}"
'''

redirect_with_date_comment_text = '''
# Added: {}{}'''

netlify_config_text = None
local_netlify_config_text = None

# Rules
def same_path(from_path, to_path, new_redirect):
    return from_path == to_path

def md_to_mdx(from_path, to_path, new_redirect):
    # old rule
    # return '.mdx' not in from_paths[i] and '.mdx' in to_paths[i]
    return from_path.endswith('.md') and to_path.endswith('.mdx')

def redirect_exists(from_path, to_path, new_redirect):
    return new_redirect in local_netlify_config_text

def from_dot_star(from_path, to_path, new_redirect):
    return from_path == '(.*)'

def is_snippets_rename(from_path, to_path, new_redirect):
    return '/snippets/' in from_path or '/snippets' in to_path

skip_rules = [
    same_path,
    md_to_mdx,
    redirect_exists,
    from_dot_star,
    is_snippets_rename
]

try:
    with open("./pr_diff", "r") as git_diff_file:
        git_diff = git_diff_file.read()

    rename_from_regex = r'rename from contents(.*).md'
    rename_to_regex = r'rename to contents(.*).md'

    from_paths = re.findall(rename_from_regex, git_diff)
    to_paths = re.findall(rename_to_regex, git_diff)

    if len(from_paths) > 0 and len(from_paths) == len(to_paths):
        new_redirects = ''

        for i in range(len(from_paths)):
            # Load existing remote redirect config
            netlify_config_text = requests.get('https://raw.githubusercontent.com/PostHog/posthog.com/master/netlify.toml').text

            # Load existing redirect file to be used to avoid duplicates
            local_netlify_config_file = open("./netlify.toml", "r")
            local_netlify_config_text = local_netlify_config_file.read()
            local_netlify_config_file.close()

            # handle index default directory files. /path/index will become /path
            from_paths[i] = re.sub("\/index$", "", from_paths[i])
            to_paths[i] = re.sub("\/index$", "", to_paths[i])
            
            new_redirect = redirect_text.format(from_paths[i], to_paths[i])

            print(f'Testing if redirects are required for: "{from_paths[i]}" to "{to_paths[i]}"')
            skip_redirect = False
            for skip_rule in skip_rules:
                if(not skip_redirect):
                    skip_redirect = skip_rule(from_paths[i], to_paths[i], new_redirect)
                    print(f'Rule: "{skip_rule.__name__}"', 'skip_redirect?', skip_redirect)
                    
            if not skip_redirect:
                print("Creating redirect: ", new_redirect)
                new_redirects += redirect_with_date_comment_text.format(date.today(), new_redirect)
            else:
                print('Not including redirect:', new_redirect)
        
        with open("./netlify.toml", "a") as netlify_config:
            netlify_config.write(new_redirects)
except Exception as e:
    print(e)
