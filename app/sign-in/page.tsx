'use client'
import Link from 'next/link'
import Input from '../components/input'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/Button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  })
  const [didEdit, setDidEdit] = useState({
    email: true,
    password: false,
  })

  // Simple check for @ symbol
  const isEmailInvalid =
    didEdit.email &&
    enteredValues.email.length > 0 &&
    !enteredValues.email.includes('@')

  function handleInputChange(identifier: string, value: string) {
    setEnteredValues((prevValue) => ({
      ...prevValue,
      [identifier]: value,
    }))
    if (identifier === 'email') {
      setDidEdit((prevEdit) => ({
        ...prevEdit,
        email: true,
      }))
    }
  }

  function handleInputBlur(identifier: string) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }))
  }

  async function handleSubmit() {
    setMessage('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: enteredValues.email,
          password: enteredValues.password,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.username) {
        const loginTime = Date.now()
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('adminUser', data.username)
        localStorage.setItem('loginTime', loginTime.toString())
        router.push('/admin')
      } else {
        setMessage(data.message || 'Username or Password is incorrect')
      }
    } catch {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <form className='h-screen     min-h-screen bg-gradient-to-br from-zinc-900 via-white/40 to-zinc-900 '>
        <div className='md:px-20 p-6'>
          <Link
            href='/'
            className='duration-200 text-zinc-300 hover:text-zinc-100'
          >
            <ArrowLeft className=' w-6 h-6 text-lime-300 hover:border border-lime-200' />
          </Link>
        </div>
        <div className='flex pt-10 gap-10  items-center  flex-col'>
          <h2 className='text-stone-900 text-4xl'>Sign in</h2>
          <div className='border md:w-[35rem] border-lime-400 rounded-md p-8 md:p-20   flex  flex-col '>
            <Input
              id='email'
              type='email'
              label='Email'
              onBlur={() => handleInputBlur('email')}
              value={enteredValues.email}
              onChange={(event) =>
                handleInputChange('email', event.target.value)
              }
              
            >
              Enter your email
            </Input>
            {isEmailInvalid && (
              <p className='text-red-500 text-sm mt-1'>
                Please enter a valid email
              </p>
            )}
            <Input
              type='password'
              label='Password'
              value={enteredValues.password}
              onChange={(event) =>
                handleInputChange('password', event.target.value)
              }
            >
              Enter your password
            </Input>
            {message && (
              <p className='my-4 p-3 rounded-md bg-red-400 text-zinc-900'>
                {message}
              </p>
            )}
            <div>
              <Button onClick={() => handleSubmit()}>
              {submitting ? 'Logging in...' : 'Log in'}
            </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
