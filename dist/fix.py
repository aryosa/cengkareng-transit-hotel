import re

with open("dist/index.html", "r") as f:
    text = f.read()

# 1. Global replace of href="index.html#" to href="#"
text = text.replace('href="index.html#', 'href="#')

# 2. Add data-ride="carousel" data-interval="3000" to Desktop carousels
text = text.replace('id="superiorCarousel" class="carousel slide center" >', 'id="superiorCarousel" class="carousel slide center" data-ride="carousel" data-interval="3000">')
text = text.replace('id="deluxeCarousel" class="carousel slide center" >', 'id="deluxeCarousel" class="carousel slide center" data-ride="carousel" data-interval="3000">')

# 3. Handle Mobile Duplicate IDs by renaming them
if 'id="mobile-room"' in text:
    parts = text.split('id="mobile-room"')
    mobile_section = parts[1]

    # In mobile section, rename the IDs
    mobile_section = mobile_section.replace('superiorCarousel', 'superiorCarousel-mob')
    mobile_section = mobile_section.replace('deluxeCarousel', 'deluxeCarousel-mob')
    mobile_section = mobile_section.replace('familyCarousel', 'familyCarousel-mob')

    # Merge back
    text = parts[0] + 'id="mobile-room"' + mobile_section
    print("Fixed mobile IDs.")
else:
    print("WARNING: id=\"mobile-room\" not found")

with open("dist/index.html", "w") as f:
    f.write(text)
print("Updated index.html")
