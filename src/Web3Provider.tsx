"use client";
import { Web3ReactProvider, Web3ReactHooks } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { initializeConnector } from '@web3-react/core'
import { Web3ReactStore } from '@web3-react/types'
import { Phantom } from 'web3-react-phantom'

const phantom = initializeConnector<Phantom>((actions) => new Phantom({ actions }))

export const web3connectors: [Connector, Web3ReactHooks, Web3ReactStore][] = [phantom]

const connections: [Connector, Web3ReactHooks][] = web3connectors.map(([connector, hooks]) => [connector, hooks])

export const Web3Provider = ({children}:any) => {
    return (<>
      <Web3ReactProvider connectors={connections}>
        {children}
      </Web3ReactProvider>
    </>)
}