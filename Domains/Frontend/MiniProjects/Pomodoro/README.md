# Pomodoro Timer

A modern, SaaS-level Pomodoro timer application built with vanilla HTML, CSS, and JavaScript. Stay focused and boost productivity with customizable work and break intervals.

## Features

✨ **Modern UI Design**

- Clean, professional interface with gradient background
- Smooth animations and transitions
- Fully responsive design (desktop, tablet, mobile)

⏱️ **Timer Functionality**

- Default 25-minute work sessions and 5-minute breaks
- Customizable work and break durations
- Real-time timer display with MM:SS format
- Session indicators showing work/break mode

🎮 **Controls**

- Start, Pause, and Reset buttons
- Resume functionality to continue paused sessions
- Automatic session switching between work and break

📊 **Statistics & Tracking**

- Track completed work sessions
- Monitor total focus time accumulated
- Stats update automatically after each work session

🔊 **Audio Notifications**

- Sound alert when sessions complete
- Smooth tone-based notification system

## File Structure

```
pomodoro-timer/
├── index.html      # HTML markup and structure
├── styles.css      # Styling, animations, and responsive design
├── script.js       # Timer logic and interactivity
└── README.md       # Project documentation
```

## Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies or installation required

### Installation

1. Clone or download the project files:

```bash
git clone
cd pomodoro-timer
```

2. Open the application:

   - Simply open `index.html` in your web browser
   - Or use a local server for best results:

     ```bash
     # Using Python 3
     python -m http.server 8000

     # Using Python 2
     python -m SimpleHTTPServer 8000

     # Using Node.js (http-server)
     npx http-server
     ```

   - Then navigate to `http://localhost:8000`

## Usage

1. **Start a Session**

   - Click the "Start" button to begin a 25-minute work session
   - Watch the timer count down in MM:SS format

2. **Pause or Resume**

   - Click "Pause" to temporarily stop the timer
   - Click "Resume" to continue where you left off

3. **Reset Timer**

   - Click "Reset" to restart the current session

4. **Customize Durations**

   - Enter desired minutes in the "Work Duration" input field
   - Enter desired minutes in the "Break Duration" input field
   - Click "Apply" to update the timer with new values

5. **Track Progress**

   - View the count of completed work sessions
   - Monitor accumulated focus time (displayed in hours)
   - Stats update automatically when work sessions complete

6. **Automatic Session Switching**
   - When a work session completes, the timer automatically switches to break mode
   - When a break completes, it automatically returns to work mode
   - A notification sound plays when each session ends

## How It Works

The Pomodoro Technique is a time-management method that uses timed intervals:

- Work for a focused period (default: 25 minutes)
- Take a short break (default: 5 minutes)
- Repeat the cycle

This timer automates the process, helping you maintain focus and avoid burnout.

## Customization

### Change Default Durations

Edit `script.js` and modify these variables:

```javascript
let workDuration = 25; // Work session in minutes
let breakDuration = 5; // Break session in minutes
```

### Modify Colors and Theme

Edit `styles.css` to change the design:

```css
/* Primary gradient color */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Accent color */
color: #667eea;
```

### Adjust Notification Sound

Edit `script.js` in the `playNotification()` function:

```javascript
oscillator.frequency.value = 800; // Frequency in Hz
gainNode.gain.setValueAtTime(0.3, audioContext.currentTime); // Volume
```

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Technical Details

### Technologies Used

- **HTML5** - Semantic markup and SVG
- **CSS3** - Flexbox, Grid, gradients, animations, and media queries
- **Vanilla JavaScript** - No frameworks or external dependencies

### Key Features

- Real-time timer with 1-second precision
- Web Audio API for notifications
- In-memory state management
- Mobile-first responsive design

## Performance

- Lightweight: ~15KB total (uncompressed)
- Instant load time
- Smooth animations
- Minimal memory footprint
- No external API calls or network requests

## Accessibility

- Semantic HTML structure
- High contrast color scheme
- Clear, descriptive button labels
- Visible visual feedback for interactions
- Responsive design for all screen sizes

## Troubleshooting

**Sound notification not playing?**

- Check browser audio permissions
- Some browsers require user interaction before playing audio
- Ensure system volume is not muted

**Timer not updating?**

- Refresh the page
- Check browser console for errors
- Ensure JavaScript is enabled

**Styling looks incorrect?**

- Clear browser cache and refresh
- Try a different browser
- Verify CSS file is in the same directory as index.html

## License

This project is open-source and available for personal and commercial use.

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review the code comments in `script.js`
3. Test in a different browser
4. Clear browser cache and retry

---

**Happy focusing! 🍅⏲️**

Use the Pomodoro Technique to boost your productivity and achieve your goals through structured, focused work sessions.
