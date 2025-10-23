#!/usr/bin/env python3
"""
Extract menu structure from EUROTRADE B2B HTML file
"""

from bs4 import BeautifulSoup
import json
import re

def extract_menu_structure(html_file):
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    menu_structure = {}

    # Find all main category dropdowns
    main_dropdowns = soup.find_all('a', class_='dropbtn', href=True)

    for main_dropdown in main_dropdowns:
        main_text = main_dropdown.get_text(strip=True)

        # Skip if empty
        if not main_text:
            continue

        # Extract menuId from href
        href = main_dropdown.get('href', '')
        menu_id_match = re.search(r'menuId=(\d+)', href)

        if not menu_id_match:
            continue

        menu_id = menu_id_match.group(1)

        print(f"\n{'='*60}")
        print(f"Main Category: {main_text} (menuId={menu_id})")
        print(f"{'='*60}")

        # Initialize structure for this main category
        menu_structure[main_text] = {
            'menuId': menu_id,
            'categories': {}
        }

        # Find the dropdown content that follows this main dropdown
        # The structure is: <a class="dropbtn"> followed by <div class="dropdown-content">
        dropdown_content = main_dropdown.find_next_sibling('div', class_='dropdown-content')
        if not dropdown_content:
            continue

        # Find all subcategories within the dropdown content
        subcategories = dropdown_content.find_all('li', class_='dropdown-submenu2')

        for subcat in subcategories:
            subcat_link = subcat.find('a', href=True)
            if not subcat_link:
                continue

            subcat_text = subcat_link.get_text(strip=True).replace('\xa0', '').strip()

            # Extract categoryIdList from href
            subcat_href = subcat_link.get('href', '')
            category_id_match = re.search(r'categoryIdList=(\d+)', subcat_href)

            if not category_id_match:
                continue

            category_id = category_id_match.group(1)

            print(f"\n  Category: {subcat_text} (categoryId={category_id})")

            # Initialize category
            menu_structure[main_text]['categories'][subcat_text] = {
                'categoryId': category_id,
                'subcategories': []
            }

            # Find all sub-subcategories within this category
            subcat_ul = subcat.find('ul', class_='dropdown-menu')
            if subcat_ul:
                sub_items = subcat_ul.find_all('li', class_='subItem')

                for sub_item in sub_items:
                    sub_link = sub_item.find('a', href=True)
                    if not sub_link:
                        continue

                    sub_text = sub_link.get_text(strip=True)

                    # Skip the header item (usually the category name repeated)
                    if ':' in sub_text and sub_text.replace(':', '').strip() == subcat_text:
                        continue

                    # Extract category2IdList
                    sub_href = sub_link.get('href', '')
                    category2_id_match = re.search(r'category2IdList=(\d+)', sub_href)

                    if category2_id_match:
                        category2_id = category2_id_match.group(1)
                        print(f"    - {sub_text} (category2Id={category2_id})")

                        menu_structure[main_text]['categories'][subcat_text]['subcategories'].append({
                            'name': sub_text,
                            'category2Id': category2_id
                        })
                    else:
                        print(f"    - {sub_text}")
                        menu_structure[main_text]['categories'][subcat_text]['subcategories'].append({
                            'name': sub_text
                        })

    return menu_structure


if __name__ == '__main__':
    html_file = 'filters-temp/EUROTRADE B2B.html'

    print("Extracting menu structure from EUROTRADE B2B HTML...")
    print()

    menu_structure = extract_menu_structure(html_file)

    # Save to JSON file
    output_file = 'filters-temp/menu-structure.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(menu_structure, f, ensure_ascii=False, indent=2)

    print(f"\n\n{'='*60}")
    print(f"Menu structure saved to: {output_file}")
    print(f"{'='*60}")

    # Print summary
    print("\n\nSUMMARY:")
    print(f"{'='*60}")
    for main_cat, data in menu_structure.items():
        cat_count = len(data['categories'])
        total_subcats = sum(len(cat['subcategories']) for cat in data['categories'].values())
        print(f"{main_cat}")
        print(f"  - {cat_count} categories")
        print(f"  - {total_subcats} subcategories")
        print()
