import fs from 'fs';

// Read key from .env
const envContent = fs.readFileSync('.env', 'utf-8');
const keyMatch = envContent.match(/VITE_GEMINI_API_KEY=(.*)/);
const keyToUse = keyMatch ? keyMatch[1].trim() : null;

if (!keyToUse) {
  console.log("No key found in .env");
  process.exit(1);
}

async function run() {
  console.log("Fetching available models...");
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${keyToUse}`);
    const data = await response.json();
    console.log("Available models:");
    if (data.models) {
      data.models.forEach(m => console.log(`- ${m.name} (supports: ${m.supportedGenerationMethods.join(', ')})`));
    } else {
      console.log("No models returned. API Response:", data);
    }
  } catch (error) {
    console.error("Error fetching models:", error);
  }
}

run();
