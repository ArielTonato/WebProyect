import React from 'react'
import Task from './task'
import { checkATodo, unCheckATodo } from '../../convex/todos';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { useToast } from '@/hooks/use-toast';

export default function Todos({items}: any) {
  const {toast} = useToast();
  const checkATodo = useMutation(api.todos.checkATodo);
  const unCheckATodo = useMutation(api.todos.unCheckATodo);
  const handleOnChangeTodo = (task: Doc<"todos">) => {
    if (task.isCompleted) {
      unCheckATodo({taskId: task._id});
    } else {
      toast({
        title: 'Tarea Completada',
        description: '¡Bien hecho! 🎉',
        duration: 2000,
      })
      checkATodo({taskId: task._id});
    }
  };

  return items.map((task:any, idx:any) => (
    <Task 
    key={task._id}
    {...task} 
    handleOnChange={() => handleOnChangeTodo(task)}
     />
))
}
