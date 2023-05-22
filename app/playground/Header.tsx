import React from 'react'
import { Link } from 'react-router-dom'

function userImage(): string {
  const cookie = document.cookie;
  const cookieContent = cookie.split("session_token=")[1] + "}"
  const cookieJson = JSON.parse(cookieContent)
  return cookieJson.picture
}

export default class Header extends React.Component<any, { value: string }> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <div className='header flex justify-between p-4 pr-6 border'>
          <Link to='/'>
              <h1 className='text-xl font-bold'>Playground</h1>
          </Link>
          <a href="#">
              <img src={userImage()} alt="User" className='user-profile object-cover box-border h-8 w-8 rounded-full'/>
          </a>
      </div>
    )
  }
}
