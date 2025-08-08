// import chart elements from Chart.js and react-chart.js-2
import { Bar, Line, Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement } from 'chart.js';
import type {ChartOptions} from 'chart.js'
// Register all the chart elements we need
ChartJS.register(
    ArcElement,
    BarElement,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale
);
// data type for cards
interface cardtype {
        id: number,
        icon:string,
        number :string,
        title:string,
}
function HomePage() {
    // Pie Chart 
    // Data for the pie chart
    const data = {
    labels: ['Apartments', 'Villas', 'Stores', 'Lands'],
    datasets: [
        {
            label: 'Distribution of Property',
            data: [40, 25, 20, 15], 
            backgroundColor: [
            '#703bf7',
            '#3bbcf7',
            '#f7d13b',
            '#3bf78c',
            ],
            borderColor: [
            '#703bf7',
            '#3bbcf7',
            '#f7d13b',
            '#3bf78c',
            ],
            borderWidth: 2,
        },
        ],
    };
    // Chart options for Pie chart
    const options:ChartOptions<'pie'> = {
        responsive: true,
        maintainAspectRatio:false,
        plugins: {
        legend: {
            position: 'right',
            labels:{
                padding:10,
                font:{
                    size:18
                },
                usePointStyle:true,
                pointStyle:"dash"
            }
        },
        },
    };
    // Lin Chart 
    // Data for the Line chart
    const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'], 
    datasets: [
    {
        label: ' Number of Visitors',
        data: [120, 150, 170, 220, 260, 300], 
        fill: false,
        borderColor: '#703bf7',
        backgroundColor: '#703bf7',
        tension: 0.3,
    },
    ],
    };
    // Chart options for line chart
    const lineoptions :ChartOptions<'line'>  = {
    responsive: true,
    maintainAspectRatio:false,
    plugins: {
    legend: {
        position: 'bottom',
    },
    title: {
        display: true,
        text: "Monthly Visitor Growth",
    },
    },
    scales: {
    
    x: {
        grid:{
            color:"#262626",
        },
    },
    y: {
        beginAtZero: true,
        grid:{
            color:"#262626",
        }
    },
    },
    };
    // Bar Chart
    // Data for the Bar chart
    const bardata = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            label: 'Apartments',
            data: [40, 55, 60, 70, 65, 80],
            backgroundColor: '#703bf7',
        },
        {
            label: 'Villas',
            data: [30, 45, 50, 55, 60, 75],
            backgroundColor: '#3bbcf7',
        },
        {
            label: 'Stores',
            data: [20, 35, 40, 45, 50, 55],
            backgroundColor: '#f7d13b',
        },
        {
            label: 'Lands',
            data: [15, 25, 30, 35, 40, 45],
            backgroundColor: '#3bf78c',
        },
        ],
    };
    // Chart options for the Bar chart
    const baroptions:ChartOptions<'bar'>  = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
    legend: {
        position: 'top',
    },
    title: {
        display: true,
        text: 'Top Selling Properties by Month',
    },
    },
    scales: {
    y: {
        beginAtZero: true,
        title: {
        display: true,
        text: 'Number of Properties Sold',
        },
    },
    x: {
        title: {
        display: true,
        text: 'Month',
        },
    },
    },
    };
    // Cards Data
    const Cards: cardtype[] =[
        {
            id: 1,
            icon:"/assets/images/people.svg",
            number :"200",
            title:"Happy Customers"
        },
        {
            id: 2,
            icon:"/assets/images/bulding.svg",
            number :"10k+",
            title:"Properties For Clients"
        },
        {
            id: 3,
            icon:"/assets/images/star.svg",
            number :"16+",
            title:"Years of Experience"
        },
    ]
    return (
        <div className="p-5 min-h-screen bg-bg flex flex-col  gap-5 justify-between">
            <div>
                <h1 className="text-4xl font-semibold text-mainText">Welcome to the  Estatein Dashboard 👋</h1>
                <p className="text-lg font-medium mt-3 text-secText">We're glad to have you back! You can start managing your properties from the sidebar.</p>
            </div>
            <div className="flex flex-col xl:flex-row justify-between gap-5 ">
                <div className="xl:w-[48%] w-full">
                    <img className="w-full h-[370px] object-cover rounded-xl" src="/assets/images/modernCitySliderCard3.webp" alt="" />
                </div>
                <div className="flex flex-col justify-between gap-3 xl:w-[48%] w-full">
                        <div className="flex gap-5 justify-between  w-full">
                            {Cards.map((card,id) => {
                                return(
                                    <div key={id} className="bg-darkGray w-[30%] py-3.5 px-6 rounded-xl ">
                                        <img src={card.icon} alt="people icon" />
                                        <p className="text-mainText text-2xl font-bold my-2 ">{card.number}</p>
                                        <p className="text-secText font-semibold text-base ">{card.title}</p>
                                    </div>
                                )
                            })}
                        </div>
                        {/* Pie Chart */}
                        <div className="w-full  bg-darkGray p-6 rounded-2xl " >
                            <Pie data={data} options={options} />
                        </div>
                </div>
            </div>
            <div className="flex xl:flex-row flex-col gap-5 justify-between ">
                {/* Line Chart */}
                <div className="xl:w-[48%] w-full  bg-darkGray  p-6 rounded-2xl ">
                    <Line data={lineData} options={lineoptions} />
                </div>
                {/* Bar Chart */}
                <div className="xl:w-[48%] h-[300px]  w-full  bg-darkGray  p-6 rounded-2xl ">
                    <Bar data={bardata} options={baroptions} />
                </div>
            </div>
        </div>
    )
}

export default HomePage
