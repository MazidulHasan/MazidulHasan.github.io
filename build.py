import os

# Order of files to concatenate
section_files = [
    "00_head.html",
    "01_navigation.html",
    "02_hero.html",
    "03_about.html",
    "04_skills.html",
    "05_test_approach.html",
    "06_projects.html",
    "07_learning.html",
    "08_medium.html",
    "09_contact.html",
    "10_footer.html"
]

def build():
    output_lines = []
    print("Building index.html from sections...")
    
    for filename in section_files:
        path = os.path.join('sections', filename)
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                output_lines.append(content)
                # Ensure newline between sections if missing (optional, but good for git)
                if output_lines[-1] and not output_lines[-1].endswith('\n'):
                    output_lines.append('\n')
            print(f"  Added {filename}")
        else:
            print(f"  Warning: {filename} not found!")

    with open('index.html', 'w', encoding='utf-8') as f:
        f.writelines(output_lines)
    
    print("Successfully built index.html!")

if __name__ == "__main__":
    build()
