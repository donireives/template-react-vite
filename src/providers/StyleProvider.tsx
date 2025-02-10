import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function AntdProvider({ children }: Props) {
  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider>
        {children}
      </ConfigProvider>
    </StyleProvider>
  )
} 