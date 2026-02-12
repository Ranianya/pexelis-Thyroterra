'use client';

import { useState } from 'react';
import { Plus, CheckCircle2, AlertCircle } from 'lucide-react';

// Task Card Component
const TaskCard = ({ task, onComplete, isCompleted }) => {
  const handleClick = () => {
    onComplete(task.id);
  };

  return (
    <div className={`
      relative bg-amber-50 border-4 border-amber-800 rounded-3xl p-6 
      transform transition-all duration-300 hover:scale-105
      ${isCompleted ? 'ring-4 ring-green-400 ring-opacity-50' : ''}
      shadow-lg
    `}>
      {/* Corner decorations */}
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-amber-800 rounded-full"></div>
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-800 rounded-full"></div>
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-amber-800 rounded-full"></div>
      <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-amber-800 rounded-full"></div>

      <div className="flex flex-col items-center text-center gap-3">
        {/* Icon */}
        <div className="text-4xl">{task.icon}</div>

        {/* Title */}
        <h3 className="font-bold text-sm text-amber-900 uppercase tracking-wider">
          {task.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-amber-800 leading-relaxed">
          {task.description}
        </p>

        {/* Button */}
        <button
          onClick={handleClick}
          className={`
            mt-3 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest
            transform transition-all duration-200
            ${isCompleted
              ? 'bg-green-400 text-white border-2 border-green-600 scale-95'
              : 'bg-yellow-500 text-amber-900 border-2 border-yellow-700 hover:scale-105 active:scale-95'
            }
            shadow-md hover:shadow-lg
          `}
          disabled={isCompleted}
        >
          {task.buttonLabel}
        </button>

        {/* Completion checkmark */}
        {isCompleted && (
          <div className="absolute top-2 right-2 text-green-500 animate-bounce">
            <CheckCircle2 size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

// Main Daily Routine Component
export default function Days() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Morning Energizer',
      subtitle: 'First Mission',
      description: 'Your Whole Will',
      icon: '🌅',
      buttonLabel: 'I Did It',
      completed: false,
    },
    {
      id: 2,
      title: 'Hydration Quest',
      description: 'Drink 6 Glasses Today',
      icon: '💧',
      buttonLabel: 'Drink It',
      completed: false,
    },
    {
      id: 3,
      title: 'Take a Short Walk',
      description: 'To Boost Your Energy',
      icon: '🚶',
      buttonLabel: 'Walk Done',
      completed: false,
    },
    {
      id: 4,
      title: 'Fuel Up',
      description: 'Eat Something Healthy and Light',
      icon: '🥗',
      buttonLabel: 'Energy Gather',
      completed: false,
    },
    {
      id: 5,
      title: 'How Are You Feeling Today?',
      description: 'Check Your Mood',
      icon: '😊',
      buttonLabel: 'Feel It',
      completed: false,
    },
    {
      id: 6,
      title: 'Sleep on Time',
      description: 'Get Your Rest',
      icon: '😴',
      buttonLabel: 'Dream Mode',
      completed: false,
    },
  ]);

  const [result, setResult] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = (completedCount / tasks.length) * 100;

  const handleCompleteTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    ));

    // Play sound effect
    playSound('success');

    // Show brief animation
    const element = document.getElementById(`task-${taskId}`);
    if (element) {
      element.classList.add('animate-pulse');
      setTimeout(() => element.classList.remove('animate-pulse'), 500);
    }
  };

  const handleDone = () => {
    playSound('complete');

    if (completedCount < 3) {
      setResult({
        type: 'warning',
        message: 'Adjust your routine before your health deteriorates',
        icon: '⚠️',
      });
    } else if (completedCount === 3) {
      setResult({
        type: 'encouraging',
        message: 'Keep going!',
        icon: '💪',
      });
    } else {
      setResult({
        type: 'perfect',
        message: 'Perfect!',
        icon: '🎉',
      });
    }
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Math.max(...tasks.map(t => t.id)) + 1,
        title: newTaskTitle,
        description: newTaskDescription,
        icon: '⭐',
        buttonLabel: 'Complete',
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setShowAddForm(false);
      playSound('add');
    }
  };

  const playSound = (type) => {
    // Create a simple beep using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'success') {
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } else if (type === 'complete') {
      oscillator.frequency.value = 600;
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } else if (type === 'add') {
      oscillator.frequency.value = 1000;
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-300 via-blue-200 to-green-200 flex items-center justify-center p-4">
        <div className="bg-white border-4 border-amber-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl animate-bounce">
          <div className="text-6xl mb-4">{result.icon}</div>
          <h2 className={`
            text-3xl font-bold mb-4 uppercase
            ${result.type === 'perfect' ? 'text-green-600' : 
              result.type === 'encouraging' ? 'text-blue-600' : 'text-yellow-600'}
          `}>
            {result.message}
          </h2>
          <p className="text-amber-900 mb-6 text-sm">
            {completedCount} out of {tasks.length} tasks completed
          </p>
          <button
            onClick={() => setResult(null)}
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold uppercase hover:bg-blue-600 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 via-blue-200 to-green-200 p-4 md:p-6">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <div className="text-3xl">🌍</div>
        <h1 className="text-2xl font-bold text-blue-900">Thyroterra</h1>
      </div>

      {/* Header */}
      <div className="bg-white border-4 border-amber-800 rounded-3xl p-6 mb-6 text-center shadow-lg">
        <h2 className="text-4xl font-bold text-amber-900 mb-1">Sunday, Feb 1</h2>
        <p className="text-amber-700 font-semibold uppercase tracking-wider">Daily Progress</p>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {tasks.map(task => (
          <div key={task.id} id={`task-${task.id}`}>
            <TaskCard
              task={task}
              onComplete={handleCompleteTask}
              isCompleted={task.completed}
            />
          </div>
        ))}
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="bg-white border-4 border-green-600 rounded-3xl p-6 mb-6 shadow-lg animate-in fade-in">
          <h3 className="text-lg font-bold text-green-900 mb-4">Add New Task</h3>
          <input
            type="text"
            placeholder="Task title..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full border-2 border-green-400 rounded-lg p-2 mb-3 text-sm"
          />
          <input
            type="text"
            placeholder="Task description..."
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            className="w-full border-2 border-green-400 rounded-lg p-2 mb-4 text-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddTask}
              className="flex-1 bg-green-500 text-white rounded-full font-bold py-2 hover:bg-green-600 transition-colors"
            >
              Add Task
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="flex-1 bg-gray-300 text-gray-800 rounded-full font-bold py-2 hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 flex-1 bg-green-500 text-white border-2 border-green-700 rounded-full py-3 font-bold uppercase text-sm hover:bg-green-600 active:scale-95 transition-all shadow-md"
        >
          <Plus size={20} />
          Add to the Routine
        </button>
      </div>

      {/* Progress Section */}
      <div className="bg-white border-4 border-amber-800 rounded-3xl p-6 shadow-lg">
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-amber-900 mb-2">
            You are making great progress!
          </h3>
          {/* Progress Bar */}
          <div className="w-full bg-gray-300 rounded-full h-8 overflow-hidden border-2 border-amber-800 mb-3">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500 ease-out flex items-center justify-end pr-2"
              style={{ width: `${progressPercentage}%` }}
            >
              {progressPercentage > 0 && (
                <span className="text-xs font-bold text-white">
                  {Math.round(progressPercentage)}%
                </span>
              )}
            </div>
          </div>
          <p className="text-amber-800 font-bold text-lg">
            {completedCount}/{tasks.length}
          </p>
        </div>

        {/* Done Button */}
        <button
          onClick={handleDone}
          className="w-full bg-amber-700 text-white border-2 border-amber-900 rounded-full py-3 font-bold uppercase text-lg hover:bg-amber-800 active:scale-95 transition-all shadow-md"
        >
          Done
        </button>
      </div>
    </div>
  );
}
