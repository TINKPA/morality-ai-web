/**
 * Formats a JSON string with proper indentation
 */
export const formatJSON = (jsonString: string): string => {
  try {
    const parsedJSON = JSON.parse(jsonString);
    return JSON.stringify(parsedJSON, null, 2);
  } catch (e) {
    return jsonString;
  }
};

/**
 * Applies syntax highlighting to a JSON string
 */
export const highlightJSON = (jsonString: string): string => {
  if (!jsonString) return '';
  
  // Simple syntax highlighting
  return jsonString
    .replace(/"([^"]+)":/g, '<span class="text-purple-600">"$1"</span>:') // keys
    .replace(/: "([^"]+)"/g, ': <span class="text-green-600">"$1"</span>') // string values
    .replace(/: (true|false)/g, ': <span class="text-blue-600">$1</span>') // boolean values
    .replace(/: (\d+)/g, ': <span class="text-amber-600">$1</span>'); // number values
};

/**
 * Extracts system prompt and user prompt from the combined prompt
 */
export const extractPrompts = (prompt: string): { systemPrompt: string; userPrompt: string } => {
  try {
    // Split by the markdown code block indicator
    const parts = prompt.split('```json');
    
    if (parts.length >= 2) {
      const systemPrompt = parts[0].trim();
      // Remove the closing markdown code block
      const userPromptRaw = parts[1].split('```')[0].trim();
      
      return {
        systemPrompt,
        userPrompt: userPromptRaw
      };
    }
    
    return {
      systemPrompt: prompt,
      userPrompt: ''
    };
  } catch (e) {
    return {
      systemPrompt: prompt,
      userPrompt: ''
    };
  }
}; 