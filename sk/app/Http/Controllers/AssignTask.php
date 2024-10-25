<?php

namespace App\Http\Controllers;
use App\Models\Task;
use Illuminate\Http\Request;

class AssignTask extends Controller
{
    public function index()
    {
        return Task::orderBy('created_at', 'desc')->get();
    }

    public function show(Task $task)
    {
        return $task;

    }

    public function store(Request $request)
    {
        $request->validate([
            'task_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'points' => 'required|integer',
        ]);

        Task::create([
            'task_name' => $request->task_name,
            'description' => $request->description,
            'points' => $request->points,

        ]);

        return response()->json(['message' => 'Task created successfully']);
    }

    public function destroy( Task $task )
    {
            $task->delete();

            return ['message' => ' the task is deleted'];
    }

    public function update( Task $task , Request $request){

        $fields = $request->validate([
            'task_name' => 'required|string|max:255',
            'description' => 'nullable',
            'points' => 'required|integer',
        ]);


        $task->update($fields);

        return ['message' => 'update success' , $task];

    }

}
