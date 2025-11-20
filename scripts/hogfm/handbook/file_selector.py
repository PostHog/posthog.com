"""
Select and discover handbook files for processing
"""

from pathlib import Path


def find_all_handbook_files(handbook_dir):
    """Find all handbook markdown files"""
    files = []
    
    for file_path in handbook_dir.rglob('*'):
        if file_path.is_file() and file_path.suffix in ['.md', '.mdx']:
            # Skip _snippets and _includes
            if '_snippets' not in str(file_path) and '_includes' not in str(file_path):
                files.append(file_path)
    
    return sorted(files)


def find_handbook_file_by_pattern(handbook_dir, pattern):
    """
    Find handbook files matching a pattern
    
    Args:
        handbook_dir: Root handbook directory
        pattern: String pattern to match (e.g., 'values', 'engineering/operations', etc.)
    
    Returns:
        List of matching file paths
    """
    pattern_lower = pattern.lower()
    all_files = find_all_handbook_files(handbook_dir)
    
    matching_files = []
    for file_path in all_files:
        relative_path = str(file_path.relative_to(handbook_dir)).lower()
        file_stem = file_path.stem.lower()
        
        # Match against full relative path or just filename
        if pattern_lower in relative_path or pattern_lower in file_stem:
            matching_files.append(file_path)
    
    return matching_files


def find_handbook_files_in_directory(handbook_dir, target_dir):
    """
    Find all handbook files in a specific directory (and subdirectories)
    
    Args:
        handbook_dir: Root handbook directory (e.g., contents/handbook)
        target_dir: Target subdirectory relative to handbook_dir (e.g., 'engineering' or 'engineering/operations')
    
    Returns:
        List of file paths in the target directory
    """
    # Resolve the full path to the target directory
    target_path = handbook_dir / target_dir
    
    if not target_path.exists():
        return []
    
    if not target_path.is_dir():
        return []
    
    files = []
    for file_path in target_path.rglob('*'):
        if file_path.is_file() and file_path.suffix in ['.md', '.mdx']:
            # Skip _snippets and _includes
            if '_snippets' not in str(file_path) and '_includes' not in str(file_path):
                files.append(file_path)
    
    return sorted(files)


def get_handbook_file_info(handbook_dir):
    """Get summary information about handbook files"""
    files = find_all_handbook_files(handbook_dir)
    
    # Group by directory
    by_directory = {}
    for file_path in files:
        relative_path = file_path.relative_to(handbook_dir)
        directory = relative_path.parent if relative_path.parent != Path('.') else Path('root')
        
        if directory not in by_directory:
            by_directory[directory] = []
        by_directory[directory].append(file_path)
    
    return {
        'total_files': len(files),
        'by_directory': by_directory,
        'all_files': files
    }

