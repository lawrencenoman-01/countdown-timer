/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import '../styles/App.scss'
import facebook from '../assets/images/icon-facebook.svg'
import pinterest from '../assets/images/icon-pinterest.svg'
import instagram from '../assets/images/icon-instagram.svg'
import { useLocation } from 'react-router-dom'

const Homepage = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const endDateParams = searchParams.get('date')

  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  const endDate = new Date(endDateParams)
  const [endTime, setEndTime] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const duration = typeof endDate === 'number' ? endDate - now : endDate.getTime() - now

      if (duration <= 0) {
        clearInterval(interval)
        setEndTime(true)
      } else {

        const days = String(Math.floor(duration / (1000 * 60 * 60 * 24))).padStart(2, '0')
        const hours = String(Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0')
        console.log(hours);
        const minutes = String(Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
        const seconds = String(Math.floor((duration % (1000 * 60)) / (1000))).padStart(2, '0')

        setCountdown({
          days,
          hours,
          minutes,
          seconds
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [endDate])

  return (
    <>
      {endTime ? (<div className='container'>
        <div className='countdown-over'>
          <h1> Countdown is Over </h1>
        </div>
      </div>
      ) : (
        <div className='container'>
          <div className='header'>
            <h1> We're Launching Soon </h1>
          </div>
          <div className='countdown-wrapper'>
            <div className='countdown-value'>
              <div className='countdown-time'>
                <h1> {countdown.days} </h1>
              </div>
              <div className='countdown-title'>
                <p> {Number(countdown.days) > 1 ? 'Days' : 'Day'} </p>
              </div>
            </div>
            <div className='countdown-value'>
              <div className='countdown-time'>
                <h1> {countdown.hours}</h1>
              </div>
              <div className='countdown-title'>
                <p> {Number(countdown.hours) > 1 ? 'Hours' : 'Hour'} </p>
              </div>
            </div>
            <div className='countdown-value'>
              <div className='countdown-time'>
                <h1> {countdown.minutes} </h1>
              </div>
              <div className='countdown-title'>
                <p> {Number(countdown.minutes) > 1 ? 'Minutes' : 'Minute'} </p>
              </div>
            </div>
            <div className='countdown-value'>
              <div className='countdown-time'>
                <h1> {countdown.seconds} </h1>
              </div>
              <div className='countdown-title'>
                <p> {Number(countdown.seconds) > 1 ? 'Seconds' : 'Second'} </p>
              </div>
            </div>
            {/* <Test duration={2 * 24 * 60 * 60 * 1000} /> */}
          </div>
          <div className='footer'>
            <div className='facebook'>
              <img src={facebook} />
            </div>
            <div className='pinterest'>
              <img src={pinterest} />
            </div>
            <div className='instagram'>
              <img src={instagram} />
            </div>
          </div>
        </div>
      )
      }

    </>
  )
}

export default Homepage
