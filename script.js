document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const cursor = document.getElementById('cursor');
    const progressContainer = document.getElementById('progress-container');
    const progressLabel = document.getElementById('progress-label');
    const progressBarInner = document.getElementById('progress-bar-inner');
    const finalMessage = document.getElementById('final-message');

    const sequence = [
        { action: 'type', text: '> Bypassing security protocols...', delay: 50 },
        { action: 'delay', duration: 1000 },
        { action: 'type', text: '\n> Locating main server...', delay: 50 },
        { action: 'delay', duration: 1500 },
        { action: 'type', text: '\n> Connection established.', delay: 50 },
        { action: 'delay', duration: 500 },
        { action: 'fast-scroll', lines: 30, duration: 2000 },
        { action: 'delay', duration: 500 },
        { action: 'progress', label: 'DECRYPTING FIREWALL...', duration: 4000 },
        { action: 'delay', duration: 1000 },
        { action: 'final-message', text: 'ACCESS GRANTED' }
    ];

    function typeText(element, text, delay, callback) {
        let i = 0;
        cursor.style.display = 'none';
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                window.scrollTo(0, document.body.scrollHeight);
            } else {
                clearInterval(interval);
                cursor.style.display = 'inline-block';
                if (callback) callback();
            }
        }, delay);
    }

    function fastScroll(lines, duration, callback) {
        cursor.style.display = 'none';
        let count = 0;
        const interval = setInterval(() => {
            const randomHex = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
            const randomAddr = `0x${randomHex}`;
            output.innerHTML += `\n[${Date.now()}] Accessing block ${randomAddr}... OK`;
            window.scrollTo(0, document.body.scrollHeight);
            count++;
            if (count >= lines) {
                clearInterval(interval);
                cursor.style.display = 'inline-block';
                if (callback) callback();
            }
        }, duration / lines);
    }
    
    function showProgress(label, duration, callback) {
        output.innerHTML = ''; // 画面をクリア
        cursor.style.display = 'none';
        progressContainer.classList.remove('hidden');
        progressLabel.textContent = label;
        
        setTimeout(() => {
            progressBarInner.style.width = '100%';
        }, 100);

        setTimeout(() => {
            progressContainer.classList.add('hidden');
            if (callback) callback();
        }, duration + 500);
    }

    function showFinalMessage(text, callback) {
        finalMessage.textContent = text;
        finalMessage.classList.remove('hidden');
        if (callback) callback();
    }

    async function runSequence() {
        for (const step of sequence) {
            await new Promise(resolve => {
                switch (step.action) {
                    case 'type':
                        typeText(output, step.text, step.delay, resolve);
                        break;
                    case 'delay':
                        setTimeout(resolve, step.duration);
                        break;
                    case 'fast-scroll':
                        fastScroll(step.lines, step.duration, resolve);
                        break;
                    case 'progress':
                        showProgress(step.label, step.duration, resolve);
                        break;
                    case 'final-message':
                        showFinalMessage(step.text, resolve);
                        break;
                }
            });
        }
    }

    runSequence();
});
