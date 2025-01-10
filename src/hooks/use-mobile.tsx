import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
        if (typeof window === 'undefined') return

        const checkMobile = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
        }

        // Initial check
        checkMobile()

        // Add event listener
        window.addEventListener('resize', checkMobile)

        // Cleanup
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return isMobile
}