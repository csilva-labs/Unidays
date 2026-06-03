import { FlagProvider } from './context/FlagContext'
import UniDaysPanel from './components/UniDays/UniDaysPanel'
import LDPanel from './components/LDPanel/LDPanel'

export default function App() {
  return (
    <FlagProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <div className="flex-1 min-w-0 overflow-hidden">
          <UniDaysPanel />
        </div>
        <div className="w-[480px] flex-shrink-0 overflow-hidden">
          <LDPanel />
        </div>
      </div>
    </FlagProvider>
  )
}
