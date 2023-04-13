import SwapForm from './SwapForm'
// import mangoStore from '@store/mangoStore'
// import SwapOnboardingTour from '@components/tours/SwapOnboardingTour'
// import { useWallet } from '@solana/wallet-adapter-react'
import SwapInfoTabs from './SwapInfoTabs'
import dynamic from 'next/dynamic'
import SwapIntroModal from '@components/modals/SwapIntroModal'
import { useLocalStorage } from '@solana/wallet-adapter-react'
import { SHOW_SWAP_INTRO_MODAL } from 'utils/constants'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
// import useLocalStorageState from 'hooks/useLocalStorageState'
// import { IS_ONBOARDED_KEY } from 'utils/constants'
const SwapTokenChart = dynamic(() => import('./SwapTokenChart'), { ssr: false })

const SwapPage = () => {
  const [showSwapIntro, setShowSwapIntro] = useLocalStorage(
    SHOW_SWAP_INTRO_MODAL,
    true
  )
  // const { connected } = useWallet()
  // const tourSettings = mangoStore((s) => s.settings.tours)
  // const [isOnboarded] = useLocalStorageState(IS_ONBOARDED_KEY)

  return (
    <>
      <div className="flex items-center justify-center bg-th-down-muted py-2 px-6">
        <ExclamationTriangleIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-white" />
        <span className="leading-tight text-white">
          Swaps are currently disabled. A progam update is required.
        </span>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 border-th-bkg-3 md:col-span-6 md:border-b lg:col-span-7 xl:col-span-8">
          <SwapTokenChart />
        </div>
        <div className="col-span-12 mt-2 space-y-6 border-th-bkg-3 md:col-span-6 md:mt-0 md:border-b lg:col-span-5 xl:col-span-4">
          <SwapForm />
        </div>
        <div className="col-span-12">
          <SwapInfoTabs />
        </div>
      </div>
      {showSwapIntro ? (
        <SwapIntroModal
          isOpen={showSwapIntro}
          onClose={() => setShowSwapIntro(false)}
        />
      ) : null}
    </>
  )
}

export default SwapPage
