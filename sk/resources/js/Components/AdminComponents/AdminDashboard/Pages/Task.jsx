import React, { useContext } from 'react'
import {
  Typography,
  Card
} from "@material-tailwind/react";
import Gamification from './Gamification';
import FetchTask from './fetchTask';
const Task = () => {

    const tasks = [
        { task: 'Daily Login', points: '5 points' },
        { task: 'First Login of the Day', points: '10 points' },
        { task: 'Complete Profile', points: '50 points' },
        { task: 'Attend an Event', points: '30 points' },
        { task: 'Refer a Friend', points: '100 points' },
        { task: 'Complete 5 Tasks', points: '25 points' },
        { task: 'Login Streak (5 days)', points: '50 points' },

      ];


  return (
    <>
      <div className="w-full h-full rounded-lg ">
      <div className='grid  mb-5'>
        <FetchTask />
      </div>
      <div className="flex flex-grow">
        <div className='flex-1 p-4 h-full overflow-auto'>
          <Gamification /> {/* Adjust this if needed */}
        </div>
        <Card className='flex-1 p-4'>
          <Typography variant="h4" className="font-semibold mb-5 text-center">
            Available Tasks to Assign
          </Typography>
          <div className="h-full overflow-auto">

            <table className="w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 text-left font-bold">Task</th>
                  <th className="py-2 px-3 text-right font-bold">Points</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 text-left">{row.task}</td>
                    <td className="py-3 px-4 text-right">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

    </div>
    </>
  )
}

export default Task
