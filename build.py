import chevron
import os
import json


print('Building website...')

with open('content.json', 'r') as file_content:
    content = file_content.read()
    data = json.loads(content)

    # Preprocessing data
    for index, item in enumerate(data['performances']):
        item['title_cover'] = item['title'].replace("-", "<p>")
        if item['url']:
            item['title_link'] = f"<b><a href=\'{item['url']}\' target=\'_blank\' style=\'color:#ad4582\'>{item['title']}</a></b>"
        else:
            item['title_link'] = f"<b>{item['title']}</b>"

        left = index % 2 == 0
        item['color'] = 'orange' if left else 'purple'
        item['position'] = 'left' if left else 'right'

    with open(f'index.mustache.html', 'r') as f:
        web = chevron.render(f, data)

        public_dir = 'public'

        with open(f'{public_dir}/index.html', 'w') as out:
            out.write(web)

            print('Finished!')