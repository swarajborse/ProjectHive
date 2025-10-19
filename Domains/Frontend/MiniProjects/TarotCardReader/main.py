import tkinter as tk
from tkinter import ttk, scrolledtext
import random

# Major Arcana Cards with meanings
TAROT_CARDS = {
    "The Fool": "New beginnings, innocence, spontaneity, free spirit. Embrace the unknown with childlike wonder.",
    "The Magician": "Manifestation, resourcefulness, power, inspired action. You have all the tools you need.",
    "The High Priestess": "Intuition, sacred knowledge, divine feminine, the subconscious. Trust your inner voice.",
    "The Empress": "Femininity, beauty, nature, nurturing, abundance. Connect with your creative side.",
    "The Emperor": "Authority, establishment, structure, father figure. Take control and lead with wisdom.",
    "The Hierophant": "Spiritual wisdom, tradition, conformity, morality. Seek guidance from established paths.",
    "The Lovers": "Love, harmony, relationships, values alignment. Make choices from the heart.",
    "The Chariot": "Control, willpower, success, determination. Victory through focus and discipline.",
    "Strength": "Inner strength, courage, patience, compassion. Gentle power overcomes all obstacles.",
    "The Hermit": "Soul searching, introspection, inner guidance, solitude. Look within for answers.",
    "Wheel of Fortune": "Good luck, karma, life cycles, destiny. Change is the only constant.",
    "Justice": "Justice, fairness, truth, cause and effect. Balance will be restored.",
    "The Hanged Man": "Pause, surrender, letting go, new perspective. Sometimes stillness brings clarity.",
    "Death": "Endings, transformation, transition, letting go. An ending makes room for new beginnings.",
    "Temperance": "Balance, moderation, patience, purpose. Find the middle way in all things.",
    "The Devil": "Shadow self, attachment, addiction, restriction. Break free from limiting beliefs.",
    "The Tower": "Sudden change, upheaval, chaos, revelation. Destruction clears the way for rebuilding.",
    "The Star": "Hope, faith, purpose, renewal, spirituality. The light at the end of the tunnel.",
    "The Moon": "Illusion, fear, anxiety, subconscious, intuition. Not everything is as it seems.",
    "The Sun": "Positivity, fun, warmth, success, vitality. Pure joy and positive energy shine through.",
    "Judgement": "Judgement, rebirth, inner calling, absolution. Rise up and answer your calling.",
    "The World": "Completion, accomplishment, travel, fulfillment. A cycle ends; celebrate your journey."
}

