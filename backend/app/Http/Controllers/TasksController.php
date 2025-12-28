<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tasks = $request->user()->tasks()->latest()->get();
        return response()->json([
            'message' => 'Tasks retrieved successfully',
            'tasks' => $tasks,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|in:pending,in_progress,done',
        ]);

        $task = $request->user()->tasks()->create($validated);
        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task,
        ], 201);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'status' => 'sometimes|required|string|in:pending,in_progress,done',
        ]);

        $task->update($validated);
        return response()->json([
            'message' => 'Task updated successfully',
            'task' => $task,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        $task->delete();
        return response()->json([
            'message' => 'Task deleted successfully',
        ], 200);
    }
}
