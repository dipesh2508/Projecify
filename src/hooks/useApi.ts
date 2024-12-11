import { useState, useEffect } from 'react'

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  enabled?: boolean
  dependencies?: any[]
}

export function useApi<T>(
  url: string, 
  options: UseApiOptions<T> = {}
) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const {
    onSuccess,
    onError,
    enabled = true,
    dependencies = []
  } = options

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`)
      }

      const result = await response.json()
      setData(result)
      onSuccess?.(result)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred')
      setError(error)
      onError?.(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (enabled) {
      fetchData()
    }
  }, [url, enabled, ...dependencies])

  return {
    data,
    error,
    isLoading,
    refetch: fetchData
  }
} 