class TarotReaderApp:
    def __init__(self, root):
        self.root = root
        self.root.title("✨ Mystical Digital Tarot Reader ✨")
        self.root.geometry("900x700")
        self.root.configure(bg="#0a0e27")
        
        # Style configuration
        self.setup_styles()
        
        # Create UI
        self.create_header()
        self.create_buttons()
        self.create_reading_area()
        self.create_footer()
    
    def setup_styles(self):
        """Configure ttk styles for buttons"""
        style = ttk.Style()
        style.theme_use('clam')
        
        # Custom button style
        style.configure('Mystical.TButton',
                       background='#2d1b69',
                       foreground='#e0d5f5',
                       borderwidth=2,
                       focuscolor='none',
                       font=('Georgia', 12, 'bold'),
                       padding=10)
        
        style.map('Mystical.TButton',
                 background=[('active', '#3d2b79'), ('pressed', '#1d0b59')])
    
    def create_header(self):
        """Create the header with title and subtitle"""
        header_frame = tk.Frame(self.root, bg="#0a0e27")
        header_frame.pack(pady=20)
        
        # Title
        title = tk.Label(header_frame,
                        text="✨ MYSTICAL TAROT READER ✨",
                        font=("Georgia", 28, "bold"),
                        fg="#ffd700",
                        bg="#0a0e27")
        title.pack()
        
        # Subtitle
        subtitle = tk.Label(header_frame,
                           text="🌙 Discover the wisdom of the cards 🌙",
                           font=("Georgia", 14, "italic"),
                           fg="#b8a3d6",
                           bg="#0a0e27")
        subtitle.pack(pady=5)
        
        # Decorative stars
        stars = tk.Label(header_frame,
                        text="⭐ ✨ 🌟 ✨ ⭐",
                        font=("Arial", 16),
                        fg="#9d7fd9",
                        bg="#0a0e27")
        stars.pack()
    
    def create_buttons(self):
        """Create reading type buttons"""
        button_frame = tk.Frame(self.root, bg="#0a0e27")
        button_frame.pack(pady=20)
        
        # Single Card Reading
        btn_single = ttk.Button(button_frame,
                               text="🔮 Single Card Reading",
                               style='Mystical.TButton',
                               command=self.single_card_reading)
        btn_single.grid(row=0, column=0, padx=10, pady=5)
        
        # Three Card Reading
        btn_three = ttk.Button(button_frame,
                              text="🎴 Three Card Reading",
                              style='Mystical.TButton',
                              command=self.three_card_reading)
        btn_three.grid(row=0, column=1, padx=10, pady=5)
        
        # Celtic Cross Reading
        btn_celtic = ttk.Button(button_frame,
                               text="⭐ Celtic Cross (5 Cards)",
                               style='Mystical.TButton',
                               command=self.celtic_cross_reading)
        btn_celtic.grid(row=0, column=2, padx=10, pady=5)
    
    def create_reading_area(self):
        """Create the scrolled text area for displaying readings"""
        # Frame for reading area
        reading_frame = tk.Frame(self.root, bg="#0a0e27")
        reading_frame.pack(pady=10, padx=20, fill=tk.BOTH, expand=True)
        
        # Label
        label = tk.Label(reading_frame,
                        text="Your Reading Will Appear Below:",
                        font=("Georgia", 14, "bold"),
                        fg="#e0d5f5",
                        bg="#0a0e27")
        label.pack(pady=5)
        
        # Scrolled text widget
        self.reading_text = scrolledtext.ScrolledText(reading_frame,
                                                      wrap=tk.WORD,
                                                      width=80,
                                                      height=20,
                                                      font=("Georgia", 11),
                                                      bg="#1a1435",
                                                      fg="#e0d5f5",
                                                      insertbackground="#ffd700",
                                                      relief=tk.SOLID,
                                                      borderwidth=2)
        self.reading_text.pack(pady=10, fill=tk.BOTH, expand=True)
        
        # Configure text tags for styling
        self.reading_text.tag_configure("title", font=("Georgia", 16, "bold"), foreground="#ffd700")
        self.reading_text.tag_configure("card_name", font=("Georgia", 13, "bold"), foreground="#9d7fd9")
        self.reading_text.tag_configure("position", font=("Georgia", 12, "italic"), foreground="#b8a3d6")
        self.reading_text.tag_configure("meaning", font=("Georgia", 11), foreground="#e0d5f5")
    
    def create_footer(self):
        """Create footer with disclaimer"""
        footer = tk.Label(self.root,
                         text="⚠️ For entertainment purposes only ⚠️\nReflect on the messages, but make decisions with wisdom.",
                         font=("Georgia", 9, "italic"),
                         fg="#8a7ba8",
                         bg="#0a0e27",
                         justify=tk.CENTER)
        footer.pack(pady=10)
    
    def draw_cards(self, num_cards):
        """Draw random cards without replacement"""
        cards = list(TAROT_CARDS.keys())
        return random.sample(cards, num_cards)
    
    def display_reading(self, title, cards_info):
        """Display the reading in the text area"""
        self.reading_text.delete(1.0, tk.END)
        
        # Title
        self.reading_text.insert(tk.END, f"\n{'='*60}\n", "title")
        self.reading_text.insert(tk.END, f"{title}\n", "title")
        self.reading_text.insert(tk.END, f"{'='*60}\n\n", "title")
        
        # Display each card
        for position, card_name in cards_info:
            # Position (if any)
            if position:
                self.reading_text.insert(tk.END, f"{position}\n", "position")
            
            # Card name
            self.reading_text.insert(tk.END, f"🎴 {card_name}\n", "card_name")
            
            # Card meaning
            meaning = TAROT_CARDS[card_name]
            self.reading_text.insert(tk.END, f"{meaning}\n\n", "meaning")
            self.reading_text.insert(tk.END, f"{'-'*60}\n\n", "meaning")
        
        # Closing message
        self.reading_text.insert(tk.END, "\n✨ May these insights guide your path ✨\n", "title")
    
    def single_card_reading(self):
        """Perform a single card reading"""
        cards = self.draw_cards(1)
        cards_info = [("", cards[0])]
        self.display_reading("🔮 SINGLE CARD READING 🔮", cards_info)
    
    def three_card_reading(self):
        """Perform a three card reading (Past, Present, Future)"""
        cards = self.draw_cards(3)
        cards_info = [
            ("📜 PAST - What Led You Here:", cards[0]),
            ("⏳ PRESENT - Your Current Situation:", cards[1]),
            ("🔮 FUTURE - What's Coming:", cards[2])
        ]
        self.display_reading("🎴 THREE CARD READING 🎴", cards_info)
    
    def celtic_cross_reading(self):
        """Perform a Celtic Cross reading (5 cards)"""
        cards = self.draw_cards(5)
        cards_info = [
            ("1️⃣ PRESENT SITUATION - Where You Stand:", cards[0]),
            ("2️⃣ CHALLENGE - What Crosses You:", cards[1]),
            ("3️⃣ FOUNDATION - What Lies Beneath:", cards[2]),
            ("4️⃣ RECENT PAST - What's Behind You:", cards[3]),
            ("5️⃣ POTENTIAL OUTCOME - What Awaits:", cards[4])
        ]
        self.display_reading("⭐ CELTIC CROSS READING ⭐", cards_info)

def main():
    """Main function to run the application"""
    root = tk.Tk()
    app = TarotReaderApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()