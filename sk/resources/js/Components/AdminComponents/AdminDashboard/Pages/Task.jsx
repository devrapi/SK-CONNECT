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
    <div className="grid w-full h-full grid-rows-[auto,1fr] gap-5 rounded-lg">
  {/* Top row for FetchTask */}
  <div>
    <FetchTask />
  </div>

  {/* Bottom row for Gamification and Available Tasks */}
  <div className="flex h-full gap-4">
    {/* Gamification on the left */}
    <div className='flex-1 h-full p-4 overflow-auto bg-white rounded-lg shadow-lg'>
      <Gamification />
    </div>
    {/* Available Tasks on the right */}
    <div className="flex-1 h-full p-4 overflow-auto bg-white rounded-lg shadow-lg">
      <Typography variant="h4" className="mb-5 font-semibold text-center">
        Available Tasks to Assign
      </Typography>
      <table className="w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-3 py-3 font-bold text-left">Task</th>
            <th className="px-3 py-3 font-bold text-right">Points</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((row, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-3 text-left">{row.task}</td>
              <td className="px-4 py-3 text-right">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>


    </>
  )
}

export default Task
