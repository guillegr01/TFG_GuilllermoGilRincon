import { View, Dimensions, ScrollView } from "react-native";
import Svg, { Line, Rect, Polyline, Text as SvgText, Circle } from "react-native-svg";


//props for GlucoseRegisterChart
type Props = {
    data: { glucoseValue: number; date_hour: string }[];
    low: number;
    inRange: number;
    high: number;
};


/**
 * * GlucoseRegisterChart
 * @param { data, low, inRange, high }: Props 
 * @returns 
 */
export default function GlucoseRegisterChart({ data, low, inRange, high }: Props) {

    const sorted = [...data].sort(
        (a, b) => new Date(a.date_hour).getTime() - new Date(b.date_hour).getTime()
    );

    //screen dinamic width for grafic
    const screenWidth = Dimensions.get("window").width - 40;
    const pointSpacing = 50; //space between glucose points
    const width = Math.max(screenWidth, data.length * pointSpacing);

    const height = 220;
    const paddingTop = 20;
    const paddingBottom = 20;
    const chartHeight = height - paddingTop - paddingBottom; 

    const paddingLeft = 30;
    const paddingRight = 10;
    const chartWidth = sorted.length * pointSpacing;

    const MIN = 50;
    const MAX = 400;

    const scaleY = (value: number) =>
        paddingTop + chartHeight - ((value - MIN) / (MAX - MIN)) * chartHeight;

    const stepX = pointSpacing;

    const points = sorted.map((item, i) => `${paddingLeft + i * stepX},${scaleY(item.glucoseValue)}`).join(" ");

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Svg width={width} height={height}>

                {/* inRange zone (70 - 180) */}
                <Rect
                x={paddingLeft}
                y={scaleY(inRange)}
                width={chartWidth}
                height={scaleY(low) - scaleY(inRange)}
                fill="#5bd8ae26"
                />

                {/* low limit line */}
                <Line
                x1={paddingLeft}
                x2={width - paddingRight}
                y1={scaleY(low)}
                y2={scaleY(low)}
                stroke="#ef4444"
                strokeWidth="2"
                />

                {/* high limit line*/}
                <Line
                x1={paddingLeft}
                x2={width - paddingRight}
                y1={scaleY(high)}
                y2={scaleY(high)}
                stroke="#F97316"
                strokeWidth="2"
                />

                {/* glucose values line */}
                <Polyline
                points={points}
                fill="none"
                stroke="#5b615f"
                strokeWidth="3"
                />

                {sorted.map((item, i) => (
                <Circle
                    key={i}
                    cx={paddingLeft + i * stepX}
                    cy={scaleY(item.glucoseValue)}
                    r="4"
                    fill="#5b615f"
                />
                ))}

                {/* axis y intervals */}
                {[50,100,150,200,250,300,350,400].map((val) => (
                <SvgText
                    key={val}
                    x="5"
                    y={scaleY(val)}
                    fontSize="10"
                    fill="#6B7280"
                >{val}</SvgText>
                ))}

            </Svg>
        </ScrollView>
    );
}