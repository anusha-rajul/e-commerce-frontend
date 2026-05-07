import { useEffect, useState } from "react"


const useDebounce = (search, delay) => {
    const [debounce, setDebounce] = useState(search)

    useEffect(() => {
        let timer = setTimeout(() => {
        setDebounce(search)
        }, delay)
        
        return () => clearTimeout(timer)
    },[search, delay])

   return debounce
    
 
}

export default useDebounce
