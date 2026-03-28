import re

with open("dist/index.html", "r") as f:
    text = f.read()

# 1. Global replace of href="index.html#" to href="#"
text = text.replace('href="index.html#', 'href="#')

# 2. Add data-ride="carousel" data-interval="3000" to Desktop carousels
text = text.replace('id="superiorCarousel" class="carousel slide center" >', 'id="superiorCarousel" class="carousel slide center" data-ride="carousel" data-interval="3000">')
text = text.replace('id="deluxeCarousel" class="carousel slide center" >', 'id="deluxeCarousel" class="carousel slide center" data-ride="carousel" data-interval="3000">')

# 3. Handle Mobile Duplicate IDs by renaming them
# We can find the mobile carousel containers which already have data-ride="carousel"
# And we know they occur later in the file (lines 1000+)
# Let's split by the mobile section wrapper "mobile-room-tab-wrapper"
parts = text.split('id="mobile-room-tab-wrapper"')
mobile_section = parts[1]

# In mobile section, rename the IDs
mobile_section = mobile_section.replace('superiorCarousel', 'superiorCarousel-mob')
mobile_section = mobile_section.replace('deluxeCarousel', 'deluxeCarousel-mob')
mobile_section = mobile_section.replace('familyCarousel', 'familyCarousel-mob') # might as well

# Merge back
text = parts[0] + 'id="mobile-room-tab-wrapper"' + mobile_section

with open("dist/index.html", "w") as f:
    f.write(text)

