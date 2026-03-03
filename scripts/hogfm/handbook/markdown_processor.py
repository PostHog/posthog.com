"""
Process markdown/MDX files and convert to speech-friendly text
"""

import re
from pathlib import Path

IMAGE_PATTERN = re.compile(r'!\[([^\]]*)\]\([^\)]+\)')
# Match code blocks with proper fence matching (3+ backticks/tildes)
# Captures the fence length and matches the same length closing fence
BACKTICK_CODE_BLOCK_PATTERN = re.compile(r'(?P<fence>`{3,})(?P<info>[^\n]*)\n(?P<content>[\s\S]*?)(?P=fence)', re.MULTILINE)
TILDE_CODE_BLOCK_PATTERN = re.compile(r'(?P<fence>~{3,})(?P<info>[^\n]*)\n(?P<content>[\s\S]*?)(?P=fence)', re.MULTILINE)
PRODUCT_SCREENSHOT_PATTERN = re.compile(r'<ProductScreenshot(?P<attrs>[^>]*)\/?>', re.IGNORECASE)
PRODUCT_VIDEO_PATTERN = re.compile(r'<ProductVideo(?P<attrs>[^>]*)\/?>', re.IGNORECASE)
IMAGE_SLIDER_PATTERN = re.compile(r'<ImageSlider(?P<attrs>[^>]*)>(?P<body>[\s\S]*?)</ImageSlider>', re.IGNORECASE)
ARRAY_CTA_PATTERN = re.compile(r'<ArrayCTA\s*\/?>', re.IGNORECASE)
PRODUCT_COMPARISON_PATTERN = re.compile(r'<ProductComparisonTable(?P<attrs>[^>]*)\/?>', re.IGNORECASE)
OS_QUOTE_PATTERN = re.compile(r'<OSQuote(?P<attrs>[^>]*)\/?>', re.IGNORECASE)
TEAM_MEMBER_PATTERN = re.compile(r'<TeamMember(?P<attrs>[^>]*)\/?>', re.IGNORECASE)
PRIVATE_LINK_PATTERN = re.compile(r'<PrivateLink(?P<attrs>[^>]*)>(?P<body>[\s\S]*?)</PrivateLink>', re.IGNORECASE)


def strip_frontmatter(content):
    """Remove YAML frontmatter from markdown"""
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            return parts[2].strip()
    return content


def extract_title_from_frontmatter(content):
    """Extract title from frontmatter"""
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            frontmatter = parts[1]
            title_match = re.search(r'^title:\s*(.+)$', frontmatter, re.MULTILINE)
            if title_match:
                return title_match.group(1).strip().strip('"').strip("'")
    return None


def check_skip_audio(content):
    """Check if file should be skipped"""
    return 'skipAudio: true' in content


def replace_tables_with_description(text):
    """
    Replace markdown tables with a spoken description.
    Tables are hard to narrate, so we just indicate their presence.
    """
    # Find table blocks (consecutive lines starting with |)
    lines = text.split('\n')
    result = []
    in_table = False
    table_line_count = 0
    
    for line in lines:
        is_table_line = line.strip().startswith('|') and line.strip().endswith('|')
        
        if is_table_line:
            if not in_table:
                # Starting a new table
                in_table = True
                table_line_count = 1
            else:
                table_line_count += 1
        else:
            if in_table:
                # Just finished a table
                # Skip separator lines (like |---|---|)
                if table_line_count > 1:
                    result.append('A table is shown here. Please view the handbook page to see the details.')
                in_table = False
                table_line_count = 0
            
            result.append(line)
    
    # Handle case where file ends with a table
    if in_table and table_line_count > 1:
        result.append('A table is shown here. Please view the handbook page to see the details.')
    
    return '\n'.join(result)


