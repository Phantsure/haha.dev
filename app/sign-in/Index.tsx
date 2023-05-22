import React from 'react'

export default class SigninIndex extends React.Component<any, { value: string }> {
  constructor(props: any) {
    super(props)
    this.state = {
      value: "",
    };
  }

  render() {
    return (
        <a href="/login" className='flex gap-2 border-2 w-fit p-2 px-4 mt-4 mx-auto rounded-full w-auto'>
            <img src="https://img.clerk.com/static/google.svg" alt="Google logo" />
            <span>Continue with Google</span>
        </a>
    )
  }
}
