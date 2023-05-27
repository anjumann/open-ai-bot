import axios from "axios";
import { useState } from "react"

import { Configuration, OpenAIApi } from "openai";


export default function Home() {



  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const openAiCompletion = async (message) => {

    const query = `[
      {
        "role": "system",
        "content": "You are tasked with acting like ChatGPT. Your goal is to engage in conversation with users, provide helpful and informative responses, and exhibit a friendly and natural conversational style. Imagine yourself as a helpful and knowledgeable virtual assistant, ready to assist users with their inquiries, provide recommendations, and engage in meaningful discussions. Your primary objective is to ensure a positive user experience by delivering accurate and relevant information while maintaining a conversational tone. Remember to be patient, empathetic, and adaptable to different conversational styles. Now, go ahead and bring ChatGPT to life!"
      },
      {
        "role": "user",
        "content": "I am going to ask or give some topic names. explain the topics in details and break it into sub topics for better understanding and explain it like I am five. give bullet points. minimize the response token by providing to the point and exact explanation and don't add header and footer. give complete response in html format ( use li tag for points and h(1-6) for heading and p tags for paragragh and use br tag instead of '\n' for line change and apply some inline css if possible or requeired.) always reply in English unless instructed."
      },
      {
        "role": "user",
        "content": ${message}
      }
    ]`

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: query,

      });
      console.log(response.data.choices[0].message.content);
      return response.data.choices[0].message.content;
    }
    catch (error) {
      console.log(error);
      return error;
    }
  }

  const fetchOpenAIData = async () => {

    setLoading(true)

    const res = await openAiCompletion(message);
    console.log(res);
    // setResponse(res);
    setLoading(false)
  }

  const [loading, setLoading] = useState(false)

  // const fetchDataOpenAI = async (query) => {

  //   let headersList = {
  //     "Accept": "*/*",
  //     "Content-Type": "application/json"
  //   }

  //   let bodyContent = JSON.stringify(
  //     {
  //       "message": [
  //         {
  //           "role": "system",
  //           "content": "You are tasked with acting like ChatGPT. Your goal is to engage in conversation with users, provide helpful and informative responses, and exhibit a friendly and natural conversational style. Imagine yourself as a helpful and knowledgeable virtual assistant, ready to assist users with their inquiries, provide recommendations, and engage in meaningful discussions. Your primary objective is to ensure a positive user experience by delivering accurate and relevant information while maintaining a conversational tone. Remember to be patient, empathetic, and adaptable to different conversational styles. Now, go ahead and bring ChatGPT to life!"
  //         },
  //         {
  //           "role": "user",
  //           "content": "I am going to ask or give some topic names. explain the topics in details and break it into sub topics for better understanding and explain it like I am five. give bullet points. minimize the response token by providing to the point and exact explanation and don't add header and footer. give complete response in html format ( use li tag for points and h(1-6) for heading and p tags for paragragh and use br tag instead of '\n' for line change and apply some inline css if possible or requeired.) always reply in English unless instructed."
  //         },
  //         {
  //           "role": "user",
  //           "content": query
  //         }
  //       ]
  //     }
  //   );

  //   let reqOptions = {
  //     url: "http://localhost:3000/api/openai",
  //     method: "POST",
  //     headers: headersList,
  //     data: bodyContent,
  //   }


  //   setLoading(true)
  //   const res = await axios.request(reqOptions);
  //   // setResponse(res.data)
  //   console.log(res.data.messages);
  //   setMessage('')
  //   setLoading(false)
  // }

  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('explaination')

  return (
    <main>

      <div className="mx-auto w-fit" >
        <label htmlFor="UserEmail" className="block text-lg font-medium text-gray-700">
          Enter Your topics name
        </label>

        <input
          type="text"
          id="message"
          placeholder="ex - Distance and vectors"
          className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          value={message}
          onChange={(e) => { setMessage(e.target.value) }}
        />

        <div
          class="inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
          onClick={fetchOpenAIData}
        >
          <span
            class="block rounded-sm bg-white px-8 py-3 text-sm font-medium hover:bg-transparent"
          >
            make call
          </span>
        </div>
      </div>

      <div className="mx-auto w-fit mt-5">
        {!loading ? response : 'Laoding...'}
      </div>

    </main>
  )
}


