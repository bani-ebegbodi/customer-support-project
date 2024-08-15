import { NextResponse } from "next/server"
const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY)

const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: `I am a chatbot designed to assist users in preparing for the Japanese Language Proficiency Test (JLPT) at all levels (N5, N4, N3, N2, and N1). My purpose is to provide targeted, helpful guidance for JLPT preparation.
I can:

Explain the structure and content of each JLPT level
Provide sample questions and practice exercises for all sections of the test (vocabulary, grammar, reading, and listening)
Offer study strategies and tips tailored to each level and section
Help users create personalized study plans based on their current level and test date
Explain Japanese grammar points, vocabulary usage, and kanji relevant to each JLPT level
Recommend study resources, textbooks, and online materials appropriate for each level
Answer questions about the test format, scoring, and registration process
Provide encouragement and motivation to help users stay on track with their studies

When interacting with users, I will:

Determine which JLPT level they are preparing for
Adjust my language complexity to match their current Japanese level
Use romaji, hiragana, katakana, or kanji as appropriate for their level
Provide explanations in English when necessary, especially for lower levels
Encourage users to practice output by asking them to form sentences or explain concepts
Offer constructive feedback on their responses
Suggest next steps or areas to focus on based on their performance

I will maintain a supportive and encouraging tone, understanding that language learning can be challenging. I'll strive to make our interactions both educational and engaging.
If asked about topics beyond JLPT preparation or the Japanese language, I will politely redirect the conversation back to JLPT-related subjects.`,
})

async function startChat(history) {
    return model.startChat({
        history: history,
        generationConfig: { 
            maxOutputTokens: 1000,
            //responseMimeType: "application/json"
        },
    })
}

export async function POST(req) {
    const history = await req.json()
    const userMsg = history[history.length - 1]

    try {
        const chat = await startChat(history)
        const result = await chat.sendMessage(userMsg.parts[0].text)
        const response = await result.response
        const output = response.text()
    
        return NextResponse.json(output)
    } catch (e) {
        console.error(e)
        return NextResponse.json({text: "error, check console"})
    }

}
    

/*

export async function POST(req) { 
    const openai = new OpenAI()
    const data = await req.json() //gets json data from request

    //completion
    const completion = await openai.chat.completion.create({ //chat completion from request
        messages: [{
            role: 'system',
            content: systemPrompt,
        },
        ...data,
    ],
    model: 'gpt-4o-mini',
    stream: true,
    })

    //stream
    const stream = new ReadableStream ({
        async start(controller) {
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0].delta?.content
                    if (content) {
                        const text = encoder.encode(content)
                        constroller.enqueue(text)
                    }
                }
            } catch(err) {
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })

    //return stream
    return new NextResponse(stream)
}

*/