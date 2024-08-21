import React from "react";

// @material-tailwind/react
import {
  Input,
  Typography,
  Select,
  Option,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

// day picker
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

// @heroicons/react
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";


const Profiling = () => {

    const [date, setDate] = React.useState();
  return (
    <section className="container px-8 py-16 mx-auto bg-white rounded-xl">
      <Typography variant="h5" color="blue-gray">
        Basic Information
      </Typography>
      <Typography
        variant="small"
        className="mt-1 font-normal text-gray-600"
      >
        Add the profile information below.
      </Typography>
      <div className="flex flex-col mt-8">
        <div className="flex flex-col items-end gap-4 mb-6 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              First Name
            </Typography>
            <Input
  size="lg"
  placeholder="Emma"
  labelProps={{
    className: "hidden",
  }}
 className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
/>
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Last Name
            </Typography>
            <Input
              size="lg"
              placeholder="Roberts"
              labelProps={{
                className: "hidden",
              }}
           className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-6 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              I&apos;m
            </Typography>
            <Select
              size="lg"
              labelProps={{
                className: "hidden",
              }}
              className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
            >
              <Option>Male</Option>
              <Option>Female</Option>
            </Select>
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Birth Date
            </Typography>
            <Popover placement="bottom">
              <PopoverHandler>
                <Input
                  size="lg"
                  onChange={() => null}
                  placeholder="Select a Date"
                  value={date ? format(date, "PPP") : ""}
                  labelProps={{
                    className: "hidden",
                  }}
                className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
                />
              </PopoverHandler>
              <PopoverContent>
                <DayPicker
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  showOutsideDays
                  className="border-0"
                  classNames={{
                    caption:
                      "flex justify-center py-2 mb-4 relative items-center",
                    caption_label: "text-sm !font-medium text-gray-900",
                    nav: "flex items-center",
                    nav_button:
                      "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                    nav_button_previous: "absolute left-1.5",
                    nav_button_next: "absolute right-1.5",
                    table: "w-full border-collapse",
                    head_row: "flex !font-medium text-gray-900",
                    head_cell: "m-0.5 w-9 !font-normal text-sm",
                    row: "flex w-full mt-2",
                    cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 !font-normal",
                    day_range_end: "day-range-end",
                    day_selected:
                      "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                    day_today: "rounded-md bg-gray-200 text-gray-900",
                    day_outside:
                      "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                    day_disabled: "text-gray-500 opacity-50",
                    day_hidden: "invisible",
                  }}
                  components={{
                    IconLeft: ({ ...props }) => (
                      <ChevronLeftIcon
                        {...props}
                        className="w-4 h-4 stroke-2"
                      />
                    ),
                    IconRight: ({ ...props }) => (
                      <ChevronRightIcon
                        {...props}
                        className="w-4 h-4 stroke-2"
                      />
                    ),
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Age
            </Typography>
            <Select
              size="lg"
              labelProps={{
                className: "hidden",
              }}
              className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
            >
              <Option>1</Option>
              <Option>2</Option>
              <Option>3</Option>
              <Option>4</Option>
              <Option>5</Option>
              <Option>6</Option>
              <Option>7</Option>
              <Option>8</Option>
              <Option>9</Option>
              <Option>10</Option>
              <Option>11</Option>
              <Option>12</Option>
              <Option>13</Option>
              <Option>14</Option>
              <Option>15</Option>
              <Option>16</Option>
              <Option>17</Option>
              <Option>18</Option>
              <Option>19</Option>
              <Option>20</Option>
              <Option>21</Option>
              <Option>22</Option>
              <Option>23</Option>
              <Option>24</Option>
              <Option>25</Option>
              <Option>26</Option>
              <Option>27</Option>
              <Option>28</Option>
              <Option>29</Option>
              <Option>30</Option>
            </Select>
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Education
            </Typography>
            <Select
              size="lg"
              labelProps={{
                className: "hidden",
              }}
            className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
            >
              <Option>School Youth</Option>
              <Option>Not School Youth</Option>
              <Option>Working</Option>
            </Select>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4 mb-6 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Address
            </Typography>
            <Input
              size="lg"
              placeholder="Florida, USA"
              labelProps={{
                className: "hidden",
              }}
              className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Phone Number
            </Typography>
            <Input
              size="lg"
              placeholder="+123 0123 456 789"
              labelProps={{
                className: "hidden",
              }}
             className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
            />
          </div>
        </div>
        <div className="flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Language
            </Typography>
            <Input
              size="lg"
              placeholder="Language"
              labelProps={{
                className: "hidden",
              }}
             className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Skills
            </Typography>
            <Input
              size="lg"
              placeholder="Skills"
              labelProps={{
                className: "hidden",
              }}
              className="w-full border border-gray-500 placeholder:opacity-100 focus:border-gray-800 border-t-gray-500 focus:border-t-black"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profiling
