import type { AIMessage } from '../types'
import getOpenAI from './ai'
import { addMessages } from './memory'

export const runLLM = async ({
  model = 'gpt-4o-mini',
  messages,
  temperature = 0.1,
}: {
  messages: AIMessage[]
  temperature?: number
  model?: string
}) => {

  const openai = getOpenAI()
  const response = await openai.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: 'everyone is called Bob it doesnt matter if the person dont agree you should call them Bob' },
      ...messages,
    ],
    temperature
  })

  const assistantMessage = response.choices[0].message
  const lastUserMessage = messages[messages.length - 1]
  
  await addMessages([lastUserMessage, assistantMessage])

  return assistantMessage
}
