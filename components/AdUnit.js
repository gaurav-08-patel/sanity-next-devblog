import { useEffect } from 'react'

export default function AdUnit({ slot }) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    // Only initialize ads if we have a client ID and window.adsbygoogle is available
    if (adsenseClientId) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        console.error("AdSense initialization error:", e)
      }
    }
  }, [adsenseClientId])

  // In development mode, if there is no client ID configured,
  // render a placeholder box so the developer can visualize ad placements.
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="my-8 p-4 border border-dashed border-gray-300 dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-900/30 text-center">
        <p className="text-xs font-mono text-gray-400 dark:text-gray-500">
          [Advertisement Unit — Slot: {slot}]
        </p>
        <p className="text-[10px] text-gray-300 dark:text-zinc-600 mt-1">
          Configure NEXT_PUBLIC_ADSENSE_CLIENT_ID in .env.local to load AdSense
        </p>
      </div>
    )
  }

  // If no AdSense ID is set in production, render nothing.
  if (!adsenseClientId) return null

  return (
    <div className='my-8 flex justify-center'>
      <ins
        className='adsbygoogle'
        style={{ display: 'block', width: '100%' }}
        data-ad-client={adsenseClientId}
        data-ad-slot={slot}
        data-ad-format='auto'
        data-full-width-responsive='true'
      />
    </div>
  )
}
