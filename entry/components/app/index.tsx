import { Store } from '@/components/store'
import { Style } from '@/components/style'
import { Layout } from '@/components/layout'

export const App = () => {
  return (
    <Store>
      <Style>
        <Layout />
      </Style>
    </Store>
  )
}
