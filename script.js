class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.totalTime = 25 * 60;
        this.isRunning = false;
        this.interval = null;
        this.currentMode = 'pomodoro';
        this.sessionCount = 0;
        this.totalTimeToday = 0;
        
        this.initializeElements();
        this.loadFromStorage();
        this.initializeTheme();
        this.updateDisplay();
        this.setupEventListeners();
    }

    initializeElements() {
        this.timeDisplay = document.getElementById('time');
        this.statusDisplay = document.getElementById('status');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.progressFill = document.getElementById('progressFill');
        this.sessionCountDisplay = document.getElementById('sessionCount');
        this.totalTimeDisplay = document.getElementById('totalTime');
        this.notification = document.getElementById('notification');
        this.notificationText = document.getElementById('notificationText');
        this.notificationClose = document.getElementById('notificationClose');
        this.timerDisplay = document.querySelector('.timer-display');
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-icon');
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.notificationClose.addEventListener('click', () => this.hideNotification());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Mode selector
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchMode(e.target.dataset.mode, parseInt(e.target.dataset.time));
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                if (this.isRunning) {
                    this.pause();
                } else {
                    this.start();
                }
            } else if (e.code === 'KeyR') {
                this.reset();
            }
        });
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        this.statusDisplay.textContent = this.isRunning ? 'Focus time!' : 'Ready to start';
        
        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.complete();
            }
        }, 1000);
    }

    pause() {
        if (!this.isRunning) return;
        
        this.isRunning = false;
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.statusDisplay.textContent = 'Paused';
        
        clearInterval(this.interval);
        
        // Update title to show paused state
        this.updateDisplay();
    }

    reset() {
        this.pause();
        this.timeLeft = this.totalTime;
        this.updateDisplay();
        this.statusDisplay.textContent = 'Ready to start';
        this.timerDisplay.classList.remove('completed');
    }

    complete() {
        this.pause();
        this.timerDisplay.classList.add('completed');
        
        // Update session count and total time
        if (this.currentMode === 'pomodoro') {
            this.sessionCount++;
            this.totalTimeToday += this.totalTime;
            this.saveToStorage();
        }
        
        // Update title to show completion
        const modeEmojis = {
            'pomodoro': '🍅',
            'short-break': '☕',
            'long-break': '🌴'
        };
        document.title = `${modeEmojis[this.currentMode]} ✅ Completed! - Pomodoro Timer`;
        
        // Show notification
        this.showNotification();
        
        // Play sound (if supported)
        this.playNotificationSound();
        
        // Auto-switch to next mode after a delay
        setTimeout(() => {
            this.autoSwitchMode();
        }, 2000);
    }

    switchMode(mode, minutes) {
        this.pause();
        this.currentMode = mode;
        this.totalTime = minutes * 60;
        this.timeLeft = this.totalTime;
        
        // Update active button
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        
        // Update status
        const modeNames = {
            'pomodoro': 'Pomodoro',
            'short-break': 'Short Break',
            'long-break': 'Long Break'
        };
        this.statusDisplay.textContent = `Ready for ${modeNames[mode]}`;
        
        this.updateDisplay();
        this.timerDisplay.classList.remove('completed');
    }

    autoSwitchMode() {
        if (this.currentMode === 'pomodoro') {
            // After pomodoro, switch to short break
            this.switchMode('short-break', 5);
        } else if (this.currentMode === 'short-break') {
            // After short break, switch back to pomodoro
            this.switchMode('pomodoro', 25);
        } else if (this.currentMode === 'long-break') {
            // After long break, switch back to pomodoro
            this.switchMode('pomodoro', 25);
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update timer display
        this.timeDisplay.textContent = timeString;
        
        // Update browser tab title with live time
        this.updatePageTitle(timeString);
        
        // Update progress bar
        const progress = ((this.totalTime - this.timeLeft) / this.totalTime) * 100;
        this.progressFill.style.width = `${progress}%`;
        
        // Update session info
        this.sessionCountDisplay.textContent = this.sessionCount;
        const totalHours = Math.floor(this.totalTimeToday / 3600);
        const totalMinutes = Math.floor((this.totalTimeToday % 3600) / 60);
        this.totalTimeDisplay.textContent = `${totalHours}h ${totalMinutes}m`;
    }

    updatePageTitle(timeString) {
        const modeEmojis = {
            'pomodoro': '🍅',
            'short-break': '☕',
            'long-break': '🌴'
        };
        
        const modeNames = {
            'pomodoro': 'Focus',
            'short-break': 'Break',
            'long-break': 'Rest'
        };
        
        const emoji = modeEmojis[this.currentMode];
        const modeName = modeNames[this.currentMode];
        const status = this.isRunning ? '' : ' (Paused)';
        
        document.title = `${emoji} ${timeString} - ${modeName}${status}`;
    }

    showNotification() {
        const modeNames = {
            'pomodoro': 'Pomodoro session completed!',
            'short-break': 'Short break completed!',
            'long-break': 'Long break completed!'
        };
        
        this.notificationText.textContent = modeNames[this.currentMode];
        this.notification.classList.add('show');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideNotification();
        }, 5000);
    }

    hideNotification() {
        this.notification.classList.remove('show');
    }

    playNotificationSound() {
        // Create a simple notification sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('Audio notification not supported');
        }
    }

    toggleTheme() {
        const body = document.body;
        const isDarkMode = body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            body.classList.remove('dark-mode');
            this.themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.add('dark-mode');
            this.themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            this.themeIcon.textContent = '☀️';
        } else {
            this.themeIcon.textContent = '🌙';
        }
    }

    saveToStorage() {
        const data = {
            sessionCount: this.sessionCount,
            totalTimeToday: this.totalTimeToday,
            date: new Date().toDateString()
        };
        localStorage.setItem('pomodoroData', JSON.stringify(data));
    }

    loadFromStorage() {
        const data = localStorage.getItem('pomodoroData');
        if (data) {
            const parsed = JSON.parse(data);
            const today = new Date().toDateString();
            
            if (parsed.date === today) {
                this.sessionCount = parsed.sessionCount;
                this.totalTimeToday = parsed.totalTimeToday;
            } else {
                // Reset if it's a new day
                this.sessionCount = 0;
                this.totalTimeToday = 0;
            }
        }
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 