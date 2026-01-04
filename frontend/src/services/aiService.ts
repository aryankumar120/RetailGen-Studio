import axios from 'axios'

const AI_API_URL = import.meta.env.VITE_AI_SERVICE_URL || 'http://localhost:5001'

export const aiService = {
  async removeBackground(imageUrl: string) {
    const response = await axios.post(`${AI_API_URL}/remove-background`, {
      imageUrl,
    })
    return response.data
  },

  async generateLayoutSuggestions(canvasJSON: any) {
    const response = await axios.post(`${AI_API_URL}/generate-layouts`, {
      canvas: canvasJSON,
    })
    return response.data
  },

  async checkCompliance(canvasJSON: any) {
    const response = await axios.post(`${AI_API_URL}/check-compliance`, {
      canvas: canvasJSON,
    })
    return response.data
  },

  async optimizeImage(imageUrl: string, maxSize: number = 500000) {
    const response = await axios.post(`${AI_API_URL}/optimize-image`, {
      imageUrl,
      maxSize,
    })
    return response.data
  },
}
