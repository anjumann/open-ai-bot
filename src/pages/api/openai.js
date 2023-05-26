const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



const openAiCompletion = async (message) => {

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: message,
            
        });
        console.log(response.data.choices[0].message.content);
        return response.data.choices[0].message.content;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}


export default async function handler(req, res) {

    // const { message } = req.body;

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Only POST requests allowed' })
    }

    const message = req.body.message

    const data = await openAiCompletion(message);
    res.status(200).json({ data: data })
}
