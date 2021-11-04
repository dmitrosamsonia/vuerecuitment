import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import taskController from '@/controllers/taskController'
import { TaskInfo } from '@/types/task.model'
import { Currency } from '@/types/money.model'  

export default function useTask() {
  const taskControl = taskController()
  const router = useRouter() 

  const task = reactive<TaskInfo>({
    title: '',
    description: '',
    budget: {
        value: 0,
        currency: Currency.USD
    }, 
    platforms: '1',
    filesIds: ''
  })  

  const clear = () => {
    task.title = '',
    task.description = '',
    task.budget = { 
        value: 0,
        currency: Currency.USD
    },
    task.platforms = '1',
    task.filesIds = ''
  }  

  const addTask = () => {   
    taskControl.add_Task(task)
      .then(() => {
        router.push({ name: 'Dashboard' })
      })
      .catch(() => {
        clear()
      })    
  }
   
  return {
    task,
    addTask,
    clear
  }
}
