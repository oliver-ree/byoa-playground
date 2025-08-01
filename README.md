# Pomodoro Timer

A beautiful, modern Pomodoro timer that runs in your browser. Built with vanilla HTML, CSS, and JavaScript.

## Features

- ⏱️ **25-minute Pomodoro sessions** with 5-minute short breaks and 15-minute long breaks
- 🎨 **Modern, responsive design** with smooth animations and beautiful gradients
- 📊 **Progress tracking** with visual progress bar
- 📈 **Session counting** and daily time tracking
- 🔔 **Audio notifications** when sessions complete
- 💾 **Local storage** to persist your progress across browser sessions
- ⌨️ **Keyboard shortcuts** for quick control
- 📱 **Mobile-friendly** responsive design

## How to Use

1. **Open the timer**: Simply open `index.html` in your web browser
2. **Choose your mode**:
   - **Pomodoro**: 25-minute focused work sessions
   - **Short Break**: 5-minute breaks between pomodoros
   - **Long Break**: 15-minute breaks after 4 pomodoros
3. **Start your session**: Click "Start" or press the spacebar
4. **Pause if needed**: Click "Pause" or press spacebar again
5. **Reset**: Click "Reset" or press 'R' to reset the current session

## Keyboard Shortcuts

- **Spacebar**: Start/Pause timer
- **R**: Reset timer

## Pomodoro Technique

The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.

### Basic Rules:

1. **Work for 25 minutes** (one Pomodoro)
2. **Take a 5-minute break**
3. **After 4 Pomodoros, take a longer 15-30 minute break**
4. **Repeat the cycle**

## File Structure

```
pomodoro/
├── index.html      # Main HTML structure
├── styles.css      # Modern CSS styling
├── script.js       # Timer functionality
└── README.md       # This file
```

## Running the Timer

### Option 1: Direct File Opening
Simply double-click `index.html` or drag it into your browser.

### Option 2: Local Server (Recommended)
For the best experience, serve the files using a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Features in Detail

### Timer Modes
- **Pomodoro (25 min)**: Main work sessions
- **Short Break (5 min)**: Quick breaks between pomodoros
- **Long Break (15 min)**: Extended breaks after 4 pomodoros

### Progress Tracking
- Visual progress bar showing session completion
- Session counter for completed pomodoros
- Daily total time tracking
- Data persists across browser sessions

### Notifications
- Visual notifications when sessions complete
- Audio notifications using Web Audio API
- Auto-dismissing notifications after 5 seconds

### Responsive Design
- Works perfectly on desktop, tablet, and mobile
- Touch-friendly buttons and controls
- Adaptive layout for different screen sizes

## Browser Compatibility

This timer works in all modern browsers that support:
- ES6 Classes
- Local Storage
- Web Audio API (for sound notifications)
- CSS Grid and Flexbox
- CSS Custom Properties

## Customization

You can easily customize the timer by modifying the JavaScript file:

- Change session durations in the `switchMode` method
- Modify notification sounds in `playNotificationSound`
- Adjust auto-switching behavior in `autoSwitchMode`

## License

This project is open source and available under the MIT License.

---

**Happy focusing! 🍅** 