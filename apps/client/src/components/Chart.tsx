import { useEffect, useState } from "react";
import Chart from "chart.js";
import styles from '../styles/styles.module.css';
import { useSession } from "next-auth/react";
import { userStates } from "@/lib/stats";


function ChartComponent() {
  const { data: session } = useSession();
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session?.user.id) {
          const res = await userStates(session.user.id);
          setData(res);
          console.log(data)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session]);

  useEffect(() => {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement | null;
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    const today = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    // Generate labels starting from the current day and moving backward
    const labels = [];
    for (let i = 0; i < 7; i++) {
      const index = (today.getDay() - i + 7) % 7; // Ensure the index wraps around correctly
      labels.push(daysOfWeek[index]);
    }
  
    // Reverse the labels so that the current day appears last
    const reversedLabels = labels.reverse();
  
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: reversedLabels, // Use reversed labels
        datasets: [{
          data: data, // Use fetched data instead of studyData
          label: "Study Hours",
          borderColor: "#3e95cd",
          backgroundColor: "#7bb6dd",
          fill: false,
        }]
      },
    });
  
    canvas.style.width = "100%";
    canvas.style.height = "auto";
  
    return () => {
      myChart.destroy();
    };
  }, [data]);
  

  return (
    <>
      <h1 className={`w-[110px] mx-auto mt-4   text-xl font-semibold capitalize ${styles.title}`}>Study States</h1>
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className='border border-gray-400 pt-0 rounded-xl w-full h-fit my-auto shadow-xl mt-4'>
          <canvas id='myChart'></canvas>
        </div>
      </div>
    </>
  );
}

export default ChartComponent;
