const axios = require('axios');
const packageJson = require('./package.json');

class Quiva {
    constructor({ username, apiKey }) {
        this.username = username;
        this.apiKey = apiKey;
        this.baseURL = 'https://ai.quivoxstudio.cloud';
        this.historyURL = 'http://4.dreamnity.in:40029/generate-response';

        this.showInitMessage();
        this.checkForPackageUpdate();
    }

    showInitMessage() {
        console.log("\x1b[33m%s\x1b[0m", "Initializing Quiva...");
        console.log("\x1b[36m%s\x1b[0m", "Welcome to Quiva, your premium AI assistant.");
    }

    async checkForPackageUpdate() {
        try {
            const response = await axios.get('https://registry.npmjs.org/quiva');
            const latestVersion = response.data['dist-tags'].latest;
            if (packageJson.version !== latestVersion) {
                console.log("\x1b[31m%s\x1b[0m", `Important: A new version of Quiva (${latestVersion}) is available!`);
                console.log("\x1b[33m%s\x1b[0m", "Consider updating for new features and bug fixes.");
            }
        } catch (error) {
            console.error("Error checking for package update:", error.message);
        }
    }

    async generateResponse(messageContent) {
        try {
            const response = await axios.post(
                `${this.historyURL}/${this.username}`, { message: messageContent }, { headers: { Authorization: this.apiKey, 'Content-Type': 'application/json' } }
            );
            console.log("\x1b[32m%s\x1b[0m", "Response generated successfully.");
            return response.data;
        } catch (error) {
            console.error("\x1b[31m%s\x1b[0m", `Error in generateResponse: ${error.message}`);
            throw new Error(`Error in generateResponse: ${error.message}`);
        }
    }

    async textToSpeech(text) {
        try {
            const response = await axios.post(
                `${this.baseURL}/api/tts-ai`, { text, username: this.username }, { headers: { Authorization: this.apiKey, 'Content-Type': 'application/json' } }
            );
            console.log("\x1b[32m%s\x1b[0m", "Text converted to speech successfully.");
            return response.data;
        } catch (error) {
            console.error("\x1b[31m%s\x1b[0m", `Error in textToSpeech: ${error.message}`);
            throw new Error(`Error in textToSpeech: ${error.message}`);
        }
    }

    async generateResponseFromPromptAndImage(prompt, imageUrl) {
        try {
            const response = await axios.post(
                `${this.baseURL}/generate`, { prompt, imageUrl, username: this.username }, { headers: { Authorization: this.apiKey, 'Content-Type': 'application/json' } }
            );
            console.log("\x1b[32m%s\x1b[0m", "Response generated from prompt and image successfully.");
            return response.data;
        } catch (error) {
            console.error("\x1b[31m%s\x1b[0m", `Error in generateResponseFromPromptAndImage: ${error.message}`);
            throw new Error(`Error in generateResponseFromPromptAndImage: ${error.message}`);
        }
    }
}

module.exports = Quiva;