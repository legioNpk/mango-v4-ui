import useMangoGroup from 'hooks/useMangoGroup'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { DashboardNavbar } from '.'
import { Table, Td, Th, TrBody, TrHead } from '@components/shared/TableElements'
import { useQuery } from '@tanstack/react-query'
import { emptyWallet } from '@store/mangoStore'
import {
  MANGO_V4_ID,
  MangoClient,
  getRiskStats,
} from '@blockworks-foundation/mango-v4'
import { PublicKey } from '@solana/web3.js'
import { formatNumericValue } from 'utils/numbers'
import { AnchorProvider, web3 } from '@project-serum/anchor'

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

type TableData = {
  title: string
  data: Array<Record<string, string | number | PublicKey>>
}

const formatValue = (val: string | number | PublicKey) => {
  if (val instanceof PublicKey) {
    return val.toString()
  }
  if (typeof val === 'string') {
    return val
  } else {
    return formatNumericValue(val)
  }
}

const RiskDashboard: NextPage = () => {
  const { group } = useMangoGroup()

  const { data, isLoading, isFetching } = useQuery(
    ['risks'],
    () => {
      const provider = new AnchorProvider(
        new web3.Connection(
          'https://mango.rpcpool.com/0f9acc0d45173b51bf7d7e09c1e5',
          'processed'
        ),
        emptyWallet,
        AnchorProvider.defaultOptions()
      )
      const client = MangoClient.connect(
        provider,
        'mainnet-beta',
        MANGO_V4_ID['mainnet-beta']
      )
      if (group) {
        return getRiskStats(client, group)
      }
    },
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
      enabled: !!group,
    }
  )

  console.log('resp', isLoading, isFetching, data)

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 xl:col-span-8 xl:col-start-3">
        <div className="p-8 pb-20 text-th-fgd-1 md:pb-16 xl:p-10">
          <h1>Dashboard</h1>
          <DashboardNavbar />
          {group && data ? (
            <div className="mt-4">
              {Object.entries(data).map(
                ([tableType, table]: [string, TableData]) => {
                  return (
                    <div className="mt-12" key={tableType}>
                      <div className="mb-4">
                        <p className="text-th-fgd-4">{table.title}</p>
                      </div>
                      <Table>
                        <thead>
                          <TrHead className="border">
                            {Object.keys(table.data[0]).map(
                              (colName: string) => {
                                return (
                                  <Th
                                    xBorder
                                    className="text-left"
                                    key={colName}
                                  >
                                    {colName}{' '}
                                    {colName.toLowerCase().includes('fee') ||
                                    colName.toLowerCase().includes('slippage')
                                      ? '(bps)'
                                      : ''}
                                    {colName.toLowerCase().includes('assets') ||
                                    colName.toLowerCase().includes('liabs') ||
                                    colName.toLowerCase().includes('equity') ||
                                    colName.toLowerCase().includes('price') ||
                                    colName.toLowerCase().includes('position')
                                      ? '($)'
                                      : ''}
                                  </Th>
                                )
                              }
                            )}
                          </TrHead>
                        </thead>
                        <tbody>
                          {table.data.map((rowData, index: number) => {
                            console.log('rowData', Object.values(rowData))

                            return (
                              <TrBody key={index}>
                                {Object.values(rowData).map(
                                  (
                                    val: string | number | PublicKey,
                                    idx: number
                                  ) => {
                                    return (
                                      <Td xBorder className={''} key={idx}>
                                        {formatValue(val)}
                                      </Td>
                                    )
                                  }
                                )}
                              </TrBody>
                            )
                          })}
                        </tbody>
                      </Table>
                    </div>
                  )
                }
              )}
            </div>
          ) : (
            'Loading'
          )}
        </div>
      </div>
    </div>
  )
}

export default RiskDashboard