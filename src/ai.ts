import OpenAI from 'openai'

 
export default function getOpenAI() {

  const openai = new OpenAI()
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set')
  }


  return openai
}




