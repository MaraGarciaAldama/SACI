import { SaciChart, SaciPanes, SaciTable } from "@/components/SaciChart"
import { obtainAvg } from "@/utils/sortRegisters"
import { Container, Tab } from "semantic-ui-react"
import { RTChart } from "@/components/RealTimeChart"
import DatePicker from "@/components/DatePicker"

const HomePage = ({ param }) => {

  const { ordered, monthavg, daymonth } = obtainAvg(param)

  const minpanes = SaciPanes(daymonth)

  const panes = [
    { menuItem: 'Detallado', render: () => <Tab.Pane attached={false}>{<SaciChart data={monthavg} />}</Tab.Pane> },
    { menuItem: 'Promedio mensual', render: () => <Tab.Pane attached={false}>{<SaciChart data={monthavg} />}</Tab.Pane> },
    {
      menuItem: 'Promedio diario', render: () => <Tab.Pane attached={false}>
        <Tab menu={{
          vertical: true,
          secondary: true,
          pointing: true,
          borderless: true,
          attached: false,
          tabular: false
        }}
          menuPosition='right' panes={minpanes}>
        </Tab>
      </Tab.Pane>
    },
    { menuItem: "Rango de fechas", render: () => <Tab.Pane attached={false}><DatePicker data={ordered} /></Tab.Pane> },
    { menuItem: 'Tiempo real', render: () => <Tab.Pane attached={false}><RTChart interval={1000} /></Tab.Pane> },
    { menuItem: 'Tabla de mediciones', render: () => <Tab.Pane attached={false}>{<SaciTable data={ordered} />}</Tab.Pane> }
  ]

  return (
    <Container style={{ overflowX: "auto", overflowY: "auto" }}>
      <div style={{ width: "1127px", overflow: "auto" }}>
        <Tab
          menu={{
            centered: true,
            inverted: true,
            secondary: true,
            pointing: true,
            compact: true,
            borderless: true,
            attached: false,
            tabular: false
          }} panes={panes} />
      </div>
    </Container>
  )
}

export const getServerSideProps = async ctx => {
  const jsonParam = await fetch('http://localhost:3000/api/saci/')
  const param = await jsonParam.json()
  return {
    props: {
      param
    }
  }
}

export default HomePage