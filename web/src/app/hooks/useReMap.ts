import { useEffect, useState } from 'react'

type ReMapObjectProps = {
  field: string
  mapToField: string
}

type ReMapProps<T> = {
  data: T[]
  mapping: ReMapObjectProps[]
}

function useReMap<T>({ data, mapping }: ReMapProps<T>) {
  const [reMappedData, setReMappedData] = useState<T[]>([])

  useEffect(() => {
    const newRemappedData = data.map((item) => {
      const newItem: any = {}
      mapping.forEach(({ field, mapToField }) => {
        newItem[mapToField as keyof T] = item[field as keyof typeof item]
      })
      return newItem
    })
    setReMappedData(newRemappedData)
  }, [data, mapping])

  return reMappedData
}

export default useReMap
