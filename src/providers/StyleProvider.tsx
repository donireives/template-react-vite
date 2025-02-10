import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider, theme } from 'antd'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function AntdProvider({ children }: Props) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#428cf8',
        },
        algorithm: theme.defaultAlgorithm,
      }}
      prefixCls="ant"
    >
      <StyleProvider hashPriority="low">
        {children}
      </StyleProvider>
    </ConfigProvider>
  )
} 