

const collapsedChat = document.getElementById('chat-button');
const content = document.getElementById('content');

collapsedChat.addEventListener('click', () => {
    const isChatCollapsed = !content.style.maxHeight
    if (isChatCollapsed) {
        collapsedChat.setAttribute('active', 'true')
        content.style.maxHeight = `${content.scrollHeight}px`;
    } else {
        content.style.maxHeight = null;
        collapsedChat.removeAttribute('active', 'true')
    }

})
const chatbox = document.getElementById('chatbox');
const textInput = document.getElementById('textInput');
function getTime() {
    const today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;

    const time = `${hours}:${minutes}`;
    return time;
}

// [{ response: ['Paczkomat', 'Kurier'], keyword: 'zwrot' }]

function getBotResponse(input) {
    if (input === 'zwrot') {
        return ['Paczkomat', 'Kurier'];
    } else if (input === 'Kurier') {
        return 'Informacje o zwrotach przez kuriera są dostępne na: dpd.pl';
    } else if (input === 'Paczkomat') {
        return 'Paczkomaty inpost dostępne na: inpost.pl';
    } else if (input.includes('reklamacja') || input.includes('produkt')) {
        return ['Nowe', 'Uzywane'];
    } else if (input === 'Nowe') {
        return 'Produkty reklamowane mogą byc tylko nowe';
    } else if (input === 'Uzywane') {
        return 'Produktow uzywanych nie reklamujemy';
    } else if (input === 'Reklamacja produktu') {
        return 'Zapoznaj sie z naszą polityką reklamacji';
    } else {
        return 'Nie rozumiem, sprecyzuj pytanie nt. zwrotow i reklamacji 😇';
    }
}

function firstBotMessage() {
    const firstMessage = 'Pytaj o reklamacje i zwroty 😊'
    document.getElementById('botStarterMessage').innerHTML = `<p class='botText'><span>${firstMessage}</span></p>`;

    const time = getTime();
    const chatTimestamp = document.getElementById('chat-timestamp');
    chatTimestamp.append(time);
    document.getElementById('userInput').scrollIntoView(false);
}

firstBotMessage();

const createElementWithText = (message, style, type, element) => {
    message.setAttribute('class', style);
    const el = document.createElement(type);
    el.innerText = element;
    message.appendChild(el);
}

function getHardResponse(userText) {
    const botResponse = getBotResponse(userText);
    const message = document.createElement('p');

    if (Array.isArray(botResponse)) {
        botResponse.forEach((element) => {
            message.setAttribute('class', 'botHint');
            const span = document.createElement('span');
            span.addEventListener('click', () => {
                const userMessage = document.createElement('p');
                createElementWithText(userMessage, 'userText', 'span', element);
                chatbox.append(userMessage);
                getHardResponse(element);
            });
            span.innerText = element;
            message.appendChild(span);
        })
    } else if (typeof botResponse === 'string') {
        createElementWithText(message, 'botText', 'span', botResponse);
    }
    chatbox.append(message);

    document.getElementById('chat-bar-bottom').scrollIntoView(true);
}

function getResponse() {
    const userText = textInput.value;
    const userTextMessage = document.createElement('p');
    createElementWithText(userTextMessage, 'userText', 'span', userText);

    chatbox.append(userTextMessage);
    document.getElementById('chat-bar-bottom').scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

}

function sendButton() {
    event.preventDefault();
    getResponse();
    textInput.value = '';
}

const form = document.getElementById('chat-bot-form');
form.onsubmit = () => sendButton();

const submitButton = document.getElementById('chat-submit-button')
submitButton.onclick = () => sendButton();