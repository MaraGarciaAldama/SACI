import { Component } from "react"
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export class RTChart extends Component {
    async dataFetching() {
        let data_bar = []
        try {
            const jsonParam = await fetch('http://localhost:3000/api/saci/realTime/')
            const param = await jsonParam.json()
            const final = param.map(({ createdAt, dist, temp }) => {
                return {
                    createdAt: createdAt.split(' ')[1],
                    dist: dist,
                    temp: temp
                }
            })
            data_bar = final
            console.log(final)
        } catch (error) {
            console.log(error)
        }
        return data_bar
    }

    constructor(props) {
        super(props)
        this.state = {
            interval: props.interval || 1000,
            data: this.dataFetching()
        }
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            this.tick()
        }, this.props.interval || 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    async tick() {
        this.setState({
            data: await this.dataFetching()
        })
    }

    render() {
        return (
            <ResponsiveContainer width="100%" aspect={3} height="100%">
                <LineChart
                    style={{ backgroundColor: "white", borderRadius: "5px", margin: "1px" }}
                    margin={{
                        top: 15,
                        right: 15,
                        left: 0,
                        bottom: 15,
                    }}
                    data={this.state.data}
                >
                    <XAxis reversed={true} dataKey="createdAt" />
                    <YAxis domain={[0, 20]} tickCount={20} type="number" />
                    <CartesianGrid strokeDasharray="2 2" />
                    <Tooltip />
                    <Legend />
                    <Line animationDuration={0} type="monotone" dataKey="dist" fill="#8884d8" stroke="#8884d8" />
                    <Line animationDuration={0} type="monotone" dataKey="temp" fill="#8214d8" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        )
    }
}