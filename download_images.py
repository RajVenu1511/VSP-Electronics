import urllib.request
import os

os.chdir('src/assets/images/categories')

urls = [
    ('https://www.agarwalelectronics.com/wp-content/uploads/2023/10/ROBOTIC-DIY-KITS-300x300.jpg', 'robotic-kits.jpg'),
    ('https://www.agarwalelectronics.com/wp-content/uploads/2023/10/READY-RUNNING-PROJECTS-300x300.jpg', 'ready-projects.jpg'),
    ('https://www.agarwalelectronics.com/wp-content/uploads/2023/10/Raspberry-Pi-Boards-300x300.jpg', 'raspberry-pi.jpg'),
    ('https://www.agarwalelectronics.com/wp-content/uploads/2023/10/MINI-DRONE-KITS-BELOW-20CMS-300x300.jpg', 'mini-drones.jpg'),
    ('https://www.agarwalelectronics.com/wp-content/uploads/2023/10/DRONE-TRANSMITER-AND-RECEIVER-300x300.jpg', 'transmitter.jpg'),
    ('https://www.agarwalelectronics.com/wp-content/uploads/2023/10/DIY-KITS-300x300.jpg', 'diy-kits.jpg'),
    ('https://www.agarwalelectronics.com/wp-content/uploads/2023/10/Bonka-Batteries-300x300.jpg', 'batteries.jpg'),
    ('https://www.agarwalelectronics.com/wp-content/uploads/2023/10/Agriculture-Drone-Parts-300x300.jpg', 'agriculture-drone.jpg')
]

for url, filename in urls:
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        with urllib.request.urlopen(req) as response:
            with open(filename, 'wb') as out_file:
                out_file.write(response.read())
        print(f'✓ Downloaded: {filename}')
    except Exception as e:
        print(f'✗ Failed: {filename} - {e}')

print('\nAll done!')
