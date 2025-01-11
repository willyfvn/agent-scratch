import { JSONFilePreset } from 'lowdb/node'
import { v4 as uuidv4 } from 'uuid'
import type { AIMessage } from '../types'



export type MessageWithMetadata = AIMessage & {
  id: string
  createdAt: string
}

export const addMetadata = (message: AIMessage): MessageWithMetadata => ({
  ...message,
  id: uuidv4(),
  createdAt: new Date().toISOString(),
})



export const getDb = () => {
  return JSONFilePreset<Data>('db.json', {
    messages: [],
  })
}

type Data = {
  messages: MessageWithMetadata[]
}

export const addMessages = async (messages: AIMessage[]) => {
  const db = await getDb()
  db.data.messages.push(...messages.map(addMetadata))
  await db.write()
}


export const getMessages = async () => {
  const db = await getDb()
  return db.data.messages
}
