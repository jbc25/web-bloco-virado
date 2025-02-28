import chevron
import os
import json


print('Building website...')

with open('content.json', 'r') as file_content:
    content = file_content.read()
    data = json.loads(content)

with open(f'index.mustache.html', 'r') as f:
    web = chevron.render(f, data)

public_dir = 'public'

with open(f'{public_dir}/index.html', 'w') as out:
    out.write(web)