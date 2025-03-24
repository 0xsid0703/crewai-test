'use client'
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async () => {
    setIsLoading(true)
    const res = await axios.post('/api/generate', { prompt })
    console.log("Res: ", res.data.response.response)
    const response = res.data.response.response.raw
    console.log({response})
    setResponse(response)
    setIsLoading(false)
  }
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-10 sm:p-20">
      <span className="text-2xl font-bold">CrewAI agent</span>
      <div className="w-1/2 flex flex-row gap-5">
        <input type="text" placeholder="Enter your prompt" className="w-full border-2 border-gray-300 rounded-lg p-2" alt="" onChange={(e) => setPrompt(e.target.value)} />
        <button className="bg-blue-500 rounded-lg p-2 cursor-pointer hover:bg-blue-600" onClick={handleSubmit}>Submit</button>
      </div>
      <div className="w-1/2 relative min-h-96">
        <div className="w-full min-h-96 border-2 border-gray-300 rounded-lg p-2">
          <p>{response}</p>
        </div>
        {
          isLoading && <div className="w-full min-h-96 border-2 border-gray-300 bg-gray-700 rounded-lg p-2 absolute top-0 flex items-center justify-center">
            <p>Processing...</p>
          </div>
        }
      </div>
    </div>
  );
}
