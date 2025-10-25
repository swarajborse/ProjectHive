import qrcode
import os
import requests

def shorten_url(long_url):
    """
    Shortens a URL using the TinyURL API.
    """
    api_url = f"http://tinyurl.com/api-create.php?url={long_url}"
    response = requests.get(api_url)
    if response.status_code == 200:
        return response.text
    else:
        raise Exception("Failed to shorten URL")

# Get user input
data = input("Enter the link: ")
shorten = input("Do you want to shorten the URL? (y/n): ").lower()

if shorten == "y":
    try:
        data = shorten_url(data)
        print(f"Shortened URL: {data}")
    except Exception as e:
        print(e)
        print("Proceeding with original URL...")

name = input("Enter the name of the file (without extension): ")

# Create QR code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(data)
qr.make(fit=True)
img = qr.make_image(fill_color="black", back_color="white")

# Save to 'qr_codes' folder relative to this script
save_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "qr_codes")
os.makedirs(save_path, exist_ok=True)
file_path = os.path.join(save_path, f"{name}.png")
img.save(file_path)

print(f"✅ QR code generated and saved to {file_path}")