def markdown_to_speech_text(content):
    """Convert markdown to speech-friendly text"""
    
    # Strip frontmatter
    text = strip_frontmatter(content)
    
    # Remove code blocks FIRST (before processing components)
    # This prevents us from narrating components that are just examples in code blocks
    text = BACKTICK_CODE_BLOCK_PATTERN.sub(replace_code_block_with_hint, text)
    text = TILDE_CODE_BLOCK_PATTERN.sub(replace_code_block_with_hint, text)
    
    # Now describe special components (after code blocks are removed)
    text = describe_special_components(text)
    
    # Remove import statements
    text = re.sub(r'^import\s+.*$', '', text, flags=re.MULTILINE)
    
    # Replace markdown tables with a description
    text = replace_tables_with_description(text)
    
    # Remove inline code backticks BEFORE removing JSX tags
    # This handles cases like `<ComponentName>` properly
    text = re.sub(r'`([^`]+)`', r'\1', text)
    
    # Remove JSX components (simple approach - just remove angle bracket tags)
    text = re.sub(r'<[^>]+>', '', text)
    
    # Convert links to just their text
    text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text)
    
    # Remove images
    text = IMAGE_PATTERN.sub(replace_image_with_hint, text)
    
    # Replace headings with SSML breaks for natural pacing
    # Use ElevenLabs SSML syntax: <break time="1.0s" />
    # Process from most specific (H4+) to least specific (H1) to avoid partial matches
    
    # H4+ (####) - Minor headings, lighter pause
    text = re.sub(r'^#{4,}\s+(.+)$', r'<break time="0.4s" />\1.<break time="0.3s" />', text, flags=re.MULTILINE)
    
    # H3 (###) - Subsections, medium pause
    text = re.sub(r'^#{3}\s+(.+)$', r'<break time="0.6s" />\1.<break time="0.5s" />', text, flags=re.MULTILINE)
    
    # H2 (##) - Major sections, good pause
    text = re.sub(r'^#{2}\s+(.+)$', r'<break time="1.0s" />\1.<break time="0.8s" />', text, flags=re.MULTILINE)
    
    # H1 (#) - Usually just title, major pause
    text = re.sub(r'^#{1}\s+(.+)$', r'<break time="1.0s" />\1.<break time="1.0s" />', text, flags=re.MULTILINE)
    
    # Remove bold/italic markers
    text = re.sub(r'\*\*([^\*]+)\*\*', r'\1', text)
    text = re.sub(r'\*([^\*]+)\*', r'\1', text)
    text = re.sub(r'__([^_]+)__', r'\1', text)
    text = re.sub(r'_([^_]+)_', r'\1', text)
    
    # Clean up list markers
    text = re.sub(r'^\s*[-*+]\s+', '', text, flags=re.MULTILINE)
    text = re.sub(r'^\s*\d+\.\s+', '', text, flags=re.MULTILINE)
    
    # Remove HTML comments
    text = re.sub(r'<!--[\s\S]*?-->', '', text)
    
    # Clean up multiple newlines (but preserve double newlines for pacing)
    text = re.sub(r'\n{4,}', '\n\n\n', text)
    
    # Clean up multiple spaces
    text = re.sub(r' +', ' ', text)
    
    # Remove lines with only whitespace
    text = '\n'.join(line for line in text.split('\n') if line.strip())
    
    return text.strip()


def replace_code_block_with_hint(match):
    """Provide an audio-friendly description for fenced code blocks"""
    info_string = (match.group('info') or '').strip()
    language = ''
    if info_string:
        parts = info_string.split()
        if parts:
            language = parts[0].strip()
    if language:
        description = f'Here is a {language} code example. Please view the handbook page to read the snippet.'
    else:
        description = 'Here is a code example. Please view the handbook page to read the snippet.'
    return f'\n{description}\n'


def replace_image_with_hint(match):
    """Describe markdown images so they are not silently dropped"""
    alt_text = (match.group(1) or '').strip()
    if alt_text:
        return f' Image: {alt_text}. '
    return ' An image is shown here without a description. '


def describe_special_components(text):
    """Replace specific MDX components with audio-friendly descriptions"""
    text = PRODUCT_SCREENSHOT_PATTERN.sub(describe_product_screenshot, text)
    text = PRODUCT_VIDEO_PATTERN.sub(describe_product_video, text)
    text = IMAGE_SLIDER_PATTERN.sub(describe_image_slider, text)
    text = ARRAY_CTA_PATTERN.sub(' Call to action: an Array CTA is displayed here. ', text)
    text = PRODUCT_COMPARISON_PATTERN.sub(describe_product_comparison_table, text)
    text = OS_QUOTE_PATTERN.sub(describe_os_quote, text)
    text = TEAM_MEMBER_PATTERN.sub(describe_team_member, text)
    text = PRIVATE_LINK_PATTERN.sub(describe_private_link, text)
    return text


def describe_product_screenshot(match):
    attrs = match.group('attrs') or ''
    alt_text = extract_attr_value(attrs, 'alt')
    if alt_text:
        return f' Product screenshot: {alt_text}. '
    return ' Product screenshot: no alt text was provided. '


