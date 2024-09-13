import React, { useContext } from 'react'
import { AppContext } from '../../../Context/AppContext';
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
const fetchTask = () => {

    const{task} = useContext(AppContext);

  return (
     <div className="flex flex-row row-span-4 gap-4 ">
      {task.map((item, index) => (
        <Card key={index} className="mt-6 w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {item.task_name}
            </Typography>
            <Typography>
              {item.description}
            </Typography>
            <Typography>
              {item.points}
            </Typography>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

export default fetchTask
