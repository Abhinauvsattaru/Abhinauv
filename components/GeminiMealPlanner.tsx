
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';

// IMPORTANT: Do not expose the API key in client-side code in a real application.
// This is for demonstration purposes only. In a production environment, this
// call should be made from a secure backend server.
const API_KEY = process.env.API_KEY;

const GeminiMealPlanner: React.FC = () => {
    const [ingredients, setIngredients] = useState<string>('');
    const [mealIdeas, setMealIdeas] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const generateMealIdeas = useCallback(async () => {
        if (!ingredients.trim()) {
            setError('Please enter some ingredients.');
            return;
        }
        if (!API_KEY) {
            setError('API key is not configured. Please set the API_KEY environment variable.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setMealIdeas('');

        try {
            const ai = new GoogleGenAI({ apiKey: API_KEY });
            const prompt = `You are an expert chef. Based on the following ingredients: "${ingredients}", suggest 3 creative and delicious meal ideas. For each idea, provide a catchy name, a short, appealing description, and a list of the main ingredients required from the provided list. Format your response as clean markdown.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            if (response.text) {
                setMealIdeas(response.text);
            } else {
                setError('Could not generate meal ideas. The response was empty.');
            }
        } catch (e) {
            console.error(e);
            setError('Failed to get meal ideas. Please check the console for details.');
        } finally {
            setIsLoading(false);
        }
    }, [ingredients]);
    
    // A simple markdown to HTML converter
    const renderMarkdown = (text: string) => {
        const html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
            .replace(/\n/g, '<br />'); // New lines
        return { __html: html };
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">AI Meal Planner</h2>
                <p className="mt-2 text-gray-600">Don't know what to cook? Enter the ingredients you have, and let our AI chef inspire you!</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="e.g., chicken breast, tomatoes, rice"
                    className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    disabled={isLoading}
                />
                <button
                    onClick={generateMealIdeas}
                    disabled={isLoading}
                    className="bg-red-600 text-white px-6 py-3 font-semibold rounded-md hover:bg-red-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : (
                        'Get Ideas'
                    )}
                </button>
            </div>

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

            {mealIdeas && (
                <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
                    <h3 className="text-xl font-bold mb-4">Here are some ideas for you:</h3>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={renderMarkdown(mealIdeas)} />
                </div>
            )}
        </div>
    );
};

export default GeminiMealPlanner;
