import './App.css'
//import Todo from './ToDo'
import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Input,
  UnorderedList,
  ListItem,
  Text,
  Radio,
  RadioGroup
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

function App () {
  const [inputValue, setInputValue] = useState('')
  const [todo, setTodo] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)

  let through = event => {
    if (event.target.style.textDecoration) {
      event.target.parentNode.style.removeProperty('text-decoration')
      event.target.parentNode.style.removeProperty('opacity')
    } else {
      event.target.parentNode.style.setProperty(
        'text-decoration',
        'line-through'
      )
      event.target.parentNode.style.setProperty('opacity', '0.6')
    }
  }

  const handleClick = index => {
    setTodo(todos => {
      const newTodo = todos

      newTodo[index].completed = !todo[index].completed

      return newTodo
    })
  }

  const handleRemove = index => {
    const newTasks = [...todo]
    newTasks.splice(index, 1)
    setTodo(newTasks)
  }

  const category = e => {
    setActiveCategory(
      e.target.value === '1'
        ? null
        : e.target.value === '2'
        ? true
        : e.target.value === '3'
        ? false
        : null
    )
  }

  // useEffect(() => {
  //   console.log({ todo })
  // }, [todo])

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={5}
    >
      <Text fontSize='48'>ToDoList-React</Text>

      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Input
          value={inputValue}
          type='text'
          id='form-input'
          placeholder='ENTER YOUR TASK'
          onChange={e => setInputValue(e.target.value.toUpperCase())}
          width={700}
        ></Input>

        <Button
          onClick={e => {
            e.preventDefault()
            setTodo(todo => [...todo, { name: inputValue, completed: false }])
            setInputValue('')
          }}
        >
          +
        </Button>
      </Box>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={5}
        paddingTop={4}
      >
        <RadioGroup
          defaultValue='1'
          display={'flex'}
          gap={3}
          onClick={category}
        >
          <Radio value='1'>ALL</Radio>
          <Radio value='2'>COMPLETED</Radio>
          <Radio value='3'>UNCOMPLETED</Radio>
        </RadioGroup>
      </Box>
      <Box className='list' width={600} paddingTop={4}>
        {todo
          .filter(
            i => i.completed === activeCategory || activeCategory === null
          )
          .map((todo, index) => (
            <Box
              className={'uncompleted'}
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              fontSize='2xl'
              key={index}
            >
              <Box onClick={through}>
                <UnorderedList
                  onClick={() => handleClick(index)}
                  width={510}
                  style={
                    todo.completed
                      ? {
                          textDecoration: 'line-through',
                          opacity: '0.6'
                        }
                      : {}
                  }
                >
                  <ListItem fontSize={22}>{todo.name}</ListItem>
                </UnorderedList>
              </Box>

              <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'flex-end'}
                gap={3}
              >
                <DeleteIcon
                  cursor={'pointer'}
                  onClick={() => handleRemove(index)}
                />
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  )
}

export default App
