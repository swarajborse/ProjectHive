import qrcode
import os

# Get user input
data = input("Enter the link or text: ")
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

# Save to a folder named 'qr_codes' relative to this script
save_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "qr_codes")
os.makedirs(save_path, exist_ok=True)  # creates folder if it doesn't exist

# Save the image
file_path = os.path.join(save_path, f"{name}.png")
img.save(file_path)

print(f"QR code generated and saved to {file_path}")
