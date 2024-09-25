import React from 'react'
import Task from './task'

export default function Todos({items}: any) {
  return items.map((task:any, idx:any) => (
    <Task {...task} key={task._id} />
))
}
