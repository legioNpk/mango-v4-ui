import { HealthType, toNativeDecimals } from '@blockworks-foundation/mango-v4'
import { ArrowRightIcon } from '@heroicons/react/solid'
import { PublicKey } from '@solana/web3.js'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import mangoStore from '../../store/mangoStore'

const HealthImpact = ({
  uiAmount,
  isDeposit,
  mintPk,
}: {
  uiAmount: number
  isDeposit?: boolean
  mintPk: PublicKey
}) => {
  const { t } = useTranslation('common')
  const mangoAccount = mangoStore((s) => s.mangoAccount.current)

  const currentMaintHealth = useMemo(() => {
    if (!mangoAccount) return 0
    return mangoAccount.getHealthRatioUi(HealthType.maint)
  }, [mangoAccount])

  const currentInitHealth = useMemo(() => {
    if (!mangoAccount) return 0
    return mangoAccount.getHealthRatioUi(HealthType.init)
  }, [mangoAccount])

  const maintProjectedHealth = useMemo(() => {
    const group = mangoStore.getState().group
    if (!group || !mangoAccount) return 0
    const projectedHealth =
      mangoAccount.simHealthRatioWithTokenPositionUiChanges(
        group,
        [{ mintPk, uiTokenAmount: isDeposit ? uiAmount : uiAmount * -1 }],
        HealthType.maint
      )

    return projectedHealth > 100
      ? 100
      : projectedHealth < 0
      ? 0
      : projectedHealth
  }, [mangoAccount, mintPk, uiAmount, isDeposit])

  const initProjectedHealth = useMemo(() => {
    const group = mangoStore.getState().group
    if (!group || !mangoAccount) return 0
    const projectedHealth =
      mangoAccount.simHealthRatioWithTokenPositionUiChanges(
        group,
        [{ mintPk, uiTokenAmount: isDeposit ? uiAmount : uiAmount * -1 }],
        HealthType.init
      )

    return projectedHealth > 100
      ? 100
      : projectedHealth < 0
      ? 0
      : projectedHealth
  }, [mangoAccount, mintPk, uiAmount, isDeposit])

  return (
    <div className="space-y-2 border-y border-th-bkg-3 px-2 py-4">
      <div className="flex justify-between">
        <p>Maint {t('health-impact')}</p>
        <div className="flex items-center space-x-2">
          <p className="text-th-fgd-1">{currentMaintHealth}%</p>
          <ArrowRightIcon className="h-4 w-4 text-th-fgd-3" />
          <p
            className={
              maintProjectedHealth < 50 && maintProjectedHealth > 15
                ? 'text-th-orange'
                : maintProjectedHealth <= 15
                ? 'text-th-red'
                : 'text-th-green'
            }
          >
            {maintProjectedHealth.toFixed(2)}%{' '}
            <span
              className={`text-xs ${
                maintProjectedHealth >= currentMaintHealth
                  ? 'text-th-green'
                  : 'text-th-red'
              }`}
            >
              ({maintProjectedHealth >= currentMaintHealth ? '+' : ''}
              {(maintProjectedHealth - currentMaintHealth).toFixed(2)}%)
            </span>
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <p>Init {t('health-impact')}</p>
        <div className="flex items-center space-x-2">
          <p className="text-th-fgd-1">{currentInitHealth}%</p>
          <ArrowRightIcon className="h-4 w-4 text-th-fgd-3" />
          <p
            className={
              initProjectedHealth < 50 && initProjectedHealth > 15
                ? 'text-th-orange'
                : initProjectedHealth <= 15
                ? 'text-th-red'
                : 'text-th-green'
            }
          >
            {initProjectedHealth.toFixed(2)}%{' '}
            <span
              className={`text-xs ${
                initProjectedHealth >= currentInitHealth
                  ? 'text-th-green'
                  : 'text-th-red'
              }`}
            >
              ({initProjectedHealth >= currentInitHealth ? '+' : ''}
              {(initProjectedHealth - currentInitHealth).toFixed(2)}%)
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default HealthImpact
