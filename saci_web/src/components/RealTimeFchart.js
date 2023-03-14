const RTChart = (props) => {
    const [interval, setInterval] = useState(props.interval || 1000);
    const [data, setData] = useState([]);

    const dataFetching = async () => {
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

    const tick = async () => {
        setData(await dataFetching());
    }

    useEffect(() => {
        const timerID = setInterval(() => {
            tick();
        }, interval);

        return () => {
            clearInterval(timerID);
        };
    }, [interval]);

    useEffect(() => {
        dataFetching().then((data) => {
            setData(data);
        });
    }, []);

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
                data={data}
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
    );
}

export default RTChart;