def describe_product_video(match):
    attrs = match.group('attrs') or ''
    caption = extract_attr_value(attrs, 'caption')
    if caption:
        return f' Product video: {caption}. '
    return ' Product video: please view the handbook page to watch it. '


def describe_image_slider(match):
    """
    Describe ImageSlider and remove the markdown images inside it
    so they don't get narrated twice
    """
    body = match.group('body') or ''
    alts = [alt.strip() for alt in IMAGE_PATTERN.findall(body) if alt.strip()]
    if alts:
        alt_list = '; '.join(alts)
        description = f' Image slider containing the following images: {alt_list}. '
    else:
        description = ' Image slider with multiple visuals is shown here. '
    
    # Return just the description - the component body (with images) will be removed
    # by the regex replacement, preventing double-narration
    return description


def describe_product_comparison_table(match):
    attrs = match.group('attrs') or ''
    competitors = extract_curly_brace_list(attrs, 'competitors')
    rows = extract_curly_brace_list(attrs, 'rows')
    if competitors or rows:
        competitor_text = f" competitors {', '.join(competitors)}" if competitors else ''
        row_text = f" focusing on {', '.join(rows)}" if rows else ''
        return f' Product comparison table highlighting{competitor_text}{row_text}. '
    return ' Product comparison table is included here. '


def describe_os_quote(match):
    attrs = match.group('attrs') or ''
    customer = extract_attr_value(attrs, 'customer')
    author = extract_attr_value(attrs, 'author')
    if customer and author:
        return f' Customer quote from {author} at {customer}. '
    if customer:
        return f' Customer quote from {customer}. '
    return ' Customer quote component is included here. '


def describe_team_member(match):
    """Describe TeamMember component - just use the person's name"""
    attrs = match.group('attrs') or ''
    name = extract_attr_value(attrs, 'name')
    if name:
        return name
    return ''


def describe_private_link(match):
    """Describe PrivateLink component - extract the link text"""
    body = match.group('body') or ''
    # Remove any nested tags and get the text
    text = re.sub(r'<[^>]+>', '', body).strip()
    if text:
        return f'{text} (private link)'
    return 'private link'


def extract_attr_value(attrs, attr_name):
    """Grab simple string prop values like prop="value" or prop='value'"""
    patterns = [
        rf'{attr_name}\s*=\s*"([^"]+)"',
        rf"{attr_name}\s*=\s*'([^']+)'",
    ]
    for pattern in patterns:
        match = re.search(pattern, attrs)
        if match:
            return match.group(1).strip()
    return None


def extract_curly_brace_list(attrs, attr_name):
    """
    Extract a simple list from props like prop={['posthog', 'amplitude']}
    Returns a list of string values without quotes.
    """
    pattern = re.compile(re.escape(attr_name) + r'\s*=\s*\{([^}]+)\}')
    match = pattern.search(attrs)
    if not match:
        return []
    raw_value = match.group(1)
    # Remove brackets if present
    raw_value = raw_value.strip()
    if raw_value.startswith('[') and raw_value.endswith(']'):
        raw_value = raw_value[1:-1]
    # Split on commas and strip quotes/spaces
    values = []
    for item in raw_value.split(','):
        cleaned = item.strip().strip('"').strip("'")
        if cleaned:
            values.append(cleaned)
    return values


def process_markdown_file(file_path, handbook_dir):
    """
    Process a single markdown file and extract speech-ready content
    
    Returns:
        dict with keys: title, slug, text
        None if file should be skipped
    """
    print(f'Processing: {file_path}')
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract title
        title = extract_title_from_frontmatter(content)
        if not title:
            title = Path(file_path).stem.replace('-', ' ').title()
        
        # Check for skip flag
        if check_skip_audio(content):
            print(f'  ⏭️  Skipping (skipAudio: true)')
            return None
        
        # Convert to speech text
        speech_text = markdown_to_speech_text(content)
        
        # Check if there's enough content
        if len(speech_text) < 100:
            print(f'  ⏭️  Skipping (too short: {len(speech_text)} chars)')
            return None
        
        # Generate slug from file path
        relative_path = Path(file_path).relative_to(handbook_dir)
        slug = str(relative_path.with_suffix('')).replace('\\', '/')
        
        print(f'  ✓ Processed {len(speech_text)} characters')
        
        return {
            'title': title,
            'slug': slug,
            'text': speech_text
        }
        
    except Exception as e:
        print(f'  ❌ Error processing {file_path}: {e}')
        return None

