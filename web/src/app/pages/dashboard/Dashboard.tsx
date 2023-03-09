import DashBoardCard from 'app/components/dashboard/DashBoardCard'
import { dashboardConstants } from 'app/constants/constant'

export default function Dashboard() {
  return (
    <div className='p-10 grid grid-cols-4 gap-4'>
      {dashboardConstants.map((element) => (
        <DashBoardCard
          key={element.title}
          title={element.title}
          description={element.description}
          icon={element.iconPath}
          routePath={element.routePath}
        />
      ))}
    </div>
  )
}
